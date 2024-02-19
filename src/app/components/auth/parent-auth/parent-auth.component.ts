import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-auth',
  templateUrl: './parent-auth.component.html',
  styleUrls: ['./parent-auth.component.css']
})
export class ParentAuthComponent implements OnInit {
  
  loginMode = true;
  registerMode = false;
  profileChoiceMode = false;
  resetPasswordMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  showProfileChoice(event: boolean) {
    this.loginMode = false;
    this.registerMode = false;
    this.profileChoiceMode = event;
    this.resetPasswordMode = false;
  } 
  
  showResetPassword(event: boolean) {
    this.loginMode = false;
    this.registerMode = false;
    this.profileChoiceMode = false;
    this.resetPasswordMode = event;
  } 
  
  showRegister(event: boolean) {
    this.loginMode = false;
    this.registerMode = event;
    this.profileChoiceMode = false;
    this.resetPasswordMode = false;
  } 


}
