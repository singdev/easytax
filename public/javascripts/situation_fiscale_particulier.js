/*** Initialization */

/** Base */
let _currentBase = -1;
let _bases = document.querySelectorAll('.form-container > div');
let _progressBases = document.querySelectorAll('.base');
let _progressBaseLines = document.querySelectorAll('.bar');

/** Questions */
let questions = [];
let currentQuestion = 0;
let currentShowDiv = null;

nextBase();

/** Gestion des bases impossables */

function nextBase(){
    _currentBase++;
    if(_currentBase >= _bases.length){
        finish();
    } else {
        hideAllBase();
        showBase(_currentBase);
        initQuestion(_currentBase);
    }
}

function hideAllBase(){
    _bases.forEach(b => {
        b.classList.remove('current-base');
    })
}

function showBase(index){
    _bases[index].classList.add('current-base');
    updateProgressBar(index);
}

function getBaseQuestionCount(index) {
    const q = _bases[index].querySelectorAll('.question');
    return q;
}

function updateProgressBar(index){
    for(let i = 0; i <= index; i++){
        _progressBases[i].classList.add('bar-active');
        if(i > 0){
            _progressBaseLines[i-1].classList.add('bar-active');
        }
    }
}

function finish(){

}

/** Question de l'enchainement des questions dans chaque base */


function initQuestion(currentBaseIndex){
    questions = getBaseQuestionCount(currentBaseIndex);
    currentQuestion = 0;
    hideAllQuestionAndDiv();
    showQuestionAndDiv(currentQuestion);
}

function nextQuestion(value){
    if(value.includes("oui") || value == "next"){
        currentQuestion++;
    } else if(value.includes("non")){
        currentQuestion += 2;
    } 
    if(currentQuestion >= questions.length){
        nextBase();
    } else {
        hideAllQuestionAndDiv();
        showQuestionAndDiv(currentQuestion);
    }
}

function showQuestionAndDiv(index){
    questions[index].classList.add('show-question');
    currentShowDiv = questions[index].nextSibling;
    currentShowDiv.classList.add('show-div');
}

function hideAllQuestionAndDiv(){
    questions.forEach(q => {
        q.classList.remove('show-question');
    })
    document.querySelectorAll('.current-base > div').forEach(div => {
        div.classList.remove('show-div');
    })
}

function showContinueButton(){

}

function hideContinueButton(){

}


function calculRs(){

}

function calculFs(){

}

function calculPC(){

}

function calculIRVM(){

}

function calculBIC(){

}

function calculBA(){
    
}