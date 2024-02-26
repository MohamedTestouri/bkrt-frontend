import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RolesEnum } from 'src/app/enums/rolesEnum';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile-choice',
  templateUrl: './profile-choice.component.html',
  styleUrls: ['./profile-choice.component.css']
})
export class ProfileChoiceComponent implements OnInit {

  @Output() register: EventEmitter<any> = new EventEmitter<any>();

  afficherListeFlag: boolean = false;
  afficherButton: boolean = true;
  chosenProfile = RolesEnum;
  

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  afficherListe() {
    this.afficherListeFlag = !this.afficherListeFlag;
    this.afficherButton = !this.afficherButton;
  }
  
  Register(profile: RolesEnum)
  {
    const profileChoice = {
      moveToRegister: true,
      chosenProfile: profile.toString()
    };
    this.register.emit(profileChoice);
  }
}
