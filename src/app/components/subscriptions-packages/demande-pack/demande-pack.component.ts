import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandePacks } from 'src/app/models/demande-packs';
import { DemandePacksService } from 'src/app/services/demande-packs.service';

@Component({
  selector: 'app-demande-pack',
  templateUrl: './demande-pack.component.html',
  styleUrls: ['./demande-pack.component.css']
})
export class DemandePackComponent implements OnInit {

  constructor(private router : Router, private fb: FormBuilder, private demandePackservice: DemandePacksService) { }
  number: number = 0;
  demandePackForm: FormGroup;
  tempDemandePacks: DemandePacks;
  image: string = "assets/images/Olea-Pack 1.png";
  namePack: string="الإشتراك الفضي";
  pricePack: string= "89";

  ngOnInit(): void {
    this.InitializeForm();
  }

  createDemandePacks() {
    this.tempDemandePacks=
    {
      fichier : this.demandePackForm.value.attachment,
      number : this.demandePackForm.value.number,
      packType : this.namePack,
      codeReduction: this.demandePackForm.value.codeReduction,
      date: null,
      statut:'',
    }
    this.demandePackservice.create(this.tempDemandePacks).subscribe({
      next: _ => {
        console.log("dem", this.tempDemandePacks)
        this.router.navigateByUrl('/');
        // this.showError = false;
      },
      error: e => {
        // this.showError = true;
        // this.validationError = e.error;
      } 
    })
  }

  increment() {
    this.number++;
  }

  decrement() {
    if (this.number > 0) {
      this.number--;
    }
  }

  checkValidity() {
    if (this.number < 0) {
      this.number = 0;
    }
  }
  InitializeForm()
  {
    this.demandePackForm = this.fb.group(
      {
        number:[''],
        attachment: [''],
        codeReduction:[''],
      }
    )
  }
}
