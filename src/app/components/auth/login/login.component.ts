import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  model: any = {};
  
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  
  ngOnInit(): void {
  }
  
  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
        this.model = {};
      }
    })
  }
  
  cancel() {
    this.cancelLogin.emit(false);
  }
Register()
{
  this.accountService.logout();
  this.router.navigateByUrl('/register');
}

ProfileChoice()
{
  this.accountService.logout();
  this.router.navigateByUrl('/profilChoice');
}

ResetPassword()
{
  this.accountService.logout();
  this.router.navigateByUrl('/resetPassword');
}

traiterFormulaire(data: any) {
  // Faites quelque chose avec les données du formulaire
  console.log('Données du formulaire:', data);
}
}