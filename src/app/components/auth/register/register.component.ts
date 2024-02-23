import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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


  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  
  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      organisationName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {
    const registerForm = {
      organisationName: this.registerForm.value.organisationName,
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber.internationalNumber,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    }
    this.accountService.register(registerForm).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      },
      error: error => {
        this.validationErrors = error
      } 
    })
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
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
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
}
