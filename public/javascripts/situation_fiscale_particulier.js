
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

window.addEventListener('load', () => {
    loadSecteurOnSelecteur();
    customSelect();
});

let _secteur;
function nextQuestionISL(value) {
    if (_currentBase == 0 && currentQuestion == 0) {
        const salaire = document.querySelector('#salarie-oui');
        if (salaire.checked) {
            stepStack.push({ current: currentQuestion, baseNumber: _currentBase });
            nextBase();

        } else {
            nextQuestion('next');
        }
    } else if (_currentBase == 0 && currentQuestion == 1) {
        _secteur = document.querySelector('select[name="secteur"]').value;
        if (_secteur < 0) {
            stepStack.push({ current: currentQuestion, baseNumber: _currentBase });
            nextBase();
        } else {
            nextQuestion('next');
        }
    } else if (_currentBase == 0 && currentQuestion == 2) {
        console.log(_secteur);
        let ville = null;
        const villesInputs = document.querySelectorAll('input[name="ville_isl"]');
        villesInputs.forEach(s => {
            if (s.checked) {
                ville = situation_matrimonial = s.value;
            }
        });
        const ISL = secteur[_secteur][ville];
        showResultView();
        document.querySelector('.irpp-cn').classList.add("hide-irpp");
        document.querySelector('.isl-cn').classList.add("show-isl");
        document.querySelector('.isl-value').innerHTML = addThreeSpace(ISL);
        situationFiscale = {
            ISL
        };
        updateUserSituationFiscale(JSON.stringify(situationFiscale));
    } else {
        nextQuestion(value);
    }
}



/*** Initialization */
nextBase();

/** Value */
function addBien() {
    const cn = document.querySelector('.biens');
    const template = `
        <div class="form-group">
            <input type="text" name="bien" onkeyup="addSpaceOnNumber(this, this.value)">
            <label>Bénéfice issu de la vente du bien</label>
        </div>
    `;
    const element = new DOMParser().parseFromString(template, "text/html");
    cn.appendChild(element.querySelector('div'));
}

function finish() {
    const RS = RSData();
    const RF = RFData();
    const PC = PCData();
    const IRVM = IRVMData();
    const BIC = BICData();
    const BA = BAData();

    const base_imposable = RS + RF + PC + IRVM + BIC + BA;
    const K = nombreDePart();
    const Q = determineCoefiscientFamilial(K, base_imposable);
    const P = determineIRPPParPart(Q);
    const IRPP = K * P;

    showResultView();
    displayBaseImposable(RS, RF, PC, IRVM, BIC, BA, base_imposable);
    displayNombreDePart();
    displayIRPP(IRPP);

    const situationFiscale = {
        base_imposable: {
            RS, RF, PC, IRVM, BIC, BA
        },
        quotient_familial: {
            K,
        },
        IRPP
    }
    updateUserSituationFiscale(JSON.stringify(situationFiscale));
}

function getSituationMatrimonialName(situation_matrimonail) {
    if (situationFamilial[situation_matrimonail]) {
        return situationFamilial[situation_matrimonail].name;
    }
    return null;
}

function displayBaseImposable(RS, RF, PC, IRVM, BIC, BA, base_imposable) {
    document.querySelector('.rs-value').innerHTML = addThreeSpace(RS);
    document.querySelector('.rf-value').innerHTML = addThreeSpace(RF);
    document.querySelector('.pc-value').innerHTML = addThreeSpace(PC);
    document.querySelector('.irvm-value').innerHTML = addThreeSpace(IRVM);
    document.querySelector('.bic-value').innerHTML = addThreeSpace(BIC);
    document.querySelector('.ba-value').innerHTML = addThreeSpace(BA);
    document.querySelector('.total-value').innerHTML = addThreeSpace(base_imposable);
}

function displayNombreDePart() {
    document.querySelector('.situation_matrimonial').innerHTML = getSituationMatrimonialName(getSituationMatrimonial());
    document.querySelector('.nombre_enfant').innerHTML = getNombreEnfant();
    document.querySelector('.cas').innerHTML = hasCasParticulier() == 'cas_particulier' ? "Oui" : "Non";
    document.querySelector('.nombre_part').innerHTML = nombreDePart();
}

function displayIRPP(IRPP) {
    document.querySelector('.irpp').innerHTML = addThreeSpace(IRPP);
    if (IRPP == 0) {
        displayMiniMumForfaitaire();
    }

}

function displayMiniMumForfaitaire() {
    document.querySelector('.forfait').classList.add("show-forfait");
}



function nombreDePart() {
    let situation_matrimonial = getSituationMatrimonial();
    let nombre_enfant = getNombreEnfant();
    let cas = hasCasParticulier();
    const nombre_de_part = determineQuotientFamilial(situation_matrimonial, nombre_enfant, cas);

    return nombre_de_part;
}

function getSituationMatrimonial() {
    const situationRadios = document.querySelectorAll('input[name="matrimonial"]');
    let situation_matrimonial = null;
    situationRadios.forEach(s => {
        if (s.checked) {
            situation_matrimonial = s.value;
        }
    });
    return situation_matrimonial;
}

function getNombreEnfant() {
    return document.querySelector('input[name="enfants"]').value;
}

function hasCasParticulier() {
    return document.querySelector('#cp-oui').checked == false ? 'cas_general' : 'cas_particulier';
}

function RSData() {
    const inputRs = document.querySelectorAll(".q input[type='text']");
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
        if (v == "" || isNaN(v)) {
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



