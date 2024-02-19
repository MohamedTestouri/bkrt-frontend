import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  afficherContenuVerif: boolean = false;
  afficherContenuInfor: boolean = true;
  isValidate : boolean = false;
  isdisabledValidate : boolean = true;
  isdisabledInformation : boolean = false;
  model: any = {};
  constructor(private http: HttpClient, public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  clickInformation()
  {
    this.afficherContenuInfor = true;
    this.afficherContenuVerif = false;
  }
  validerInformation()
  {
    this.isValidate = true;
    this.isdisabledValidate = false;
    this.isdisabledInformation = true;
    this.accountService.register(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
        this.model = {};
      }
    })
  }
  clickVerification()
  {
    if(this.isValidate == false)
    {
    this.afficherContenuVerif = false;
    this.afficherContenuInfor = false;
  }
  else
  {
    this.afficherContenuVerif = true;
    this.afficherContenuInfor = false;
  }
}

  traiterFormulaire(data: any) {
    // Faites quelque chose avec les données du formulaire
    console.log('Données du formulaire:', data);
  }

  getItems(): Observable<string[]> {
    // Remplacez l'URL par l'endpoint de votre API
    return this.http.get<string[]>('https://exemple.com/api/items');
  }
}
