import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agriculteurs } from 'src/app/models/agriculteurs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser : User;
  role : string;
  showAdmin: boolean = false;
  showAgriculteur: boolean = false;


  constructor(private router: Router, public accountService: AccountService, private userService: UserService) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe({
      next: user => {
        this.currentUser = user;
        this.role = user.roles[0];
      },
      error: e => {
        console.error('Error fetching current user', e);
      } 
    })
    if(this.role == "Admin")
    {
      this.showAdmin = true;
      this.showAgriculteur = false;
    }
    else
    {this.showAdmin = false;
      this.showAgriculteur = true;}
  }

  DashboardHeader()
  {
    this.router.navigateByUrl('/dashboardHeader');
  }
  
}
