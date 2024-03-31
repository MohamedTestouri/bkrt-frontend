import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pack } from 'src/app/models/pack';
import { PackService } from 'src/app/services/pack.service';

@Component({
  selector: 'app-subscriptions-packages',
  templateUrl: './subscriptions-packages.component.html',
  styleUrls: ['./subscriptions-packages.component.css']
})
export class SubscriptionsPackagesComponent implements OnInit {

  isExpandedSaphran: boolean = false;
  isExpandedRubira: boolean = false;
  isExpandedOlea: boolean = false;
  OleaPack : boolean = true;
  RubiraPack : boolean = true;
  SaphranPack : boolean = true;
  oleaPrice : number = 89;
  selectedImage: string = '';
  packSelected : Pack;

  constructor(private router : Router, private packService : PackService) { }

  ngOnInit(): void 
  {
  }

  toggleExpandedSaphran() {
      this.isExpandedSaphran = !this.isExpandedSaphran;
  }
  toggleExpandedRubira() {
      this.isExpandedRubira = !this.isExpandedRubira;
  }
  toggleExpandedOlea() {
      this.isExpandedOlea = !this.isExpandedOlea;
  }
getPackByName(name: string)
{
  this.packService.getPackByName(name)
      .subscribe(
        (data: Pack) => {
          this.packSelected = data;
        },
        error => {
          console.error('Erreur lors de la récupération du pack :', error);
        }
      );
}
  clickPack(imageName: string)
  {
    this.getPackByName(imageName);
    this.selectedImage = imageName;
    this.router.navigateByUrl(`/demande-pack/${imageName}`);
  }

}
