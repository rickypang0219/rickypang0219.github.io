# Ricky Pang · personal homepage

A charcoal personal portfolio with a Rust/WebAssembly BTCUSDT perpetual order book. Profile content is adapted from the supplied September 2026 CV; project URLs were extracted from its PDF links.

## Run

Install Rust 1.88+ with [rustup](https://rustup.rs), then:

```sh
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli --version 0.2.100 --locked
cargo test --locked
bash scripts/build.sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open http://localhost:8080. Serve `dist/` over HTTP; opening `index.html` as a file will not load WebAssembly modules. `wasm-bindgen-cli` must match the version pinned in `Cargo.toml`.

This workspace already includes a compiled `dist/` for immediate preview. The initial local build used project-local tools in the ignored `.tools/` directory because the system Rust installation does not include a WASM target. To rebuild using those existing tools on this machine:

```sh
PATH="$PWD/.tools/wasm-bindgen-0.2.100-aarch64-apple-darwin:$PATH" \
CARGO_HOME="$PWD/.tools/cargo-home" \
CARGO_TARGET_WASM32_UNKNOWN_UNKNOWN_RUSTFLAGS="--sysroot=$PWD/.tools/sysroot" \
bash scripts/build.sh
```

## Behavior

- Live mode is the default. No API key, account, trading permissions, or server is needed.
- Uses `wss://fstream.binance.com/public/ws/btcusdt@depth5@500ms`, the USDⓈ-M futures **partial depth** stream. Each event replaces all five bids and asks. This is not a diff-depth local book and does not require a REST bootstrap.
- Rust validates the symbol, market, event time, update ID, five positive unique prices per side, and uncrossed spread. It sorts bids descending and asks ascending internally.
- The first valid snapshot displays immediately. Subsequent snapshots publish at five-second intervals while incoming events keep the buffer current. Browser timers can be throttled in background tabs.
- Red asks appear above the spread; green bids appear below it. Ask prices display descending so the best ask sits beside the spread. Totals accumulate from the best price outward. Background bars use cumulative quantities on a shared scale.
- Mid price is the midpoint of the best bid and ask, not the last trade or mark price. The bid/ask volume split uses only the displayed five levels.
- Connection timeouts, stale streams, disconnects, and Binance's connection rotation trigger automatic reconnection with a bounded exponential backoff. The panel labels retained prices as potentially stale rather than live.
- Pause freezes the display. The socket continues receiving; Resume displays a fresh snapshot. Demo explicitly selects synthetic data and disconnects the real socket. Switching back clears demo prices before reconnecting.
- Binance may be unavailable on some networks or in some regions. The page exposes its connection state, Retry, and an explicitly labeled Demo mode. It never silently substitutes demo values for live prices.

## Why browser WebSockets rather than Tokio/tungstenite?

[GitHub Pages is static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). It cannot run a Tokio process. The interactive code is written in Rust, compiled to WASM, and accesses the browser WebSocket API through `web-sys`. `bootstrap.js` only loads the generated module and reports initialization failures. HTML/CSS provide a fast, accessible profile even before WASM loads.

A Tokio + tokio-tungstenite relay can be added later if server-side aggregation is needed, but it would need separate hosting.

## Publish to GitHub Pages

Repository: [rickypang0219/rickypang0219.github.io](https://github.com/rickypang0219/rickypang0219.github.io).

This version lives on `prototype/rust-homepage`. The existing `main` and `gh-pages` branches are preserved; pushing the prototype branch does not deploy it.

1. Review the prototype branch against `main` before replacing the existing homepage.
2. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** when ready to switch to this version.
3. Merge `prototype/rust-homepage` into `main` to trigger the included **Build and deploy GitHub Pages** workflow.

The workflow tests, compiles Rust to WASM, packages `dist/`, and deploys it. All asset paths are relative, supporting both `username.github.io/` and `username.github.io/repository/`. Do not commit `.tools/`, `target/`, or `tmp/`.

## Edit

- `index.html`: biography, career, education, project links, semantic page structure.
- `styles.css`: responsive layout, charcoal palette, typography, and green/red depth styling.
- `src/lib.rs`: pure snapshot validation/calculations and Rust tests.
- `src/browser.rs`: WebSocket lifecycle, five-second rendering, controls, and Hong Kong clock.
- `.github/workflows/pages.yml`: build/test/deploy automation.

Fonts are requested from Google Fonts with local sans-serif and monospace fallbacks. No analytics are included. The CV PDF and phone number are not bundled into the public site.

## References

- [Binance partial depth stream](https://developers.binance.com/en/docs/catalog/core-trading-derivatives-trading-usd-s-m-futures/api/ws-streams/public#partial-book-depth-streams)
- [Binance WebSocket connection rules](https://developers.binance.com/en/docs/products/derivatives-trading-usds-futures/websocket-market-streams/Connect)
- [Rust web-sys WebSocket example](https://wasm-bindgen.github.io/wasm-bindgen/examples/websockets.html)
