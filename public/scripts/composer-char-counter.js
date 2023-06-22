$(document).ready(function() {
  // --- our code goes here ---

  console.log('jQuery', jQuery)

  // get elements from html
  let $textArea = $('#tweet-text');
  console.log('$textArea:', $textArea)
  let $charCounter = $('#counter');
  console.log('charCounter:', $charCounter)

  const maxChar = 140;

  // add event listener that runs on every keypress
  $textArea.on('input', () => {
    let input = $textArea.val().length;
    let counter = maxChar - input;
    // change value of charCounter
    $charCounter.val(counter);

    // logic for color change
    if (counter < 0) {
      // add class if counter < 0
      $charCounter.addClass("text-danger");
    } else {
      // remove class so counter > 0 goes back to normal color
      $charCounter.removeClass("text-danger");
    }
  });

});


