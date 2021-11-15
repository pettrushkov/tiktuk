const feedSpinner = document.getElementById('loader'),
  app = document.getElementById('app');

function hideFeedSpinner() {
  if (!feedSpinner.classList.contains('hide')) {
    feedSpinner.classList.add('hide');
  }
}

export { feedSpinner, app, hideFeedSpinner };