import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DOMAINESAGRICULTURE, PERIODES, REVOIROPTIONS, SPECIALITES, SUJETAGRICULTURE, TYPEAGRICULTURE, TYPECULTURES } from 'src/app/models/constants/constants';
import { Terrain } from 'src/app/models/terrain';
import { DemandeAppointmentService } from 'src/app/services/demande-appointment.service';
import { TerrainService } from 'src/app/services/terrain.service';

@Component({
  selector: 'app-demande-appointment',
  templateUrl: './demande-appointment.component.html',
  styleUrls: ['./demande-appointment.component.css']
})
export class DemandeAppointmentComponent implements OnInit {

  @ViewChild('firstTabButton') firstTabButton!: ElementRef;
  @ViewChild('secondTabButton') secondTabButton!: ElementRef;
  @ViewChild('thirdTabButton') thirdTabButton!: ElementRef;

  demandeAppointementForm: FormGroup = new FormGroup({});

  specialistes = SPECIALITES;
  domaines = DOMAINESAGRICULTURE;
  sujetAgricultures = SUJETAGRICULTURE;
  typeAgricultures = TYPEAGRICULTURE;
  typeCultures = TYPECULTURES;
  periodes = PERIODES;
  revoirOptions = REVOIROPTIONS;
  errors_dict = {
    "specialite": "الرجاء إختيار المختص",
    "domaine": "الرجاء إختيار المجال",
    "typeCulturesArray": "الرجاء إختيار الزراعات",
    "typeAgriculture": "الرجاء إختيار نوعية الفلاحة",
    "sujetAgriculture": "الرجاء إختيار موضوع السؤال",
    "terrain": "الرجاء إختيار الأرض",
    "question": "الرجاء كتابة السؤال",
    "methodeRevoir": "الرجاء إختيار طريقة مقابلة الخبير",
    "periode": "الرجاء إختيار الفترة صباحية أو مسائية",
    "datepicker": "الرجاء إختيار التاريخ",
  }

  terrains : Terrain[];
  selectedTerrainLabel: string = '';
  
  isFirstTabDisabled = false;
  isSecondTabDisabled = true;
  isThirdTabDisabled = false;

  minDate: Date;
  myTime: Date;
  minTime: Date = new Date();
  maxTime: Date = new Date();
  isMeridian = false;
  
  showError = false;
  validationErrors = [];

