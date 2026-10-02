#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
cargo build --locked --release --target wasm32-unknown-unknown
mkdir -p dist/pkg
wasm-bindgen --target web --out-dir dist/pkg --no-typescript target/wasm32-unknown-unknown/release/ricky_homepage.wasm
cp index.html styles.css bootstrap.js favicon.svg dist/
touch dist/.nojekyll
echo 'Built dist/. Preview with: python3 -m http.server 8080 --directory dist'
