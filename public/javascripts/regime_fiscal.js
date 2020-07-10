let _formeJuridiques = [];
let _user = null;

const _impots = [
    {
        name: "IS", article: "", alert: {
            echeance_count: 3,
            echeance: [
                { title: "Premier acompte IS", date: 30, month: 10, year: new Date().getFullYear() },
                { title: "Deuxième acompte acompte IS", date: 30, month: 0, year: new Date().getFullYear() + 1 },
                { title: "Solde IS", date: 30, month: 3, year: new Date().getFullYear() + 1 },
            ]
        }
    },
    { name: "IRPP", article: "" },
    {
        name: "TVA", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "TVA", date: 20, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
            ]
        }
    },
    {
        name: "Patente", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "Patente", date: 28, month: 1, year: new Date().getFullYear() + (new Date().getMonth() < 1 ? 0 : 1) }
            ]
        }
    },
    { name: "Licences", article: "" },
    {
        name: "CFPB", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "CFPB", date: 31, month: 2, year: new Date().getFullYear() + (new Date().getMonth() < 2 ? 0 : 1) }
            ]
        }
    },
    { name: "CFPNB", article: "" },
    { name: "CSS", article: "" },
    { name: "CFP", article: "" },
    { name: "DET", article: "" },
    {
        name: "Taxe de superficie", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "TS", date: 31, month: 2, year: new Date().getFullYear() + (new Date().getMonth() < 2 ? 0 : 1) }
            ]
        }
    },
    { name: "Redevances sur l’extraction des matériaux de carrières", article: "" },
    {
        name: "TCTS", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "TCTS", date: 15, year: new Date().getFullYear(), question: "Quel étais le mois de la retenu à la source ?" }
            ]
        }
    },
    {
        name: "Taxe municipales sur les carburants", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "Taxe municipales sur les carburants", date: 25, year: new Date().getFullYear(), question: "Quel est le mois auquel vous avez été livré ?" }
            ]
        }
    },
    { name: "RUR", article: "" },
    {
        name: "Taxe sur les contrats d’assurances", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "Taxe sur les contrats d'assurances", date: 15, month: (new Date().getDate() < 15 ? 0 : 1) + new Date().getMonth(), year: new Date().getFullYear() }
            ]
        }
    },
    { name: "Taxe Forfaitaire d’habitation", article: "" },
    { name: "TSIL", article: "" },
    {
        name: "FNH", article: "", alert: {
            echeance_count: 1,
            echeance: [
                { title: "FNH", date: 15, year: new Date().getFullYear(), question: "Quel étais le mois de la retenu à la source ?" }
            ]
        }
    },
    { name: "TJH", article: "" },
    { name: "TBP", article: "" },
];

window.addEventListener('load', async () => {
    _user = await fetchUserData();
    _formeJuridiques = await fetchFormeJuridique();
    checkUserFormJuridique();
})

async function fetchUserData() {
    try {
        const res = await fetch('/api/users/auth');
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
        const res = await fetch('/api/forme-juridique');
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

function checkUserFormJuridique() {
    if (_user.formeJuridique) {
        displayImpot();
    } else {
        displayGetUserFormJuridiqueDialog();
    }
}

function displayGetUserFormJuridiqueDialog() {
    displayUpdateFormeJuridiqueDialog();
    addFormeJuridiqueOptionOnSelect();
}

function addFormeJuridiqueOptionOnSelect() {
    const select = document.querySelector('.forme-juridique');
    _formeJuridiques.forEach(fm => {
        if (fm.impot != []) {
            const option = document.createElement('option');
            option.value = fm.value;
            option.innerHTML = fm.value;
            select.appendChild(option);
        }
    })
}

function displayImpot() {
    document.querySelector('.my-forme-juridique').innerHTML = "<strong>" + _user.formeJuridique + "</strong>"
    displayImpotsObligatoire();
    displayImpotNotObligatoire();
}

function displayImpotsObligatoire() {
    const container = document.querySelector('#impots-obligatoire');
    console.log(_formeJuridiques);
    const formeJuridiqueData = _formeJuridiques.find(fm => fm.value == _user.formeJuridique);
    console.log(formeJuridiqueData);
    if (formeJuridiqueData) {
        const impotStates = formeJuridiqueData.impot;
        for (let i = 0; i < impotStates.length; i++) {
            if (impotStates[i] == true) {
                const impot = _impots[i];
                //Create impot row
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                td1.innerHTML = impot.name;
                td2.innerHTML = impot.article;
                tr.appendChild(td1);
                tr.appendChild(td2);
                container.appendChild(tr);
            }
        }
    }
}

function displayImpotNotObligatoire() {
    const container = document.querySelector('#impots-not-obligatoire');

    const formeJuridiqueData = _formeJuridiques.find(fm => fm.value == _user.formeJuridique);
    console.log(formeJuridiqueData);
    if (formeJuridiqueData) {
        const impotStates = formeJuridiqueData.impot;
        for (let i = 0; i < impotStates.length; i++) {
            if (impotStates[i] !== true && impotStates[i] !== false) {
                const impot = _impots[i];
                //Create impot row
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');

                td1.innerHTML = impot.name;
                td3.innerHTML = impot.article;
                td2.innerHTML = impotStates[i];
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                container.appendChild(tr);
            }
        }
    }
}