window.addEventListener('load', async () => {
    const user = await fetchUser();
    const type = await fetchFormJuridiqueType(user);
    console.log(type);
    if (type == "p") {
        document.querySelector('.societe').style.display = 'none';
    } else {
        document.querySelector('.particulier').style.display = 'none';
    }
})

async function fetchUser() {
    return await (await fetch("/api/users/auth")).json();
}

async function fetchFormJuridiqueType(user) {
    const res = await fetch('/api/forme-juridique');
    if (res.status == 200) {
        const formeJuridiques = await res.json();
        let type = "";
        formeJuridiques.forEach(fm => {
            if (fm.value == user.formeJuridique) {
                type = fm.type;
            }
        })
        return type;
    }
}

function changeView(classe){
   const mains = document.querySelectorAll('main > div');
   mains.forEach(m => {
       m.classList.remove('current-declaration');
   })
   document.querySelector('.'+classe).classList.add('current-declaration');
}