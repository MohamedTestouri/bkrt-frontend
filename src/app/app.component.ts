import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bakourat.Client';
  users: any;

  constructor(private accountService: AccountService, private router: Router){}

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }

}

