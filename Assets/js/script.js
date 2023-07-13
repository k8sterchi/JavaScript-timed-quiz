// select elements using query selectors
// attach event listeners to the buttons
//write functions to handle the button clicks and change what is displayed

var startButton = document.querySelector(".quiz-intro button");
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
    
// Add event listener to the start button
startButton.addEventListener("click", startQuiz);
console.log ('start button clicked')

// Function to handle start quiz button click event
function startQuiz() {
  // Hide intro section and show question screen
  document.querySelector(".quiz-intro").style.display = "none";
  questionScreen.style.display = "block";
}

// Function to start the quiz
function startQuiz() {
    document.querySelector(".quiz-intro").style.display = "none";
    questionScreen.style.display = "block";
    displayQuestion();
    // Other code to handle the quiz logic
  }
  
  // Function to display a question
  function displayQuestion() {
    const questionElement = document.querySelector(".question-screen h2");
    const answerElements = document.querySelectorAll(".question-screen li button");
  
    // Retrieve the first question from the quizData array
    const currentQuestion = quizData[0];
  
    // Display the question text
    questionElement.textContent = currentQuestion.question;
  
    // Display the answer options
    for (let i = 0; i < answerElements.length; i++) {
      answerElements[i].textContent = currentQuestion.answers[i];
    }
  }
  