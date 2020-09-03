let formContainers = [];
let index = 0;
let formeJuridiqueType = null;

let responseSituationGeographique = null;
let responseIFU = null;
let quartierSudLimit;

const quartierSud = [
    ["Du pont NOMBA jusqu'a tout Owendo"],
    ["Centre ville (à partir du ministère des TP )", "Glass", "Toulon", "London", "Saint Germain", "Baraka"],
    ["Feu rouge plaint niger", "Lalala à droite", "Lalala à gauche", "Lalala Dakar", "Ozangue", "Mindoube"],
    ["Nzeng Ayong", "PK5", "PK6", "PK7", "PK8", "PK9", "PK10", "PK11", "PK12"]
];

const quartierNord = [
    [
        "Cap Estérias",
        "Cap Santa Clara",
        "Avorbame",
        "Cap Estérias",
        "Agondjé",
        "Ciciba",
        "Mikolongo",
        "Okala",
        "Sablière",
        "Aéroport",
        "Tahiti côté CES",
        "Tahiti Côté Hotel Laico",
        "Autres (Zone Lycée Léon MBA)",
        "Dialoque Lycée Mba",
        "Cité Kalikake",
        "Trois quartierNord",
        "Les Hauts de Gue Gue",
        "Les Bas de Gue Gue",
        "Cité des Ailes",
        "Lycée d'Etat",
        "Lycée Awassi"
    ],
    [
        "Alibadeng",
        "Ambowê",
        "Bel Air",
        "Derrière Cité de la Démocratie",
        "Ondogho",
        "Camp de Gaule",
        "Charbonnages",
        "Dibadiba",
        "Carrefour GP Côté droit",
        "Ancien SOBRAGA(Face RTG à Ambassade Cameroun)",
        "Siège UGDD",
        "Rond Point 12 Mars",
        "Derrière Palais de Justice",
        "Palais de Justice",
        "ENSET(Enset  à l'Ambassade du Benin)",
        "Derrière Ecole Normale",
        "Ministère de la Santé au Lycée Français",
        "Lycée Montaigne, Carrefour Mairie 1er Arrondi",
        "Derrière la Prison",
        "Gros Bouquet",
        "Les Trois quartierNord",
        "Battérie 4 (Battérie 4, CITIBANK)",
        "Feux Rouges Gros Bouquet au Marché Louis",
        "Derrière Marché de Louis",
        "Cotton Club du Côté gauche",
        "Louis(Papa Union au Marché Louis côté droit)",
        "Quaben et bord de mer",
        "Louis(Papa Union au Marché Louis côté gauche",
        "Marché de Louis,FOBER Gabon,Carrefour Raponda",
        "Cité Pompidou",
        "Bvd triomphal (Ambas.Guinée au Min. Eau Forêt",
        "RTG,  L'Union, Ministère des Mines",
        "UOB",
        "Plaine Orety(Carref. Raponda à derrière Mbolo",
        "Plaine Orety (Derrière l'Assemblée Nationale)",
        "Mbolo, Jeanne Ebori au Carref. Raponda",

    ],
    [
        "Port Mole",
        "Vallée Ste Marie",
        "Atong Abè",
        "La Campagne",
        "GARE ROUTIERE - STFO",
        "Ccotiers",
        "Nkembo (Avant échangeur RTG du côté droit)",
        "Nkembo(SOS Médecin,Station à Bretel. Cocotier",
        "Nkembo (Sociga, bretelle Sotega)",
        "Rond Point 12 Mars",
        "Nkembo (Marché NKEMBO)",
        "Atsibe Tsos (Pharmacie Nkembo)",
        "Camp de Police, SIAT GABON et EUGEN",
        "Blvrd Triomphale(Bord de mer de Géant CKDO)",

    ],
    [
        "Sainte Anne, Gabosep)",
        "Montagne Sainte",
        "Centre ville ( Imm Air France, Imp st joseph)",
        "Centre ville (  SEEG aux neux étages )",
        "Neuf étages",
        "Nombakélé(feux rouges-Mairie 3ème et environs",
        "CENTRE VILLE, AVENUE DE COINTET",
        "Derrière l'hôpital",
        "Marché Mont-Bouet",
        "montagne Sainte(côé Anciens Combattants)",
        "Mont Fort(Station bessieux,derrière station)",
        "STFO Sorbonne,Saint Michel",
        "Petit paris",
        "Peyrie",
        "Akébé Ville(Poste Akébé,petit paris côté droit",
    ]
]

