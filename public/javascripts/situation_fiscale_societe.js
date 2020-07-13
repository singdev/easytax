nextBase();
let _patente = null;

window.addEventListener('load', () => {
    loadPatente();
    customSelect();
});

async function updateUserSituationFiscale(situationFiscale) {
    const res = await fetch("/api/users", {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ situationFiscale })
    });
    if (res.status == 2020) {
        console.log("OK");
    }
}

function nextQuestionConditional(value) {
    if (_currentBase == _bases.length - 4 && currentQuestion == 0) {
        _patente = document.querySelector('select[name="patente"]').value;
        if (_patente < 0) {
            stepStack.push({ current: currentQuestion, baseNumber: _currentBase });
            nextBase();
        } else {
            nextQuestion('next');
        }
    } else {
        nextQuestion(value);
    }
}

function calculatePatente(){
    if(_patente >= 0){
        let ville = null;
        const villesInputs = document.querySelectorAll('input[name="ville_patente"]');
        villesInputs.forEach(s => {
            if (s.checked) {
                ville = s.value;
            }
        });
        const PATENTE = patentes[_patente][ville];
        displayPatente(PATENTE);
        return PATENTE;
    }
    return 0;
}

function displayPatente(PATENTE){
  document.querySelector('.res_patente').innerHTML = addThreeSpace(PATENTE);
}

function finish() {
    const css = addThreeSpace(CSSData());
    const cfpb = addThreeSpace(CFPBData());
    const cfpnb = addThreeSpace(CFPNBData());
    const tsil = addThreeSpace(TSILData());
    const is = addThreeSpace(ISData());
    const cfp = addThreeSpace(CFPData());
    showResultView();
    const PATENTE = calculatePatente();
    document.querySelector('.css-value').innerHTML = css;
    document.querySelector('.cfpb-value').innerHTML = cfpb;
    document.querySelector('.cfpnb-value').innerHTML = cfpnb;
    document.querySelector('.tsil-value').innerHTML = tsil;
    document.querySelector('.is-value').innerHTML = is;
    document.querySelector('.cfp-value').innerHTML = cfp;

    const situationFiscal = {
        css, is, cfp, PATENTE, cfpnb, cfpb, tsil
    }
    console.log(situationFiscal);
    updateUserSituationFiscale(JSON.stringify(situationFiscal));
}

function CFPBData(){
    const inputRs = document.querySelectorAll(".cfpb input[type='text']");
    const valeur_locative = getValueByName(inputRs, 'valeur_locative');

    return calculCFPB(valeur_locative);
}

function CFPNBData(){
    const inputRs = document.querySelectorAll(".cfpnb input[type='text']");
    const valeur_venal = getValueByName(inputRs, 'valeur_venal');
    return calculCFPNB(valeur_venal);
}

function TSILData(){
    const inputRs = document.querySelectorAll(".tsil input[type='text']");
    const loyer_mensuel = getValueByName(inputRs, 'loyer_mensuel');
    return calculTSIL(loyer_mensuel)
}

function CSSData() {
    const inputRs = document.querySelectorAll(".css input[type='text']");
    const chiffre_affaire = getValueByName(inputRs, 'chiffre_affaire');
    return calculCSS({ chiffre_affaire });
}

function ISData() {
    const inputRs = document.querySelectorAll(".is input[type='text']");
    const is_precedent = getValueByName(inputRs, 'is_precedent');
    const benefice_fiscal = getValueByName(inputRs, 'benefice_fiscal');

    return calculIS({ is_precedent, benefice_fiscal });
}

function CFPData() {
    const inputRs = document.querySelectorAll(".cfp input[type='text']");
    const masse_salariale = getValueByName(inputRs, 'masse_salariale');

    return calculCFB({ masse_salariale });
}