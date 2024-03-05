import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_REGEX } from 'src/app/models/constants';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Output() returnLogin: EventEmitter<any> = new EventEmitter<any>();

  emailRegex = EMAIL_REGEX;

  resetPasswordForm: FormGroup = new FormGroup({});

  validationError: string | undefined;
  showError: boolean = false;

  constructor(public accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]]
    })
  }

  resetPassword() {
    this.accountService.forgotUsernameOrPassword(this.resetPasswordForm.value.email).subscribe({
      next: _ => {
        console.log(_);
      },
      error: e => {
        this.showError = true;
        this.validationError = e.error;
      } 
    })
  }

  ReturnToLogin(){
    this.returnLogin.emit(true);
  }
}
