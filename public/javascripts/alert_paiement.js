window.addEventListener('load', () => {
    loadImpots();
});


function showCreateAlertPaiementDialog() {
    document.querySelector('.alert-paiement-create').classList.add('show-dialog');
    const select = document.querySelector('.impots');
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    _impots.forEach(impot => {
        const option = document.createElement('option');
        option.value = impot.value;
        option.innerHTML = impot.value;
        select.appendChild(option);
    });
}

function loadCreateForm(impot, dayCount) {
    const now = new Date();
    const date_limite = new Date(now.getFullYear(), impot.date_limite.month, impot.date_limite.date);
    const date_alert = addDays(date_limite, -dayCount);

    return { date_limite, date_alert };
}

async function createAlert() {
    const impotOPtion = document.querySelectorAll('.impots option');
    let impotSelectedValue = null;
    impotOPtion.forEach(io => {
        if(io.impotSelectedValue){
            impotSelectedValue = io.value;
        }
    });
    let impotData = null;
    _impots.forEach(i => {
        console.log(i.value + " " + impotSelectedValue);
        if(i.value == impotSelectedValue){
            impotData = i;
        }
    });
    const dayCount = document.querySelector('.date_alert');
    const body = loadCreateForm(impots, dayCount);
    body.impot = impotData.value;

    const res = await fetch('/alerts', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(res.status == 200){
        console.log("creation done");
        reloadAlertTable();
    }
}

function reloadAlertTable(){
    //TODO fetch and reload table rows
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function closeCreateAlertPaiementDialog() {
    document.querySelector('.alert-paiement-create').classList.remove('show-dialog');
}

async function loadImpots() {
    try {
        res = await fetch("/api/impots");
        _impots = await res.json();
    } catch (err) {
        console.log(err);
    }

}