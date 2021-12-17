$(document).ready(function() {
  const tweetBox = $('#tweet-text');
  //keyup event detects the correct length of the input and updates the counter
  tweetBox.on('keyup', function() {
    //hides the errors when modifying the text
    $('section.new-tweet .alert-error').hide();
    const count = 140 - this.value.length;
    const countEl = $('.new-tweet .new-tweet-button .counter');
    countEl.text(count);
    //red class makes the text red
    if (count < 0) {
      countEl.addClass('red');
    } else {
      countEl.removeClass('red');
    }
  });
});