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

/** Value */
function addBien() {
    const cn = document.querySelector('.biens');
    const template = `
        <div class="form-group">
            <input type="text" name="bien">
            <label>Bénéfice issu de la vente du bien</label>
        </div>
    `;
    const element = new DOMParser().parseFromString(template, "text/html");
    cn.appendChild(element.querySelector('div'));
}

nextBase();

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

function hideAllBase() {
    _bases.forEach(b => {
        b.classList.remove('current-base');
    })
}

function showBase(index) {
    _bases[index].classList.add('current-base');
    updateProgressBar(index);
}

function getBaseQuestionCount(index) {
    const q = _bases[index].querySelectorAll('.question');
    return q;
}

function updateProgressBar(index) {
    for (let i = 0; i <= index; i++) {
        _progressBases[i].classList.add('bar-active');
        if (i > 0) {
            _progressBaseLines[i - 1].classList.add('bar-active');
        }
    }
}

function finish() {
    const RS = RSData();
    const RF = RFData();
    const PC = PCData();
    const IRVM = IRVMData();
    const BIC = BICData();
    const BA = BAData();
    console.log("RS = " + RS);
    console.log("RF = " + RF);
    console.log("PC = " + PC);
    console.log("IRVM = " + IRVM);
    console.log("BIC = " + BIC);
    console.log("BA = " + BA);
    showResultView();
    document.querySelector('.rs-value').innerHTML = RS;
    document.querySelector('.rf-value').innerHTML = RF;
    document.querySelector('.pc-value').innerHTML = PC;
    document.querySelector('.irvm-value').innerHTML = IRVM;
    document.querySelector('.bic-value').innerHTML = BIC;
    document.querySelector('.ba-value').innerHTML = BA;
    document.querySelector('.total-value').innerHTML = RS+RF+PC+IRVM+BIC+BA;
}

function RSData() {
    const inputRs = document.querySelectorAll(".rs input[type='text']");
    const traitement = getValueByName(inputRs, 'traitement');
    const emolument = getValueByName(inputRs, 'emolument');
    const salaire = getValueByName(inputRs, 'salaire');
    const indemnite = getValueByName(inputRs, 'indemnite');
    const avantage_espece_argent = getValueByName(inputRs, 'avantage_espece_argent');
    const pension = getValueByName(inputRs, 'pension');
    const retenu_retraite = getValueByName(inputRs, 'retenu_retraite');
    const cotisation_assurance_maladie = getValueByName(inputRs, 'cotisation_assurance_maladie');
    const rente_viagere = getValueByName(inputRs, 'rente_viagere');
    return calculRS({
        traitement, emolument, salaire,
        indemnite, avantage_espece_argent,
        pension, retenu_retraite,
        cotisation_assurance_maladie, rente_viagere
    });
}

function RFData() {
    const inputRs = document.querySelectorAll(".rf input[type='text']");
    const recette_brute = getValueByName(inputRs, 'recette_brute');
    const charge_proprietaire_par_locataire = getValueByName(inputRs, 'charge_proprietaire_par_locataire');
    const depense_proprietaire_pour_locataire = getValueByName(inputRs, 'depense_proprietaire_pour_locataire');
    const total_interet = getValueByName(inputRs, 'total_interet');
    const valeur_venal = getValueByName(inputRs, 'valeur_venal');
    const valeur_locative = getValueByName(inputRs, 'valeur_locative');
    const loyer_mensuel = getValueByName(inputRs, 'loyer_mensuel');

    return calculRF({
        recette_brute, charge_proprietaire_par_locataire,
        depense_proprietaire_pour_locataire, total_interet,
        valeur_locative, valeur_venal, loyer_mensuel
    });
}

function PCData() {
    const inputRs = document.querySelectorAll(".biens input[name='bien']");
    const biens = [];
    inputRs.forEach(i => {
        let v = i.value;
        if(v == "" || isNaN(v)){
            v = 0;
        } else {
            v = Number.parseInt(v, 10);
        }
        biens.push(v);
    });
    return calculPC(biens);
}

function IRVMData() {
    const inputRs = document.querySelectorAll(".irvm input[type='text']");
    const action = getValueByName(inputRs, 'action');
    const obligation = getValueByName(inputRs, 'obligation');
    const interets_creances = getValueByName(inputRs, 'interets_creances');
    const interets_bon_caisse = getValueByName(inputRs, 'interets_bon_caisse');
    return calculIRVM({ action, obligation, interets_creances, interets_bon_caisse });
}

function BICData() {
    const inputRs = document.querySelectorAll(".bic input[type='text']");
    const prix_vente = getValueByName(inputRs, 'prix_vente');
    const prix_achat = getValueByName(inputRs, 'prix_achat');
    const frais_transformation = getValueByName(inputRs, 'frais_transformation');

    return calculBIC({ prix_vente, prix_achat, frais_transformation });
}

function BAData() {
    const benefice = document.querySelector('input[name="b2"]').value;
    if (!benefice) {
        return calculBA(0);
    }
    return calculBA(benefice);
}

function getValueByName(inputs, name) {
    let v = Array.from(inputs).find(v => v.name == name).value;
    if(v == "" || isNaN(v)){
        v = 0;
    } else {
        v = Number.parseInt(v, 10);
    }
    return v;
}

/** Question de l'enchainement des questions dans chaque base */


function initQuestion(currentBaseIndex) {
    questions = getBaseQuestionCount(currentBaseIndex);
    currentQuestion = 0;
    hideAllQuestionAndDiv();
    showQuestionAndDiv(currentQuestion);
}

function nextQuestion(value) {
    if (value.includes("oui") || value == "next") {
        currentQuestion++;
    } else if (value.includes("non")) {
        currentQuestion += 2;
    }
    if (currentQuestion >= questions.length) {
        nextBase();
    } else {
        hideAllQuestionAndDiv();
        showQuestionAndDiv(currentQuestion);
    }
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

