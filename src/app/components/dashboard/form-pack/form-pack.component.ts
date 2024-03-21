import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { GOVERNORATES, GOVERNORATESWITHDELEGATIONS, TYPEAGRICULTURES } from 'src/app/models/constants/constants';
import { AccountService } from 'src/app/services/account.service';
import { TerrainService } from 'src/app/services/terrain.service';

@Component({
  selector: 'app-form-pack',
  templateUrl: './form-pack.component.html',
  styleUrls: ['./form-pack.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class FormPackComponent implements OnInit {

  constructor(private fb: FormBuilder, private terrainService : TerrainService, private router: Router, public accountService: AccountService ) { }

  agriProjectform: FormGroup;
  typeCultures = TYPEAGRICULTURES;
  governoratesWithDelegations = GOVERNORATESWITHDELEGATIONS;
  governorates: string[] = GOVERNORATES;
  delegations: string[] = [];
  validationErrors: string[] | undefined;


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.agriProjectform = this.fb.group({
      governorate: [''],
      delegation: [''],
      surface: [''],
      site: [''],
      typeCulturesArray: [],
      typeCultures: [''],
      moreSpecificity: [''],
      //
      plantationDensity: [''],
      treeAge: [''],
      //
      vegetable: [''],
      //
      irrigation: [''],
      //
      cattleBreeding: [''],
      cattleBreedingType: [''],
      cattleBreedingNumber: [''],
      //
      fieldCropsWheatTendre: [false],
      fieldCropsWheatDur: [false],
      fieldCropsBarley: [false],
      fieldCropsTriticale: [false],    
      fieldCropsOther: [false],
      //
      forageCropsAlfalfa: [false],
      forageCropsTrefleRay: [false],
      forageCropsRay_Grass: [false], 
      forageCropsForageSorghum: [false],
      forageCropsOther: [false],
      //
      fruitGrowingOliveTreeTable: [false],
      fruitGrowingOliveTreeOil: [false],
      fruitGrowingAlmond: [false],
      fruitGrowingArgumes: [false],
      fruitGrowingVineTable: [false],
      fruitGrowingVineCurve: [false],
      fruitGrowingApple: [false],
      fruitGrowingPearTree: [false],  
      fruitGrowingPeach: [false],
      fruitGrowingPomegranate: [false],
      fruitGrowingPistachioTree: [false],
      fruitGrowingPalmDate: [false],
      fruitGrowingOther: [false],
      //
      cucurbitsPasteque: [false],
      cucurbitsMelon: [false],
      cucurbitsSquash: [false],
      cucurbitsZucchini: [false],
      cucurbitsCucumber: [false],
      cucurbitsOther: [false],
      //
      leafyVegetableLettuce: [false],
      leafyVegetableCelery: [false],
      leafyVegetableSpinach: [false],
      leafyVegetableParsley: [false],
      leafyVegetableSwiss_chard: [false],
      leafyVegetableOther: [false],
      //
      marketGardeningPotato: [false],
      marketGardeningTomato: [false], 
      marketGardeningChili: [false],
      marketGardeningOnion: [false],
      marketGardeningCarrots: [false],
      marketGardeningGarlic: [false],
      marketGardeningArcihaut: [false],
      marketGardeningStrawberry: [false],
      marketGardeningEggplant: [false],
      marketGardeningCabbage: [false],
      marketGardeningOther: [false],
      //
      aromaticPlantMint: [false],
      aromaticPlantsCariander: [false], 
      aromaticPlantsThyme: [false],
      aromaticPlantsRosemary: [false],
      aromaticPlantsBasil: [false],
      aromaticPlantsGeraniul: [false], 
      aromaticPlantsOther: [false],
    });
  }

  onGovernorateChange() {
    const governorate = this.agriProjectform.get('governorate').value;
    const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
    this.delegations = governorateObj ? governorateObj.delegations : [];
  }

  registerAgriculteurProject() {
    this.agriProjectform.value.typeCultures = this.agriProjectform.value.typeCulturesArray.join(", ")
    this.terrainService.create(this.agriProjectform.value).subscribe({
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

}
