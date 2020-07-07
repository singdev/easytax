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
    {
        str: "CAFE–RESTAURANT,titulaire d’une licence de 1°classe:faisant dancing ",
        lbv_pog_fcv: 836000 ,
        autre_commune: 528000 ,
        departement: 379500 
        },
        
        {
        str: "CAFE –RESTAURANT, titulaire d’une licence de 1°classe: ne faisant pas dancing ",
        lbv_pog_fcv: 330000 ,
        autre_commune: 231000 ,
        departement: 203500 
        },
        
        {
        str: "CAFE-RESTAURANT non  titulaire d’une licence de 1ère classe ",
        lbv_pog_fcv: 330000,
        autre_commune: 200000 ,
        departement: 150000 
        },
        
        {
        str: "CAFE –RESTAURANT, BAR titulaire d’une licence de 3°classe:faisant dancing ",
        lbv_pog_fcv: 588000  ,
        autre_commune:380000  ,
        departement: 300000 
        },
        
        {
        str: "CAFE –RESTAURANT, BAR titulaire d’une licence de 3°classe: ne faisant pas dancing ",
        lbv_pog_fcv: 335200 ,
        autre_commune: 247500 ,
        departement: 225500 ,
        },
        
        {
        str: "CASSETTES PRE- ENREGISTREES (Location de) ",
        lbv_pog_fcv: 187000 ,
        autre_commune: 187000 ,
        departement: 187000 
        },
        
        
        {
        str: "CHARBON DE BOIS au petit détail (marchand de) ",
        lbv_pog_fcv: 60000 ,
        autre_commune: 40000 ,
        departement: 30000
        },
        
        
        {
        str: "COIFFEUR AMBULANT",
        lbv_pog_fcv: 38500 ,
        autre_commune: 38500 ,
        departement: 3500 
        },
        
        {
        str: "COIFFEUR POUR DAME (avec importation et vente de produit et accessoire de beauté) ",
        lbv_pog_fcv: 370000,
        autre_commune:330000,
        departement:250000
        },
        
        {
        str: "COIFFEUR POUR HOMMES  ",
        lbv_pog_fcv: 100000,
        autre_commune: 90000,
        departement: 70000
        },
        
        
        {
        str: "COLIS FAMILIAUX (expéditeur de) ",
        lbv_pog_fcv: 137000,
        autre_commune: 137500,
        departement: 126500
        },
        
        
        {
        str: "COMMERCANT AU DETAIL: en vrac et ambulant ",
        lbv_pog_fcv:170000,
        autre_commune: 150000,
        departement: 120000
        },
        
        
        {
        str: "COMMERCANT AU DETAIL: épicerie ",
        lbv_pog_fcv: 181500,
        autre_commune: 154000,
        departement: 148000
        },
        
        
        {
        str: "COMMERCANT AU DETAIL: épicerie avec boucherie ",
        lbv_pog_fcv: 200000,
        autre_commune: 175000,
        departement: 140000
        },
        
        
        {
        str: "COMMERCANT AU DETAIL:épicerie avec boucherie et licence de 4ème classe ",
        lbv_pog_fcv: 200000,
        autre_commune: 190000,
        departement: 150000
        },
        
        
        {
        str: "COMMERCANT AU DETAIL: prêt à porter (n’important pas) ",
        lbv_pog_fcv: 220000,
        autre_commune: 180000,
        departement: 150000
        },
        
        
        {
        str: "COMMERCANT AU DETAIL: prêt à porter (avec  importation) ",
        lbv_pog_fcv: 350000,
        autre_commune: 270000,
        departement: 210000
        },
        
        
        {
        str: " COMMERCANT AU DETAIL:produit de beauté ",
        lbv_pog_fcv: 300000,
        autre_commune: 180000,
        departement: 150000
        },
        
        
        {
        str: "COMMERCANT AU DETAIL: produit de beauté (avec importation) ",
        lbv_pog_fcv: 350000,
        autre_commune: 270000,
        departement: 210000
        },
        
        
        {
        str: " COMMERCANT AU DETAIL: accessoires mobiles et électroniques ",
        lbv_pog_fcv: 350000,
        autre_commune: 270000,
        departement: 210000
        },
        
        
        {
        str: "COMMERCANT AU DETAIL DE POISSONS:",
        lbv_pog_fcv: 137500,
        autre_commune: 137500,
        departement: 126500
        },
        
        
        {
        str: "COMMERCANT AU PETIT DETAIL (en vrac et ambulant):dont le stock est compris entre 100.000 et 500.000francs ",
        lbv_pog_fcv: 100000,
        autre_commune: 90000,
        departement: 60000
        },
        
        
        
        {
        str: "COMMERCANT AU PETIT DETAIL (en vrac et ambulant):dont le stock est inférieur à 100.000 francs ",
        lbv_pog_fcv: 50000,
        autre_commune: 40000,
        departement: 20000
        },
        
        
        {
        str: "COMMERCANT AU PETIT DETAIL (en vrac et ambulant): vendant des boissons alcoolisées ",
        lbv_pog_fcv: 50000,
        autre_commune: 40000,
        departement: 20000
        },
        
        
        {
        str: "COMMERCANT REGRATTIER ",
        lbv_pog_fcv: 50000,
        autre_commune: 40000,
        departement: 20000
        },
        
        
        {
        str: "CORDONNIER, MAROQUINIER : important tout ou partie des produits nécessaires à la fabrication ",  
        lbv_pog_fcv:  200000,
        autre_commune: 170000,
        departement: 140000
        },
        
        
        {
        str: "CORDONNIER, MAROQUINIER :n’important pas ",
        lbv_pog_fcv: 75000,
        autre_commune: 60000,
        departement: 50000
        },
        
        
        {
        str: "CORDONNIER, MAROQUINIER :ambulant ",
        lbv_pog_fcv: 50000,
        autre_commune:40000,
        departement: 30000
        },
        
        
        {
        str: "COUTURIERE AYANT UN ETABLISSEMENT DE VENTE ",
        lbv_pog_fcv: 220000,
        autre_commune: 180000,
        departement: 150000
        },
        
        
        
        {
        str: "COUTURIERE EN CHAMBRE",
        lbv_pog_fcv: 130000,
        autre_commune:110000,
        departement: 90000
        },
        {
        str: "COUTURIER, TAILLEUR AMBULANT ",
        lbv_pog_fcv: 60000,
        autre_commune:50000,
        departement: 40000
        },
        {
        str: "CREATION DE SITE WEB",
        lbv_pog_fcv: 200000,
        autre_commune: 185000,
        departement: 160000
        },
        {
        str: "CULUTURE PHYSIQUE (salle de…)",
        lbv_pog_fcv: 203500,
        autre_commune: 203500,
        departement: 176000
        },
        {
        str: "CYBERCAFE: 1 à 3 appareils (par appareil) ",
        lbv_pog_fcv: 231000,
        autre_commune: 231000,
        departement: 198000
        },
        {
        str: " CYBERCAFE:plus de 3 appareils ",
        lbv_pog_fcv: 231000,
        autre_commune: 231000,
        departement: 198000
        },
        {
            str: "E-BANKING & PRODUITS ASSIMILES ",
            lbv_pog_fcv: 185000,
            autre_commune: 170000,
            departement: 165000
            },
            
            
            {
            str: "ECAILLEUR DE POISSONS",
            lbv_pog_fcv: 44000,
            autre_commune: 38500,
            departement: 35500
            },
            
            
            {
            str: "ECOLE DE DANSE gymnastique culture physique (tenant une) ",
            lbv_pog_fcv: 137000,
            autre_commune: 137000,
            departement: 126500
            },
            
            
            {
            str: "ECRIVAIN PUBLIC",
            lbv_pog_fcv: 38500,
            autre_commune: 38500,
            departement: 35220
            },
            
            
            {
            str: "EDITEUR",
            lbv_pog_fcv: 137500,
            autre_commune: 137500,
            departement: 126500
            },
            
            
            
            {
            str: "ELECTRICITE ET CLIMATISATION AUTO",
            lbv_pog_fcv: 450000,
            autre_commune: 250000,
            departement: 170000
            },
            
            {
            str: "ESTHETICIENNE (voir coiffeur pour dames pour les T. V) ",
            lbv_pog_fcv: 121000,
            autre_commune: 121000,
            departement: 110000
            },
            
            
            {
            str: "ENSEIGNEMENT (établissement d’) : primaire et pré-primaire avec cantine ",
            lbv_pog_fcv: 250000,
            autre_commune: 200000,
            departement: 150000
            },
            
            
            
            {
            str: "ENSEIGNEMENT (établissement d’) : primaire et pré-primaire sans cantine",
            lbv_pog_fcv: 160000,
            autre_commune: 150000,
            departement:100000
            },
            
            
            
            {
            str: "ENSEIGNEMENT (établissement d’) : secondaire",
            lbv_pog_fcv: 250000,
            autre_commune: 200000,
            departement: 150000
            },
            
            
            {
            str: "ENSEIGNEMENT (établissement d’) : prépa (Examens)",
            lbv_pog_fcv: 250000,
            autre_commune: 250000,
            departement: 200000
            },
            
            
            {
            str: "EXECUTION (Agent d’)",
            lbv_pog_fcv: 137500,
            autre_commune: 137500,
            departement: 126500
            },
            
            
            {
            str: "EXPERTISE AUTOMOBILE (tenant un cabinet) ",
            lbv_pog_fcv: 66000,
            autre_commune: 66000,
            departement: 66000
            },
            
            
            {
            str: "EXPORTATEUR (voir IMPORTATEUR)",
            lbv_pog_fcv: 297000,
            autre_commune: 297000,
            departement: 297000
            },
            
            
            {
            str: "FABRIQUE (exploitant une) – voir atelier pour les T. V ",
            lbv_pog_fcv: 203500,
            autre_commune: 203500,
            departement: 176000
            },
            
            
            { 
            str: "FERAILLE (marchand de)",
            lbv_pog_fcv: 242000,
            autre_commune: 242000,
            departement: 242000
            },
            
            
            {
            str: "FLEUR (vente de) Ambulant ",
            lbv_pog_fcv: 185000,
            autre_commune: 165000,
            departement: 135000
            },
            
            
            {
            str: "FONDS DE COMMERCE, installations industrielles ou commerciales (loueur de)",
            lbv_pog_fcv: 203500,
            autre_commune: 203500,
            departement: 176000
            },
            
            
            {
            str: "FORESTIER (exploitant) réalisant par chantier un chiffre d’affaires annuel:compris entre 20 et 50 millions  ",
            lbv_pog_fcv: 231000,
            autre_commune: 231000,
            departement: 231000
            },
            
            
            {
            str: "FORESTIER (exploitant) réalisant par chantier un chiffre d’affaires annuel: compris entre 5 et 20 millions  ",
            lbv_pog_fcv: 203500,
            autre_commune: 203500,
            departement: 176000
            },
            
            
            {
            str: "FORESTIER (exploitant) réalisant par chantier un chiffre d’affaires annuel:inférieur à 5 millions  ",
            lbv_pog_fcv: 137500,
            autre_commune: 137500,
            departement: 176500
            },
            
            
            {
            str: "FRIPIER ",
            lbv_pog_fcv: 88000,
            autre_commune: 88000,
            departement: 82500
            },
            
            
            {
            str: "GARAGISTE OU MECANICIEN : important uniquement les pièces détachées produits nécessaires aux réparations ",
            lbv_pog_fcv: 370000,
            autre_commune: 330000,
            departement: 250000
            },
            
            
            {
            str: "  GARAGISTE OU MECANICIEN: n’important pas ",
            lbv_pog_fcv: 200000,
            autre_commune:170000,
            departement: 140000
            },
            
            
            {
            str: " GARDERIE D’ENFANTS (tenant une)  ",
            lbv_pog_fcv: 137000,
            autre_commune:137500,
            departement: 126500
            },
            
            
            {
            str: " GLACIER CREME  ",
            lbv_pog_fcv:180000 ,
            autre_commune:160000,
            departement:135000 
            },
            
            
            {
            str: " GUIDE DE CHASSE ",
            lbv_pog_fcv:137500 ,
            autre_commune:137500,
            departement: 126500
            },
            
            {
            str: "HOTEL non titulaire d’une licence : disposant de plus de 10 chambres ",
            lbv_pog_fcv: 370000,
            autre_commune:330000,
            departement: 260000
            },
            
            
            {
            str: " HOTEL non titulaire d’une licence : disposant de moins de 10 chambres  ",
            lbv_pog_fcv: 220000,
            autre_commune:180000,
            departement: 150000
            },
            
            
            {
            str: " HOTEL titulaire d’une licence : disposant de plus de 10 chambres  ",
            lbv_pog_fcv: 450000,
            autre_commune:400000,
            departement: 350000
            },
            
            
            {
            str: "  HOTEL titulaire d’une licence :  disposant de moins de 10 chambres ",
            lbv_pog_fcv:350000 ,
            autre_commune:300000,
            departement: 250000
            },
            
            
            {
            str: " INSTITUT DE BEAUTE ",
            lbv_pog_fcv:350000 ,
            autre_commune:300000,
            departement: 200000
            },
            
            
            {
            str: " INTERPRETE – TRADUCTEUR ",
            lbv_pog_fcv: 137500,
            autre_commune:137500,
            departement:126500 
            },
            
            {
            str: " KIOSQUE DE JOURNAUX (tenant un) ",
            lbv_pog_fcv:88000 ,
            autre_commune:88000,
            departement: 82500
            },
            
            
            {
            str: " LIBRAIRE ou PAPETIER :  importateur  ",
            lbv_pog_fcv:370000 ,
            autre_commune:330000,
            departement:250000 
            },
            
            
            {
            str: " LIBRAIRE ou PAPETIER : n’important pas  ",
            lbv_pog_fcv: 300000,
            autre_commune:250000,
            departement: 200000
            },
            
            
            {
            str: " LOCATION DE VEHICULES : 1 à 10 véhicules ",
            lbv_pog_fcv: 300000,
            autre_commune:250000,
            departement: 200000
            },
            
            
            
            {
            str: " LOCATION DE VEHICULES : plus de 10 véhicules  ",
            lbv_pog_fcv: 400000,
            autre_commune:330000,
            departement: 200000
            },
            
            {
            str: "MAGASIN GENERAL (exploitant un)   ",
            lbv_pog_fcv:297000 ,
            autre_commune:297000,
            departement: 297000
            },
            
            
            {
            str: " MAIN D’ŒUVRE (location de)  ",
            lbv_pog_fcv:231000 ,
            autre_commune:231000,
            departement: 231000
            },
            
            
            {
            str: " MANICURE voir coiffeur pour Dames pour les T. V)  ",
            lbv_pog_fcv:121000 ,
            autre_commune:121000,
            departement:110000 
            },
            
            
            {
            str: "  MANUFACTURE (exploitant une) (voir  ATELIER  pour les T.V) ",
            lbv_pog_fcv:159500 ,
            autre_commune:159500,
            departement: 132000
            },
            
            
            {
            str: " MANUTENTION FLUVALE  (voir ACCONAGE)  ",
            lbv_pog_fcv:220000 ,
            autre_commune:220000,
            departement: 198000
            },
            
            
            
        

];

