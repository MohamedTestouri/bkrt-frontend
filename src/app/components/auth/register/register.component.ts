import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX, PASSWORD_REGEX, YEAROFGRADUATION_REGEX } from 'src/app/models/constants';
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

  governoratesWithDelegations = [
    { governorate: 'تونس', delegations: ['تونس', 'المرسى', 'الباردو', 'الكرم', 'القلعة الكبرى', 'قرطاج', 'سيدي حسين'] },
    { governorate: 'أريانة', delegations: ['أريانة', 'التضامن', 'القلعة الأندلس', 'السكرة', 'المنيهلة', 'رواد'] },
    { governorate: 'بن عروس', delegations: ['بن عروس', 'بومهل البساتين', 'المروج', 'الزهراء', 'فوشانة', 'حمام الأنف', 'حمام الشط', 'مرناق', 'رادس'] },
    { governorate: 'منوبة', delegations: ['منوبة', 'دوار هيشر', 'مرناقية', 'وادي الليل'] },
    { governorate: 'نابل', delegations: ['نابل', 'بني خلاد', 'بني خيار', 'بوعرقوب', 'دار شعبان الفهري', 'الهوارية', 'الميدة', 'قرمبالية', 'حمام الغزاز', 'الحمامات', 'قليبية', 'قربة', 'منزل بوزلفة', 'منزل تميم', 'سليمان', 'تاكلسة'] },
    { governorate: 'زغوان', delegations: ['زغوان', 'بئر مشارقة', 'جبل الأُسط', 'ناظور', 'السواف'] },
    { governorate: 'بنزرت', delegations: ['بنزرت الشمالية', 'بنزرت الجنوبية', 'العلية', 'غار الملح', 'ماطر', 'منزل بورقيبة', 'راس الجبل', 'سجنان'] },
    { governorate: 'باجة', delegations: ['باجة الشمالية', 'باجة الجنوبية', 'عمدون', 'قبلاط', 'مجاز الباب', 'مجاز الباب', 'تبرسق', 'تستور', 'الثّابر'] },
    { governorate: 'جندوبة', delegations: ['جندوبة', 'عين دراهم', 'بلطة بوعوان', 'بوسالم', 'الفرنانة', 'القصر', 'وادي مليز'] },
    { governorate: 'الكاف', delegations: ['الكاف', 'الدّهماني', 'جريصة', 'القلعة السنانية', 'ساقية سيدي يوسف', 'تاجروين'] },
    { governorate: 'سليانة', delegations: ['سليانة', 'برقو', 'العروسة', 'القعدة', 'الكاف', 'مكثر', 'الروحية'] },
    { governorate: 'سوسة', delegations: ['سوسة الجوهرة', 'سوسة المدينة', 'سوسة الرياض', 'أكودة', 'بوفيشة', 'النفيضة', 'حمام سوسة', 'هرقلة', 'القلعة الكبرى', 'القلعة الصغرى', 'قندار', 'مساعدة'] },
    { governorate: 'المنستير', delegations: ['المنستير', 'بمبلة', 'جمال', 'قصر هلال', 'مكنين', 'الساحلين', 'الصيادة-اللمطة-بوهجر'] },
    { governorate: 'المهدية', delegations: ['المهدية', 'بومرداس', 'الشابة', 'الجم', 'السواسي', 'حبيرة', 'قصور الساف'] },
    { governorate: 'صفاقس', delegations: ['صفاقس المدينة', 'صفاقس الغربية', 'صفاقس الجنوبية', 'أقارب', 'بئر علي بن خليفة', 'العمرة', 'الحنشة', 'قرمبالية', 'جبينيانة', 'جرمدة', 'قرقنة', 'المحارزة', 'ساقية الدائر', 'ساقية الزيت', 'ثينة'] },
    { governorate: 'القيروان', delegations: ['القيروان الشمالية', 'القيروان الجنوبية', 'بوحجلة', 'الشبيكة', 'حفوز', 'حاجب العيون', 'الوسلاتية', 'السبيخة'] },
    { governorate: 'القصرين', delegations: ['القصرين', 'عيون العطاروس', 'العزوغة', 'فريانة', 'فوسانة', 'الحسي الفريد', 'هضرة', 'الجدليان', 'السبيعة', 'السبيبة', 'ذهيبة'] },
    { governorate: 'سيدي بوزيد', delegations: ['سيدي بوزيد', 'بئر الحفي', 'سبالة', 'جلمة', 'مكناسي', 'مازونة', 'أولاد حفوز', 'رقاد', 'سوق الجديد'] },
    { governorate: 'قفصة', delegations: ['قفصة الشمالية', 'قفصة الجنوبية', 'بلخير', 'القطار', 'المظيلة', 'متلوي', 'رديف', 'سند'] },
    { governorate: 'توزر', delegations: ['توزر', 'دقاش', 'حامة الجريد', 'نفطة'] },
    { governorate: 'قبلي', delegations: ['قبلي الشمالية', 'قبلي الجنوبية', 'دوز الشمالية', 'دوز الجنوبية'] },
    { governorate: 'تطاوين', delegations: ['تطاوين الشمالية', 'تطاوين الجنوبية', 'بئر لحلف', 'الدهايبة', 'غمراسن', 'رمادة'] },
    { governorate: 'مدنين', delegations: ['مدنين الشمالية', 'مدنين الجنوبية', 'بن قردان', 'جربة أجيم', 'جربة حومة السوق', 'جربة ميدون'] },
    { governorate: 'قابس', delegations: ['قابس المدينة', 'قابس الغربية', 'قابس الجنوبية', 'الحامة', 'المطوية', 'قابس المدينة', 'الغنوش', 'مطماطة'] },
  ];
  governorates: string[] = ['تونس', 'أريانة', 'بن عروس', 'منوبة', 'نابل', 'زغوان', 'بنزرت', 'باجة', 'جندوبة', 'الكاف', 'سليانة', 'سوسة', 'المنستير',
    'المهدية', 'صفاقس', 'القيروان','القصرين', 'سيدي بوزيد','قفصة', 'توزر', 'قبلي', 'تطاوين', 'مدنين', 'قابس',
  ];
  delegations: string[] = [];
  universities: string[] = ['univ1', 'univ2'];
  specialties: string[] = ['spec1', 'spec2']; 
  
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
      firstName: this.registerAgriculteurForm.value.firstName,
      lastName: this.registerAgriculteurForm.value.lastName,
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
      firstName: this.registerAgriculteurForm.value.firstName,
      lastName: this.registerAgriculteurForm.value.lastName,
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

  ReturnToLogin(){
    this.returnLogin.emit(true);
  }
}
