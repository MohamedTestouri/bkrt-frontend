export interface DemandeAppointment{
    specialite: string;
    domaine: string;
    typeCulturesArray: string[];
    typeAgriculture: string;
    sujetAgriculture: string;
    terrain: string[];
    question: string;
    file: string;
    methodeRevoir : string;
    timepickerControl: Date;
    periode: string, // Add validators as needed
    datepickerControl: Date;
}