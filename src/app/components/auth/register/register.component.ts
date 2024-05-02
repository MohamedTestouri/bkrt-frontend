import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX, FACULTES, GOVERNORATES, GOVERNORATESWITHDELEGATIONS, PASSWORD_REGEX, SPECIALITES, SPECIALITESUNIVERSITY, YEAROFGRADUATION_REGEX } from 'src/app/models/constants/constants';
import { Register } from 'src/app/models/registerAgriculteur';
import { RegisterBakourat } from 'src/app/models/registerBakourat';
import { RegisterEngineer } from 'src/app/models/registerEngineer';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailRegex = EMAIL_REGEX;
  passwordRegex = PASSWORD_REGEX;
  yearOfGraduationRegex = YEAROFGRADUATION_REGEX;

  @Output() returnLogin: EventEmitter<any> = new EventEmitter<any>();
  @Input() chosenProfile :string;

  registerAgriculteurForm: FormGroup = new FormGroup({});
  registerEngineerForm1: FormGroup = new FormGroup({});
  registerEngineerForm2: FormGroup = new FormGroup({});
  registerBakouratForm: FormGroup = new FormGroup({});
  
  validationErrors: string[] | undefined;

  tempRegisterAgriculteurForm: Register;
  tempRegisterEngineerForm : RegisterEngineer;
  tempRegisterBakouratForm : RegisterBakourat;

  afficherContenuInfor: boolean = true;
  afficherContenuVerif: boolean = false;
  afficherContenuConfirm: boolean = false;

  afficherContenuIngenieur2: boolean = false;

  governoratesWithDelegations = GOVERNORATESWITHDELEGATIONS;
  governorates: string[] = GOVERNORATES;
  delegations: string[] = [];
  facultes = FACULTES;
  universities: string[] = ['univ1', 'univ2'];
  specialtieswithFaculte = SPECIALITESUNIVERSITY; 
  specialties : string[] = [];
  
  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.chosenProfile.toString() === "Agriculteur"){
      this.initializeAgriculteurForm();
    } 
    else if(this.chosenProfile.toString() === "Ingenieur"){
      this.initializeEngineerForm();
    }
    else if(this.chosenProfile.toString() === "Bakourat"){
      this.initializeBakouratForm();
    }
  }

  // onChangeFaculte(faculteIndex: number) {
  //   this.specialties = this.facultes[faculteIndex].specialites;
  // }

  initializeAgriculteurForm() {
    this.registerAgriculteurForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phoneNumber: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerAgriculteurForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerAgriculteurForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  initializeEngineerForm() {
    this.registerEngineerForm1 = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phoneNumber: ['', Validators.required],
      officeName: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerEngineerForm2 = this.fb.group({
      university: ['', Validators.required],
      specialty: ['', Validators.required],
      yearInUniversity: ['', [Validators.required, Validators.pattern(this.yearOfGraduationRegex)]],
      fields: this.fb.array([]),
      helperFields: this.fb.array([]),
    });
    this.registerEngineerForm1.controls['password'].valueChanges.subscribe({
      next: () => this.registerEngineerForm1.controls['confirmPassword'].updateValueAndValidity()
    })
    // this.registerEngineerForm1.controls['fields'].valueChanges.subscribe(value => {
    //   console.log('Checkbox options changed:', value);
    // });
  }

  initializeBakouratForm() {
    this.registerBakouratForm = this.fb.group({
      userName: ['', Validators.required],
      organisationName: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phoneNumber: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      university: ['', Validators.required],
      specialty: ['', Validators.required],
      yearInUniversity: ['', [Validators.required, Validators.pattern(this.yearOfGraduationRegex)]],
      yearOfGraduation: ['', [Validators.required]],
    });
    this.registerBakouratForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerBakouratForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  registerAgriculteur() {
    this.tempRegisterAgriculteurForm = {
      firstName: this.registerAgriculteurForm.value.firstName,
      lastName: this.registerAgriculteurForm.value.lastName,
      userName: this.registerAgriculteurForm.value.userName,
      email: this.registerAgriculteurForm.value.email,
      phoneNumber: this.registerAgriculteurForm.value.phoneNumber.internationalNumber,
      governorate: this.registerAgriculteurForm.value.governorate,
      delegation: this.registerAgriculteurForm.value.delegation,
      address: this.registerAgriculteurForm.value.address,
      password: this.registerAgriculteurForm.value.password,
      confirmPassword: this.registerAgriculteurForm.value.confirmPassword,
      chosenProfile: this.chosenProfile
    }
    this.afficherContenuInfor = false;
    this.afficherContenuVerif = true;
    this.afficherContenuConfirm = false;
  }

  registerEngineerFirstInfos() {
    this.tempRegisterEngineerForm = {
      firstName: this.registerEngineerForm1.value.firstName,
      lastName: this.registerEngineerForm1.value.lastName,
      userName: this.registerEngineerForm1.value.userName,
      email: this.registerEngineerForm1.value.email,
      phoneNumber: this.registerEngineerForm1.value.phoneNumber.internationalNumber,
      officeName: this.registerEngineerForm1.value.officeName,
      governorate: this.registerEngineerForm1.value.governorate,
      delegation: this.registerEngineerForm1.value.delegation,
      address: this.registerEngineerForm1.value.address,
      password: this.registerEngineerForm1.value.password,
      confirmPassword: this.registerEngineerForm1.value.confirmPassword,
      chosenProfile: this.chosenProfile,
      university: '',
      specialty: '',
      yearInUniversity: '',
      field: '',
      helperFields: '',
    }
    this.afficherContenuIngenieur2 = true;
  }

  toggleFieldsCheckbox(value: string) {
    const index = this.fieldsArray.value.indexOf(value);
    if (index !== -1) {
      this.fieldsArray.removeAt(index);
    } else {
      this.fieldsArray.push(this.fb.control(value));
    }
  }

  get fieldsArray() {
    return this.registerEngineerForm2.get('fields') as FormArray;
  }

  toggleHelperFieldsCheckbox(value: string) {
    const index = this.helperFieldsArray.value.indexOf(value);
    if (index !== -1) {
      this.helperFieldsArray.removeAt(index);
    } else {
      this.helperFieldsArray.push(this.fb.control(value));
    }
  }

  get helperFieldsArray() {
    return this.registerEngineerForm2.get('helperFields') as FormArray;
  }
  
  ReturnToEngineerForm1(){
    this.afficherContenuIngenieur2 = false;
  }

  registerEngineerSecondInfos() {
    this.tempRegisterEngineerForm = {
      firstName: this.tempRegisterEngineerForm.firstName,
      lastName: this.tempRegisterEngineerForm.lastName,
      userName: this.tempRegisterEngineerForm.userName,
      email: this.tempRegisterEngineerForm.email,
      phoneNumber: this.tempRegisterEngineerForm.phoneNumber,
      officeName: this.tempRegisterEngineerForm.officeName,
      governorate: this.tempRegisterEngineerForm.governorate,
      delegation: this.tempRegisterEngineerForm.delegation,
      address: this.tempRegisterEngineerForm.address,
      password: this.tempRegisterEngineerForm.password,
      confirmPassword: this.tempRegisterEngineerForm.confirmPassword,
      chosenProfile: this.chosenProfile,
      university: this.registerEngineerForm2.value.university,
      specialty: this.registerEngineerForm2.value.specialty,
      yearInUniversity: this.registerEngineerForm2.value.yearInUniversity,
      field: [...this.registerEngineerForm2.value.fields].join(', '),
      helperFields: [...this.registerEngineerForm2.value.helperFields].join(', '),
    }
    this.afficherContenuInfor = false;
    this.afficherContenuVerif = true;
    this.afficherContenuConfirm = false;
  }
  
  registerBakourat() {
    this.tempRegisterBakouratForm = {
      organisationName: this.registerBakouratForm.value.organisationName,
      userName: this.registerBakouratForm.value.userName,
      email: this.registerBakouratForm.value.email,
      phoneNumber: this.registerBakouratForm.value.phoneNumber.internationalNumber,
      governorate: this.registerBakouratForm.value.governorate,
      delegation: this.registerBakouratForm.value.delegation,
      address: this.registerBakouratForm.value.delegation,
      password: this.registerBakouratForm.value.address,
      confirmPassword: this.registerBakouratForm.value.confirmPassword,
      chosenProfile: this.chosenProfile,
      university: this.registerBakouratForm.value.university,
      specialty: this.registerBakouratForm.value.specialty,
      yearInUniversity: this.registerBakouratForm.value.yearInUniversity,
      yearOfGraduation: this.registerBakouratForm.value.yearOfGraduation,
    }
    this.afficherContenuInfor = false;
    this.afficherContenuVerif = true;
    this.afficherContenuConfirm = false;
  }

  clickBackToRegisterForm()
  {
    this.afficherContenuInfor = true;
    this.afficherContenuVerif = false;
    this.afficherContenuConfirm = false;
  }

  clickConfirmRegisterForm()
  {
    if(this.chosenProfile.toString() === "Agriculteur"){
      this.afficherContenuInfor = false;
      this.afficherContenuVerif = false;
      this.afficherContenuConfirm = true;
      this.accountService.register(this.tempRegisterAgriculteurForm).subscribe({
        next: () => {
          this.tempRegisterAgriculteurForm = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            governorate: '',
            delegation: '',
            address: '',
            password: '',
            confirmPassword: '',
            chosenProfile: ''
          };
        },
        error: error => {
          this.validationErrors = error
        } 
      })
    } 
    else if(this.chosenProfile.toString() === "Ingenieur"){
      this.afficherContenuInfor = false;
      this.afficherContenuVerif = false;
      this.afficherContenuConfirm = true;
      console.log("eng", this.tempRegisterEngineerForm)
      this.accountService.register(this.tempRegisterEngineerForm).subscribe({
        next: () => {
          this.tempRegisterEngineerForm = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            officeName: '',
            governorate: '',
            delegation: '',
            address: '',
            password: '',
            confirmPassword: '',
            
            chosenProfile: '',
            university: '',
            specialty: '',
            yearInUniversity: '',
            field: '',
            helperFields: '',
          };
        },
        error: error => {
          this.validationErrors = error
        } 
      })
    }
    else if(this.chosenProfile.toString() === "Bakourat"){
      this.afficherContenuInfor = false;
      this.afficherContenuVerif = false;
      this.afficherContenuConfirm = true;
      this.accountService.register(this.tempRegisterBakouratForm).subscribe({
        next: () => {
          this.tempRegisterBakouratForm = {
            organisationName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            governorate: '',
            delegation: '',
            address: '',
            password: '',
            confirmPassword: '',
            chosenProfile: '',
            university:  '',
            specialty:  '',
            yearInUniversity:  '',
            yearOfGraduation:  '',
          };
        },
        error: error => {
          this.validationErrors = error
        } 
      })
    }
  }

  onGovernorateChange() {
    if(this.chosenProfile.toString() === "Agriculteur"){
      const governorate = this.registerAgriculteurForm.get('governorate').value;
      const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
      this.delegations = governorateObj ? governorateObj.delegations : [];
    } 
    else if(this.chosenProfile.toString() === "Ingenieur"){
      const governorate = this.registerEngineerForm1.get('governorate').value;
      const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
      this.delegations = governorateObj ? governorateObj.delegations : [];
    }
    else if(this.chosenProfile.toString() === "Bakourat"){
      const governorate = this.registerBakouratForm.get('governorate').value;
      const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
      this.delegations = governorateObj ? governorateObj.delegations : [];
    }

  }

  onFaculteChange()
  {
    const faculte = this.registerEngineerForm2.get('university').value;
    const faculteObj = this.specialtieswithFaculte.find(item => item.faculte === faculte);
    this.specialties = faculteObj ? faculteObj.specialites : [];
  }
  ReturnToLogin(){
    this.returnLogin.emit(true);
  }
}
