$(document).ready(function() {
  const tweetBox = $('#tweet-text');
  tweetBox.on('keyup', function() {
    const count = 140 - this.value.length;
    const countEl = $('.new-tweet .new-tweet-button .counter');
    countEl.text(count);
    if (count < 0) {
      countEl.addClass('red');
    } else {
      countEl.removeClass('red');
    }
  });
});