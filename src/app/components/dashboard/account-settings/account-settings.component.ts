import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  model : any = {};
  currentUser : any = {};
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        this.form.patchValue({
          userName: this.currentUser.username,
          password : this.currentUser.password,
          email : this.currentUser.email
        });;
        console.log("user", this.currentUser)
      }, 
      (error) => {
        console.error('Error fetching current user', error);
      }
    );
  }
  updateInfo() {

    this.form = this.fb.group({
      email: ['', [Validators.email]],
    });
    
    const registerForm = {
      organisationName: this.currentUser.organisationName,
      userName: this.currentUser.username,
      email: this.currentUser.email,
      password: this.currentUser.password,
    }
    console.log("register", registerForm)
    console.log("currentUser", this.currentUser)
    this.accountService.updateInfo(registerForm).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
      },
      error: e => {
        //this.validationErrors = e;
      } 
    })
  }

  updatePassword() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
    });
    this.form.controls['password'].valueChanges.subscribe({
      next: () => this.form.controls['newPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }
}
