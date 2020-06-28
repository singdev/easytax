async function updateProfil() {
    document.querySelector(".result").innerHTML = "Veuillez patienter s'il vous plait";
    const inputs = document.querySelectorAll("select, input");
    const data = {};
    inputs.forEach(i => {
        data[i.name] = i.value;
    })
    console.log(data);
    const res = await fetch("/api/users", {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (res.status == 200) {
        document.querySelector(".result").innerHTML = "Votre mot de passe a été changé avec succès";
        document.querySelector(".result").style.color = 'green';
        document.querySelector('button').classList.remove("hide-element");
    } else {
        document.querySelector(".result").innerHTML = "Une erreur c'est produit lors du changement de mot de passe, Veuillez recharger la page puis reéssayer";
        document.querySelector(".result").style.color = "red";
    }
}

function verifyAndUpdatePassword() {
    const password = document.querySelector('input[name="password"]').value;
    const confPassword = document.querySelector('input[name="confPassword"]').value;
    console.log(confPassword);
    console.log(password);
    if (password.length < 6) {
        alert("Minimum 6 caractères");
    }
    if (password == confPassword) {
        updateProfil();
    } else {
        alert("Les mot de passe doivent être identique");
    }
}