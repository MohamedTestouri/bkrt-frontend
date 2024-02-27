import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser : any = {};
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  DashboardHeader()
  {
    this.router.navigateByUrl('/dashboardHeader');
  }
}
