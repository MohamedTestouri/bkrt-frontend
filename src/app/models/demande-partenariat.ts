export interface DemandePartenariat
{
    adresseEmail: string;
    nomBureauEtude: string;
    adressePostale: string;
    emailContact: string;
    phoneNumber: string;
    yearOfActivity: string;
    nameGerant: string;
    speciality: string;
    governoratsSansFrais: string[];
    othersEngineers: string;
    workWithoutCharges: boolean;
    governoratsAvecFrais: string[];
    factureChargeAdditionalTravelCharges: boolean;
    additionalTravelCharges: boolean;
    price: string;
    fixedPrice: string;
    priceOfKilometer: string;
    agricultureBiologique: boolean;
    accompagnementCertificationBiologique: boolean;
    permaculture: boolean;
    culturesHorsSol: boolean;
    etudePrecreationProjetAgricole: boolean;
    questionsOrdreAdministratif: boolean;
    aucun: boolean;
    autreBool: boolean;
    autre: string;
    specialisteCulturesParticulier: string;
    connexionInternetStable: string;
    coachingEnLigne: string;
    valideCharteAdhesion: string;
    otherInformations: string;
}