var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var optionsEl = document.querySelector("#options");
var answersEl = document.querySelector("#answers");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var feedbackEl = document.querySelector("#feedback");

var questions = [
{
    question: "A very useful tool used during development and debugging for pringting content to the debugger is:",
    options:["terminal/bash", "for loops", "console.log", "JavaScript"],
    answer: "console.log"
},
{   question: "Arrays in JavaScript can be used to store ___.",
    options:["other arrays", "boolean", "numbers and strings", "All of the above"],
    answer:"All of the above"
},
{   question: "Boolean operators that can be used in JavaScript include:",
    options:["'Not' Operator !", "'Or' Operator ||", "'And' Operator &&", "All of the above"],
    answer:"All of the above"
},
{   question: "What is the data type of variables in JavaScript?",
    options:["Function data type", "Object data types", "None of the above", "All of the above"],
    answer:"Object data types"
},
{   question: "What are the two basioc groups of data types in JavaScript?",
    options:["Primitive and refrence types", "Refrence types anmd attributes", "Primitive and attribute", "None of the above"],
    answer:"Primitive and reference types"
},
{   question: "Which method adds a new item to the end of an array and returns the new length?",
    options:["return()", "push()", "pop()", "shift()"],
    answer:"push()"
},
{   question: "Which of the following are capabilities of functions in JavaScript?",
    options:["Valadating a form", "Storing the forms content to a database file on the server", "Sending a form's contents by emial", "None of the above"],
    answer:"Storing the form's contents to a database file on the server"
}
];

var startQuizIndex = 0;
var time = questions.length * 10;
var timerId;

function startQuiz() {
    //hides the main screen
    var screenEl = document.getElementById("begin-screen");
    screenEl.setAttribute("class", "hide");
    //shows questions
    questionsEl.removeAttribute("class");
    //starts timer
    timerId = setInterval(clockTick, 1000);
    //shows time
    timerEl.textContent = time;
    
    nextQuestion();
}
function nextQuestion() {
    var setQuestion = questions[startQuizIndex];
    var questionEl = document.getElementById("question");
    questionEl.textContent = setQuestion.question;

    optionsEl.innerHTML = "";
    //loopover question options
    setQuestion.options.forEach(function(options, i) {
    //buttons for each option
    var optionsNode = document.createElement("button");
    optionsNode.setAttribute("class", "options");
    optionsNode.setAttribute("class", "background");
    optionsNode.setAttribute("value", options);

    optionsNode.textContent = i + 1 + "." + options;
    optionsNode.onclick = clickQuestion;
    optionsEl.appendChild(optionsNode);
    });
}

function clickQuestion() {
    if (this.value !== questions[startQuizIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong";
} else {
    feedbackEl.textContent = "Correct";
}
// next question
startQuizIndex++;
if (startQuizIndex === questions.length) {
    endQuiz();
} else {
    nextQuestion();
}}
// stop timer and show final score
function endQuiz() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class")
    endScreenEl.setAttribute("class", "center");
    var endResultEl = document.getElementById("end-result");
    endResultEl.textContent = time;
    //hide questions
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

function finalScore() {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        // new score board for current user
        var startNewScore = {
            score: time,
            initials: initials
        };
        highscores.push(startNewScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        location.replace("highscores.html");
    }
}
function initialsEnter(event) {
    if (event.key === "Enter") {
        saveFinalScore();
    }
}
// event listeners
startBtn.onclick = startQuiz;
submitBtn.onclick = finalScore;
