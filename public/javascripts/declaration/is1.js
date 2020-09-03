
let _user = null;
let _situation_fiscal;
let _location;

window.addEventListener('load', async () => {
    load(0);
})

window.addEventListener('load', async () => {
    load(1);
})

window.addEventListener('load', async () => {
    load(2);
})


async function load(index) {
    _user = await fetchUserData();
    _location = await fetchLocation();
    if (_user.situationFiscale) {
        _situation_fiscal = JSON.parse(_user.situationFiscale);
    }
    autoCompleteField(index);
}

async function fetchLocation() {
    try {
        const res = await fetch("");
        if (res.status == 200) {
            return await res.json();
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

function autoCompleteField(i) {
    document.querySelectorAll('input[name="raison_social"]')[i].value = _user.nom;
    document.querySelectorAll('input[name="telephone"]')[i].value = _user.telephone;
    document.querySelectorAll('input[name="ville"]')[i].value = _location ? _location.city : "";
    document.querySelectorAll('input[name="email"]')[i].value = _user.email;

    if (_situation_fiscal) {
        if (i < 2) {
            document.querySelectorAll('input[name="is_precedent"]')[i].value = _situation_fiscal.is_precedent;
        } else {
            document.querySelectorAll('input[name="is_precedent"]')[i].value = _situation_fiscal.is;
        }
    } else {
        window.alert("Vous n'avez pas encore calculer le montant des impôts sur l'application");
    }
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

function remplir(taux, i) {
    if (i == 0) {
        window.location = "#page";

    } else if (i == 1) {
        window.location = "#page2";
    } else if (i == 2) {
        window.location = "#page_s";
    }
    document.querySelectorAll('.raison_social')[i].innerHTML = document.querySelectorAll('input[name="raison_social"')[i].value;
    document.querySelectorAll('.sigle')[i].innerHTML = document.querySelectorAll('input[name="sigle"')[i].value;
    document.querySelectorAll('.ville')[i].innerHTML = document.querySelectorAll('input[name="ville"')[i].value;
    document.querySelectorAll('.email')[i].innerHTML = document.querySelectorAll('input[name="email"')[i].value;
    document.querySelectorAll('.telephone')[i].innerHTML = document.querySelectorAll('input[name="telephone"')[i].value;
    document.querySelectorAll('.telecopie')[i].innerHTML = document.querySelectorAll('input[name="telecopie"')[i].value;
    document.querySelectorAll('.boite_postal')[i].innerHTML = document.querySelectorAll('input[name="boite_postal"')[i].value;
    document.querySelectorAll('.code_residence')[i].innerHTML = document.querySelectorAll('input[name="code_residence"')[i].value;
    document.querySelectorAll('.site_internet')[i].innerHTML = document.querySelectorAll('input[name="site_internet"')[i].value;

    if (i < 2) {
        const impot = document.querySelectorAll('input[name="is_precedent"]')[i].value.replace(/ /g, "").trim();
        const montant = taux * impot;

        document.querySelectorAll('.impot')[i].innerHTML = impot;
        document.querySelectorAll('.montant')[i].innerHTML = montant;
    } else {
        document.querySelectorAll('.titre_exercice')[0].innerHTML = document.querySelectorAll('input[name="is_precedent"')[i].value;
        document.querySelectorAll('.total_payer')[0].innerHTML = document.querySelectorAll('input[name="is_paye"')[0].value;
        document.querySelectorAll('.total_paye')[0].innerHTML = document.querySelectorAll('input[name="solde"')[0].value;
    }
}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write(`
    <!DOCTYPE html>
    <html><head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost&family=Noto+Sans&family=Noto+Sans+JP&family=Open+Sans&display=swap" />
        <link rel="stylesheet" href="/stylesheets/declaration.css" />
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="/stylesheets/declaration/is1_fiche.css" />
        </head><body onload="window.print()">` + printContents + '</body></html>');
    popupWin.document.close();
}