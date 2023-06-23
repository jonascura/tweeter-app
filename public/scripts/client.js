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
const $div = $(".tweets-container");

// event listener
$form.on('submit', (event) => {
  
  if ($text.val().length > 0 && $text.val().length <= 140) {
    event.preventDefault(); //don't submit
    const tweet = $text.val(); // with no arg will retrieve value of input. With arg, sets value of output
    console.log(tweet)
    console.log("serial", $text.serialize());

    // post new-tweet to /tweets
    $.post('http://localhost:8080/tweets', $text.serialize(), function(data) {
      console.log("POST:", data)
    })
    .then(() => {
      // render new tweat
      $.ajax('http://localhost:8080/tweets', { method: 'GET' })
        .then(function (data) {
          console.log("new get data", data)
          console.log('GET new: ', data[data.length - 1]);
          $div.prepend(createTweetElement(data[data.length - 1])); // appends to the top of the list
        });
    });


    // reset text-area and counter
    $text.val(null);
    $('#counter').val(140);

    // loadTweets();
  } else {
    event.preventDefault(); //don't submit
    alert('Invalid Tweet')
  }

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
  // loops through tweets
  for (let obj of tweets) { // grabs articles in data from bottom to top
    // calls createTweetElement for each tweet
    // console.log("obj:", obj)
    let tweetVal = createTweetElement(obj);
    // console.log("tweetVal:",tweetVal)
    // takes return value and appends it to the tweets container
    $div.prepend(tweetVal); // appends to the top of the list
  }  
}

const createTweetElement = function(tweet) {
  // console.log("tweet:", tweet)
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
            <a id="tweet-age" href="#">${timeago.format(tweet.created_at)}</a>
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
