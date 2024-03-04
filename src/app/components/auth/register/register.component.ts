import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX, PASSWORD_REGEX, YEAROFGRADUATION_REGEX } from 'src/app/models/constants';
import { Register } from 'src/app/models/register';
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

  @Input() chosenProfile :string;

  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  tempRegisterForm : Register;
  tempRegisterEngineerForm : RegisterEngineer;

  afficherContenuInfor: boolean = true;
  afficherContenuVerif: boolean = false;
  afficherContenuConfirm: boolean = false;

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
    if(this.chosenProfile.toString() === "Ingenieur"){
      this.initializeEngineerForm();
    } else{
      this.initializeForm();
    }
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      organisationName: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phoneNumber: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  initializeEngineerForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      organisationName: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phoneNumber: ['', Validators.required],
      officeName: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      university: ['', Validators.required],
      specialty: ['', Validators.required],
      yearInUniversity: ['', [Validators.required, Validators.pattern(this.yearOfGraduationRegex)]],
      fields: this.fb.array([]),
      helperFields: this.fb.array([]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
    this.registerForm.controls['fields'].valueChanges.subscribe(value => {
      console.log('Checkbox options changed:', value);
    });
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
    return this.registerForm.get('fields') as FormArray;
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
    return this.registerForm.get('helperFields') as FormArray;
  }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {
    this.tempRegisterForm = {
      organisationName: this.registerForm.value.organisationName,
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber.internationalNumber,
      governorate: this.registerForm.value.governorate,
      delegation: this.registerForm.value.delegation,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      chosenProfile: this.chosenProfile
    }
    this.afficherContenuInfor = false;
    this.afficherContenuVerif = true;
    this.afficherContenuConfirm = false;
  }

  registerEngineer() {
    console.log("aaaaa");

    this.tempRegisterEngineerForm = {
      organisationName: this.registerForm.value.organisationName,
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber.internationalNumber,
      officeName: this.registerForm.value.officeName,
      governorate: this.registerForm.value.governorate,
      delegation: this.registerForm.value.delegation,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      chosenProfile: this.chosenProfile,
      university: this.registerForm.value.university,
      specialty: this.registerForm.value.specialty,
      yearInUniversity: this.registerForm.value.yearInUniversity,
      field: [...this.registerForm.value.fields].join(', '),
      helperFields: [...this.registerForm.value.helperFields].join(', '),
    }
    console.log(this.tempRegisterEngineerForm);
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
    this.afficherContenuInfor = false;
    this.afficherContenuVerif = false;
    this.afficherContenuConfirm = true;
    this.accountService.register(this.tempRegisterForm).subscribe({
      next: () => {
        this.tempRegisterForm = {
          organisationName: '',
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

  onGovernorateChange() {
    const governorate = this.registerForm.get('governorate').value;
    const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
    this.delegations = governorateObj ? governorateObj.delegations : [];
  }
}
