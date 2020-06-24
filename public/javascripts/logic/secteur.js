const secteur = [
    {
        str: "ACHETEUR DE CACAO, sans établissement fixe (patente établie par commune ou par département).",
        lbv_pog_fcv: 132000,
        autre_commune: 132000,
        departement: 132000
    },
    {
        str: "ACHETEUR DE PRODUITS DU CRU, sans établissement fixe (patente établie par commune ou par département).",
        lbv_pog_fcv: 132000,
        autre_commune: 132000,
        departement: 132000
    },
    {
        str: "AFFAIRE (Agent d'): Employant plus d’une personne",
        lbv_pog_fcv: 297000,
        autre_commune: 297000,
        departement: 297000
    },
    {
        str: "AFFAIRE (Agent d'): Employant une personne",
        lbv_pog_fcv: 231000,
        autre_commune: 231000,
        departement: 231000
    },
    {
        str: "AFFAIRE (Agent d'): Travaillant seul",
        lbv_pog_fcv: 203500,
        autre_commune: 203500,
        departement: 176000
    },
    {
        str: "APPAREILS A JEUX (location de).",
        lbv_pog_fcv: 231000,
        autre_commune: 231000,
        departement: 231000
    },
    {
        str: "APPAREILS ELECTRONIQUES et accessoires (vendeurs de) : Important",
        lbv_pog_fcv: 500000,
        autre_commune: 250000,
        departement: 165000
    },
    {
        str: "APPAREILS ELECTRONIQUES et accessoires (vendeurs de) : n’important pas",
        lbv_pog_fcv: 250000,
        autre_commune: 150000,
        departement: 100000
    },
    {
        str: "ARTISAN (charpentier, couvreur, écailliste, voirier, maçon, menuisier, peintre en bâtiment, plombier, teinturier, etc.): employant 1 à 5 personnes.",
        lbv_pog_fcv: 137000,
        autre_commune: 137000,
        departement: 126500
    },
    {
        str: "ARTISAN (charpentier, couvreur, écailliste, voirier, maçon, menuisier, peintre en bâtiment, plombier, teinturier, etc.): travaillant seul.",
        lbv_pog_fcv: 88000,
        autre_commune: 88000,
        departement: 82500
    },
    {
        str: "ATELIER (exploitant un).",
        lbv_pog_fcv: 203500,
        autre_commune: 203500,
        departement: 176000
    },
    {
        str: "ATELIER MECANOGRAPHIQUE",
        lbv_pog_fcv: 297000,
        autre_commune: 297000,
        departement: 297000
    },
    {
        str: "BETAIL (marchand de)",
        lbv_pog_fcv: 300000,
        autre_commune: 270000,
        departement: 200000
    },
    {
        str: "BIJOUTIER – HORLOGER : vendant des objets importés par lui",
        lbv_pog_fcv: 370000,
        autre_commune: 330000,
        departement: 250000
    },
    {
        str: "BIJOUTIER – HORLOGER : vendant des objets importés par lui",
        lbv_pog_fcv: 203500,
        autre_commune: 203500,
        departement: 137500
    },
    {
        str: "BIJOUTIER – HORLOGER : vendant des objets fabriqués par lui et n’important pas",
        lbv_pog_fcv: 250000,
        autre_commune: 180000,
        departement: 100000
    },
    {
        str: "BLANCHISSEUR, PRESSING ET LAVERIE AUTOMATIQUE",
        lbv_pog_fcv: 250000,
        autre_commune: 180000,
        departement: 100000
    },
    {
        str: "BOIS DE CHAUFFE OU DE CHAUFFAGE (marchand de): vendant à des clients autres que les bateaux de passage",
        lbv_pog_fcv: 88000,
        autre_commune: 88000,
        departement: 82500
    },
    {
        str: "BOIS DE CHAUFFE OU DE CHAUFFAGE (marchand de) ne vendant qu’à des bateaux de passage",
        lbv_pog_fcv: 48400,
        autre_commune: 48400,
        departement: 41800
    },

    {
        str: "BOIS DE CHAUFFE OU DE CHAUFFAGE (marchand de) vendant au petit détail",
        lbv_pog_fcv: 38000,
        autre_commune: 38500,
        departement: 35200
    },
    {
        str: "BOISSONS LOCALES (fabricant de)",
        lbv_pog_fcv: 38500,
        autre_commune: 38500,
        departement: 35200
    },
    {
        str: "BOUCHER /CHARCUTIER: importateur ayant boutique ou installation fixe dans un centre",
        lbv_pog_fcv: 297000,
        autre_commune: 297000,
        departement: 297000
    },
    {
        str: "BOUCHER /CHARCUTIER: ayant boutique ou installation fixe dans un centre et n’important pas",
        lbv_pog_fcv: 203500,
        autre_commune: 203500,
        departement: 176000
    }, {
        str: "BOUCHER /CHARCUTIER: vendant dans un centre sans boutique ni installation fixe",
        lbv_pog_fcv: 88000,
        autre_commune: 88000,
        departement: 82500
    }, {
        str: "BOUCHER /CHARCUTIER: vendant hors d’un centre sans boutique ni installation fixe",
        lbv_pog_fcv: 38500,
        autre_commune: 38500,
        departement: 35200
    },
    {
        str: "BOULANGER : employant des moyens mécaniques",
        lbv_pog_fcv: 187000,
        autre_commune: 187000,
        departement: 187000
    },
    {
        str: "BOULANGER : sans moyens mécaniques employant cinq personnes",
        lbv_pog_fcv: 137500,
        autre_commune: 137500,
        departement: 126500
    },
    {
        str: "BOULANGER : sans moyens mécaniques employant moins de cinq personnes",
        lbv_pog_fcv: 48400,
        autre_commune: 48400,
        departement: 41800
    },
    {
        str: "BRIQUETERIE",
        lbv_pog_fcv: 132000,
        autre_commune: 132000,
        departement: 132000
    },
    {
        str: "BROCANTEUR important",
        lbv_pog_fcv: 370000,
        autre_commune: 300000,
        departement: 210000
    },
    {
        str: "BROCANTEUR n’important pas",
        lbv_pog_fcv: 300000,
        autre_commune: 270000,
        departement: 210000
    }, {
        str: "CAFE titulaire d’une licence de 1° classe : faisant dancing",
        lbv_pog_fcv: 781000,
        autre_commune: 473000,
        departement: 324500
    },
    {
        str: "CAFE titulaire d’une licence de 1° classe : ne faisant pas dancing",
        lbv_pog_fcv: 231000,
        autre_commune: 143000,
        departement: 126500
    },
];

function loadSecteurOnSelecteur(){
    const select = document.querySelector('select[name="secteur"]');
    let i = 0;
    secteur.forEach(s => {
        const option = document.createElement('option');
        option.value = i++;
        option.innerHTML = s.str;
        select.appendChild(option);
    });
}