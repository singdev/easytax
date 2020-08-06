let _user = null;

window.addEventListener('load', async () => {
    await fetchUserData();
    if(_user.situationFiscale){
      load();
    } else {
        document.querySelector('.societe').style.display = 'none';
        document.querySelector('.particulier').style.display = 'none';
        document.querySelector('.empty_sf').innerHTML = "Vous n'avez pas encore Déterminé le montant des impôts que vous devez payer !";
    } 

    if(_user.penalites){
        loadPenalites();
    } else {
        document.querySelector('.empty_p').innerHTML = "Vous n'avez pas encore Déterminé vos pénalités";
    }
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

function loadPenalites(){
    const _penalites = JSON.parse(_user.penalites);
    const tbody = document.querySelector('.penalites tbody');

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

function load() {
    const situationFiscal = JSON.parse(_user.situationFiscale);
    if (situationFiscal.css) {
        document.querySelector('.particulier').style.display = 'none';
        document.querySelector('.css-value').innerHTML = situationFiscal.css;
        document.querySelector('.rf-value').innerHTML = situationFiscal.rf;
        document.querySelector('.is-value').innerHTML = situationFiscal.is;
        document.querySelector('.cfp-value').innerHTML = situationFiscal.cfp;
    } else {
        document.querySelector('.societe').style.display = 'none';
        if (situationFiscal.ISL) {
            document.querySelector('.irpp-cn').classList.add("hide-irpp");
            document.querySelector('.isl').classList.add("show-isl");
            document.querySelector('.isl-value').innerHTML = situationFiscal.ISL;
            console.log("ISL");
        } else {
            document.querySelector('.isl').classList.add("hide");

            document.querySelector('.rs-value').innerHTML = addThreeSpace(situationFiscal.base_imposable.RS);
            document.querySelector('.rf-value').innerHTML = addThreeSpace(situationFiscal.base_imposable.RF);
            document.querySelector('.pc-value').innerHTML = addThreeSpace(situationFiscal.base_imposable.PC);
            document.querySelector('.irvm-value').innerHTML = addThreeSpace(situationFiscal.base_imposable.IRVM);
            document.querySelector('.bic-value').innerHTML = addThreeSpace(situationFiscal.base_imposable.BIC);
            document.querySelector('.ba-value').innerHTML = addThreeSpace(situationFiscal.base_imposable.BA);

            document.querySelector('.nombre_part').innerHTML = situationFiscal.quotient_familial.K;

            document.querySelector('.irpp').innerHTML = addThreeSpace(situationFiscal.IRPP);
            if (situationFiscal.IRPP == 0) {
                document.querySelector('.forfait').classList.add("show-forfait");
            }
        }
    }
}