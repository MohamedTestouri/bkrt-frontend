import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { EMAIL_REGEX, FACULTES, GOVERNORATES, SPECIALITES, YEAROFGRADUATION_REGEX } from 'src/app/models/constants/constants';
import { DemandePartenariat } from 'src/app/models/demande-partenariat';
import { DemandePartenariatService } from 'src/app/services/demande-partenariat.service';

@Component({
  selector: 'app-demande-partenariat',
  templateUrl: './demande-partenariat.component.html',
  styleUrls: ['./demande-partenariat.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: true, showIndicators: false } }
  ]
})
export class DemandePartenariatComponent implements OnInit {
  ShowFirstPage : boolean = true;
  ShowSecondPage : boolean = false;
  ShowForm1 : boolean = false;
  ShowForm2 : boolean = false;
  ShowForm3 : boolean = false;
  ShowForm4 : boolean = false;
  tempDemandePartenariat: DemandePartenariat;
  IngenieurForm1: FormGroup = new FormGroup({});
  IngenieurForm2: FormGroup = new FormGroup({});
  IngenieurForm3: FormGroup = new FormGroup({});
  IngenieurForm4: FormGroup = new FormGroup({});
  yearOfActivityRegex = YEAROFGRADUATION_REGEX;
  emailRegex = EMAIL_REGEX;
  facultes = FACULTES;
  specialtieswithFaculte = SPECIALITES; 
  specialties : string[] = [];
  governoratsSansFrais: string[] = GOVERNORATES;
  governoratsAvecFrais: string[] = GOVERNORATES;
  prices: string[] = ['5 DT', '10 DT', '15 DT']; 

  constructor(private fb: FormBuilder, private router : Router, private demandePartenariatService: DemandePartenariatService) { }

  ngOnInit(): void {
    this.initializeForm1();
  }

  ConfirmerFirstPage()
  {
    this.ShowSecondPage = true;
    this.ShowFirstPage = false;
    this.ShowForm1 = false;
    this.ShowForm2 = false;
    this.ShowForm3 = false;
    this.ShowForm4 = false;
  }
  ConfirmerSecondPage()
  {
    this.ShowSecondPage = false;
    this.ShowFirstPage = false;
    this.ShowForm1 = true;
    this.ShowForm2 = false;
    this.ShowForm3 = false;
    this.ShowForm4 = false;
  }
  ConfirmerFirstForm()
  {
    this.ShowSecondPage = false;
    this.ShowFirstPage = false;
    this.ShowForm1 = false;
    this.ShowForm2 = true;
    this.ShowForm3 = false;
    this.ShowForm4 = false;
  }
  ConfirmerSecondForm()
  {
    this.ShowSecondPage = false;
    this.ShowFirstPage = false;
    this.ShowForm1 = false;
    this.ShowForm2 = false;
    this.ShowForm3 = true;
    this.ShowForm4 = false;
  }

  ConfirmerThirdForm()
  {
    this.ShowSecondPage = false;
    this.ShowFirstPage = false;
    this.ShowForm1 = false;
    this.ShowForm2 = false;
    this.ShowForm3 = false;
    this.ShowForm4 = true;
  }

  initializeForm1()
  {
    this.IngenieurForm1 = this.fb.group({
      adresseEmail: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      nomBureauEtude: ['', Validators.required],
      adressePostale: ['', Validators.required],
      emailContact: ['', [Validators.required,Validators.pattern(this.emailRegex)]],
      phoneNumber: ['', Validators.required],
      yearOfActivity: ['', [Validators.required, Validators.pattern(this.yearOfActivityRegex)]],
    });

    this.IngenieurForm2 = this.fb.group({
      nameGerant: ['', Validators.required],
      university: ['', Validators.required],
      speciality: ['', Validators.required],
      governoratsSansFrais: [''],
      othersEngineers: [''],
      workWithoutCharges: [false],
      gouvernoratSansChargesArray : [],      
      gouvernoratAvecChargesArray : [],
      governoratsAvecFrais: [''],
      factureChargeAdditionalTravelCharges: [false],
      additionalTravelCharges: [false],
      price: [''],
      fixedPrice : [''],
      priceOfKilometer: [''],
    });

    this.IngenieurForm3 = this.fb.group({
      agricultureBiologique: [false],
      accompagnementCertificationBiologique: [false],
      permaculture: [false],
      culturesHorsSol: [false],
      etudePrecreationProjetAgricole: [false],
      questionsOrdreAdministratif : [false],
      aucun: [false],
      autreBool: [false],
      autre: [''],
      specialisteCulturesParticulier : [''],
      connexionInternetStable: [''],
    });

    this.IngenieurForm4 = this.fb.group({
      coachingEnLigne: [''],
      valideCharteAdhesion: [''],
      otherInformations: [''],
    });
  }

