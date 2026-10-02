// Only the generated WASM loader lives in JavaScript. App logic lives in src/.
import('./pkg/ricky_homepage.js').then(({ default: init }) => init()).catch((error) => {
  console.error('WebAssembly initialization failed:', error);
  document.getElementById('connection').textContent = 'Unavailable';
  document.getElementById('feed-label').textContent = 'Could not load WebAssembly';
  document.getElementById('market-note').textContent = 'The market panel could not start. Reload the page to try again.';
});
