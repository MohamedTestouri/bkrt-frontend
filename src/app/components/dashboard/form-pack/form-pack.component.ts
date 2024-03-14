import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { GOVERNORATES, GOVERNORATESWITHDELEGATIONS, TYPECULTURES } from 'src/app/models/constants/constants';
import { AccountService } from 'src/app/services/account.service';
import { TerrainService } from 'src/app/services/terrain.service';

@Component({
  selector: 'app-form-pack',
  templateUrl: './form-pack.component.html',
  styleUrls: ['./form-pack.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class FormPackComponent implements OnInit {

  constructor(private fb: FormBuilder, private _terrainService : TerrainService, private router: Router, public accountService: AccountService ) { }

  agriProjectform: FormGroup;

  governoratesWithDelegations = GOVERNORATESWITHDELEGATIONS;
  governorates: string[] = GOVERNORATES;
  delegations: string[] = [];

  selectedtypeCultures: string[];
  typeCultures = TYPECULTURES;

  lat = 37.7749;
  lng = -122.4194;
  validationErrors: string[] | undefined;

  // Handle marker dragend event
  markerDragEnd($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.agriProjectform = this.fb.group({
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      surface: ['', Validators.required],
      site: [''],



      // adresse: ['', [Validators.required]],

      // address: ['', Validators.required],
      // typeCulture: this.fb.array([]),
      // moreSpecificity: ['', Validators.required],
      // fruitiere: [false, ],
      // natureAgriculture: ['', ],
      // ageArbres: [{ value: '', disabled: true }],
      // densitePlantation: [{ value: '', disabled: true }],
      // densitePlantation2: [{ value: '', disabled: true }],
      // aspersion: [{ value: '', disabled: true }],
      // hydroponie: [{ value: '', disabled: true }],  
      // sousSerre: [{ value: '', disabled: true }],
      // autre: [{ value: '', disabled: true }],
      // maraicheres: [false, ],
      // varietePlantation: [{ value: '', disabled: true }],
      // betail: [false, ],
      // typeBetail: [{ value: '', disabled: true }],
      // nombreBetail: [{ value: '', disabled: true }],
    });
  }

  onGovernorateChange() {
    const governorate = this.agriProjectform.get('governorate').value;
    const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
    this.delegations = governorateObj ? governorateObj.delegations : [];
  }

  selectedItems: string[] = [];

  toggleSelection(item: string) {
    console.log(this.selectedItems)
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item); // Add item if not already selected
    } else {
      this.selectedItems.splice(index, 1); // Remove item if already selected
    }
  }

  // onGovernorateChange() {
  //   const governorate = this.form.get('governorate').value;
  //   const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
  //   this.delegations = governorateObj ? governorateObj.delegations : [];
  // }
  // toggleFieldsMaraicheres() {
  //   const maraicheresControl = this.form.get('maraicheres');
  //   const varietePlantationControl = this.form.get('varietePlantation');
  //   const densitePlantation2Control = this.form.get('densitePlantation2');
  //   const hydroponieControl = this.form.get('hydroponie');
  //   const autreControl = this.form.get('autre');
  //   const sousSerreControl = this.form.get('sousSerre');
  //   const aspersionControl = this.form.get('aspersion');

  //   if (maraicheresControl?.value) {
  //     varietePlantationControl?.enable();
  //     densitePlantation2Control?.enable();
  //     hydroponieControl?.enable();
  //     autreControl?.enable();
  //     sousSerreControl?.enable();
  //     aspersionControl?.enable();
  //   } else {
  //     varietePlantationControl?.disable();
  //     densitePlantation2Control?.disable();
  //     hydroponieControl?.disable();
  //     autreControl?.disable();
  //     sousSerreControl?.disable();
  //     aspersionControl?.disable();
  //   }
  // }
  // toggleFieldsFruitiere() {
  //   const fruitiereControl = this.form.get('fruitiere');
  //   const ageArbresControl = this.form.get('ageArbres');
  //   const densitePlantationControl = this.form.get('densitePlantation');

  //   if (fruitiereControl?.value) {
  //     ageArbresControl?.enable();
  //     densitePlantationControl?.enable();
  //   } else {
  //     ageArbresControl?.disable();
  //     densitePlantationControl?.disable();
  //   }
  // }

  // toggleFieldsBetail() {
  //   const betailControl = this.form.get('betail');
  //   const typeBetailControl = this.form.get('typeBetail');
  //   const nombreBetailControl = this.form.get('nombreBetail');

  //   if (betailControl?.value) {
  //     typeBetailControl?.enable();
  //     nombreBetailControl?.enable();
  //   } else {
  //     typeBetailControl?.disable();
  //     nombreBetailControl?.disable();
  //   }
  // }

  // isDisabled(controlName: string): string {
  //   const control = this.form.get(controlName);
  //   return control?.disabled ? 'true' : null;
  // }
  // Create()
  // {
  //   console.log(this.form.value)
  //   this._terrainService.create(this.form.value).subscribe({
  //     next: _ => {
  //       this.router.navigateByUrl('/');
  //     },
  //     error: e => {
  //       this.validationErrors = e;
  //     } 
  //   })
  // }
}
