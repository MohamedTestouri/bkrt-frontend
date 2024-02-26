import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/register';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() chosenProfile :string;

  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  tempRegisterForm : Register;

  afficherContenuVerif: boolean = false;
  afficherContenuInfor: boolean = true;
  
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
    this.tempRegisterForm = {
      organisationName: this.registerForm.value.organisationName,
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber.internationalNumber,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      chosenProfile: this.chosenProfile
    }
    console.log(this.tempRegisterForm)

    this.afficherContenuInfor = false;
    this.afficherContenuVerif = true;
  }

  clickBackToRegisterForm()
  {
    this.afficherContenuInfor = true;
    this.afficherContenuVerif = false;
  }

  clickConfirmRegisterForm()
  {
    this.accountService.register(this.tempRegisterForm).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
        this.tempRegisterForm = {
          organisationName: '',
          userName: '',
          email: '',
          phoneNumber: '',
          address: '',
          password: '',
          confirmPassword: '',
          chosenProfile: ''
        };
        console.log(this.tempRegisterForm)
      },
      error: error => {
        this.validationErrors = error
      } 
    })
  }

}
