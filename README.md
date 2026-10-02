# Ricky Pang · personal homepage

A charcoal personal portfolio with a Rust/WebAssembly BTCUSDT perpetual order book and a Blog section of static Markdown articles. Profile content is adapted from the supplied September 2026 CV; project URLs were extracted from its PDF links.

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
- Uses `wss://fstream.binance.com/public/ws/btcusdt@depth5@100ms`, the USDⓈ-M futures **partial depth** stream. Each event replaces all five bids and asks. This is not a diff-depth local book and does not require a REST bootstrap.
- Rust validates the symbol, market, event time, update ID, five positive unique prices per side, and uncrossed spread. It sorts bids descending and asks ascending internally.
- Every valid incoming snapshot displays immediately, using Binance’s 100 ms partial-depth stream. There is no extra one-second or five-second display timer. Actual visible cadence depends on exchange activity, network latency, and browser scheduling; GitHub Pages does not throttle this browser-to-Binance connection. The 250 ms housekeeping timer only manages status, reconnection, the clock, and resuming a buffered snapshot. Demo data changes once per second.
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

The Rust homepage is deployed from `main` using GitHub Actions. Feature branches can be reviewed locally before merging.

1. Build and preview the changes locally.
2. Push the reviewed changes on a feature branch and merge them into `main`.
3. The included **Build and deploy GitHub Pages** workflow builds the article pages and homepage, then deploys the result.

The workflow tests, compiles Rust to WASM, packages `dist/`, and deploys it. All asset paths are relative, supporting both `username.github.io/` and `username.github.io/repository/`. Do not commit `.tools/`, `target/`, or `tmp/`.

## Blog: Markdown to static articles

The homepage's **Blog** section links to the example at `/articles/regularization-bias-variance/`. Rust generates a real `index.html` in that directory at build time, so direct links, refreshes, and section anchors work on GitHub Pages without a client-side router or server. Article text, headings, links, and figures work without JavaScript. A small script typesets the equations using bundled KaTeX 0.16.22 assets; there are no runtime CDN requests for math.

The example restores `Regularization-BiasVariance.md` and its seven diagrams from commit `1ac37e88a314f1c5a846758716d31be76c90c77d`. The Markdown source is preserved byte for byte and is downloadable from the article. This is a rendering migration, not an editorial review of the original mathematics or wording.

To add an article:

1. Place its `.md` source in `public/markdowns/` and any figures in `public/images/`.
2. Add an entry in `articles.json` with a unique lowercase `slug`, `title`, ISO `date`, `category`, Markdown `source` filename, and `description`.
3. Use standard Markdown images, `$...$` for inline math, and standalone `$$...$$` blocks for display equations. Root-relative `/images/...` paths are rewritten relative to the generated article so project-site prefixes also work.
4. Set `legacy_html: true` only for old articles using the supported `<p>`, `<img>`, and colored `<span>` wrappers. The adapter also handles the original article's inline `$$...$$` notation and indented figure captions. Arbitrary raw HTML is escaped.
5. Add a card under `#blog` in `index.html`, linking to `./articles/<slug>/`, then run the normal build.

The Markdown parser supports headings, lists, links, images, fenced code, tables, strikethrough, and footnotes. The article template adds an automatically generated table of contents, reading-time estimate, source download, and responsive equation scrolling. No order-book WebSocket opens on article pages.

## Edit

- `index.html`: biography, career, education, project links, semantic page structure.
- `styles.css`: responsive layout, charcoal palette, typography, and green/red depth styling.
- `src/lib.rs`: pure snapshot validation/calculations and Rust tests.
- `src/browser.rs`: WebSocket lifecycle, event-driven rendering, controls, and Hong Kong clock.
- `articles.json`: article metadata and source filenames.
- `src/articles.rs`: Markdown parser, legacy-format adapter, equation markup, and renderer tests.
- `src/bin/build_articles.rs`: static article generator, invoked by the normal build.
- `templates/article.html`, `article.css`, `article.js`: reading layout and equation typesetting.
- `public/`: original Markdown, article diagrams, and vendored KaTeX assets with their license.
- `.github/workflows/pages.yml`: build/test/deploy automation.

Fonts are requested from Google Fonts with local sans-serif and monospace fallbacks. No analytics are included. The CV PDF and phone number are not bundled into the public site.

## References

- [Binance partial depth stream](https://developers.binance.com/en/docs/catalog/core-trading-derivatives-trading-usd-s-m-futures/api/ws-streams/public#partial-book-depth-streams)
- [Binance WebSocket connection rules](https://developers.binance.com/en/docs/products/derivatives-trading-usds-futures/websocket-market-streams/Connect)
- [Rust web-sys WebSocket example](https://wasm-bindgen.github.io/wasm-bindgen/examples/websockets.html)
