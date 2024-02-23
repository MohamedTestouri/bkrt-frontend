import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user){
          // this.toastr.error('You shall not pass!');
          this.router.navigate(['/']);
          return false;
        } 
        else return true;
      })
    )
  }
  
}
