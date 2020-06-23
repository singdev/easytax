/** Base */
let _currentBase = -1;
let _bases = document.querySelectorAll('.form-container > div');

/** Questions */
let questions = [];
let currentQuestion = 0;
let stepStack = [];
let currentShowDiv = null;

/** Gestion des bases impossables */

function nextBase() {
    _currentBase++;
    if (_currentBase >= _bases.length) {
        finish();
    } else {
        hideAllBase();
        showBase(_currentBase);
        initQuestion(_currentBase);
    }
}

function previousBase(newBase){
    _currentBase = newBase;
    if(_currentBase < 0){
        _currentBase = 0;
    }
    hideAllBase();
    showBase(_currentBase);
    initQuestion(_currentBase);
}

function hideAllBase() {
    _bases.forEach(b => {
        b.classList.remove('current-base');
    })
}

function showBase(index) {
    console.log(index);
    console.log(index);
    _bases[index].classList.add('current-base');
    updateProgressBar(index);
}

function getBaseQuestionCount(index) {
    const q = _bases[index].querySelectorAll('.question');
    return q;
}


function initQuestion(currentBaseIndex) {
    questions = getBaseQuestionCount(currentBaseIndex);
    currentQuestion = 0;
    hideAllQuestionAndDiv();
    showQuestionAndDiv(currentQuestion);
}

function nextQuestion(value) {
    console.log(stepStack);
    stepStack.push({ current: currentQuestion, baseNumber: _currentBase});
    if (value.includes("oui") || value == "next") {
        currentQuestion++;
    } else if (value.includes("non")) {
        currentQuestion += 2;
    }
    setCurrentQuestion(currentQuestion);
}

function setCurrentQuestion(index){
    if (index >= questions.length) {
        nextBase();
    } else {
        hideAllQuestionAndDiv();
        showQuestionAndDiv(index);
    }
}

function previousQuestion(){
    const previous = stepStack.pop();
    console.log(previous);
    if(previous == null){
        return;
    }
    currentQuestion = previous.current;
    if(previous.baseNumber != _currentBase){
        previousBase(previous.baseNumber);
    }
    setCurrentQuestion(currentQuestion);
}

function showQuestionAndDiv(index) {
    questions[index].classList.add('show-question');
    currentShowDiv = questions[index].nextSibling;
    currentShowDiv.classList.add('show-div');
}

function hideAllQuestionAndDiv() {
    questions.forEach(q => {
        q.classList.remove('show-question');
    })
    document.querySelectorAll('.current-base > div').forEach(div => {
        div.classList.remove('show-div');
    })
}

/** Interface */
hideResultView();
function hideResultView(){
    const result = document.querySelector('.result-cn');
    result.classList.add("hide");
}

function showResultView(){
    document.querySelector('.result-cn').classList.remove("hide");
    document.querySelector('.bases').classList.add("hide");
    document.querySelector('.form-container').classList.add("hide");
}

function getValueByName(inputs, name) {
    let v = Array.from(inputs).find(v => v.name == name).value;
    const noSpaceValue = v.replace(/ /g, "");
    if(v == "" || isNaN(noSpaceValue)){
        v = 0;
    } else {
        v = Number.parseInt(noSpaceValue, 10);
        console.log(v);
    }
    return v;
}