
module.exports = class {

    constructor(params){
        this.identifiant = params.identifiant;
        this.password = params.password;
        this.nom = params.nom;
        this.immatriculationFiscal = params.immatriculationFiscal;
        this.formeJuridique = params.formeJuridique;
        this.domaineActivite = params.domaineActivite;
        this.nomDirigeant = params.nomDirigeant;
        this.numeroFonctionnaire = params.numeroFonctionnaire;
        this.numeroCNAMGS = params.numeroCNAMGS;
        this.situationGeographique = params.situationGeographique;
        this.quartier = params.quartier;
        this.telephone = params.telephone;
        this.email = params.email;
        this.dateCreation = params.dateCreation;
        this.nombreEmployes = params.nombreEmployes;
        this.nombrePersonneACharge = params.nombrePersonneACharge;
    }
}