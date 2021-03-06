import { app, hideFeedSpinner, APIkey } from './globalVars.js';

getTrandingFeed();

function outputFeed(data) {

  // hide spinner when get response
  hideFeedSpinner();
  if (data.length > 0) {

    // get first 30 item of array
    for (let i = 0; data.length <= 30 && i <= 30; i++) {
      let element = data[i];

      // create video block
      let post = document.createElement('div');
      post.classList.add('post', 'uk-padding-small', 'uk-margin', 'uk-box-shadow-medium');

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
              <a href="https://www.tiktok.com/@${element.authorMeta.name}" class="avatar">
                <img
                  src="${element.authorMeta.avatar}"
                  alt="${element.authorMeta.name}">
              </a>
              <a href="https://www.tiktok.com/@${element.authorMeta.name}" class="author__name">${element.authorMeta.name}</a>
            </div>`;

          // add hastags
          if (element.hashtags.length > 0) {
            let hashtags = document.createElement('ul');
            hashtags.classList.add('hashtags', 'uk-flex', 'uk-flex-wrap');

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
  else {
    alert(`Sorry, but we don't have posts for you :(`);
  }
}

function getTrandingFeed() {
  // get feed data

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://tiktok33.p.rapidapi.com/trending/feed");
  xhr.setRequestHeader("x-rapidapi-host", "tiktok33.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", APIkey);

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