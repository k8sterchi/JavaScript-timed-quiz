// 1 define and assign values to global variables
// 2 create functions
// 3 call functions

// create an array of obejects, each object holds the data for each question
// remember to separate by commas

// assign the quiz id to a variable
// assign the answer id to a variable
// assign the question id to a variable
// assign each x_text id to a variable
// assign the submit button to a variable

// need a start quiz feature that begins a countdown timer feature
// need the countdown feature to stop when quiz ends 
// need to delete time when question answered wrong

// when the submit button is pressed the quiz question and answers should repopulate with new data
// the input selector should clear from previously selected answer
// need a function that can change the text of each question and answer elements
// need the submit button to have an eventListener...

const questions = [
    {
      question: "Question 1: What is a method?",
      choices: ["a function attached to an object", "a data type", "a way to reuse blocks of code"],
      correctAnswer: 0
    },
    {
      question: "Question 2: What does a function do?",
      choices: ["stores one piece of data", "stores groups of data", "performs a specific task and can be reused"],
      correctAnswer: 2
    },
    {
      question: "Question 3: What is an object?",
      choices: ["a collection of properties", "a boolean data type", "an iterative loop"],
      correctAnswer: 0
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeRemaining = 60;
  let timerInterval;
  
  function startQuiz() {
    console.log("Quiz started");
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    console.log("Showing question", currentQuestionIndex + 1);
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
  
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
  
      questionElement.textContent = currentQuestion.question;
      choicesElement.innerHTML = "";
  
      currentQuestion.choices.forEach(function (choice, index) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = function () {
          checkAnswer(index);
        };
        li.appendChild(button);
        choicesElement.appendChild(li);
      });
    } else {
      endQuiz();
    }
  }
  
  function checkAnswer(answerIndex) {
    console.log("Checking answer for question", currentQuestionIndex + 1);
    const currentQuestion = questions[currentQuestionIndex];
  
    if (answerIndex === currentQuestion.correctAnswer) {
      score++;
      console.log("Correct answer! Score increased to", score);
    } else {
      timeRemaining -= 5;
      console.log("Incorrect answer! 5 seconds deducted. Time remaining:", timeRemaining);
    }
  
    currentQuestionIndex++;
    showQuestion();
  }
  
  function startTimer() {
    console.log("Timer started");
    timerInterval = setInterval(function () {
      timeRemaining--;
      document.getElementById("timer").textContent = timeRemaining;
  
      if (timeRemaining <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
  
    console.log("Quiz ended");
    const quizContainer = document.getElementById("quiz-container");
    const scoreContainer = document.getElementById("score-container");
    const highScoresContainer = document.getElementById("high-scores-container");
  
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    highScoresContainer.style.display = "block";
  
    document.getElementById("score").textContent = score;
    document.getElementById("high-scores").innerHTML += "<li>" + score + "</li>";
  }
  
  startQuiz();
 
  
  