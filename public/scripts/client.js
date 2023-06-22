/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

console.log('Loaded Page');

// grab elements
const $ul = $('#tweets');
const $text = $('#tweet-text');
const $form = $('form');

// event listener
$form.on('submit', (event) => {

  event.preventDefault(); //don't submit
  const tweet = $text.val(); // with no arg will retrieve value of input
                             // with arg, sets value of output
  console.log(tweet)

  const li = `<li>${tweet}</li>`;

  $ul.append(li);
  $text.val(null);
  
});

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  console.log(tweets)
  let $div = $(".tweets-container");
  // loops through tweets
  for (let obj of tweets) { // grabs articles in data
    // calls createTweetElement for each tweet
    console.log("obj:", obj)
    let tweetVal = createTweetElement(obj);
    console.log("tweetVal:",tweetVal)
    // takes return value and appends it to the tweets container
    $div.append(tweetVal);
  }  
}

const createTweetElement = function(tweet) {
  // take elements from data and create tweet article
  let $tweet = $(
    `<article class="tweet">
      <div class="top-layer">
        <div class="avatar">
          <img id="my-avatar" src=${tweet.user.avatars}>
          <a id="username">${tweet.user.name}</a>
        </div>
        <a id="tweeter-handle" href="#">${tweet.user.handle}</a>
      </div>
      <div class="tweet-content">${tweet.content.text}</div>
        <div class="bottom">
          <div class="info">
            <a id="tweet-age" href="#">${`10 days ago`}</a>
            <div class="icon-links">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
      </div>
    </article>`
    );
  console.log("$tweet:", $tweet);
  return $tweet;
};

renderTweets(data);