  Confirmer()
  {
    this.tempDemandePartenariat = 
    {
      adresseEmail : this.IngenieurForm1.value.adresseEmail,
      adressePostale: this.IngenieurForm1.value.adressePostale,
      nomBureauEtude: this.IngenieurForm1.value.nomBureauEtude,
      emailContact: this.IngenieurForm1.value.emailContact,
      phoneNumber: this.IngenieurForm1.value.phoneNumber.internationalNumber,
      yearOfActivity: this.IngenieurForm1.value.yearOfActivity,
      nameGerant: this.IngenieurForm2.value.nameGerant,
      speciality: this.IngenieurForm2.value.speciality,
      governoratsAvecFrais: this.IngenieurForm2.value.gouvernoratAvecChargesArray.join(", "),
      governoratsSansFrais: this.IngenieurForm2.value.gouvernoratSansChargesArray.join(", "),
      factureChargeAdditionalTravelCharges: this.IngenieurForm2.value.factureChargeAdditionalTravelCharges,
      othersEngineers :  this.IngenieurForm2.value.othersEngineers,
      workWithoutCharges: this.IngenieurForm2.value.workWithoutCharges,
      additionalTravelCharges: this.IngenieurForm2.value.additionalTravelCharges,
      price: this.IngenieurForm2.value.price,
      fixedPrice: this.IngenieurForm2.value.fixedPrice,
      priceOfKilometer: this.IngenieurForm2.value.priceOfKilometer,
      agricultureBiologique: this.IngenieurForm3.value.agricultureBiologique,
      accompagnementCertificationBiologique : this.IngenieurForm3.value.accompagnementCertificationBiologique,
      permaculture: this.IngenieurForm3.value.permaculture,
      culturesHorsSol: this.IngenieurForm3.value.culturesHorsSol,
      etudePrecreationProjetAgricole: this.IngenieurForm3.value.etudePrecreationProjetAgricole,
      questionsOrdreAdministratif: this.IngenieurForm3.value.questionsOrdreAdministratif,
      aucun: this.IngenieurForm3.value.aucun,
      autre: this.IngenieurForm3.value.autre,
      autreBool: this.IngenieurForm3.value.autreBool,
      specialisteCulturesParticulier: this.IngenieurForm3.value.specialisteCulturesParticulier,
      connexionInternetStable: this.IngenieurForm3.value.connexionInternetStable,
      coachingEnLigne: this.IngenieurForm4.value.coachingEnLigne,
      otherInformations: this.IngenieurForm4.value.otherInformations,
      valideCharteAdhesion: this.IngenieurForm4.value.valideCharteAdhesion,
    }
    console.log("form", this.tempDemandePartenariat)
    this.demandePartenariatService.create(this.tempDemandePartenariat).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
        // this.showError = false;
      },
      error: e => {
        // this.showError = true;
        // this.validationError = e.error;
      } 
    })
  }

  BackTo()
  {
    if(this.ShowSecondPage == true)
    {
    this.ShowSecondPage = false;
    this.ShowFirstPage = true;
    this.ShowForm1 = false;
    this.ShowForm2 = false;
    this.ShowForm3 = false;
    this.ShowForm4 = false;
    }
    else if(this.ShowForm1 == true)
      {
      this.ShowSecondPage = true;
      this.ShowFirstPage = false;
      this.ShowForm1 = false;
      this.ShowForm2 = false;
      this.ShowForm3 = false;
      this.ShowForm4 = false;
      }
      else if(this.ShowForm2 == true)
        {
        this.ShowSecondPage = false;
        this.ShowFirstPage = false;
        this.ShowForm1 = true;
        this.ShowForm2 = false;
        this.ShowForm3 = false;
        this.ShowForm4 = false;
        }
        else if(this.ShowForm3 == true)
          {
          this.ShowSecondPage = false;
          this.ShowFirstPage = false;
          this.ShowForm1 = false;
          this.ShowForm2 = true;
          this.ShowForm3 = false;
          this.ShowForm4 = false;
          }
          else if(this.ShowForm4 == true)
            {
            this.ShowSecondPage = false;
            this.ShowFirstPage = false;
            this.ShowForm1 = false;
            this.ShowForm2 = false;
            this.ShowForm3 = true;
            this.ShowForm4 = false;
            }
  }

  onFaculteChange()
  {
    console.log('facultes', this.facultes)
    const faculte = this.IngenieurForm2.get('university').value;
    console.log('faculte', faculte)
    const faculteObj = this.specialtieswithFaculte.find(item => item.faculte === faculte);
    this.specialties = faculteObj ? faculteObj.specialites : [];
    console.log('specialties', this.specialties)
  }
}
