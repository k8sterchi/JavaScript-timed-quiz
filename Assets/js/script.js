// select elements using query selectors
// attach event listeners to the buttons
//write functions to handle the button clicks and change what is displayed

var startButton = document.querySelector(".quiz-intro button");
var questionScreen = document.querySelector(".question-screen");
var finishScreen = document.querySelector(".quiz-finish-screen");
var highScoresScreen = document.querySelector(".highscores-screen");
var returnButton = document.querySelector(".highscores-screen button:nth-of-type(1)");

// Add event listener to the start button
startButton.addEventListener("click", startQuiz);

// Function to handle start quiz button click event
function startQuiz() {
  // Hide intro section and show question screen
  document.querySelector(".quiz-intro").style.display = "none";
  questionScreen.style.display = "block";
  // Other code to handle the quiz logic
