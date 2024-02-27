import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  currentUser : any = {};
  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(
    (user) => {
      this.currentUser = user;
      console.log("user", this.currentUser);
    },
    (error) => {
      console.error('Error fetching current user', error);
    }
  );
    console.log("user", this.currentUser);
  }
  AccountSettings()
  {
    this.router.navigateByUrl('/accountSettings');
  }
}
