/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  return $(`<article class="tweet">
    <header>
      <div class="tweet-user">
        <div class="user">
          <img src="${tweetObj.user.avatars}" height="60" width="60">
          <span>${tweetObj.user.name}</span>
        </div>
        <span class="at">${tweetObj.user.handle}</span>
      </div>
      <div class="tweet-text">${escape(tweetObj.content.text)}</div>
    </header>
    <footer>
      <span>${timeago.format(tweetObj.created_at)}</span>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
};

const renderTweets = function(tweets) {
  $('section.tweet-container').empty();
  // loops through tweets, calls createTweetElement for each tweet
  // takes return value and prepends it to the beginning of tweets container
  for (let item of tweets) {
    const $tweet = createTweetElement(item);
    $('section.tweet-container').prepend($tweet);
  }
};

$(document).ready(function() {
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(responseData) {
        console.log('GET Success: ', responseData);
        renderTweets(responseData);
      });
  };
  loadTweets();

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const formEl = this;
    const formData = $(formEl).serializeArray();
    console.log(formData);
    let count = (formData[0].value).length;
    if (count > 140) {
      $('section.new-tweet .alert-error.alert-tweet-length').slideDown();
      return;
    }
    if (count < 1) {
      $('section.new-tweet .alert-error.alert-empty').slideDown();
      return;
    }

    $.ajax('/tweets', { method: 'POST', data: formData })
      .then(function() {
        formEl.reset();
        loadTweets();
      });
  });
});
