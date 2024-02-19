import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
  constructor() { }

  ngOnInit(): void {
  }
  traiterFormulaire(data: any) {
    // Faites quelque chose avec les données du formulaire
    console.log('Données du formulaire:', data);
  }
}
