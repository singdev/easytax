const CONDITION = 0;

module.exports = {
    forme_juridique_type: [
        { value: "SARL", type: "p", impot: [true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, false, CONDITION, true, true, false] },
        { value: "SAS", type: "p", impot: [true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, false, CONDITION, true, true, false] },
        { value: "SUARL", type: "p", impot: [true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, false, CONDITION, true, true, false] },
        { value: "Société Anonyme", type: "s", impot: [true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, false, CONDITION, true, true, false] },
        { value: "Particulier", type: "p", impot: [false, true, CONDITION, CONDITION, false, CONDITION, CONDITION, CONDITION, CONDITION, true, false, false, true, false, false, true, true, CONDITION, false, false, true] },
        { value: "Entreprise individuelle", type: "p", impot: [false, true, CONDITION, CONDITION, false, CONDITION, CONDITION, CONDITION, CONDITION, true, false, false, true, false, false, true, true, CONDITION, false, false, true] },
        { value: "Société coopératives", type: "s", impot: [true, false, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, false, CONDITION, true, true, false] },
        { value: "Etablissement public", type: "s", impot: [] },
        { value: "Société en nom collectif", type: "s", impot: [true, true, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, false, CONDITION, true, false] },
        { value: "Société en commandite simple", type: "s", impot: [true, true, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, false, CONDITION, true, false] },
        { value: "Société en participation", type: "s", impot: [true, true, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, false, CONDITION, true, false] },
        { value: "Syndicat financiers", type: "s", impot: [true, true, CONDITION, true, CONDITION, CONDITION, CONDITION, CONDITION, true, true, CONDITION, CONDITION, true, CONDITION, CONDITION, CONDITION, false, CONDITION, true, false,] },
        { value: "Organisme d’Etat autonome", type: "s", impot: [] },
        { value: "Syndicat agricole", type: "s", impot: [] },
        { value: "Caisse de crédit agricole mutuel", type: "s", impot: [] },
        { value: "Société et union de société de secours mutuel", type: "s", impot: [] },
        { value: "Association sans but lucratif", type: "s", impot: [false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, CONDITION, false, false,] },
        { value: "Collectivités locales", type: "s", impot: [] },
        { value: "Offices publics", type: "s", impot: [] },
        { value: "Mutuelles scolaires", type: "s", impot: [] },
        { value: "Clubs et cercles privés GIE", type: "s", impot: [] },
        { value: "Entreprises d’hôtellerie et de tourisme.", type: "s", impot: [] }
    ],

    getFormeJuridiqueArray: function () {
        const array = [];
        this.forme_juridique_type.forEach(ft => {
            array.push(ft.value);
        });
        return array;
    }
};