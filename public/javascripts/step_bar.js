let _progressBases = document.querySelectorAll('.base');
let _progressBaseLines = document.querySelectorAll('.bar');

function reload(){
    for (let i = 0; i < _progressBases.length; i++) {
        _progressBases[i].classList.remove('base-done');
        _progressBases[i].classList.remove('base-active');
        if (i > 0) {
            _progressBaseLines[i - 1].classList.remove('bar-active');
            _progressBaseLines[i - 1].classList.remove('bar-active');
        }
    }
}

function updateProgressBar(index) {
    console.log("Update progress");
    reload();
    console.log(index);
    for (let i = 0; i < index; i++) {
        _progressBases[i].classList.add('base-done');
        if (i > 0) {
            _progressBaseLines[i - 1].classList.add('bar-active');
        }
    }
    _progressBases[index].classList.add('base-active');
    if(index > 0){
        _progressBaseLines[index - 1].classList.add('bar-active');
    }
}