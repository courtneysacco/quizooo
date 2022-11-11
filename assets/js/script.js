var thequizBody = document.getElementById("thequiz");
var finishedResultsEL = document.getElementById("finishedresult");
var finishedScoreEl = document.getElementById("finishedscore");
var quizDoneDiv = document.getElementById("quizdone");
var questionsEL = document.getElementById("questions");
var theQuizTime = document.getElementById("time");
var mainPageContainer = document.getElementById("mainpage");
var startQuizButton = document.getElementById("start-button");
var startQuizDiv = document.getElementById("mainpage");
var scoreContainer = document.getElementById("score-container");
var scorePageDiv = document.getElementById("scorepage");
var nameInput = document.getElementById("name");
var scoreDisplay = document.getElementById("score-name");
var finishedButtons = document.getElementById("finishedbuttons");
var enterButton = document.getElementById("enter");
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
    correctAnswer: "c"},
{

    question: "What would you use to create an unordered list in HTML?",
    choiceA: "<ul>",
    choiceB: "<ol>",
    choiceC: "<li>",
    choiceD: "<i>",
    correctAnswer: "a"},

];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    quizDoneDiv.style.display = "none";
    mainPageContainer.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }

    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEL.innerHTML = "<p>" + currentQuestion.question + "<p>";
    buttonA.innerHTML + currentQuestion.choiceA;
    buttonB.innerHTML + currentQuestion.choiceB;
    buttonC.innerHTML + currentQuestion.choiceC;
    buttonD.innerHTML + currentQuestion.choiceD;
};

function startQuiz(){
    quizDoneDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Time
    timerInterval = setInterval(function() {
        timeLeft--;
        theQuizTime.textConent = "Time Remaining: " + timeLeft;

        if(timeLEft === 0) {
            clearInterval(timerInterval);
            showScore();
    }
    
    }, 1000);

    thequizBody.style.display = "block";
    
};    

function showScore(){
    thequizBody.style.display ="none";
    quizDoneDiv.style.display = "flex";
    clearInterval(timerInterval);
    nameInput.value = "";
    finalScoreEL.innteHTML = "You got " + score + " out of " + quizQuestions.length + " right!";
};

enterButton.addEventListener("click", function score(){

    if(nameInput.value === "") {
        alert("Enter name here.");
        return false;
    }else{
        var savedScore = JSON.parse(localStorage.getItem("savedScore"))  || [];
        var currentUser = nameInput.value.trim();
        var currentScore = {
            name : currentUser,
            score : score 
        };
    
    quizDoneDiv.style.display = "none";
    scoreContainer.style.display = "flex";
    scorePageDiv.style.display = "block";
    finishedButtons.style.display = "flex";
    savedScore.push(currentScore);
    localStorage.setItem("savedScore", JSON.stringify(savedScore));
    generateScore();
    
    }
});    

function generateScore(){
    scoreDisplay.innterHTML = "";
    var score = JSON.parse(localStorage.getItem("savedScore"))  ||  [];
    for (i=o, i<score.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = score[i].name;
        newScoreSpan.textContext = score[i].score;
        scoreDisplay.appendChild(newNameSpan);
    }
};    

function clearScore(){
    window.localStorage.clear();
    scoreDisplay.textContent + "";
};

function replayQuiz(){
    scoreContainer.style.display = "none";
    quizDoneDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    mainPageContainer.style.display = "flex";
    timeLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
};

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        //alert("That is Right!");
        finishedResultsEL.style.display = "flex";
        finishedResultsEL.textContent = "Right!";
        currentQuestionIndex++;
        generateQuizQuestion();

    //show in the finished div that the answer is right.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        // alert("That isn't Right!")
        finishedResultsEL.textContent = "Not Right!"
        currentQuestionIndex++;
        generateQuizQuestion();

    // show in the finished div that the answer is wrong.
    }else{
     showScore();    
    }

};

startQuizButton.addEventListener("click",startQuiz);