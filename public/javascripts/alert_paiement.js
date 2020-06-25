//Déterminer l'ensemble des impôts succeptiblent d'être payé (en fonction de la forme juridique)
//Afficher toute les lignes
//Remplir les dates pour les alertes qui ont été enregistré

const IMPOT_ALERT_PARTICULIER = ["TSIL", "RS", "BIC", "BNC", "BA", "CFPB", "CFPNB", "TS"];
const IMPOT_ALERT_SOCIETE = ["CSS", "CFP", "IS", "CFPB", "CFPNB", "TS"];

window.addEventListener('load', async () => {
    await fetchUser();
    await fetchFormeJuridique();
    checkUserImpot();
});

async function fetchUser() {
    try {
        const res = await fetch("/api/users/auth");
        if (res.status == 200) {
            _user = await res.json();
            console.log(_user);
        }
    } catch (err) {
        console.log(err);
    }
}

async function fetchFormeJuridique() {
    try {
        const res = await fetch("/api/forme-juridique");
        if (res.status == 200) {
            _formeJuridiques = await res.json();
        }
    } catch (err) {
        console.log(err);
    }
}

function checkUserImpot() {
    if (_user.formeJuridique) {
        const impots = getImpotByFormJuridique(_user.formeJuridique);
        displayImpotAlertTableRow(impots);
    } else {
        //TODO display loadFormJuridique dialog
        //Afficher le bouton choisissez votre forme juridique
    }
}

function getImpotByFormJuridique(formeJuridique) {
    const fm = _formeJuridiques.find(f => f.value == formeJuridique);
    const status = fm.type;

    if (status == "p") {
        return IMPOT_ALERT_PARTICULIER;
    } else {
        return IMPOT_ALERT_SOCIETE;
    }
}

function displayImpotAlertTableRow(impots) {
    const container = document.querySelector(".alerts");

    for (let i = 0; i < impots.length; i++) {
        const impot = impots[i];
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        td.innerHTML = impot;
        const button = document.createElement("button");
        button.innerHTML = "Paramétrer l'alerte";
        button.addEventListener('click', {
            //TODO display Create Impot dialog for current impot
            displayDialogForImpot(impot);
        });
        td3.appendChild(button)
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        container.appendChild(tr);
    }
}

function showCreateAlertPaiementDialog() {
    document.querySelector('.alert-paiement-create').classList.add('show-dialog');
}

function closeCreateAlertPaiementDialog() {
    document.querySelector('.alert-paiement-create').classList.remove('show-dialog');
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function displayDialogForImpot(impot) {
    if (impot == "TSIL") {
        displayTSIL();
    } else if (impot == "RS") {
        displayRS();
    } else if (impot == "BIC" || impot == "BNC" || impot == "BIC") {
        displayIRPP();
    } else if (impot == "CFPB") {
        displayCFPB();
    } else if (impot == "CFPNB") {
        displayCFPNB();
    }
}

function displayTSIL() {
    
}

function displayIRPP() {

}

function displayCFPB() {

}

function displayCFPNB() {

}

function displayTS() {

}

function displayRS() {

}