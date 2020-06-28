const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', Schema({
   identifiant: { type: String, unique: true, require: true },
   password: { type: String, require: true },
   nom: { type: String, require: true, unique: true },
   immatriculationFiscal: { type: String },
   formeJuridique: {
      type: String, enum: [
         "SARL",
         "SAS",
         "SUARL",
         "Société Anonyme",
         "Particulier",
         "Entreprise individuelle",
         "Société coopératives",
         "Etablissement public",
         "Société en nom collectif",
         "Société en commandite simple",
         "Société en participation",
         "Syndicat financiers",
         "Organisme d’Etat autonome",
         "Syndicat agricole",
         "Caisse de crédit agricole mutuel",
         "Société et union de société de secours mutuel",
         "Association sans but lucratif",
         "Collectivités locales",
         "Offices publics",
         "Mutuelles scolaires",
         "Clubs et cercles privés GIE",
         "Entreprises d’hôtellerie et de tourisme.",
      ]
   },
   domaineActivite: {
      type: String, enum: [
         "ACHETEUR DE CACAO",
         "sans",
         "établissement fixe",
         "ACHETEUR DE PRODUITS DU CRU, sans",
         "établissement fixe",
         "Agent d’affaire employant travaillant",
         "seul",
         "Agent d’affaire travaillant avec une seule personne",
         "Agent d’affaire travaillant avec plus d’une personne",
         "Loueur d’appareil à jeux",
         "Vendeur d’appareil (importateur)",
         "Vendeur d’appareils (non importés)",
         "ARTISAN (charpentier, couvreur, écailliste, voirier, maçon, menuisier, peintre en bâtiment, plombier, teinturier, etc.) travaillant seul",
         "ARTISAN (charpentier, couvreur, écailliste, voirier, maçon, menuisier peintre en bâtiment, plombier, teinturier, etc.) travaillant employant 1a 5 personnes",
      ]
   },
   nomDirigeant: { type: String, require: true },
   numeroFonctionnaire: { type: String },
   numeroCNAMGS: { type: String },
   situationGeographique: { type: String },
   quartier: { type: String },
   telephone: { type: String, require: true },
   email: { type: String },
   dateCreation: { type: Date, require: true },
   nombreEmployes: {
      type: String, enum: [
         "1",
         "2",
         "entre 2 et 20",
         "entre 20 et 50",
         "50 et plus"
      ]
   },
   situationFiscale: { type: String},
   nombrePersonneACharge: { type: Number },
}));