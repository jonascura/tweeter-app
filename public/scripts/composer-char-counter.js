$(document).ready(function() {
  // --- our code goes here ---

  $("#btn").on('click', function() {
    console.log(this); //The this keyword is a reference to the button
  });
  
  $("#btn").on('click', () => {
    console.log(this); //The this keyword here refers to something else!
  });

  // below code referenced from: https://stackabuse.com/character-counter-for-text-areas-with-vanilla-javascript/
  let textArea = document.getElementById("tweet-text");
  let characterCounter = document.getElementById("counter");
  const maxNumOfChars = 140;
  
  const countCharacters = () => {
    let numOfEnteredChars = textArea.value.length;
    let counter = maxNumOfChars - numOfEnteredChars;
    characterCounter.textContent = counter;
    if (counter > 0) {
      characterCounter.style.color = "#545149;";
    }
    if (counter < 0) {
      characterCounter.style.color = "red";
    } 
  };
  textArea.addEventListener("input", countCharacters);
  
});


