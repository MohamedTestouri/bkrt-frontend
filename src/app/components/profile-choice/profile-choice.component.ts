import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-choice',
  templateUrl: './profile-choice.component.html',
  styleUrls: ['./profile-choice.component.css']
})
export class ProfileChoiceComponent implements OnInit {
  afficherListeFlag: boolean = false;
  afficherButton: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  afficherListe() {
    this.afficherListeFlag = !this.afficherListeFlag;
    this.afficherButton = !this.afficherButton;
  }
  traiterFormulaire(data: any) {
    // Faites quelque chose avec les données du formulaire
    console.log('Données du formulaire:', data);
  }
}
