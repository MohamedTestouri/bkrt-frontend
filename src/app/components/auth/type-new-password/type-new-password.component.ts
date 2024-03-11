import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { EMAIL_REGEX } from 'src/app/models/constants/constants';
import { ResetPassword } from 'src/app/models/resetPassword';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-type-new-password',
  templateUrl: './type-new-password.component.html',
  styleUrls: ['./type-new-password.component.css']
})
export class TypeNewPasswordComponent implements OnInit {
  emailRegex = EMAIL_REGEX;
  resetPasswordForm: FormGroup = new FormGroup({});
  token: string | undefined;
  email: string | undefined;
  submitted = false;
  validationErrors: string[] | undefined;

  constructor(public accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              this.token = params.get('token');
              this.email = params.get('email');

              if (this.token && this.email) {
                this.initializeForm(this.email);
              } else {
                this.router.navigateByUrl('/account/login');
              }
            }
          })
        }
      }
    })
  }

  initializeForm(username: string) {
    this.resetPasswordForm = this.fb.group({
      email: [{value: username, disabled: true}],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }

  resetPassword() {
    this.submitted = true;

    if (this.resetPasswordForm.valid && this.email && this.token) {
      const model: ResetPassword = {
        token: this.token,
        email: this.email,
        newPassword: this.resetPasswordForm.get('newPassword')?.value
      };

      this.accountService.resetPassword(model).subscribe({
        next: (response: any) => {
          // this.sharedService.showNotification(true, response.value.title, response.value.message);
          this.router.navigateByUrl('/account/login');
        }, error: error => {
          if (error.error.errors) {
            // this.errorMessages = error.error.errors;
          } else {
            // this.errorMessages.push(error.error);
          }
        }
      })
    }
  }
}
