// Connect JavaScript with HTML through querySelectors
var startButton = document.querySelector(".quiz-intro button");
var questionScreen = document.querySelector(".question-screen");
var answerContainer = document.querySelector(".question-screen ul");
var finishScreen = document.querySelector(".quiz-finish-screen");
var scoreDisplay = document.querySelector(".quiz-finish-screen p");
var initialsInput = document.querySelector(".quiz-finish-screen input");
var submitButton = document.querySelector(".quiz-finish-screen button");
var highScoresScreen = document.querySelector(".highscores-screen");
var highScoresList = document.querySelector(".highscores-screen ol");
var returnButton = document.querySelector(".highscores-screen .return-button");
var clearButton = document.querySelector(".highscores-screen .clear-button");
var timerDisplay = document.querySelector(".top-bar p");
var highScoresButton = document.querySelector(".top-bar button");

// Quiz Data
var quizData = [
  {
    question: "Question 1: What is a function?",
    answers: [
      "a set of statements that perform a specific task",
      "two key value pairs",
      "a logical operator",
      "a printed console.log"
    ],
    correctAnswer: "a set of statements that perform a specific task"
  },
  {
    question: "Question 2: Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<head>", "<link>", "you add it to the CSS"],
    correctAnswer: "<script>"
  },
  {
    question: "Question 3: How do you call a function named 'newFunction'?",
    answers: [
      "call.newFunction()",
      "newFunction().call",
      "initiate:newFunction()",
      "newFunction()"
    ],
    correctAnswer: "newFunction()"
  }
];

// Timer and quiz state variables
var currentQuestionIndex = 0;
var score = 0;
var timeRemaining = 60;
var timerInterval;

// Add event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
returnButton.addEventListener("click", returnToStart);
clearButton.addEventListener("click", clearHighScores);
highScoresButton.addEventListener("click", showHighScores);

// Function to show the high scores screen
function showHighScores() {
  // Hide the other screens
  document.querySelector(".quiz-intro").style.display = "none";
  questionScreen.style.display = "none";
  finishScreen.style.display = "none";

  // Show the high scores screen
  highScoresScreen.style.display = "block";

  // Update high scores list dynamically
  updateHighScoresList();
}git st

// Function to handle start quiz button click event and to start the quiz
function startQuiz() {
  // Reset quiz variables
  currentQuestionIndex = 0;
  score = 0;
  timeRemaining = 60;

  // Hide the quiz intro screen and show the question screen
  document.querySelector(".quiz-intro").style.display = "none";
  questionScreen.style.display = "block";

  // Display the first question
  displayQuestion();

  // Start the timer
  startTimer();
}


// Function to start the timer
function startTimer() {
  console.log("Timer started.");
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
    var minutes = Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    var seconds = (timeRemaining % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `Timer: ${minutes}:${seconds}`;
  } else {
    finishQuiz();
  }
}

// Function to display a question and its answers
function displayQuestion() {
  var currentQuestion = quizData[currentQuestionIndex];
  var questionElement = document.querySelector(".question-screen h2");

  questionElement.textContent = currentQuestion.question;
  answerContainer.innerHTML = "";

  for (var i = 0; i < currentQuestion.answers.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.textContent = currentQuestion.answers[i];
    answerContainer.appendChild(document.createElement("li")).appendChild(answerButton);
  }
    // Remove the previous event listener before adding a new one
    answerContainer.removeEventListener("click", checkAnswer);


  // Add the new event listener
  answerContainer.addEventListener("click", checkAnswer);

}

// Function to check the selected answer
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var currentQuestion = quizData[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
  } else {
    timeRemaining -= 10; // Subtract 10 seconds for wrong answer (adjust as needed)
    if (timeRemaining <= 0) {
      timeRemaining = 0;
      finishQuiz();
      return;
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    displayQuestion();
  } else {
    finishQuiz();
  }
}

// Function to finish the quiz
function finishQuiz() {
  console.log("Quiz finished.");
  clearInterval(timerInterval);
  questionScreen.style.display = "none";
  finishScreen.style.display = "block";
  scoreDisplay.textContent = `Your Score: ${score}`; // *return and look up string interpolation

  // Remove the event listener before finishing the quiz
  answerContainer.removeEventListener("click", checkAnswer);
}

// Function to handle the form submission and store high scores
function submitScore(event) {
  event.preventDefault();
  var initials = initialsInput.value.trim();

  if (initials !== "") {
    var highScore = `${initials} - ${score}`;
    saveHighScore(highScore);
    initialsInput.value = "";

    // Show the high scores screen and hide the finish screen
    finishScreen.style.display = "none";
    highScoresScreen.style.display = "block";

    updateHighScoresList(); // Update high scores list dynamically
    console.log("score submitted and high scores displayed.")
  }
}

// Function to save high score to localStorage
function saveHighScore(highScore) {
  var existingHighScores = localStorage.getItem("highScores");
  var highScores = existingHighScores ? JSON.parse(existingHighScores) : [];
  highScores.push(highScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to update the high scores list
function updateHighScoresList() {
  highScoresList.innerHTML = "";
  var highScores = getHighScores();

  highScores.forEach((highScore) => {
    var highScoreItem = document.createElement("li");
    highScoreItem.textContent = highScore;
    highScoresList.appendChild(highScoreItem);
  });
}

// Function to retrieve high scores from localStorage
function getHighScores() {
  var existingHighScores = localStorage.getItem("highScores");
  return existingHighScores ? JSON.parse(existingHighScores) : [];
}

// Function to handle return button click event and go back to the quiz intro
function returnToStart() {
  highScoresScreen.style.display = "none";
  document.querySelector(".quiz-intro").style.display = "block";
  console.log("Returned to start.");
}

// Function to clear high scores from localStorage and update the list
function clearHighScores() {
  localStorage.removeItem("highScores");
  updateHighScoresList();
  console.log("High scores list cleared");
}

// Update high scores list on page load
window.addEventListener("DOMContentLoaded", () => {
  updateHighScoresList();
  console.log("High scores list updated.");
});

  



  