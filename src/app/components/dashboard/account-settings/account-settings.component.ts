import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UpdateInfo } from 'src/app/models/update-info';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  model : any = {};
  currentUser : User;
  form: FormGroup = new FormGroup({});
  updateForm : UpdateInfo;
  constructor(private fb: FormBuilder, public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {

    this.accountService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
      }, 
      (error) => {
        console.error('Error fetching current user', error);
      }
    );

    this.form = this.fb.group({
      firstName: [this.currentUser.firstName],
      lastName: [this.currentUser.lastName],
      email: [{ value: this.currentUser.email, disabled: true }],
      password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
      newPassword: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
      terrain: [''],
    });
    console.log("form", this.form)
  }

  updateInfo() {
    const updateForm = {
      lastName: this.form.value.lastName? undefined : this.currentUser.lastName,
      firstName: this.form.value.firstName? undefined : this.currentUser.firstName,
      email: this.form.value.email? undefined : this.currentUser.email,
      password: this.form.value.password? undefined : '',
    }
    console.log("register", updateForm)
    this.accountService.updateInfo(updateForm).subscribe({
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
