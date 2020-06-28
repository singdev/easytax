let _user = null;

window.addEventListener('load', async () => {
    await fetchUserData();
    load();
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