async function updatePasswordRequestSend() {
    const email = document.querySelector("input[name='email']").value;
    document.querySelector('.result').innerHTML = "Veuillez patienter quelque instant s'il vous plaît...";

    const res = await fetch("/api/users/forgot-password/" + email);
    console.log(res.status);
    if (res.status == 200) {
        document.querySelector('.result').innerHTML = "Un email vient de vous être envoyez à cette adresse";
        document.querySelector(".result").style.color = 'green';
    } else if (res.status == 401) {
        document.querySelector('.result').innerHTML = "Cette Email n'est pas enregistré dans easytax";
        document.querySelector(".result").style.color = 'red';
    } else if (res.status == 500) {
        document.querySelector('.result').innerHTML = "Une erreur c'est produit, Veuillez réessayer";
        document.querySelector(".result").style.color = 'red';
    }
}