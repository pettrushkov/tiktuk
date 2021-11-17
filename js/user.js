import { feedSpinner, app, hideFeedSpinner, APIkey } from './globalVars.js';

getUserInfo();

function outPutUserInfo(data) {

  // hide spinner when get response with user info
  hideFeedSpinner();

  // create user block
  const userInfo = document.getElementById('user-info');

  let user = document.createElement('div');
  user.classList.add('user', 'uk-padding-small', 'uk-margin', 'uk-box-shadow-medium');

  user.innerHTML = `<div class="user__info uk-flex uk-flex-middle uk-margin-bottom">
      <div class="avatar avatar--thumb"><img src="${data.user.avatarThumb}" alt="${data.user.nickname}"></div>
      <div class="user__info-text">
      <p class="uk-text-center uk-text-bold uk-text-large">${data.user.uniqueId}<p>
        <div class="uk-flex uk-flex-between uk-text-center">
          <div>
            <p><span uk-icon="users"></span></p>
            <p class="uk-margin-remove-bottom">${data.stats.followerCount} follower<p>
            <p>${data.stats.followingCount} following<p>
          </div>
          <div>
            <p><span uk-icon="video-camera"></span></p>
            <p>${data.stats.videoCount} videos<p>
          </div>
          <div>
            <p><span uk-icon="heart"></span></p>
            <p>${data.stats.heartCount} likes<p>
          </div>
        </div>
        <p>${data.user.signature}<p>
      </div>
    </div>`;

    userInfo.appendChild(user);
}

function getUserInfo() {
  // get user data

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://tiktok33.p.rapidapi.com/user/info/dave.xp");
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
      outPutUserInfo(result);
    }
  }
}