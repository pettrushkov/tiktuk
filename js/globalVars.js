const feedSpinner = document.getElementById('loader'),
  app = document.getElementById('app'),
  APIkey = "c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66";

function hideFeedSpinner() {
  if (!feedSpinner.classList.contains('hide')) {
    feedSpinner.classList.add('hide');
  }
}

export { feedSpinner, app, hideFeedSpinner, APIkey };