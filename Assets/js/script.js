// connect js with html through querySelectors
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

// Quiz Data
var quizData = [
    {
      question: "Question 1: What is a function?",
      answers: ["a set of statements that perform a specific task", "two key value pairs", "a logical operator", "a printed console.log"],
      correctAnswer: "a set of statements that perform a specific task"
    },
    {
      question: "Question 2: Inside which HTML element do we put the JavaScript?",
      answers: ["<script>", "<head>", "<link>", "you add it to the CSS"],
      correctAnswer: "<script>"
    },
    {
      question: "Question 3: How do you call a function named 'newFunction'?",
      answers: ["call.newFunction()", "newFunction().call", "initiate:newFunction()", "newFunction()"],
      correctAnswer: "newFunction()"
    }]

// Timer and quiz state variables 
var currentQuestionIndex = 0;
var score = 0;
var timeRemaining = 60;
var timerInterval;


// Add eventlistener to the start button
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
returnButton.addEventListener("click", returnToStart); 
// want to change return to sumbit initials and score and save on to that page
  //want to add this return function to a new button called 'return to start'
   
  
// Function to Return to Start
function returnToStart() {
  console.log('the return to start button has been pushed');
  highScoresScreen.style.display = "none";
  quizIntro.style.display = "block";
}  

// Function to handle start quiz button click event and to start the quiz
function startQuiz() {
  console.log('The start button has been click, quiz begins')  
  document.querySelector(".quiz-intro").style.display = "none";
  questionScreen.style.display = "block";
  displayQuestion();
  startTimer(); // Start the timer
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
    var minutes = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
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
    var answerContainer = document.querySelector(".question-screen ul");
  
    questionElement.textContent = currentQuestion.question;
    answerContainer.innerHTML = "";
  
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var answerButton = document.createElement("button");
      answerButton.textContent = currentQuestion.answers[i];
      answerContainer.appendChild(document.createElement("li")).appendChild(answerButton);
    }
  
    answerContainer.addEventListener("click", checkAnswer);
  }
  
// Function to check the selected answer
function checkAnswer(selectedAnswer) {
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
    clearInterval(timerInterval);
    questionScreen.style.display = "none";
    finishScreen.style.display = "block";
    scoreDisplay.textContent = `Your Score: ${score}`; // *return and look up string interpelation 
  }

// Function to handle the form submission and store high scores
function submitScore(event) {
    event.preventDefault();
    var initials = initialsInput.value.trim();
  
    if (initials !== "") {
      var highScore = `${initials} - ${score}`;
      saveHighScore(highScore);
      initialsInput.value = "";
      // switchToHighScores();
      updateHighScoresList(); // Update high scores list dynamically
    }
    console.log('submitted initials to make li', initials)
  }
  
    // Function to save high score to localStorage
  function saveHighScore(highScore) {
    // Retrieve existing high scores from localStorage
    var existingHighScores = localStorage.getItem("highScores");
  
    // Parse existing high scores into an array or create an empty array if no high scores are found
    var highScores = existingHighScores ? JSON.parse(existingHighScores) : [];
  
    // Add the new high score to the array
    highScores.push(highScore);
  
    // Store the updated high scores array in localStorage
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
    var existingHighScores = localStorage.getItem('highScores');
    return existingHighScores ? JSON.parse(existingHighScores) : [];
  }
  
  var highscoresList = document.querySelector('.highscores-list');
  var highScores = getHighScores();
  
  highScores.forEach(function(score) {
    var li = document.createElement('li');
    li.textContent = score;
    highscoresList.appendChild(li);
  });
  
  
  // Update high scores list on page load
  window.addEventListener("DOMContentLoaded", updateHighScoresList);
  
  



  