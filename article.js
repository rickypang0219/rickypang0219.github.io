// Markdown is already rendered by Rust at build time. Only TeX typesetting needs JS.
for (const element of document.querySelectorAll('.math')) {
  try {
    katex.render(element.textContent, element, {
      displayMode: element.classList.contains('math-display'),
      throwOnError: true,
      trust: false,
      strict: 'ignore',
      output: 'htmlAndMathml',
    });
    element.dataset.rendered = 'true';
  } catch (error) {
    element.classList.add('math-error');
    element.title = 'This equation could not be typeset; its original TeX is shown.';
    console.error('Equation rendering failed:', error);
  }
}
