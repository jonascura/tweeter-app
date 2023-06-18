/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

console.log('Loaded Page');

const ul = document.querySelector('#tweets');
console.log("ul:", ul);

const text = document.querySelector('#tweet-text');
console.log("text:", text);

const form = document.querySelector('form');
console.log("form:", form);

form.addEventListener('submit', (event) => {
  event.preventDefault(); //don't submit

  // read input from field
  const tweet = text.value;
  console.log(tweet);

  // create new li element
  const li = document.createElement('li');

  // add text to li element
  li.textContent = tweet;

  // glue li to existing ul element
  ul.appendChild(li);

  // clear out old value
  text.value = null;
});