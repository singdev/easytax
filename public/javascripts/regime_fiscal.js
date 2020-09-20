let _formeJuridiques = [];
let _user = null;


const _impots = [
    {
        name: "IS", article: `
<div class="artcle">
    <h3>Article 8</h3>
    <p>
        Sont obligatoirement soumis à l’impôt sur les sociétés, les sociétés par actions, les sociétés à responsabilité limitée, les sociétés coopératives, et les établissements ou organismes publics. 
        Sous réserve des dispositions de l’article 6 ci-après et des régimes fiscaux particuliers, sont passibles de l’impôt sur les sociétés :
        quel que soit leur objet, les sociétés anonymes, les sociétés par actions simplifiées, les Sociétés A Responsabilité Limitée, les Sociétés Coopératives et leurs unions ;
        les établissements publics, les organismes d’État jouissant de l’autonomie financière, et toutes autres personnes morales se livrant à une exploitation ou à des opérations à caractère lucratif.  <br>

        Sont également passibles de l’impôt sur les sociétés : <br>
        <ul>
          <li>lorsqu’elles se livrent à des opérations d’intermédiaire pour l’achat ou la vente des immeubles ou de fonds de commerce, des actions ou parts des sociétés immobilières ou lorsqu’elles achètent habituellement en leur nom les mêmes biens en vue de les revendre ;</li>
          <li>lorsqu’elles procèdent au lotissement et à la vente, après exécution des travaux d’aménagement et de viabilité, de terrains acquis à titre onéreux ;</li>
          <li>lorsqu’elles donnent en location un établissement commercial ou industriel muni du mobilier et du matériel nécessaires à son exploitation, que la location  comprenne ou non tout ou partie des éléments incorporels du fonds de commerce ou d’industrie.</li>
          <li> les sociétés civiles qui comprennent parmi leurs membres une ou plusieurs sociétés de capitaux ou qui ont opté pour ce régime d’imposition. </li>
        </ul>
        <br>

        <ul>
          <li>Sont en outre soumises à l’impôt sur les sociétés par option, les sociétés de personnes ci-après : <br>
          <li>les sociétés en nom collectif ;</li>
          <li>les sociétés en commandite simple ;</li>
          <li>les sociétés en participation ;</li>
          <li>les syndicats financiers ;</li>
          <li>les sociétés de copropriétaires de navires ou d’immeubles bâtis et non bâtis, pour la part des associés indéfiniment responsables et dont l’identité est connue de l’administration. </li>
        </ul>
    </p>
</div>

        `, alert: {
            echeance_count: 3,
            echeance: [
                { title: "Premier acompte IS", date: 30, month: 10, year: new Date().getFullYear() },
                { title: "Deuxième acompte acompte IS", date: 30, month: 0, year: new Date().getFullYear() + 1 },
                { title: "Solde IS", date: 30, month: 3, year: new Date().getFullYear() + 1 },
            ]
        }
    },
    {
        name: "IRPP", article: `
    <div class="article">
      <h3>Article 79</h3>
      <p>
      Sous réserve des dispositions des articles 75 à 78 ci-dessus, les associés des sociétés en nom collectif et les commandités des sociétés en commandite simple sont, lorsque ces sociétés n’ont pas opté pour l’impôt sur les sociétés, personnellement soumis à l’IRPP pour la part des bénéfices sociaux correspondant à leurs droits dans la société. 
      </p>
      <p>
      Il en est de même des membres des groupements d’intérêt économique, des sociétés civiles, des sociétés en participation et des sociétés de fait non passibles de l’impôt sur les sociétés.
      </p>
    </div>
    `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "IRPP (BIC, BNC, BA): Régime de base", date: 28, month: 1, year: new Date().getMonth() > 1 ? 1 : 0 + new Date().getFullYear(), question: "Quel étais le dernier mois  de la livraison?" }
            ]
        }
    },
    {
        name: "TVA", article: `
        <div class="article">
        <h3>Article 208</h3>
        <p>
        Les personnes visées à l’article 207 ci-dessus, soumises à l’impôt sur les sociétés ou à l’IRPP, qu’elles soient ou non immatriculées, sont redevables de la TVA si le chiffre d’affaires hors taxes s’établit à 150.000.000 FCFA.
Une possibilité d’option pour l’assujettissement à la TVA est autorisée pour les nouveaux contribuables susceptibles de réaliser un chiffre d’affaires équivalent au seuil dès la première année d’exercice.
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "TVA", date: 20, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
            ]
        }
    },
    {
        name: "Patente", article: `
        <div class="article">
        <h3>Article 252</h3>
        <p>
        Toute personne physique ou morale, de nationalité gabonaise ou étrangère, qui exerce au Gabon un commerce, une industrie, une profession non compris dans les exemptions prévues par le présent Code, est assujettie à la contribution des patentes.
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "Patente", date: 28, month: 1, year: new Date().getFullYear() + (new Date().getMonth() < 1 ? 0 : 1) }
            ]
        }
    },
    {
        name: "Licences", article: `
  <div class="article">
  <h3>Article 272</h3>
  <p>
  La contribution des licences est due par toute personne physique ou morale qui se livre à la vente des boissons alcooliques fermentées ou spiritueuses, sous quelle que forme que ce soit.
  </p>
 </div>
    ` },
    {
        name: "CFPB", article: `
        <div class="article">
        <h3>Article 284</h3>
        <p>
        La contribution foncière des propriétés bâties est déterminée sur la base d’un revenu imposable égal à la valeur locative de ces propriétés, sous déduction de 25 % en considération du dépérissement et des frais d’entretien et de réparation.
        </p>
        <p>
        Pour un local inscrit à l’actif de l’entreprise, la valeur locative est égale à 10% de la valeur bilancielle brute sans toutefois être inférieure au dixième de la valeur vénale dudit local. Toutefois, dans l’hypothèse où la valeur vénale n’est pas connue, seule la valeur bilancielle doit être considérée.
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "CFPB", date: 31, month: 2, year: new Date().getFullYear() + (new Date().getMonth() < 2 ? 0 : 1) }
            ]
        }
    },
    {
        name: "CFPNB", article: `
    <div class="article">
    <h3>Article 297</h3>
    <p>
    La contribution foncière des propriétés non bâties est déterminée en raison du revenu imposable de ces propriétés. 
    </p>
    <p>
    Le revenu imposable est égal aux 4/5e de la valeur locative laquelle est elle-même égale à 10 % de la valeur vénale.
    </p>
  </div>
    `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "CFPNB", date: 31, month: 2, year: new Date().getMonth() <= 2 ? 0 : 1 + new Date().getFullYear() }
            ]
        }
    },
    {
        name: "CSS", article: `
    <div class="article">
    <h3>Article 14</h3>
    <p>
    Sont assujetties à la CSS, les personnes physiques et morales y compris les collectivités locales et les
    établissements publics.
    </p>
    <p>
    Sont redevables de la CSS, les personnes physiques et morales réalisant à titre habituel ou occasionnel des
    opérations imposables dont le chiffre d’affaires annuel hors taxes s’établit au moins à 30.000.000 FCFA.
    </p>
  </div>
    
    ` , alert: {
            echeance_count: 1,
            echeance: [
                { title: "CSS", date: 20, month: (new Date().getDate() < 20 ? 0 : 1) + new Date().getMonth(), year: new Date().getFullYear() }
            ]
        }
    },
    {
        name: "CFP", article: `
    <div class="article">
    <h3>Article 8</h3>
    <p>
      La Contribution à la Formation Professionnelle est calculée sur la masse salariale annuelle constituée par l'ensemble de la rémunération brute mensuelle perçue par chaque salarié, y compris les indemnités, primes, gratifications et tous autres avantages en argent, et en nature, avant déduction des retenues faites en vue de la constitution des pensions de retraite et des cotisations de sécurité sociale, dans la limite du plafond fixé par la Caisse Nationale de Sécurité Sociale (CNSS).
    </p>
    <p>
      L'estimation des rémunérations allouées sous la forme d'avantages en nature est faite conformément aux dispositions du Code Général des Impôts.
    </p>
  </div>
    `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "CFP", date: 15, month: new Date().getMonth() < 11 ? (1 + new Date().getMonth()) : 0, year: new Date().getFullYear() }
            ]
        }
    },
    {
        name: "DET", article: `
    <div class="article">
    <h3>Article 79</h3>
    <p>
    </p>
    <p>
    </p>
  </div>
    ` },
    {
        name: "Taxe de superficie", article: `
        <div class="article">
        <h3>Article 316</h3>
        <p>
        Sont assujettis à la taxe de superficie, les personnes physiques ou morales, titulaires de permis forestiers délivrés par l’autorité administrative compétente sous l’une des formes prévues à l’article 94 du Code forestier ou sous l’une des formes antérieures à l’application du Code forestier.
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "TS", date: 31, month: 2, year: new Date().getFullYear() + (new Date().getMonth() < 2 ? 0 : 1) }
            ]
        }
    },
    {
        name: "Redevances sur l’extraction des matériaux de carrières", article: `
    <div class="article">
    <h3>Article 336</h3>
    <p>
    Les exploitants de carrières sont tenus de déposer à la Recette du Centre des Impôts dont ils dépendent, chaque année, au plus tard le 15 du mois qui suit la fin de chaque trimestre, soit le 15 avril, le 15 juillet, le 15 octobre et le 15 janvier, une déclaration établie en double exemplaire sur un imprimé fourni par l’Administration.
L’un des deux exemplaires est rendu au contribuable dûment daté et visé par l’Administration fiscale afin de servir d’accusé de réception.
    </p>
  </div>
    ` },
    {
        name: "TCTS", article: `
        <div class="article">
        <h3>Article 346</h3>
        <p>
        La taxe complémentaire sur les traitements et salaires est due par les personnes physiques qui perçoivent des revenus tels que définis à l’article 90 ci-dessus.
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "TCTS", date: 15, year: new Date().getFullYear(), question: "Quel étais le mois de la retenu à la source ?" }
            ]
        }
    },
    {
        name: "Taxe municipales sur les carburants", article: `
        <div class="article">
        <h3>Article 352</h3>
        <p>
        Lorsqu’ils sont destinés à la consommation sur le territoire national et sauf dispositions législatives contraires, sont soumis au paiement de la taxe municipale sur les carburants les produits pétroliers suivants :
        <br>supercarburant ;
        <br>pétrole ;
        <br>gazole.

        Les produits pétroliers raffinés destinés à la consommation intérieure sont exonérés de droits et taxes de douane.
        </p>
        <p>
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "Taxe municipales sur les carburants", date: 25, year: new Date().getFullYear(), question: "Quel est le mois auquel vous avez été livré ?" }
            ]
        }
    },
    {
        name: "RUR", article: `
    <div class="article">
    <h3>Article 361</h3>
    <p>
    Les ventes de produits pétroliers raffinés destinés à la consommation intérieure sont soumises au paiement de la redevance d’usure de la route en abrégé RUR.
    </p>
  </div>
    `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "RUR", date: 25, year: new Date().getFullYear(), question: "Quel étais le dernier mois  de la livraison?" }
            ]
        }
    },
    {
        name: "Taxe sur les contrats d’assurances", article: `
        <div class="article">
        <h3>Article 367</h3>
        <p>
        Toute convention d’assurance ou de rente viagère, conclue avec une société ou une compagnie d’assurances ou avec tout autre assureur gabonais ou étranger est soumise, quels que soient le lieu et la date auxquels elle est ou a été conclue, à une taxe annuelle et obligatoire, la taxe sur les contrats d’assurance.
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "Taxe sur les contrats d'assurances", date: 15, month: (new Date().getDate() < 15 ? 0 : 1) + new Date().getMonth(), year: new Date().getFullYear() }
            ]
        }
    },
    {
        name: "Taxe Forfaitaire d’habitation", article: `
    <div class="article">
    <h3>Article 381</h3>
    <p>
    La taxe forfaitaire d’habitation est déterminée sur la base d’un revenu imposable égal à la valeur locative de la propriété, sous déduction de 25% en considération du dépérissement et des frais d’entretien et de réparation.
    </p>
  </div>
    ` },
    {
        name: "TSIL", article: `
    <div class="article">
    <h3>Article 386</h3>
    <p>
    La taxe est établie sur le produit brut des locations ou sous-locations, au nom de chaque particulier ou société, pour l’ensemble des immeubles loués au lieu de la résidence principale ou du principal établissement.
    </p>
  </div>
    ` , alert: {
            echeance_count: 1,
            echeance: [
                { title: "TSIL", date: 15, year: new Date().getFullYear(), question: "Quel étais le dernier mois du trimestre d'encaissement des loyers ?" }
            ]
        }
    },
    {
        name: "FNH", article: `
        <div class="article">
        <h3>Article 401</h3>
        <p>
        L’ensemble des salaires y compris les avantages et indemnités de toute nature constituant l’assiette des cotisations du régime des prestations familiales et des accidents du travail dans la limite du plafond fixé par la Caisse Nationale de Sécurité Sociale en abrégé CNSS est soumis à un prélèvement destiné à alimenter le Fonds National de l’Habitat.
        </p>
      </div>
        `, alert: {
            echeance_count: 1,
            echeance: [
                { title: "FNH", date: 15, year: new Date().getFullYear(), question: "Quel étais le mois de la retenu à la source ?" }
            ]
        }
    },
    {
        name: "TJH", article: `
    <div class="article">
    <h3>Article 407</h3>
    <p>
    Les entreprises exploitant des activités de jeux de hasard sont tenues de verser spontanément à la Recette du Centre des Impôts dont elles dépendent, au plus tard le 20 de chaque mois, en s’appuyant sur une déclaration établie en double exemplaire, sur un imprimé fourni par l’Administration, le montant prélevé sur les sommes engagées le mois précédent.
    </p>
  </div>
    ` },
    {
        name: "TBP", article: `
    <div class="article">
    <h3>Article 410</h3>
    <p>
    La taxe est établie au nom du propriétaire du bateau de plaisance.
    </p>
  </div>
    ` },
];

window.addEventListener('load', async () => {
    _user = await fetchUserData();
    _formeJuridiques = await fetchFormeJuridique();
    checkUserFormJuridique();
})

function closeArticleDialog() {
    document.querySelector('.article-dialog').classList.remove('show-dialog');
}

function showArticleDialog() {
    document.querySelector('.article-dialog').classList.add('show-dialog');
}


async function fetchUserData() {
    try {
        const res = await fetch('/api/users/auth');
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        return null;
    }
}

async function fetchFormeJuridique() {
    try {
        const res = await fetch('/api/forme-juridique');
        if (res.status == 200) {
            return await res.json();
        }
    } catch (err) {
        return null;
    }
}

function checkUserFormJuridique() {
    if (_user.formeJuridique) {
        displayImpot();
    } else {
        displayGetUserFormJuridiqueDialog();
    }
}

function displayGetUserFormJuridiqueDialog() {
    displayUpdateFormeJuridiqueDialog();
    addFormeJuridiqueOptionOnSelect();
}

function addFormeJuridiqueOptionOnSelect() {
    const select = document.querySelector('.forme-juridique');
    _formeJuridiques.forEach(fm => {
        if (fm.impot != []) {
            const option = document.createElement('option');
            option.value = fm.value;
            option.innerHTML = fm.value;
            select.appendChild(option);
        }
    })
}

function displayImpot() {
    document.querySelector('.my-forme-juridique').innerHTML = "<strong>" + _user.formeJuridique + "</strong>"
    displayImpotsObligatoire();
    displayImpotNotObligatoire();
}

function displayImpotsObligatoire() {
    const container = document.querySelector('#impots-obligatoire');
    const formeJuridiqueData = _formeJuridiques.find(fm => fm.value == _user.formeJuridique);
    if (formeJuridiqueData) {
        const impotStates = formeJuridiqueData.impot;
        for (let i = 0; i < impotStates.length; i++) {
            if (impotStates[i] == true) {
                const impot = _impots[i];
                //Create impot row
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                td1.innerHTML = impot.name;
                const a = document.createElement('a');
                a.href = "#";
                a.innerHTML = "Articles du code"
                a.addEventListener('click', () => {
                    showArticleDialog();
                    document.querySelector('.article-content').innerHTML = `
                    <h2>${impot.name}</h2>
                    ${impot.article}
                    `
                })
                td2.appendChild(a);
                tr.appendChild(td1);
                tr.appendChild(td2);
                container.appendChild(tr);
            }
        }
    }
}

function displayImpotNotObligatoire() {
    const container = document.querySelector('#impots-not-obligatoire');
    const formeJuridiqueData = _formeJuridiques.find(fm => fm.value == _user.formeJuridique);
    if (formeJuridiqueData) {
        const impotStates = formeJuridiqueData.impot;
        for (let i = 0; i < impotStates.length; i++) {
            if (impotStates[i] !== true && impotStates[i] !== false) {
                const impot = _impots[i];
                //Create impot row
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');
                const a = document.createElement('a');
                a.href = "#";
                a.innerHTML = "Code"
                a.addEventListener('click', () => {
                    showArticleDialog();
                    document.querySelector('.article-content').innerHTML = `
                    <h2 class="pm-color">${impot.name}</h2>
                    ${impot.article}
                    ` ;
                })
                td1.innerHTML = impot.name;
                td3.appendChild(a);
                td2.innerHTML = impotStates[i];
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                container.appendChild(tr);
            }
        }
    }
}