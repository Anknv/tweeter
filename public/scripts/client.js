/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <div class="tweet-text">${tweetObj.content.text}</div>
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
  },
  {
    "user": {
      "name": "Leo Tolstoy",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SadRussian"
    },
    "content": {
      "text": "The two most powerful warriors are patience and time."
    },
    "created_at": -3491116232227
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let item of tweets) {
    const $tweet = createTweetElement(item);
    $('section.tweet-container').append($tweet);
  }
};

$(document).ready(function() {
  renderTweets(data);

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: formData })
      .then(function(responseData) {
        console.log('Success: ', responseData);
      });
  });
});
