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

  userForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});

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

    this.userForm = this.fb.group({
      firstName: [this.currentUser.firstName],
      lastName: [this.currentUser.lastName],
      email: [{ value: this.currentUser.email, disabled: true }],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
      newPassword: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
      confirmNewPassword: [''],
    });

    console.log("form", this.userForm)
  }

  updateInfo() {
    const updateForm = {
      lastName: this.userForm.value.lastName? undefined : this.currentUser.lastName,
      firstName: this.userForm.value.firstName? undefined : this.currentUser.firstName,
      email: this.userForm.value.email? undefined : this.currentUser.email,
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
    this.userForm = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
    });
    this.userForm.controls['password'].valueChanges.subscribe({
      next: () => this.userForm.controls['newPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }
}
