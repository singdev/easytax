const calculRS = require('../../../public/javascripts/logic/calcul_base_imposable_et_impots').calculRS;

const testCase = [
    {
        title: "Test",
        data: {
            traitement: 0, emolument: 0, salaire: 2000000,
            indemnite: 150000, avantage_espece_argent: 0, pension: 0,
            retenu_retraite: 200000, cotisation_assurance_maladie: 150000,
            rente_viagere: 0,
        }, rs: 1350000
    }
]

describe("Calcul de la retenu sur salaire", function () {
    testCase.forEach(tc => {
        it(tc.title, function () {
            const data = tc.data
            expect(calculRS({
                traitement: data.traitement,
                emolument: data.emolument,
                salaire: data.salaire,
                indemnite: data.indemnite,
                avantage_espece_argent: data.avantage_espece_argent,
                pension: data.pension,
                retenu_retraite: data.retenu_retraite,
                cotisation_assurance_maladie: data.cotisation_assurance_maladie,
                rente_viagere: data.rente_viagere
            })
            ).toBe(tc.rs);
        });
    });
});