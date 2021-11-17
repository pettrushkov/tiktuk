import { feedSpinner, app, hideFeedSpinner } from './globalVars.js';

getUserFeed();

function outPutUserFeed(data) {

  console.log(data)

}

function getUserFeed() {
  // get user data

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://tiktok33.p.rapidapi.com/user/feed/dave.xp");
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
      outPutUserFeed(result);
    }
  }
}