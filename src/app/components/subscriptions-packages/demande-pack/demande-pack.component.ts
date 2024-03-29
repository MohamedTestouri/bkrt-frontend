import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandePacks } from 'src/app/models/demande-packs';
import { Pack } from 'src/app/models/pack';
import { DemandePacksService } from 'src/app/services/demande-packs.service';
import { PackService } from 'src/app/services/pack.service';

@Component({
  selector: 'app-demande-pack',
  templateUrl: './demande-pack.component.html',
  styleUrls: ['./demande-pack.component.css']
})
export class DemandePackComponent implements OnInit {

  constructor(private router : Router, private fb: FormBuilder, private demandePackservice: DemandePacksService, private route: ActivatedRoute, private packService : PackService) { }
  number: number = 0;
  demandePackForm: FormGroup;
  tempDemandePacks: DemandePacks;
  namePack: string="";
  pricePack: string= "";
  imageName: string = '' ;
  pack : Pack;
  imagePath: string = '';

  ngOnInit(): void {
    this.InitializeForm();
    this.route.params.subscribe(params => {
      this.imageName = params['imageName'];
      this.getPackByName(this.imageName);

      if(this.imageName == "Olea")
      {
        this.imagePath = "assets/images/Olea_Pack_1.png";
        this.namePack= "الإشتراك الفضي";
      }
      else if(this.imageName == "Rubira")
      {
        this.imagePath = "assets/images/Rubira_Pack_1.png";
        this.namePack= "الإشتراك الفضي";
      }
      else if(this.imageName == "Saphran")
      {
        this.imagePath = "assets/images/Saphran_Pack_1.png";
        this.namePack= "الإشتراك الذهبي";
      }
    });
  }

  getPackByName(name: string)
{
  this.packService.getPackByName(name)
      .subscribe(
        (data: Pack) => {
          this.pack = data;
          this.pricePack = this.pack.prix;
          console.log("pack", this.pack)
        },
        error => {
          console.error('Erreur lors de la récupération du pack :', error);
        }
      );
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
      packId: this.pack.id,
    }
    this.demandePackservice.create(this.tempDemandePacks).subscribe({
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
