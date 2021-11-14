import { ApiAccess } from './api.js';

getTrandingFeed();
// getUserFeed();
// getUserInfo();

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

    data.forEach(element => {
      let post = document.createElement('div');
      post.classList.add('post')
      post.classList.add('uk-padding-small')
      post.classList.add('uk-margin')
      post.classList.add('uk-box-shadow-medium')

      // 1. Создаём новый XMLHttpRequest-объект
      let xhr = new XMLHttpRequest();
      // 2. Настраиваем его: GET-запрос по URL /article/.../load
      xhr.open('GET', 'https://www.tiktok.com/oembed?url=' + element.webVideoUrl);
      // 3. Отсылаем запрос
      xhr.send();
      // 4. Этот код сработает после того, как мы получим ответ сервера
      xhr.onload = function () {
        if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
          alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else { // если всё прошло гладко, выводим результат

          let result = JSON.parse(xhr.response);
          post.innerHTML += `<div class="post__video uk-margin-bottom">${result.html}</div>`;

          post.innerHTML += `<div class="author uk-flex uk-flex-middle uk-margin-bottom">
            <a href="https://www.tiktok.com/@${element.authorMeta.name}" class="author__avatar">
              <img
                src="${element.authorMeta.avatar}"
                alt="${element.authorMeta.name}">
            </a>
            <a href="https://www.tiktok.com/@${element.authorMeta.name}" class="author__name">${element.authorMeta.name}</a>
          </div>`;

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

          post.innerHTML += `<div class="post__meta uk-flex uk-flex-between">
          <p class="uk-margin-remove-top"><span uk-icon="comments"></span> ${element.commentCount}</p>
          <p class="uk-margin-remove-top"><span uk-icon="heart"></span> ${element.diggCount}</p>
        </div>
          </div>`;

          app.appendChild(post);

        }
      };
    });
  }
}

function getTrandingFeed() {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log('Page TrandingFeed:')
      console.log(JSON.parse(this.responseText));
      outputFeed(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", ApiAccess.url);
  xhr.setRequestHeader("x-rapidapi-host", ApiAccess.host);
  xhr.setRequestHeader("x-rapidapi-key", ApiAccess.token);

  xhr.send(data);
}

function getUserFeed() {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log('Page UserFeed:')
      console.log(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", ApiAccess.url);
  xhr.setRequestHeader("x-rapidapi-host", ApiAccess.host);
  xhr.setRequestHeader("x-rapidapi-key", ApiAccess.token);

  xhr.send(data);
}

function getUserInfo() {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log('Page UserInfo:')
      console.log(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", ApiAccess.url);
  xhr.setRequestHeader("x-rapidapi-host", ApiAccess.host);
  xhr.setRequestHeader("x-rapidapi-key", ApiAccess.token);

  xhr.send(data);
}