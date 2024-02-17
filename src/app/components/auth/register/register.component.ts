import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  afficherContenuVerif: boolean = false;
  afficherContenuInfor: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  clickInformation()
  {
    this.afficherContenuInfor = true;
    this.afficherContenuVerif = false;
  }
  clickVerification()
  {
    this.afficherContenuVerif = true;
    this.afficherContenuInfor = false;
  }

  traiterFormulaire(data: any) {
    // Faites quelque chose avec les données du formulaire
    console.log('Données du formulaire:', data);
  }
}
