const questions = [

    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:"shark" , correct: false},
            {text:"Blue Whale" , correct: true},
            {text:"Elephant" , correct: false},
            {text:"Giraffe" , correct: false},
        ]
    },

    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text:"Vatican City" , correct: false},
            {text:" Bhutan" , correct: true},
            {text:"Nepal" , correct: false},
            {text:"Shri Lanka" , correct: false},
        ]
    },

    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text:"Kalahari" , correct: false},
            {text:"Gobi" , correct: false},
            {text:"Sahara" , correct: false},
            {text:"Antarctica" , correct: true},
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text:"Asia" , correct: false},
            {text:"Asttralia " , correct: true},
            {text:"Arctic" , correct: false},
            {text:"Africa" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question"),
      answersBtn = document.getElementById("answers"),
      nextBtn = document.getElementById("next");


      let currentQuestionIndex = 0,
          score = 0;




function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}



function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{

        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);


        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener("click" , selectAnswer);
    });

};



function  resetState(){

    nextBtn.style.display = "none";
    while(answersBtn.firstChild){
        answersBtn.removeChild(answersBtn.firstChild);
    }
}



function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect) 
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answersBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });

    nextBtn.style.display = "block";
}



function showScore(){

    resetState();
    questionElement.innerHTML = `you scored  ${score} out of ${questions.length} !`
    nextBtn.innerHTML = "play again";
    nextBtn.style.display = "block"
}


function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextBtn.addEventListener("click" , ()=>{

    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
});


startQuiz();