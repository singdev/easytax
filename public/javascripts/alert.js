function showSituationFiscalAlerteDialog(user) {
    console.log(user);
    const userData = user;
    if(userData.formeJuridique){
        window.location = "/situation-fiscale";
        return;
    }
    const array = [
        "SARL",
        "SAS",
        "SUARL",
        "Société Anonyme",
        "Particulier",
        "Entreprise individuelle",
        "Société coopératives",
        "Etablissement public",
        "Société en nom collectif",
        "Société en commandite simple",
        "Société en participation",
        "Syndicat financiers",
        "Organisme d’Etat autonome",
        "Syndicat agricole",
        "Caisse de crédit agricole mutuel",
        "Société et union de société de secours mutuel",
        "Association sans but lucratif",
        "Collectivités locales",
        "Offices publics",
        "Mutuelles scolaires",
        "Clubs et cercles privés",
        "GIE",
        "Entreprises d’hôtellerie et de tourisme"];

    let options = "";
    array.forEach(a => {
        options = options + "\n<option value=" + a + ">" + a + "</option>";
    });

    const template = `
        <form action="/situation-fiscale/forme-juridique" method="post">
            <div class="form-group">
                <label>Quel est votre forme juridique?</label>
                <select name="formeJuridique" name="formeJuridique">
                    ${options}
                </select>
            </div>

            <input class="btn-yellow" type="submit" value="Valider"/>
        </form>
    `;
    const element = new DOMParser().parseFromString(template, 'text/html');
    const alert = document.querySelector('.alert');
    alert.classList.remove("zero-height");
    alert.appendChild(element.querySelector("form"));
}

function hideSituationFiscaleAlertDialog(){
    const alert = document.querySelector('.alert');
    alert.classList.add("zero-height");
    alert.removeChild(alert.querySelector("form"));
}