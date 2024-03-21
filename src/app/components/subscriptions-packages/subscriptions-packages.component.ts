import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriptions-packages',
  templateUrl: './subscriptions-packages.component.html',
  styleUrls: ['./subscriptions-packages.component.css']
})
export class SubscriptionsPackagesComponent implements OnInit {

OleaPack : boolean = true;
RubiraPack : boolean = true;
SaphranPack : boolean = true;
oleaPrice : number = 89;

  constructor(private router : Router) { }

  ngOnInit(): void {
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
  toggleOlea() {
    this.OleaPack = !this.OleaPack;
  }
  toggleRubira() {
    this.RubiraPack = !this.RubiraPack;
  }
  toggleSaphran() {
    this.SaphranPack = !this.SaphranPack;
  }

}