  constructor(private fb: FormBuilder, private terrainService : TerrainService, private demandeAppointmentService : DemandeAppointmentService) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(11);
    this.maxTime.setMinutes(30);
  }

  ngOnInit(): void {

    this.terrainService.getAgriculteurTerrains().subscribe({
      next: _ => {
        this.terrains = _ ;
      },
      error: e => {
        this.showError = true;
        this.validationErrors = e.error;
      } 
    })

    this.initializeDemandeAppointementForm();
  }

  initializeDemandeAppointementForm() {

    const defaultDate = new Date();
    defaultDate.setHours(9); // Set hours to 9
    defaultDate.setMinutes(0); // Set minutes to 0
    defaultDate.setSeconds(0); // Set seconds to 0

    this.demandeAppointementForm = this.fb.group({
      specialite: ['', Validators.required],
      domaine: ['', Validators.required],
      typeCulturesArray: [[], [this.atLeastOneSelectedValidator(1)]],
      typeCultures: [''],
      typeAgriculture: ['', Validators.required],
      sujetAgriculture: ['', Validators.required],
      terrainId: [[], [this.atLeastOneSelectedValidator(1)]],
      question: ['', Validators.required],
      methodeRevoir: [''],
      timepicker: [defaultDate],
      periode: [''],
      datepicker: ['']
    });
  }

  // Define a custom validator function to check if at least one value is selected
  atLeastOneSelectedValidator(minSelections: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedValues = control.value;
      if (!selectedValues || selectedValues.length < minSelections) {
        return { 'atLeastOneSelected': true };
      }
      return null;
    };
  }

  updateTimeRange(periode: string) {
    if (periode === 'الفترة الصباحية') {
      this.minTime.setHours(8);
      this.minTime.setMinutes(0);
      const defaultDate = new Date();
      defaultDate.setHours(9); 
      defaultDate.setMinutes(0);0
      defaultDate.setSeconds(0);
      this.demandeAppointementForm.get('timepicker').setValue(defaultDate);
      this.maxTime.setHours(11);
      this.maxTime.setMinutes(30);
    } 
    else if (periode === 'الفترة المسائية') {
      this.maxTime.setHours(16);
      this.maxTime.setMinutes(30);
      const defaultDate = new Date();
      defaultDate.setHours(13); 
      defaultDate.setMinutes(0); 
      defaultDate.setSeconds(0);
      this.demandeAppointementForm.get('timepicker').setValue(defaultDate);
      this.minTime.setHours(13);
      this.minTime.setMinutes(0);
    }
  }

  onTerrainSelection(event: any) {
    // Access the selected item using event variable
    const selectedTerrain = event;

    // Extract the label from the selected item
    this.selectedTerrainLabel = selectedTerrain.site;
  }

  moveToSecondTab(buttonRef: ElementRef) {
    // Mark all form controls as touched to trigger validation
    this.demandeAppointementForm.markAllAsTouched();
    this.showError = false;

    // Check if the form is invalid
    if (this.demandeAppointementForm.invalid) {
      // Clear the validationErrors array before adding new errors
      this.showError = true;
      this.validationErrors = [];
  
      // Loop through each form control
      Object.keys(this.demandeAppointementForm.controls).forEach(key => {
        const control = this.demandeAppointementForm.get(key);
  
        // Check if the control is invalid and has been touched
        if (control.invalid && control.touched) {
          // Get validation messages for the current control
          Object.keys(control.errors).forEach(errorKey => {
            // Add validation error message to the validationErrors array
            this.validationErrors.push(this.errors_dict[key]);
          });
        }
      });
    }
    else {
      this.isFirstTabDisabled = true;
      this.isSecondTabDisabled = false;
      this.isThirdTabDisabled = true;
    
      // Remove 'active' class from the first tab button
      this.firstTabButton.nativeElement.classList.remove('active');
      // Add 'active' class to the second tab button
      this.secondTabButton.nativeElement.classList.add('active');

      // Update the active tab content
      const secondTabContent = document.getElementById('second');
      if (secondTabContent) {
        secondTabContent.classList.add('active', 'show');
      }
      const firstTabContent = document.getElementById('first');
      if (firstTabContent) {
        firstTabContent.classList.remove('active', 'show');
      }
    }
  }

  moveToThirdTab(buttonRef: ElementRef) {
    // Mark all form controls as touched to trigger validation
    this.demandeAppointementForm.markAllAsTouched();
    this.showError = false;

    // Check if the form is invalid
    if(this.demandeAppointementForm.value.methodeRevoir === '' || this.demandeAppointementForm.value.periode === '' || this.demandeAppointementForm.value.datepicker === ''){
      // Clear the validationErrors array before adding new errors
      this.showError = true;
      this.validationErrors = [];
      if(this.demandeAppointementForm.value.methodeRevoir === ''){
        this.validationErrors.push(this.errors_dict["methodeRevoir"]);

      }
      if(this.demandeAppointementForm.value.periode === ''){
        this.validationErrors.push(this.errors_dict["periode"]);

      }
      if(this.demandeAppointementForm.value.datepicker === ''){
        this.validationErrors.push(this.errors_dict["datepicker"]);

      }
    }
    else {
      this.isFirstTabDisabled = true;
      this.isSecondTabDisabled = true;
      this.isThirdTabDisabled = false;
    
      // Remove 'active' class from the second tab button
      this.secondTabButton.nativeElement.classList.remove('active');
      // Add 'active' class to the third tab button
      this.thirdTabButton.nativeElement.classList.add('active');
  
      // Update the active tab content
      const thirdTabContent = document.getElementById('third');
      if (thirdTabContent) {
        thirdTabContent.classList.add('active', 'show');
      }
      const secondTabContent = document.getElementById('second');
      if (secondTabContent) {
        secondTabContent.classList.remove('active', 'show');
      }
      this.demandeAppointementForm.value.typeCultures = this.demandeAppointementForm.value.typeCulturesArray.join(", ");
    }
  }
  
  SaveDemande() {

    if (this.demandeAppointementForm.invalid) {
      // Clear the validationErrors array before adding new errors
      this.showError = true;
      this.validationErrors = [];
  
      // Loop through each form control
      Object.keys(this.demandeAppointementForm.controls).forEach(key => {
        const control = this.demandeAppointementForm.get(key);
  
        // Check if the control is invalid and has been touched
        if (control.invalid && control.touched) {
          // Get validation messages for the current control
          Object.keys(control.errors).forEach(errorKey => {
            // Add validation error message to the validationErrors array
            this.validationErrors.push(this.errors_dict[key]);
          });
        }
      });
    }
    if(this.demandeAppointementForm.value.methodeRevoir === '' || this.demandeAppointementForm.value.periode === '' || this.demandeAppointementForm.value.datepicker === ''){
      // Clear the validationErrors array before adding new errors
      this.showError = true;
      this.validationErrors = [];
      if(this.demandeAppointementForm.value.methodeRevoir === ''){
        this.validationErrors.push(this.errors_dict["methodeRevoir"]);

      }
      if(this.demandeAppointementForm.value.periode === ''){
        this.validationErrors.push(this.errors_dict["periode"]);

      }
      if(this.demandeAppointementForm.value.datepicker === ''){
        this.validationErrors.push(this.errors_dict["datepicker"]);

      }
    }
    else{
      this.demandeAppointmentService.create(this.demandeAppointementForm.value).subscribe({
        next: () => {
          console.log(this.demandeAppointementForm.value);
        },
        error: error => {
          this.validationErrors = error
        } 
      })
    }
  }
}
