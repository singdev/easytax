let _formJuridiques;
let _impots_penalite;
/**
 * Documentation
 * ______________
 * 
 * 
 * La liste des impôts avec leur date limite de paiement ce trouve dans le fichier
 * regime_fiscal.js
 * 
 * Il est structuré comme suite pour chaque impôt:
 * 
 * Exemple pour l'IS
 * {
 *   "name": "IS",
 *   "article" : "lorem ipsu ...",
 *   "alert": {
 *          echeance_count: 3,
            echeance: [
                { title: "Premier acompte IS", date: 30, month: 10, year: new Date().getFullYear() },
                { title: "Deuxième acompte acompte IS", date: 30, month: 0, year: new Date().getFullYear() + 1 },
                { title: "Solde IS", date: 30, month: 3, year: new Date().getFullYear() + 1 },
            ]
 *   }
 * }
 */

window.addEventListener('load', async () => {
    _user = await fetchUserData();
    _formJuridiques = await fetchFormeJuridique();
    checkUserFormJuridique();
    checkUserImpot();
    nextQuestion();
    console.log(_user);
})

/**
 * Recupération des prérequis pour pouvoir calculer les pénaités:
 * 
 * Les dates limites de paiment
 * Les informations sur l'utilisateurs
 * La forme juridique
 */

function checkUserFormJuridique() {
    if (!_user.formeJuridique) {
        displayGetUserFormJuridiqueDialog();
    }
}

function displayGetUserFormJuridiqueDialog() {
    displayUpdateFormeJuridiqueDialog();
}

async function fetchUserData() {
    try {
        const res = await fetch('/api/users/auth');
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        return null;
    }
}

async function fetchFormeJuridique() {
    try {
        const res = await fetch("/api/forme-juridique");
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        return null;
    }
}

function checkUserImpot() {
    if (_user.formeJuridique) {
        _impots_penalite = getImpotByFormJuridique(_user.formeJuridique);
    }
}

function getImpotByFormJuridique(formeJuridique) {
    const fm = _formJuridiques.find(f => f.value == formeJuridique);
    const impots = [];
    for (let i = 0; i < fm.impot.length; i++) {
        if (fm.impot[i] != false && fm.impot[i] != undefined) {
            if (_impots[i].alert) {
                _impots[i].alert.echeance.forEach(e => {
                    impots.push(e);
                })
            }
        }
    }
    return impots;
}

/**
 * Implémentation de la logique de calcul des pénalités
 * 
 */

let currentImpotIndex = -1;
let _penalites = [];

function nextQuestion() {
    currentImpotIndex++;
    if (currentImpotIndex >= _impots_penalite.length) {
        currentImpotIndex = _impots_penalite.length - 1;
        finish();
    }
    displayBars();
    displayContent();
}

function previousQuestion() {
    currentImpotIndex--;
    if (currentImpotIndex < 0) {
        currentImpotIndex = 0;
    }
    displayBars();
    displayContent();
}

function finish() {
    displayResult();
    savePenalite();
}

function displayBars() {
    const bar = document.querySelector('.impots');
    while (bar.firstChild) {
        bar.removeChild(bar.firstChild);
    }
    for (let i = 0; i < _impots_penalite.length; i++) {
        const impot = _impots_penalite[i];
        const p = document.createElement('p');
        if (i == currentImpotIndex) {
            p.classList.add('current-impot');
        }
        p.innerHTML = impot.title;
        bar.appendChild(p);
    }
}


function displayContent() {
    document.querySelector('input[name="date"]').value = "";
    const nextContent = document.querySelector('.next-ctn');
    while(nextContent.firstChild){
        nextContent.removeChild(nextContent.firstChild);
    }
    const impot = _impots_penalite[currentImpotIndex];
    document.querySelector('.impot-question').innerHTML = impot.title;
    const valider = document.querySelector('.valider');
    const passer = document.querySelector('.passer');
    passer.onclick = () => nextQuestion();
    valider.onclick = () => {
        while(nextContent.firstChild){
            nextContent.removeChild(nextContent.firstChild);
        }
        const date = document.querySelector('input[name="date"]').value;
        const paiementDate = new Date(date);
        const limitDate = new Date((impot.year - 1) + "-" + (impot.month < 10 ? "0" : "") + impot.month + "-" + (impot.date < 10 ? "0" : "") + impot.date);

        if (paiementDate.getTime() <= limitDate.getTime()) {
            nextQuestion();
        } else {
            const monthCount = monthDiff(limitDate, paiementDate);
            const formctn = document.createElement('div');
            formctn.classList.add('form-ctn');
            const template = `
                    <div class="form-group">
                      <input type="text" onkeyup="addSpaceOnNumber(this, this.value)" name="montant">
                      <label>Combien deviez vous normalement payer</label>
                    </div>
                `;
            formctn.innerHTML = template;
            const button = document.createElement('button');
            button.innerHTML = "Calculer les pénalité liés à " + impot.title;
            button.addEventListener('click', () => {
                const montant = document.querySelector('input[name="montant"]').value.trim().replace(/ /g, "");
                let penalite = 0.03 * montant;
                console.log(penalite);
                for(let x = 1; x < monthCount; x++){
                    penalite += 0.1 * montant;
                }
                const rubrique = _penalites.find(imp => imp.impot == impot);
                if(rubrique){
                    _penalites.indexOf(rubrique).penalite = penalite;
                } else {
                    _penalites.push({ impot, penalite});
                }
                nextQuestion();
            });
            formctn.appendChild(button);
            nextContent.appendChild(formctn);
        }
    }
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function displayResult(){
    document.querySelector('main').style.display = 'none';

    document.querySelector('.result').style.display = 'block';
    const tbody = document.querySelector('.result tbody');

    _penalites.forEach(p => {
        const tr = document.createElement('tr');
        const td_impot = document.createElement('td');
        const td_penalite = document.createElement('td');
        td_impot.innerHTML = p.impot.title;
        td_penalite.innerHTML = p.penalite;

        tr.appendChild(td_impot);
        tr.appendChild(td_penalite);
        tbody.appendChild(tr);
    })
}

async function savePenalite(){
    const res = await fetch("/api/users", {
        method: 'PUT',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({ penalites: JSON.stringify(_penalites) })
    });
    
    if(res.status == 200){
        window.alert("Vos informations sur la pénalité ont été enregistré dans votre compte utilisateur");
    }
}