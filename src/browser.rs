use crate::{Level, Snapshot};
use std::{cell::RefCell, rc::Rc};
use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{Element, Event, MessageEvent, WebSocket};

// Public USDⓈ-M endpoint (Binance's 2026 public/market stream split).
const STREAM: &str = "wss://fstream.binance.com/public/ws/btcusdt@depth5@100ms";
const DEMO_REFRESH_MS: f64 = 1_000.0;
const STALE_MS: f64 = 15_000.0;

struct Socket {
    ws: WebSocket,
    _message: Closure<dyn FnMut(MessageEvent)>,
    _close: Closure<dyn FnMut(Event)>,
    _error: Closure<dyn FnMut(Event)>,
}
impl Drop for Socket {
    fn drop(&mut self) {
        self.ws.set_onmessage(None);
        self.ws.set_onclose(None);
        self.ws.set_onerror(None);
        let _ = self.ws.close();
    }
}
#[derive(Default)]
struct App {
    socket: Option<Socket>,
    latest: Option<Snapshot>,
    received: f64,
    connected_at: f64,
    published: f64,
    displayed_id: Option<u64>,
    retry_at: f64,
    attempts: u32,
    failed: bool,
    demo: bool,
    paused: bool,
    demo_step: u32,
}
fn now() -> f64 {
    js_sys::Date::now()
}
fn el(id: &str) -> Element {
    web_sys::window()
        .unwrap()
        .document()
        .unwrap()
        .get_element_by_id(id)
        .unwrap()
}
fn text(id: &str, value: &str) {
    let element = el(id);
    // Avoid repeated live-region announcements and DOM work on the 250 ms tick.
    if element.text_content().as_deref() != Some(value) {
        element.set_text_content(Some(value));
    }
}
fn html(id: &str, value: &str) {
    el(id).set_inner_html(value);
}
fn attr(id: &str, name: &str, value: &str) {
    let element = el(id);
    if element.get_attribute(name).as_deref() != Some(value) {
        let _ = element.set_attribute(name, value);
    }
}
fn state(label: &str, class: &str) {
    text("connection", label);
    attr("connection", "class", &format!("connection {class}"));
    attr("feed-dot", "class", &format!("pulse-dot {class}"));
}
fn number(value: f64, precision: usize) -> String {
    let raw = format!("{value:.precision$}");
    let (whole, decimal) = raw.split_once('.').unwrap_or((&raw, ""));
    let mut out = String::new();
    for (i, c) in whole.chars().enumerate() {
        if i > 0 && (whole.len() - i) % 3 == 0 {
            out.push(',');
        }
        out.push(c);
    }
    if precision > 0 {
        out.push('.');
        out.push_str(decimal);
    }
    out
}
fn render_rows(levels: &[Level], reverse: bool, maximum: f64) -> String {
    let mut cumulative = 0.0;
    let mut rows: Vec<String> = levels.iter().map(|level| {
        cumulative += level.size;
        format!("<div class=\"book-row\" role=\"row\" style=\"--depth:{:.1}%\"><span role=\"cell\">{}</span><span role=\"cell\">{}</span><span role=\"cell\">{}</span></div>", cumulative / maximum * 100.0, number(level.price, 1), number(level.size, 3), number(cumulative, 3))
    }).collect();
    if reverse {
        rows.reverse();
    }
    rows.join("")
}
fn render(book: &Snapshot) {
    let mid = number(book.mid(), 2);
    let (whole, fraction) = mid.split_once('.').unwrap();
    html(
        "mid-price",
        &format!("{whole}<span class=\"price-decimal\">.{fraction}</span>"),
    );
    let max = book
        .bids
        .iter()
        .map(|l| l.size)
        .sum::<f64>()
        .max(book.asks.iter().map(|l| l.size).sum());
    html("asks", &render_rows(&book.asks, true, max));
    html("bids", &render_rows(&book.bids, false, max));
    html(
        "spread",
        &format!(
            "{} USDT <span class=\"muted\">/ {:.4}%</span>",
            number(book.spread(), 2),
            book.spread() / book.mid() * 100.0
        ),
    );
    text("bid-share", &format!("{:.1}%", book.bid_share()));
    text("ask-share", &format!("{:.1}%", 100.0 - book.bid_share()));
    attr(
        "bid-bar",
        "style",
        &format!("width:{:.2}%", book.bid_share()),
    );
    attr("orderbook", "data-update-id", &book.update_id.to_string());
    attr("orderbook", "data-event-ms", &book.event_ms.to_string());
}

