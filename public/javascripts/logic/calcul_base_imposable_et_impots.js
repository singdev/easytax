function calculRS({ traitement, emolument, salaire,
    indemnite, avantage_espece_argent, pension,
    retenu_retraite, cotisation_assurance_maladie,
    rente_viagere }) {
    const base = traitement + salaire + indemnite + emolument + avantage_espece_argent
        - pension - retenu_retraite - cotisation_assurance_maladie - rente_viagere;
    const taxe_complementaire_salaire = 5 * base / 100.0;
    const frais_professionnel = 20 * base / 100.0;

    return base - taxe_complementaire_salaire - frais_professionnel;
}

function calculRF({ recette_brute,
    charge_proprietaire_par_locataire,
    depense_proprietaire_pour_locataire,
    total_interet, valeur_venal,
    valeur_locative,
    loyer_mensuel }) {
    const revenu_foncier_brute = recette_brute - depense_proprietaire_pour_locataire + charge_proprietaire_par_locataire;
    const tsil = 12 * 15 * loyer_mensuel / 100;
    const cfpb = valeur_locative - 25 * valeur_locative/100;
    const cfpnb = 80/100 *(10/100 * valeur_venal);
    const total_charge_propriete = total_interet + tsil + cfpnb + cfpb + 30 * revenu_foncier_brute / 100.0;
    return revenu_foncier_brute - total_charge_propriete;
}

function calculPC(biens) {
    let count = 0;
    biens.forEach(b => {
        count += b;
    });
    return count;
}

function calculIRVM({ action, obligation, interets_creances, interets_bon_caisse }) {
    const op = action + obligation + interets_creances + interets_bon_caisse;
    return 20 * op / 100.0;
}

function calculBIC({ prix_vente, prix_achat, frais_transformation }) {
    return prix_vente - prix_achat - frais_transformation;
}

function calculBA(montant_total) {
    return montant_total;
}

/** situation fiscale société */

function calculCSS({ chiffre_affaire }) {
    return chiffre_affaire / 100.0;
}

function calculIS({ is_precedent, benefice_fiscal }) {
    const acompte1 = 25 * is_precedent / 100.0;
    const acompte2 = 33.33 * is_precedent / 100.0;
    const is = 3 * benefice_fiscal / 100.0 - (acompte1 + acompte2);
    return is;
}

function calculCFB({ masse_salariale }) {
    return 0.5 / 100 * masse_salariale;
}
