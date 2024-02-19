import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile-choice',
  templateUrl: './profile-choice.component.html',
  styleUrls: ['./profile-choice.component.css']
})
export class ProfileChoiceComponent implements OnInit {

  @Output() register = new EventEmitter();

  afficherListeFlag: boolean = false;
  afficherButton: boolean = true;
  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  afficherListe() {
    this.afficherListeFlag = !this.afficherListeFlag;
    this.afficherButton = !this.afficherButton;
  }
  
  Register()
  {
    this.register.emit(true);
  }
}
