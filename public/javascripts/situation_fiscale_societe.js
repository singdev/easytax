nextBase();

function finish(){
    const css = CSSData();
    const rf = RFData();
    const is = ISData();
    const cfp = CFPData();
    showResultView();
    document.querySelector('.css-value').innerHTML = css;
    document.querySelector('.rf-value').innerHTML = rf;
    document.querySelector('.is-value').innerHTML = is;
    document.querySelector('.cfp-value').innerHTML = cfp;
    document.querySelector('.total-value').innerHTML = css + rf + is + cfp;
}

function RFData() {
    const inputRs = document.querySelectorAll(".rf input[type='text']");
    const recette_brute = getValueByName(inputRs, 'recette_brute');
    const charge_proprietaire_par_locataire = getValueByName(inputRs, 'charge_proprietaire_par_locataire');
    const depense_proprietaire_pour_locataire = getValueByName(inputRs, 'depense_proprietaire_pour_locataire');
    const total_interet = getValueByName(inputRs, 'total_interet');
    const valeur_venal = getValueByName(inputRs, 'valeur_venal');
    const valeur_locative = getValueByName(inputRs, 'valeur_locative');
    const loyer_mensuel = getValueByName(inputRs, 'loyer_mensuel');

    return calculRF({
        recette_brute, charge_proprietaire_par_locataire,
        depense_proprietaire_pour_locataire, total_interet,
        valeur_locative, valeur_venal, loyer_mensuel
    });
}

function CSSData(){
    const inputRs = document.querySelectorAll(".css input[type='text']");
    const chiffre_affaire = getValueByName(inputRs, 'chiffre_affaire');
    return calculCSS({chiffre_affaire});
}

function ISData(){
    const inputRs = document.querySelectorAll(".is input[type='text']");
    const is_precedent = getValueByName(inputRs, 'is_precedent');
    const benefice_fiscal = getValueByName(inputRs, 'benefice_fiscal');

    return calculIS({is_precedent, benefice_fiscal});
}

function CFPData(){
    const inputRs = document.querySelectorAll(".cfp input[type='text']");
    const masse_salariale = getValueByName(inputRs, 'masse_salariale');
    
    return calculCFB({ masse_salariale });
}