module.exports = {
    forme_juridique_type: [
        { value: "SARL", type: "p" },
        { value: "SAS", type: "p" },
        { value: "SUARL", type: "p" },
        { value: "Société Anonyme", type: "s" },
        { value: "Particulier", type: "p" },
        { value: "Entreprise individuelle", type: "p" },
        { value: "Société coopératives", type: "s" },
        { value: "Etablissement public", type: "s" },
        { value: "Société en nom collectif", type: "s" },
        { value: "Société en commandite simple", type: "s" },
        { value: "Société en participation", type: "s" },
        { value: "Syndicat financiers", type: "s" },
        { value: "Organisme d’Etat autonome", type: "s" },
        { value: "Syndicat agricole", type: "s" },
        { value: "Caisse de crédit agricole mutuel", type: "s" },
        { value: "Société et union de société de secours mutuel", type: "s" },
        { value: "Association sans but lucratif", type: "s" },
        { value: "Collectivités locales", type: "s" },
        { value: "Offices publics", type: "s" },
        { value: "Mutuelles scolaires", type: "s" },
        { value: "Clubs et cercles privés GIE", type: "s" },
        { value: "Entreprises d’hôtellerie et de tourisme.", type: "s" }
    ],

    getFormeJuridiqueArray: function () {
        const array = [];
        this.forme_juridique_type.forEach(ft => {
            array.push(ft.value);
        });
        return array;
    }
};