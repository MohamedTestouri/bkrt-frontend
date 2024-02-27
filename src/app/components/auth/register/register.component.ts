import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() chosenProfile :string;

  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  tempRegisterForm : Register;

  afficherContenuVerif: boolean = false;
  afficherContenuInfor: boolean = true;

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
    { governorate: 'قابس', delegations: ['قابس المدينة', 'قابس الغربية', 'قابس الجنوبية', 'الحامة', 'المطوية', 'قابس المدينة', 'الغنوش', 'مطماطة'] },
    { governorate: 'قبلي', delegations: ['قبلي الشمالية', 'قبلي الجنوبية', 'دوز الشمالية', 'دوز الجنوبية'] },
    { governorate: 'تطاوين', delegations: ['تطاوين الشمالية', 'تطاوين الجنوبية', 'بئر لحلف', 'الدهايبة', 'غمراسن', 'رمادة'] },
    { governorate: 'مدنين', delegations: ['مدنين الشمالية', 'مدنين الجنوبية', 'بن قردان', 'جربة أجيم', 'جربة حومة السوق', 'جربة ميدون'] },
    { governorate: 'قابس', delegations: ['قابس المدينة', 'قابس الغربية', 'قابس الجنوبية', 'الحامة', 'المطوية', 'قابس المدينة', 'الغنوش', 'مطماطة'] },
  ];

  
  governorates: string[] = ['تونس', 'أريانة', 'بن عروس', 'منوبة', 'نابل', 'زغوان', 'بنزرت', 'باجة', 'جندوبة', 'الكاف', 'سليانة', 'سوسة', 'المنستير',
    'المهدية', 'صفاقس', 'القيروان','القصرين', 'سيدي بوزيد','قفصة', 'توزر', 'قابس', 'قبلي', 'تطاوين', 'مدنين', 'قابس',
  ];

  delegations: string[] = [];

  
  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      organisationName: [''],
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      phoneNumber: ['', Validators.required],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
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
    console.log(this.tempRegisterForm)

    this.afficherContenuInfor = false;
    this.afficherContenuVerif = true;
  }

  clickBackToRegisterForm()
  {
    this.afficherContenuInfor = true;
    this.afficherContenuVerif = false;
  }

  clickConfirmRegisterForm()
  {
    this.accountService.register(this.tempRegisterForm).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
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
