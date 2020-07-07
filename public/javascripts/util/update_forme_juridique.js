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
            window.location.reload();
            closeUpdateFormJuridiqueDialog();
            displayImpotsObligatoire();
        }
    } catch (err) {
        console.log(err);
    }
}

function closeUpdateFormJuridiqueDialog() {
    document.querySelector('.forme-juridique-update').classList.remove('show-dialog');
}

function displayUpdateFormeJuridiqueDialog(){
    document.querySelector('.forme-juridique-update').classList.add('show-dialog');
}