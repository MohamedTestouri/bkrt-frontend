import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointments } from 'src/app/models/apointment';
import { TYPECULTURES } from 'src/app/models/constants/constants';
import { IOptions } from 'src/app/models/constants/time-options';
import { Demande } from 'src/app/models/demande';
import { Terrain } from 'src/app/models/terrain';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { TerrainService } from 'src/app/services/terrain.service';
import { DemandeAppointmentService } from 'src/app/services/demande-appointment.service';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

@Component({
  selector: 'app-demande',
  templateUrl: './demande-apointment.component.html',
  styleUrls: ['./demande-apointment.component.css']
})
export class DemandeComponent implements OnInit {
  currentUser : User;
  afficherContenuVerif: boolean = false;
  afficherContenuAppointmentDate: boolean = false;
  afficherContenuAppointmentTime: boolean = false;
  afficherContenuAppointmentTime2: boolean = false;
  afficherInputAutre: boolean = false;
  afficherInputAutre2: boolean = false;
  alertRequired: boolean = false;
  afficherContenuDem: boolean = true;
  terrains : Terrain[];
  demandeForm: FormGroup;
  appointmentForm: FormGroup;
  validationErrors: string[] | undefined;
  plantations: string[] | undefined;
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  tempDemandeForm: Demande;
  tempAppointmentForm: Appointments;
  option: IOptions;
  selectedHour: number | undefined;
  selectedMinute: number | undefined;
  hstep = 1;
  mstep = 30;
  typeCultures = TYPECULTURES;
  mytime: Date = new Date();
  options: IOptions = 
  {
    hstep: [9, 10, 11],
    mstep: [0, 15, 30],
  };

  options2: IOptions = {
    hstep: [13, 14, 15],
    mstep: [0, 15, 30],
  };
  specialisteSelected: string;
  plantationSelected: string;
  domaineSelected: string;
  agricultureSelected: string;
  methoderevoirSelected: string;
  selectedSpecialiste: string;
  selectedDomaine: string;
  selectedSujet: string;
  selectedType: string;
  selectedPeriode: string;
  selectedRevoirOption: string;
  formattedDate : string;

  specialistes = [
    { id: 'ingenieur', value: 'مهندس فلاحي', label: 'مهندس فلاحي' },
    { id: 'veterinaire', value: 'طبيب بيطري', label: 'طبيب بيطري' },
    {
      id: 'technicienMontage',
      value: 'فني مختص في التركيب',
      label: 'فني مختص في التركيب',
    },
    {
      id: 'technicien2',
      value: 'فني مختص في الزبيرة',
      label: 'فني مختص في الزبيرة',
    },
  ];

  domaines = [
    { id: 'plantation', value: 'زراعات', label: 'زراعات' },
    { id: 'animaux', value: 'حيوانات', label: 'حيوانات' },
    {
      id: 'administratif',
      value: 'مسائل إدارية وإجرائية تخص بعث مشروع فلاحي',
      label: 'مسائل إدارية وإجرائية تخص بعث مشروع فلاحي',
    },
    {
      id: 'alimentaire',
      value: 'مشروع تحويلي و صناعات غذائية',
      label: 'مشروع تحويلي و صناعات غذائية',
    },
    { id: 'autre', value: 'أخرى', label: 'أخرى' },
  ];

  sujets = [
    {
      id: 'remiseSolFertilisation',
      value: 'استصلاح تربة و تسميد',
      label: 'استصلاح تربة و تسميد',
    },
    { id: 'eauIrrigation', value: 'مياه و ري', label: 'مياه و ري' },
    { id: 'maladiesPlantes', value: 'أمراض النباتات', label: 'أمراض النباتات' },
    { id: 'autre2', value: 'أخرى', label: 'أخرى' },
  ];

  types = [
    { id: 'agricultureNormale', value: 'فلاحة عادية', label: 'فلاحة عادية' },
    {
      id: 'agricultureBiologique',
      value: 'فلاحة بيولوجية',
      label: 'فلاحة بيولوجية',
    },
    { id: 'agricultureRefuge', value: 'فلاحة مستدامة', label: 'فلاحة مستدامة' },
    {
      id: 'agricultureAquatique',
      value: 'زراعات مائية',
      label: 'زراعات مائية',
    },
  ];

  periodes = [
    { id: 'matin', label: 'الفترة الصباحية', value: 'الفترة الصباحية', checked: true },
    { id: 'soir', label: 'الفترة المسائية', value: 'الفترة المسائية', checked: false },
  ];

  revoirOptions = [
    { id: 'visite', label: 'زيارة ميدانية', value: 'زيارة ميدانية' },
    { id: 'aDistance', label: 'مقابلة عبر الإنترنت', value: 'مقابلة عبر الإنترنت' }
  ];
  constructor(public accountService: AccountService, private fb: FormBuilder, private terrainService : TerrainService, private demandeAppointmentService : DemandeAppointmentService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.formattedDate = format(this.bsInlineValue, 'EEEE dd MMMM yyyy', { locale: ar });
  }

