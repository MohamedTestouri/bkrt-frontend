import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ConfirmEmail } from 'src/app/models/confirmEmail';
import { EMAIL_REGEX } from 'src/app/models/constants';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  emailRegex = EMAIL_REGEX;
  success = true;
  confirmMailForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(public accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) =>{
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              const confirmEmail: ConfirmEmail = {
                token: params.get('token'),
                email: params.get('email'),
              }

              this.accountService.confirmEmail(confirmEmail).subscribe({
                next: (response: any) => {
                  // this.sharedService.showNotification(true, response.value.title, response.value.message);
                }, error: error => {
                  this.success = true;
                  // this.sharedService.showNotification(false, "Failed", error.error);
                }
              })
            }
          })
        }
      }
    })
  }

  initializeForm() {
    this.confirmMailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    })
  }

  BackToLogin() {
    this.router.navigateByUrl('/login');
  }

  resendEmailConfirmationLink() {
    this.accountService.resendEmailConfirmationLink(this.confirmMailForm.value.email).subscribe({
      next: (response: any) => {
        // this.sharedService.showNotification(true, response.value.title, response.value.message);
      }, error: error => {
        this.success = true;
        // this.sharedService.showNotification(false, "Failed", error.error);
      }
    })
  }
}
