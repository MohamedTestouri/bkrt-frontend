import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateInfo } from 'src/app/models/updateInfo';
import { PASSWORD_REGEX } from 'src/app/models/constants/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  model : any = {};
  userInfos : UpdateInfo;

  passwordRegex = PASSWORD_REGEX;

  userForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});

  updateForm : UpdateInfo;
  constructor(private fb: FormBuilder, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userService.getUserInfo().subscribe({
      next: _ => {
        this.userInfos = _ ;

        this.userForm = this.fb.group({
          firstName: [this.userInfos.firstName, Validators.required],
          lastName: [this.userInfos.lastName, Validators.required],
          email: [{ value: this.userInfos.email, disabled: true }],
        });
    
        this.passwordForm = this.fb.group({
          oldPassword: ['', Validators.required],
          newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
          confirmPassword: ['',[Validators.required, this.matchValues('newPassword')]],
        });
    
        this.passwordForm.controls['newPassword'].valueChanges.subscribe({
          next: () => this.passwordForm.controls['confirmPassword'].updateValueAndValidity()
        })
      },
      error: e => {
        console.error('Error fetching current user', e);
      } 
    });

  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  updateInfo() {
    this.userService.updateInfo(this.userForm.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
      },
      error: e => {
        //this.validationErrors = e;
      } 
    })
  }

  updatePassword() {
    this.userService.updatePassword(this.passwordForm.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
      },
      error: e => {
        //this.validationErrors = e;
      } 
    })
  }
}
