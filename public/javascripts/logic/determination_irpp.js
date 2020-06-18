const situationFamilial = {
    celibataire: {
        name: "Célibataire",
        avec_enfant: { pour_lui: 1.5, pour_chaque_enfant: 0.5 },
        sans_enfant: { cas_general: 1, cas_particulier: 1.5 }
    },

    divorce: {
        name: "Divorcé",
        avec_enfant: { pour_lui: 1.5, pour_chaque_enfant: 0.5 },
        sans_enfant: { cas_general: 1, cas_particulier: 1.5 }
    },

    veuf2: {
        name: "Veuf depuis plus de deux ans",
        avec_enfant: { pour_lui: 2, pour_chaque_enfant: 0.5 },
        sans_enfant: { cas_general: 1, cas_particulier: 1.5 }
    },

    epouse_salarie: {
        name: "Epouse salarié",
        avec_enfant: { pour_lui: 0, pour_chaque_enfant: 0 },
        sans_enfant: { cas_general: 1, cas_particulier: 1 }
    },

    polygame: {
        name: "Polygame",
        avec_enfant: { pour_lui: 1.5, pour_chaque_enfant: 0.5 },
        sans_enfant: { cas_general: 1, cas_particulier: 1 }
    },

    veuf: {
        name: "Veuf depuis moins de deux ans",
        avec_enfant: { pour_lui: 2, pour_chaque_enfant: 0.5 },
        sans_enfant: { cas_general: 2, cas_particulier: 2 }
    },

    marie: {
        name: "Marié",
        avec_enfant: { pour_lui: 2, pour_chaque_enfant: 0.5 },
        sans_enfant: { cas_general: 2, cas_particulier: 2 }
    }
};

function determineQuotientFamilial(situation_matrimonial, nombre_enfant, cas) {
    if(situationFamilial[situation_matrimonial] == null){
        return -1;
    }
    let partEnfant = nombre_enfant > 0 ? situationFamilial[situation_matrimonial].avec_enfant.pour_chaque_enfant : 0;
    let partPourLui = nombre_enfant > 0 ?
        situationFamilial[situation_matrimonial].avec_enfant.pour_lui :
        (cas == "cas_particulier" ?
            situationFamilial[situation_matrimonial].sans_enfant.cas_particulier :
            situationFamilial[situation_matrimonial].sans_enfant.cas_general);

    const part = partEnfant * nombre_enfant + partPourLui;
    return part;
}

function determineCoefiscientFamilial(nombre_de_part, base_imposable) {
    return 0.8 * base_imposable / nombre_de_part;
}

function determineIRPPParPart(coeffiscient_familial) {
    const intervals = [
        { min: 0, max: 1500000, percent: 0, retrait: 0 },
        { min: 1500001, max: 1920000, percent: 5, retrait: 75000 },
        { min: 1920001, max: 2700000, percent: 10, retrait: 171000 },
        { min: 2700001, max: 3600000, percent: 15, retrait: 306000 },
        { min: 3600001, max: 5160000, percent: 20, retrait: 486000 },
        { min: 5160001, max: 7500000, percent: 25, retrait: 744000 },
        { min: 7500001, max: 11000000, percent: 30, retrait: 1119000 },
        { min: 11000001, max: Infinity, percent: 35, retrait: 1669000 },
    ];

    let P = 0;
    intervals.forEach(v => {
        P += calculIRRPParPartForInterval(coeffiscient_familial, v.min, v.max, v.percent, v.retrait);
    });

    return P;
}

function isOnInterval(min, max, value) {
    return value <= max && value >= min;
}

function calculIRRPParPartForInterval(Q, min, max, percent, retrait) {
    if (isOnInterval(min, max, Q)) {
        return percent * Q / 100 - retrait;
    }
    return 0;
}

function calculIRPP(irpp_par_part, nombre_de_part){
    return irpp_par_part * nombre_de_part;
}