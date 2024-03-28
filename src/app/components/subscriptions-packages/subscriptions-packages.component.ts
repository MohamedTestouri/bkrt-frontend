import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router : Router) { }

  ngOnInit(): void {
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

  clickOleaPack()
  {
    this.router.navigateByUrl('/demande-pack');
  }

  clickRubiraPack()
  {

  }

  clickSaphranPack()
  {

  }
}
