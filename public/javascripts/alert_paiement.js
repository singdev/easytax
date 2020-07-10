//Déterminer l'ensemble des impôts succeptiblent d'être payé (en fonction de la forme juridique)
//Afficher toute les lignes
//Remplir les dates pour les alertes qui ont été enregistré

let _formJuridiqueAlert = null;
let _userAlert = null;

window.addEventListener('load', async () => {
    _userAlert = await fetchUser();
    _formJuridiqueAlert = await fetchFormeJuridique();
    checkUserImpot();
});

async function fetchUser() {
    try {
        const res = await fetch("/api/users/auth");
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        console.log(err);
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
        console.log(err);
        return null;
    }
}

function checkUserImpot() {
    if (_userAlert.formeJuridique) {
        const impots = getImpotByFormJuridique(_userAlert.formeJuridique);
        console.log(impots);
        displayImpotAlertTableRow(impots);
    }
}

function getImpotByFormJuridique(formeJuridique) {
    const fm = _formJuridiqueAlert.find(f => f.value == formeJuridique);
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

function displayImpotAlertTableRow(impots) {
    const container = document.querySelector(".alerts");

    for (let i = 0; i < impots.length; i++) {
        const impot = impots[i].title;
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        td.innerHTML = impot;
        const button = document.createElement("button");
        button.innerHTML = "Paramétrer l'alerte";
        button.addEventListener('click', () => {
            showUpdateAlertPaiementDialog(impots[i]);
        });
        td3.appendChild(button)
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        container.appendChild(tr);
    }
}

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function showUpdateAlertPaiementDialog(echeance) {
    document.querySelector('.alert-paiement-update').classList.add('show-dialog');
    const container = document.querySelector('.date-limite');
    document.querySelector('.dialog-impot').innerHTML = echeance.title;
    if (echeance.question) {
        container.innerHTML = `
          <p class="date">${echeance.date} <span class="month-value">---</span> ${echeance.year}</p>
          <div class="form-group">
          <label>${echeance.question}</label>
          <select name="month" onchange="updateDatePaiement(this)">
          <option value="0">Janvier</option>
          <option value="1">Février</option>
          <option value="2">Mars</option>
          <option value="3">Avril</option>
          <option value="4">Mai</option>
          <option value="5">Juin</option>
          <option value="6">Juillet</option>
          <option value="7">Août</option>
          <option value="8">Septembre</option>
          <option value="9">Octobre</option>
          <option value="10">Novembre</option>
          </select>
          </div>
        `;
    } else {
        container.classList.add("date");
        container.innerHTML = `${echeance.date} <span class="month-value">${MONTHS[echeance.month]}</span> ${echeance.year}`;
    }
}

function updateDatePaiement(e) {
    document.querySelector('.month-value').innerHTML = MONTHS[Number.parseInt(e.value) + 1];
}

function closeUpdateAlertPaiementDialog() {
    document.querySelector('.alert-paiement-update').classList.remove('show-dialog');
}

function addDays(date, days) {
    var result = new Date(date.toISOString());
    result.setDate(result.getDate() + days);
    return result;
}

async function createAlertPaiement() {
    const alertNumber = -document.querySelector('#date_alert').value;
    console.log(alertNumber);
    const datePaiementStrSplits = document.querySelector('.date').innerHTML.split(' ');
    
    const str = document.querySelector('.month-value').innerHTML.replace(/ /g, "");
    const m = MONTHS.indexOf(str);
    const month = (m < 10 ? "0":"") + m;
    const date = (datePaiementStrSplits[0] < 10 ? "0":"") + datePaiementStrSplits[0];
    const year = datePaiementStrSplits[datePaiementStrSplits.length-1];

    const date_limite = new Date(`${year}-${month}-${date}`);
    const date_alert = addDays(datePaiement, alertNumber);
    const impot = document.querySelector('.dialog-impot')
}