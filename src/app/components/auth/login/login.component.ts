import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMAIL_REGEX } from 'src/app/models/constants/constants';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() profileChoice = new EventEmitter();
  @Output() resetPassword = new EventEmitter();
  
  emailRegex = EMAIL_REGEX;
  
  loginForm: FormGroup = new FormGroup({});

  validationError: string | undefined;
  showError: boolean = false;

  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder, private toaster: ToastrService) { }
  
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
        this.showError = false;
      },
      error: e => {
        this.showError = true;
        this.validationError = e.error;
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