// select elements using query selectors
// attach event listeners to the buttons
//write functions to handle the button clicks and change what is displayed

var startButton = document.querySelector(".quiz-intro button");
var timerDisplay = document.querySelector(".top-bar p");
var questionScreen = document.querySelector(".question-screen");
var finishScreen = document.querySelector(".quiz-finish-screen");
var highScoresScreen = document.querySelector(".highscores-screen");
var returnButton = document.querySelector(".highscores-screen button:nth-of-type(1)");

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
    var answerElements = document.querySelectorAll(".question-screen li button");
  
    questionElement.textContent = currentQuestion.question;
  
    for (let i = 0; i < answerElements.length; i++) {
      answerElements[i].textContent = currentQuestion.answers[i];
      answerElements[i].addEventListener("click", () => {
        checkAnswer(answerElements[i].textContent);
      });
    }
  }
  
  // Function to check the selected answer
  function checkAnswer(selectedAnswer) {
    var currentQuestion = quizData[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.correctAnswer) {
      score++;
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        displayQuestion();
      } else {
        finishQuiz();
      }
    } else {
      timeRemaining -= 10; // Subtract 10 seconds 
      if (timeRemaining <= 0) {
        finishQuiz();
      }
    }
  }
  

// Event listener for the Start button
startButton.addEventListener("click", startQuiz);


  