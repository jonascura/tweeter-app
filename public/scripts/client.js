/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

console.log('Loaded Page');

////////////////////////////////////////////////////////////////////////////////////////////
// Handle submit button
////////////////////////////////////////////////////////////////////////////////////////////
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

  console.log("serial", $text.serialize());
  $.post($text.serialize())

  // $.ajax({
  //   url: '',
  //   type: 'GET'
  // }).then(function(data) {
  //   console.log("Ajax request", data);
  // });

  $ul.append(li);
  $text.val(null);
  
});

////////////////////////////////////////////////////////////////////////////////////////////
// Handle GET tweets
////////////////////////////////////////////////////////////////////////////////////////////
const loadTweets = () => {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function (data) {
        console.log('GET: ', data);
        renderTweets(data);
      });
};

////////////////////////////////////////////////////////////////////////////////////////////
// Handle display tweets
////////////////////////////////////////////////////////////////////////////////////////////
const renderTweets = function(tweets) {
  // console.log("tweets is:", tweets)
  let $div = $(".tweets-container");
  // loops through tweets
  for (let obj of tweets) { // grabs articles in data
    // calls createTweetElement for each tweet
    // console.log("obj:", obj)/
    let tweetVal = createTweetElement(obj);
    // console.log("tweetVal:",tweetVal)
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
  // console.log("$tweet:", $tweet);
  return $tweet;
};

loadTweets();
