window.addEventListener('load', async () => {
    fetchUser();
})


function verifyAndUpdatePassword(){
    const password = document.querySelector('input[name="password"]').value;
    const confPassword = document.querySelector('input[name="confPassword"]').value;
    console.log(confPassword);
    console.log(password);
    if(password.length < 6){
        alert("Minimum 6 caractères");
    }
    if(password == confPassword){
        updateProfil();
    } else {
        alert("Les mot de passe doivent être identique");
    }
}

function displayUpdatePassword(){
    document.querySelector('.update-password').classList.add("show-dialog");
}

function closeDialog(){
    document.querySelector('.update-password').classList.remove("show-dialog");
}

async function fetchUser(){
    user =  await (await fetch("/api/users/auth")).json();
    fetchFormJuridique(user.formeJuridique)
}

async function fetchFormJuridique(formeJuridique){
    const res = await fetch('/api/forme-juridique');
    if(res.status == 200){
        const formeJuridiques = await res.json();
        const container = document.querySelector("select[name='formeJuridique']");
        const option = document.createElement('option');
        option.value = undefined;
        option.innerHTML = "Nom défini";
        container.appendChild(option);

        formeJuridiques.forEach(fm => {
            const option = document.createElement('option');
            option.value = fm.value;
            option.innerHTML = fm.value;
            container.appendChild(option);
            if(formeJuridique == fm.value){
                option.selected = true;
            }
        })
    }
}

async function updateProfil(){
    const inputs = document.querySelectorAll("select, input");
    const data = {};
    inputs.forEach(i => {
        data[i.name] = i.value;
    })
    const res = await fetch("/api/users", {
        method: 'PUT',
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    });
    if(res.status ==200){
        window.location.reload();
    }
}