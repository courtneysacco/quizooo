var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startPageContainer = document.getElementById("start");
var startQuizButton = document.getElementById("start-button");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscore-container");
var highscoreDiv = document.getElementById("highscore-page");
var highscoreInputName = document.getElementById("name-or-initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var highscoreDisplayScore = document.getElementById("highscore-score");
var endGameBtns = document.getElementById("end-buttons");
var submitScoreBtn = document.getElementById("submit");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [{
    question: "Which of the following is NOT a boolean expression?",
    choiceA: "3 + 4 == 7",
    choiceB: "3 + 4",
    choiceC: "True",
    choiceD: "3 == 4",
    correctAnswer: "b"},
{

    question: "True is what type of variable?",
    choiceA: "float",
    choiceB: "string",
    choiceC: "boolean",
    choideD: "integer",
    correctAnswer: "c"},
{
    
    question: "What does CSS stand for?",
    choiceA: "Cascading Styling Sheets",
    choiceB: "Color and Style Sheets",
    choiceC: "Class Softward Solutions",
    choiceD: "None of the above",
    correctAnswer: "a"},
{

    question: "The property of CC used to change the background color of an element is",
    choiceA: "color",
    choiceB: "background-color",
    choiceC: "bgcolor",
    choiceD: "Any of the above",
    correctAnswer: "b"},
{

    question: "What does HTML stand for?",
    choiceA: "HighText Machine Language",
    choiceB: "HyperText and links Markup Language",
    choiceC: "HyperText Markup Language",
    choiceD: "None of the Above",
    correctAnswer: "c"},

];


var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){    
    gameoverDiv.style.display = "none";
    startPageContainer.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
    return showScore();
    }
    
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;

};

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Time
    timerInterval = setInterval(function() {
    timeLeft--;
    quizTimer.textContent = "Time Remaining: " + timeLeft;

    if(timeLeft === 0) {
        clearInterval(timerInterval);
        showScore();
    }

    }, 1000);

    quizBody.style.display = "block";

};

function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " right!";

};


submitScoreBtn.addEventListener("click", function highscore(){

    if(highscoreInputName.value === "") {
        alert("Enter name here.");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();

    }
});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
};

function viewHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    startPageContainer.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();

};

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";

};

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    startPageContainer.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;

};

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        // alert("That Is Right!");
        resultsEl.style.display = "flex";
        resultsEl.textContent = "Right!";
        currentQuestionIndex++;
        generateQuizQuestion();

    //show that the answer is right
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        // alert("That isn't Right!")
        resultsEl.textContent = "Not Right!"
        currentQuestionIndex++;
        generateQuizQuestion();

    //show that the answer is wrong
    }else{
        showScore();
    }

};

startQuizButton.addEventListener("click",startQuiz);

