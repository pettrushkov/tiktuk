getTrandingFeed();

const feedSpinner = document.getElementById('feed-loader'),
  app = document.getElementById('app');

function hideFeedSpinner() {
  if (!feedSpinner.classList.contains('hide')) {
    feedSpinner.classList.add('hide');
  }
}

function outputFeed(data) {

  if (data.length > 0) {
    hideFeedSpinner();

    for (let i = 0; data.length <= 30 && i <= 30; i++) {
      let element = data[i];

      // create video block
      let post = document.createElement('div');
      post.classList.add(...['post', 'uk-padding-small', 'uk-margin', 'uk-box-shadow-medium'])

      // create request object
      let xhr = new XMLHttpRequest();
      // set method end url
      xhr.open('GET', 'https://www.tiktok.com/oembed?url=' + element.webVideoUrl);
      // send request
      xhr.send();
      // this function work after we get request
      xhr.onload = function () {
        if (xhr.status !== 200) { // if status not 200 - error
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {

          // parse result to JSON
          let result = JSON.parse(xhr.response);
          // add html-code to video block
          post.innerHTML += `<div class="post__video uk-margin-bottom">${result.html}</div>`;

          // add authors meta
          post.innerHTML += `<div class="author uk-flex uk-flex-middle uk-margin-bottom">
              <a href="https://www.tiktok.com/@${element.authorMeta.name}" class="author__avatar">
                <img
                  src="${element.authorMeta.avatar}"
                  alt="${element.authorMeta.name}">
              </a>
              <a href="https://www.tiktok.com/@${element.authorMeta.name}" class="author__name">${element.authorMeta.name}</a>
            </div>`;

          // add hastags
          if (element.hashtags.length > 0) {
            let hashtags = document.createElement('ul');
            hashtags.classList.add('hashtags')
            hashtags.classList.add('uk-flex')
            hashtags.classList.add('uk-flex-wrap')

            element.hashtags.forEach(tag => {
              hashtags.innerHTML += `<li>${tag.name}</li>`;
            });

            post.appendChild(hashtags);
          }

          // add post meta
          post.innerHTML += `<div class="post__meta uk-flex uk-flex-between">
            <p class="uk-margin-remove-top"><span uk-icon="comments"></span> ${element.commentCount}</p>
            <p class="uk-margin-remove-top"><span uk-icon="heart"></span> ${element.diggCount}</p>
              </div>
            </div>`;

          // add post block to end of #app
          app.appendChild(post);
        }
      };
    }
  }
}

function getTrandingFeed() {
  // get feed data

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open("GET", "https://tiktok33.p.rapidapi.com/trending/feed");
  xhr.setRequestHeader("x-rapidapi-host", "tiktok33.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66");

  xhr.send();

  xhr.onload = function () {
    if (xhr.status !== 200) { // if status not 200 - error
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {

      // get result in JSON 
      let result = JSON.parse(xhr.response);

      // call function and give parsed in JSON respond to it
      outputFeed(result);
    }
  }
}