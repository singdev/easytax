const HAVE = 1;
const DONT_HAVE = -1;
const CONDITION = 0;

module.exports = {
    forme_juridique_type: [
        { value: "SARL", type: "p", impot: [ HAVE, CONDITION, CONDITION, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, HAVE, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, DONT_HAVE, CONDITION, HAVE, HAVE, DONT_HAVE ] },
        { value: "SAS", type: "p", impot: [ HAVE, CONDITION, CONDITION, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, HAVE, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, DONT_HAVE, CONDITION, HAVE, HAVE, DONT_HAVE ] },
        { value: "SUARL", type: "p" , impot: [ HAVE, CONDITION, CONDITION, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, HAVE, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, DONT_HAVE, CONDITION, HAVE, HAVE, DONT_HAVE ]},
        { value: "Société Anonyme", type: "s" , impot: [ HAVE, CONDITION, CONDITION, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, HAVE, HAVE, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, CONDITION, DONT_HAVE, CONDITION, HAVE, HAVE, DONT_HAVE ]},
        { value: "Particulier", type: "p" , impot: [ DONT_HAVE, HAVE, CONDITION, CONDITION, DONT_HAVE, CONDITION, CONDITION, CONDITION, CONDITION, HAVE, DONT_HAVE, DONT_HAVE, HAVE, DONT_HAVE, DONT_HAVE, HAVE, HAVE, CONDITION, DONT_HAVE, DONT_HAVE, HAVE ]},
        { value: "Entreprise individuelle", type: "p" , impot: [ DONT_HAVE, HAVE, CONDITION, CONDITION, DONT_HAVE, CONDITION, CONDITION, CONDITION, CONDITION, HAVE, DONT_HAVE, DONT_HAVE, HAVE, DONT_HAVE, DONT_HAVE, HAVE, HAVE, CONDITION, DONT_HAVE, DONT_HAVE, HAVE ]},
        { value: "Société coopératives", type: "s" , impot: []},
        { value: "Etablissement public", type: "s" , impot: []},
        { value: "Société en nom collectif", type: "s" , impot: []},
        { value: "Société en commandite simple", type: "s" , impot: []},
        { value: "Société en participation", type: "s" , impot: []},
        { value: "Syndicat financiers", type: "s" , impot: []},
        { value: "Organisme d’Etat autonome", type: "s" , impot: []},
        { value: "Syndicat agricole", type: "s" , impot: []},
        { value: "Caisse de crédit agricole mutuel", type: "s", impot: [] },
        { value: "Société et union de société de secours mutuel", type: "s" , impot: []},
        { value: "Association sans but lucratif", type: "s" , impot: []},
        { value: "Collectivités locales", type: "s" , impot: []},
        { value: "Offices publics", type: "s" , impot: []},
        { value: "Mutuelles scolaires", type: "s" , impot: []},
        { value: "Clubs et cercles privés GIE", type: "s" , impot: []},
        { value: "Entreprises d’hôtellerie et de tourisme.", type: "s" , impot: []}
    ],

    getFormeJuridiqueArray: function () {
        const array = [];
        this.forme_juridique_type.forEach(ft => {
            array.push(ft.value);
        });
        return array;
    }
};