import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from 'src/app/models/constants';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailRegex = EMAIL_REGEX;
  @Output() profileChoice = new EventEmitter();
  @Output() resetPassword = new EventEmitter();
  
  loginForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', Validators.required]
    })
  }


  login() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
      },
      error: e => {
        this.validationErrors = e;
      } 
    })
  }

  ProfileChoice()
  {
    this.profileChoice.emit(true);
  }

  ResetPassword()
  {
    this.resetPassword.emit(true);
  }
}