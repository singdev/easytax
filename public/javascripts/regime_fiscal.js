let _formeJuridiques = [];
let _user = null;

const _impots = [
    { name: "IS", article: "" },
    { name: "IRPP", article: "" },
    { name: "TVA", article: "" },
    { name: "Patentes", article: "" },
    { name: "Licences", article: "" },
    { name: "CFPB", article: "" },
    { name: "CFPNB", article: "" },
    { name: "CSS", article: "" },
    { name: "CFP", article: "" },
    { name: "DET", article: "" },
    { name: "Taxe de superficie", article: "" },
    { name: "Redevances sur l’extraction des matériaux de carrières", article: "" },
    { name: "TCTS", article: "" },
    { name: "Taxe municipales sur les carburants", article: "" },
    { name: "RUR", article: "" },
    { name: "Taxe sur les contrats d’assurances", article: "" },
    { name: "Taxe Forfaitaire d’habitation", article: "" },
    { name: "TSIL", article: "" }, { name: "FNH", article: "" },
    { name: "TJH", article: "" }, { name: "TBP", article: "" },
];

window.addEventListener('load', async () => {
    await fetchUserData();
    await fetchFormeJuridique();
    checkUserFormJuridique();
})

async function fetchUserData() {
    try {
        const res = await fetch('/api/users/auth');
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
        const res = await fetch('/api/forme-juridique');
        if (res.status == 200) {
            _formeJuridiques = await res.json();
            console.log(_formeJuridiques);
        }
    } catch (err) {
        console.log(err);
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
    document.querySelector('.forme-juridique-update').classList.add('show-dialog');
    addFormeJuridiqueOptionOnSelect();
}

function closeUpdateFormJuridiqueDialog() {
    document.querySelector('.forme-juridique-update').classList.remove('show-dialog');
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

async function updateFormeJuridique() {
    const formeJuridique = document.querySelector('.forme-juridique').value;
    try {
        const res = await fetch('/api/users', {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                formeJuridique
            })
        });
        if (res.status == 200) {
            closeUpdateFormJuridiqueDialog();
            displayImpotsObligatoire();
        }
    } catch (err) {
        console.log(err);
    }
}

function displayImpot(){
    document.querySelector('.my-forme-juridique').innerHTML = "<strong>" + _user.formeJuridique + "</strong>" 
    displayImpotsObligatoire();
    displayImpotNotObligatoire();
}

function displayImpotsObligatoire() {
    const container = document.querySelector('#impots-obligatoire');

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

function displayImpotNotObligatoire(){
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