  ngOnInit(): void {
    this.initializeDemandeForm();

    this.accountService.getCurrentUser().subscribe({
      next: user => {
        this.currentUser = user;
      },
      error: e => {
        console.error('Error fetching current user', e);
      } 
    })

  }

  onDateChange(date: Date): void {
    this.bsInlineValue = date;

    this.formattedDate = format(this.bsInlineValue, 'EEEE dd MMMM yyyy', { locale: ar });
  }
  initializeDemandeForm() {
    this.demandeForm = this.fb.group({
      typeCulturesArray: [],
      question: ['', Validators.required],
      autrePlantationDomaines: [''],
      autrePlantationQuestion: [''],
      file: [''],
      sujets: this.sujets,
      domaines: this.domaines,
      specialistes: this.specialistes,
      typeAgricultures: this.types,
      terrains: [],
      
    });

    this.appointmentForm = 
    this.fb.group({
      hstep: [''],
      
      periodes: this.periodes,
      methodeRevoir : this.revoirOptions,
    });
  }

  SaveDemande() {
    this.tempDemandeForm = {
      autreDomaines: this.demandeForm.value.autrePlantationDomaines,
      autreSujetQuestion: this.demandeForm.value.autrePlantationQuestion,
      file: this.demandeForm.value.file,
      question: this.demandeForm.value.question,
      typeAgriculture: this.selectedType,
      domaine: this.domaineSelected,
      typeCulture: this.plantationSelected,
      specialiste: this.selectedSpecialiste,
      sujet: this.selectedSujet,
      terrain : this.demandeForm.value.terrain,
    };
    this.afficherContenuDem = false;
    this.afficherContenuVerif = false;
    this.afficherContenuAppointmentDate = true;
    this.afficherContenuAppointmentTime = false;
  }

  logSelectedSpecialiste(id : string) {
    const specialisteLabel = this.specialistes.find(
      (specialiste) => specialiste.id === id
    )?.label;
    this.selectedSpecialiste = specialisteLabel;
  }

  logSelectedDomaine(id: string) {
    if (id == 'autre') {
      this.afficherInputAutre = true;
    } else 
    {
      this.afficherInputAutre = false;
    }
    const domaineLabel = this.domaines.find(
      (domaine) => domaine.id === id
    )?.label;
    this.domaineSelected = domaineLabel;
  }

  logSelectedSujet(id : string) {
    if (id == 'autre2') {
      this.afficherInputAutre2 = true;

    } else {
      this.afficherInputAutre2 = false;
    }
    const sujetLabel = this.sujets.find(
      (sujet) => sujet.id === id
    )?.label;
    this.selectedSujet =  sujetLabel; 
  }

  logSelectedType(id : string){
    const typeLabel = this.types.find(
      (type) => type.id === id
    )?.label;
    this.selectedType = typeLabel;
  }

  DoneAppointmentDate() {
    if (
      (this.selectedHour == undefined && this.selectedMinute == undefined) ||
      this.selectedHour == undefined ||
      this.selectedMinute == undefined
    ) {
      this.alertRequired = true;
    } else {
      this.tempAppointmentForm = {
        methodeRevoir: this.selectedRevoirOption,
        periodeRevoir: this.selectedPeriode,     
        dateRendezVous: this.bsInlineValue,
        heure: this.selectedHour,
        minute: this.selectedMinute,
      };

      this.afficherContenuDem = false;
      this.afficherContenuVerif = true;
      this.afficherContenuAppointmentDate = false;
      this.afficherContenuAppointmentTime = false;
      this.afficherContenuAppointmentTime2 = false;
    }
  }
  clickBackToDemandeForm() {
    if(this.afficherContenuAppointmentDate == true)
    {
      this.afficherContenuDem = true;
      this.afficherContenuVerif = false;
      this.afficherContenuAppointmentDate = false;
      this.afficherContenuAppointmentTime = false;
    }
    else if(this.afficherContenuVerif == true)
    {
      this.afficherContenuDem = false;
      this.afficherContenuVerif = false;
      this.afficherContenuAppointmentDate = true;
      this.afficherContenuAppointmentTime = false;
    }
  }

  selectHour(hour: number) {
    this.selectedHour = hour;
  }
  selectMinute(minute: number) {
    this.selectedMinute = minute;
  }

  toggleTime(selectedPeriode) {
    if (selectedPeriode.id == 'matin') {
      this.afficherContenuAppointmentTime = true;
      this.afficherContenuAppointmentTime2 = false;
    } else {
      this.afficherContenuAppointmentTime2 = true;
      this.afficherContenuAppointmentTime = false;
    }
  }
  logSelectedPeriod(id : string) {
    const periodeLabel = this.periodes.find(
      (periode) => periode.id === id
    )?.label;
    this.selectedPeriode = periodeLabel;
  }

  logSelectedRevoir(id : string) {
    const revoirLabel = this.revoirOptions.find(
      (revoir) => revoir.id === id
    )?.label;
    this.selectedRevoirOption = revoirLabel;
  
  }

}
