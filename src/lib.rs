//! Snapshot validation is platform-independent; browser orchestration is WASM-only.
use serde::Deserialize;

#[derive(Clone, Debug, PartialEq)]
pub struct Level {
    pub price: f64,
    pub size: f64,
}

#[derive(Clone, Debug)]
pub struct Snapshot {
    pub bids: Vec<Level>,
    pub asks: Vec<Level>,
    pub event_ms: f64,
    pub update_id: u64,
}

#[derive(Deserialize)]
struct DepthEvent {
    e: String,
    s: String,
    #[serde(rename = "E")]
    event_ms: f64,
    u: u64,
    b: Vec<[String; 2]>,
    a: Vec<[String; 2]>,
    st: Option<u8>,
}

impl Snapshot {
    /// Partial depth messages replace the entire five-level view, never merge it.
    pub fn parse(json: &str) -> Result<Self, &'static str> {
        let raw: DepthEvent = serde_json::from_str(json).map_err(|_| "Invalid depth event")?;
        if raw.e != "depthUpdate" || raw.s != "BTCUSDT" || raw.st.is_some_and(|st| st != 1) {
            return Err("Unexpected stream");
        }
        if !raw.event_ms.is_finite() || raw.event_ms <= 0.0 {
            return Err("Invalid timestamp");
        }
        fn levels(rows: Vec<[String; 2]>, bids: bool) -> Result<Vec<Level>, &'static str> {
            if rows.len() != 5 {
                return Err("Expected five levels");
            }
            let mut levels = rows
                .into_iter()
                .map(|[p, q]| {
                    let price = p.parse::<f64>().map_err(|_| "Invalid price")?;
                    let size = q.parse::<f64>().map_err(|_| "Invalid quantity")?;
                    if !price.is_finite() || !size.is_finite() || price <= 0.0 || size <= 0.0 {
                        return Err("Nonpositive or nonfinite level");
                    }
                    Ok(Level { price, size })
                })
                .collect::<Result<Vec<_>, _>>()?;
            levels.sort_by(|a, b| {
                if bids {
                    b.price.total_cmp(&a.price)
                } else {
                    a.price.total_cmp(&b.price)
                }
            });
            if levels.windows(2).any(|w| w[0].price == w[1].price) {
                return Err("Duplicate price level");
            }
            Ok(levels)
        }
        let book = Self {
            bids: levels(raw.b, true)?,
            asks: levels(raw.a, false)?,
            event_ms: raw.event_ms,
            update_id: raw.u,
        };
        if book.bids[0].price >= book.asks[0].price {
            return Err("Crossed book");
        }
        Ok(book)
    }

    pub fn mid(&self) -> f64 {
        (self.bids[0].price + self.asks[0].price) / 2.0
    }
    pub fn spread(&self) -> f64 {
        self.asks[0].price - self.bids[0].price
    }
    pub fn bid_share(&self) -> f64 {
        let bid: f64 = self.bids.iter().map(|l| l.size).sum();
        let ask: f64 = self.asks.iter().map(|l| l.size).sum();
        bid / (bid + ask) * 100.0
    }

    /// Deliberately synthetic data, accessible only through the explicit Demo button.
    pub fn demo(step: u32, now: f64) -> Self {
        let mid = 97420.0 + (f64::from(step) * 0.7).sin() * 12.0;
        let side = |bid: bool| {
            (0..5)
                .map(|i| Level {
                    price: ((mid
                        + if bid {
                            -0.1 - i as f64 * 0.1
                        } else {
                            0.1 + i as f64 * 0.1
                        })
                        * 10.0)
                        .round()
                        / 10.0,
                    size: (0.32
                        + ((f64::from(step) + i as f64 * 1.3 + if bid { 1.0 } else { 3.0 }).sin()
                            + 1.0)
                            * 1.3)
                        * (i + 1) as f64,
                })
                .collect()
        };
        Self {
            bids: side(true),
            asks: side(false),
            event_ms: now,
            update_id: step as u64,
        }
    }
}

#[cfg(target_arch = "wasm32")]
mod browser;

#[cfg(test)]
mod tests {
    use super::*;
    fn event() -> serde_json::Value {
        serde_json::json!({"e":"depthUpdate","s":"BTCUSDT","E":1780000000000.0,"u":42,
            "b":[["100","1"],["99","2"],["98","3"],["97","4"],["96","5"]],
            "a":[["101","2"],["102","4"],["103","6"],["104","8"],["105","10"]]})
    }
    #[test]
    fn calculates_spread_mid_and_displayed_volume() {
        let b = Snapshot::parse(&event().to_string()).unwrap();
        assert_eq!(b.mid(), 100.5);
        assert_eq!(b.spread(), 1.0);
        assert!((b.bid_share() - 100.0 / 3.0).abs() < 1e-9);
    }
    #[test]
    fn sorts_sides_and_replaces_snapshot() {
        let mut e = event();
        e["b"].as_array_mut().unwrap().reverse();
        e["a"].as_array_mut().unwrap().reverse();
        let b = Snapshot::parse(&e.to_string()).unwrap();
        assert_eq!(b.bids[0].price, 100.0);
        assert_eq!(b.asks[0].price, 101.0);
        e["b"][0][0] = "95".into();
        assert_eq!(Snapshot::parse(&e.to_string()).unwrap().bids.len(), 5);
    }
    #[test]
    fn rejects_invalid_quantities_and_prices() {
        for bad in ["NaN", "inf", "-1", "0", "junk"] {
            for field in [0, 1] {
                let mut e = event();
                e["b"][0][field] = bad.into();
                assert!(Snapshot::parse(&e.to_string()).is_err());
            }
        }
    }
    #[test]
    fn rejects_wrong_symbol_market_and_crossed_book() {
        let mut e = event();
        e["s"] = "ETHUSDT".into();
        assert!(Snapshot::parse(&e.to_string()).is_err());
        let mut e = event();
        e["st"] = 2.into();
        assert!(Snapshot::parse(&e.to_string()).is_err());
        let mut e = event();
        e["b"][0][0] = "101".into();
        assert!(Snapshot::parse(&e.to_string()).is_err());
    }
    #[test]
    fn rejects_incomplete_and_duplicate_levels() {
        let mut e = event();
        e["a"].as_array_mut().unwrap().pop();
        assert!(Snapshot::parse(&e.to_string()).is_err());
        let mut e = event();
        e["b"][1][0] = "100".into();
        assert!(Snapshot::parse(&e.to_string()).is_err());
    }
    #[test]
    fn demo_always_has_five_ordered_uncrossed_levels() {
        for i in 0..1000 {
            let b = Snapshot::demo(i, 1.0);
            assert_eq!(b.bids.len(), 5);
            assert_eq!(b.asks.len(), 5);
            assert!(b.spread() > 0.0);
            assert!((0.0..100.0).contains(&b.bid_share()));
            assert!(b.bids.windows(2).all(|w| w[0].price > w[1].price));
            assert!(b.asks.windows(2).all(|w| w[0].price < w[1].price));
        }
    }
}
