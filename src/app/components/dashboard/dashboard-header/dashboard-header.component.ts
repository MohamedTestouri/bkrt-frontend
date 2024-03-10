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
  progressValue : number = 10;
  resteVisite : number = 0;
  resteParticipation : number = 0;
  resteRendezVous : number = 0;
  resteAnalyses : number = 0;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe({
      next: user => {
        this.currentUser = user;
      },
      error: e => {
        console.error('Error fetching current user', e);
      } 
    })
  }

  AccountSettings()
  {
    this.router.navigateByUrl('accountSettings');
  }
}
