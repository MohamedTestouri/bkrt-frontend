import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
  AccountSettings()
  {
    this.router.navigateByUrl('/accountSettings');
  }
}