window.addEventListener('load', async () => {
    formContainers = document.querySelectorAll('.form-container-2');
    let user = await fetchUser();
    let fms = await fetchFormeJuridique();
    let fm = fms.find(f => f.value == user.formeJuridique);
    formeJuridiqueType = fm.type;
    if (fm.type == 'p') {
        index = formContainers.length-1;
        formContainers[index].classList.add('current-form-container');
    } else {
        index = 0;
        formContainers[index].classList.add('current-form-container');
    }
    displayQuartier();
})

function displayQuartier() {
    const select = document.querySelector('select[name="quartier"]');
    quartierSudLimit = 0;
    createQuartierOptions(quartierSud, select);
    quartierSudLimit = select.querySelectorAll('option').length;
    createQuartierOptions(quartierNord, select);
}

function createQuartierOptions(quartiers, select){
    let count = 0;
    for (let i = 0; i < quartiers.length; i++) {
        const ifu = quartiers[i];
        ifu.forEach(quartier => {
            const option = document.createElement('option');
            option.value = "IFU-" + (i + 1) + " " + (count + quartierSudLimit);
            option.innerHTML = quartier;
            select.appendChild(option);
            count++;
        })
    }
}

async function fetchUser() {
    try {
        const res = await fetch("/api/users/auth");
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        return null;
    }
}

async function fetchFormeJuridique() {
    try {
        const res = await fetch("/api/forme-juridique");
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        return null;
    }
}


function nextQuestion() {
    if (index == 0) {
        let situation = null;
        const situationsRadio = document.querySelectorAll('input[name="situation"]');
        situationsRadio.forEach(sr => {
            if (sr.checked) {
                situation = sr.value;
            }
        })
        if (situation == 'creation') {
            index = formContainers.length-1;
        } else if (situation == 'ca_80_15') {
            index = formContainers.length - 3;
            responseSituationGeographique = "CENTRE DES IMPÔTS DES MOYENNES ENTREPRISES D OWENDO (CIME en face de la pédiatrie)";
        } else if (situation == 'ca_80') {
            index = formContainers.length-1;
        } else if (situation == 'ca_15') {
            index = formContainers.length - 2;
            responseSituationGeographique = "DIRECTION DES GRANDES ENTREPRISES (GLASS face pharmacie iboga)";
        }
        formContainers.forEach(fc => {
            fc.classList.remove('current-form-container');
        });
        formContainers[index].classList.add('current-form-container');
    } else if (index == formContainers.length - 1) {
        const v = document.querySelector('select[name="quartier"]').value;
        console.log(v);
        responseIFU = v.split(" ")[0];
        const quartierIndex = v.split(" ")[1];
        console.log(quartierIndex);
        if(quartierIndex < quartierSudLimit){
            responseSituationGeographique = "Centre des impôts des petites entreprises et des particuliers de LBV SUD ( oloumi,  le bâtiment de derrière  ou il y a un parking)";
        } else {
            responseSituationGeographique = "Centre des impôts des petites entreprises et des particuliers de LBV NORD ( OLOUMI premier bâtiment en bordure de route)";
        }

        formContainers.forEach(fc => {
            fc.classList.remove('current-form-container');
        });
        document.querySelector('.ifu-result').classList.add('show-result');
        document.querySelector('.zone').innerHTML = responseSituationGeographique;
        document.querySelector('.ifu').innerHTML = responseIFU;
    } else if (index == formContainers.length - 2) {
        responseIFU = document.querySelector('select[name="ca_15"]').value;
        formContainers.forEach(fc => {
            fc.classList.remove('current-form-container');
        });
        document.querySelector('.ifu-result').classList.add('show-result');
        document.querySelector('.zone').innerHTML = responseSituationGeographique;
        document.querySelector('.ifu').innerHTML = responseIFU;
    } else if (index == formContainers.length - 3) {
        responseIFU = document.querySelector('select[name="ca_80_15"]').value;
        formContainers.forEach(fc => {
            fc.classList.remove('current-form-container');
        });
        document.querySelector('.ifu-result').classList.add('show-result');
        document.querySelector('.zone').innerHTML = responseSituationGeographique;
        document.querySelector('.ifu').innerHTML = responseIFU;
    }
}

function previousQuestion() {
    const s = formContainers.length;
    if (index == s - 1 && formeJuridiqueType == 'p') {
        index = 1;
    } else if (index == s - 1 && formeJuridiqueType == 's') {
        index = 0;
    } else {
        index = 0;
    }
    formContainers.forEach(fc => {
        fc.classList.remove('current-form-container');
    });
    formContainers[index].classList.add('current-form-container');
}