fn publish_latest(a: &mut App, time: f64) {
    if a.paused {
        return;
    }
    if let Some(book) = a.latest.as_ref() {
        if a.displayed_id != Some(book.update_id) {
            render(book);
            a.displayed_id = Some(book.update_id);
            a.published = time;
        }
    }
}
fn clear_book() {
    html("mid-price", "—<span class=\"price-decimal\">.——</span>");
    html(
        "asks",
        "<div class=\"empty-book\">Waiting for market data</div>",
    );
    html(
        "bids",
        "<div class=\"empty-book\">Connecting to Binance</div>",
    );
    text("spread", "— USDT / —%");
    text("bid-share", "—");
    text("ask-share", "—");
    attr("bid-bar", "style", "width:50%");
    let _ = el("orderbook").remove_attribute("data-update-id");
    let _ = el("orderbook").remove_attribute("data-event-ms");
}
fn connect(app: &Rc<RefCell<App>>) {
    let mut a = app.borrow_mut();
    a.socket = None;
    a.latest = None;
    a.received = 0.0;
    a.failed = false;
    a.connected_at = now();
    let Ok(ws) = WebSocket::new(STREAM) else {
        a.failed = true;
        return;
    };
    let weak = Rc::downgrade(app);
    let message = Closure::wrap(Box::new(move |event: MessageEvent| {
        let Some(app) = weak.upgrade() else {
            return;
        };
        let Some(data) = event.data().as_string() else {
            return;
        };
        let Ok(book) = Snapshot::parse(&data) else {
            return;
        };
        let mut a = app.borrow_mut();
        // Ignore delayed or out-of-order packets. Small future clock skew is tolerated.
        if now() - book.event_ms > STALE_MS || book.event_ms - now() > 60_000.0 {
            return;
        }
        if a.latest
            .as_ref()
            .is_some_and(|last| book.update_id <= last.update_id)
        {
            return;
        }
        a.latest = Some(book);
        a.received = now();
        a.attempts = 0;
        // Live rendering follows each valid WebSocket message, not the UI timer.
        let received = a.received;
        publish_latest(&mut a, received);
    }) as Box<dyn FnMut(MessageEvent)>);
    let weak = Rc::downgrade(app);
    let close = Closure::wrap(Box::new(move |_: Event| {
        if let Some(a) = weak.upgrade() {
            a.borrow_mut().failed = true;
        }
    }) as Box<dyn FnMut(Event)>);
    let weak = Rc::downgrade(app);
    let error = Closure::wrap(Box::new(move |_: Event| {
        if let Some(a) = weak.upgrade() {
            a.borrow_mut().failed = true;
        }
    }) as Box<dyn FnMut(Event)>);
    ws.set_onmessage(Some(message.as_ref().unchecked_ref()));
    ws.set_onclose(Some(close.as_ref().unchecked_ref()));
    ws.set_onerror(Some(error.as_ref().unchecked_ref()));
    a.socket = Some(Socket {
        ws,
        _message: message,
        _close: close,
        _error: error,
    });
}
fn tick(app: &Rc<RefCell<App>>) {
    let time = now();
    let utc = js_sys::Date::new(&JsValue::from_f64(time + 8.0 * 3_600_000.0));
    text(
        "hk-time",
        &format!(
            "{:02}:{:02} HKT",
            utc.get_utc_hours(),
            utc.get_utc_minutes()
        ),
    );
    let mut a = app.borrow_mut();
    if !a.demo {
        let timed_out = a.socket.is_some()
            && if a.received == 0.0 {
                time - a.connected_at > 10_000.0
            } else {
                time - a.received > STALE_MS
            };
        if a.failed || timed_out {
            a.socket = None;
            a.latest = None;
            a.failed = false;
            a.attempts = (a.attempts + 1).min(5);
            a.retry_at = time + (2u32.pow(a.attempts) as f64).min(30.0) * 1000.0;
        }
        if a.socket.is_none() && time >= a.retry_at {
            drop(a);
            connect(app);
            return;
        }
    }
    if a.demo && !a.paused && (a.published == 0.0 || time - a.published >= DEMO_REFRESH_MS) {
        a.demo_step += 1;
        a.latest = Some(Snapshot::demo(a.demo_step, time));
        a.received = time;
    }
    let fresh = a.latest.is_some() && (a.demo || time - a.received < STALE_MS);
    if fresh {
        // Also handles demo updates and the latest buffered snapshot on Resume.
        // The update ID prevents duplicate DOM work between stream messages.
        publish_latest(&mut a, time);
    }
    let retry = !a.demo && a.socket.is_none();
    if retry {
        let _ = el("retry-button").remove_attribute("hidden");
    } else {
        let _ = el("retry-button").set_attribute("hidden", "");
    }
    if a.paused {
        state(if a.demo { "Demo · paused" } else { "Paused" }, "paused");
        text(
            "feed-label",
            if a.demo {
                "Simulated snapshot frozen"
            } else if fresh {
                "Display frozen · feed receiving"
            } else {
                "Display frozen · feed unavailable"
            },
        );
        text("countdown", "Updates paused");
        text(
            "market-note",
            "Snapshot updates are paused. Press play to resume.",
        );
    } else if a.demo {
        state("Demo data", "demo");
        text("feed-label", "Simulated data · not live");
        text(
            "market-note",
            "Demo mode uses simulated prices and sizes. Select Live for Binance data.",
        );
    } else if fresh {
        state("Live", "live");
        text("feed-label", "Binance WebSocket connected");
        text(
            "market-note",
            "Live Binance stream · 100 ms updates, displayed as they arrive.",
        );
    } else if retry {
        state("Offline", "offline");
        text("feed-label", "Feed unavailable · last view may be stale");
        text(
            "market-note",
            "Binance is unreachable. Retrying automatically; try Demo to explore the panel.",
        );
        text(
            "countdown",
            &format!(
                "Retry in {}s",
                ((a.retry_at - time) / 1000.0).ceil().max(0.0)
            ),
        );
    } else {
        state("Connecting", "");
        text("feed-label", "Waiting for fresh Binance data");
        text("countdown", "100 ms stream");
        text(
            "market-note",
            "Connecting to Binance. Demo mode is available if the network cannot reach the feed.",
        );
    }
    if !a.paused && fresh {
        text(
            "countdown",
            if a.demo {
                "1s demo updates"
            } else {
                "100 ms stream"
            },
        );
    }
}
fn click(id: &str, callback: impl FnMut(Event) + 'static) {
    let handler = Closure::wrap(Box::new(callback) as Box<dyn FnMut(Event)>);
    el(id)
        .add_event_listener_with_callback("click", handler.as_ref().unchecked_ref())
        .unwrap();
    handler.forget(); // These three controls live for the entire document lifetime.
}
#[wasm_bindgen(start)]
pub fn start() {
    let app = Rc::new(RefCell::new(App::default()));
    for id in ["live-button", "demo-button", "pause-button"] {
        let _ = el(id).remove_attribute("disabled");
    }
    for (id, demo) in [("live-button", false), ("demo-button", true)] {
        let app = app.clone();
        click(id, move |_| {
            {
                let mut a = app.borrow_mut();
                if a.demo == demo {
                    return;
                }
                a.socket = None;
                *a = App {
                    demo,
                    ..App::default()
                };
            }
            clear_book();
            attr("live-button", "class", if demo { "" } else { "selected" });
            attr("demo-button", "class", if demo { "selected" } else { "" });
            attr(
                "live-button",
                "aria-pressed",
                if demo { "false" } else { "true" },
            );
            attr(
                "demo-button",
                "aria-pressed",
                if demo { "true" } else { "false" },
            );
            text("pause-button", "Ⅱ");
            attr("pause-button", "aria-label", "Pause snapshot updates");
            attr("pause-button", "title", "Pause snapshot updates");
            tick(&app);
        });
    }
    let a = app.clone();
    click("pause-button", move |_| {
        {
            let mut a = a.borrow_mut();
            a.paused = !a.paused;
            text("pause-button", if a.paused { "▶" } else { "Ⅱ" });
            let label = if a.paused {
                "Resume snapshot updates"
            } else {
                "Pause snapshot updates"
            };
            attr("pause-button", "aria-label", label);
            attr("pause-button", "title", label);
            if !a.paused {
                a.published = 0.0;
            }
        }
        tick(&a);
    });
    let a = app.clone();
    click("retry-button", move |_| {
        {
            let mut a = a.borrow_mut();
            a.retry_at = 0.0;
            a.failed = false;
            a.socket = None;
        }
        tick(&a);
    });
    tick(&app);
    let timer = Closure::wrap(Box::new(move || tick(&app)) as Box<dyn FnMut()>);
    web_sys::window()
        .unwrap()
        .set_interval_with_callback_and_timeout_and_arguments_0(timer.as_ref().unchecked_ref(), 250)
        .unwrap();
    timer.forget();
}
