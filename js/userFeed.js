import { feedSpinner, app, hideFeedSpinner, APIkey } from './globalVars.js';

// ATTENTION!!! 
// Here should be data from Get User Feed, but I can't get it :( Error screenshot: https://take.ms/LcNP9
// So, I decided to use same data as index.html 

getUserFeed();

function outPutUserFeed(data) {

  // hide spinner when get response
  hideFeedSpinner();
  if (data.length > 0) {

    const userVideos = document.getElementById('user-videos');

    // get first 30 item of array
    for (let i = 0; data.length <= 30 && i <= 30; i++) {
      let element = data[i],
      musicCover = element.musicMeta.coverMedium,
      playCount = element.playCount,
      video = document.createElement('div');
      video.classList.add('user__video');
      video.innerHTML = `<div class="user__video-inner">
          <div class="user__video-thumbnail">
            <img src="${musicCover}" />
          </div>
          <p class="user__video-counter"><span>Video views: <br/> ${playCount}</span></p>
        </div>`;

        userVideos.appendChild(video);
    }
  } else {
    alert(`Sorry, but we don't have posts of this user :(`);
  }
}

function getUserFeed() {
  // get user data

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
      outPutUserFeed(result);
    }
  }
}