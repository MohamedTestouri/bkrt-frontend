import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Agriculteurs } from 'src/app/models/agriculteurs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  currentUser : User;
  role : string;
  showAdmin: boolean = false;
  showAgriculteur: boolean = false;
  progressValue : number = 10;
  resteVisite : number = 0;
  resteParticipation : number = 0;
  resteRendezVous : number = 0;
  resteAnalyses : number = 0;
  agriculteurStaut : string = "مبتدئ";
  agriculteurs : Agriculteurs[];
  agriculteursCount: number = 0;



  constructor(public accountService: AccountService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    
    this.loadAgriculteurs();
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
  

  AccountSettings()
  {
    this.router.navigateByUrl('accountSettings');
  }
  loadAgriculteurs() {
    this.userService.getAgriculteurs().subscribe(
      (data: Agriculteurs[]) => {
        this.agriculteurs = data;
        this.agriculteursCount = this.agriculteurs.length;
      },
      error => {
        console.error('Erreur lors de la récupération des agriculteurs :', error);
      }
    );
  }
}
