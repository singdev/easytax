function loadPatente(){
    const select = document.querySelector('select[name="patente"]');
    let i = 0;
    const option = document.createElement('option');
    option.value = -1;
    option.innerHTML = "Je n'ai pas de profession similaire à celle cité ici.";
    select.appendChild(option);    
    patentes.forEach(s => {
        const option = document.createElement('option');
        option.value = i++;
        option.innerHTML = s.str;
        select.appendChild(option);
    });
}

const patentes = [
    {
        str: "Photographe  - Importateur avec établissement fixe",
        lbv_pog: 170000,
        autre_commune: 170000,
        departement: 170000,
    },
    {
        str: "Photographe  - Importateur avec établissement fixe",
        lbv_pog: 170000,
        autre_commune: 170000,
        departement: 170000,
    },
    {
        str: "Photographe  - N'important pas avec établissement fixe",
        lbv_pog: 85000,
        autre_commune: 85000,
        departement: 60000,
    },
    {
        str: "Photographe  - Sans établissement fixe",
        lbv_pog: 24000,
        autre_commune: 24000,
        departement: 18000,
    },
    {
        str: "Plat cuisiné à emporté (vente sur la voie publique)",
        lbv_pog: 75000,
        autre_commune: 75000,
        departement: 55000,
    },

];