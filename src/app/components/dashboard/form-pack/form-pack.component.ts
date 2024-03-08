import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TerrainService } from 'src/app/services/terrain.service';

@Component({
  selector: 'app-form-pack',
  templateUrl: './form-pack.component.html',
  styleUrls: ['./form-pack.component.css']
})
export class FormPackComponent implements OnInit {

  constructor(private fb: FormBuilder, private _terrainService : TerrainService, private router: Router ) { }
  form: FormGroup;
  
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

  typeCultures : string[] = [
    'Agriculture Conventionnelle زراعة تقليدية',
    'Agriculture Biologique      زراعة عضوية',
    'Agriculture Urbaine      زراعة حضرية',
    'Agriculture de Conservation      زراعة الحفاظ على التربة',
    'Agroforesterie      زراعة الأشجار المختلطة',
    'Agriculture de Précision      زراعة دقيقة',
    'Périurbain et Rural      زراعة في المناطق الحضرية والريفية',
    'Agriculture Agroécologique      زراعة الزراعة البيئية',
    'Hydroponie      الزراعة المائية',
    'Aquaculture      الزراعة المائية (تربية الأحياء المائية)' ];

  delegations: string[] = [];
  lat = 37.7749;
  lng = -122.4194;
  validationErrors: string[] | undefined;

  // Handle marker dragend event
  markerDragEnd($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      surface: ['', Validators.required],
      site: [''],
      adresse: ['', [Validators.required]],
      governorate: ['', Validators.required],
      delegation: ['', Validators.required],
      address: ['', Validators.required],
      typeCulture: this.fb.array([]),
      moreSpecificity: ['', Validators.required],
      fruitiere: [false, ],
      natureAgriculture: ['', ],
      ageArbres: [{ value: '', disabled: true }],
      densitePlantation: [{ value: '', disabled: true }],
      densitePlantation2: [{ value: '', disabled: true }],
      aspersion: [{ value: '', disabled: true }],
      hydroponie: [{ value: '', disabled: true }],  
      sousSerre: [{ value: '', disabled: true }],
      autre: [{ value: '', disabled: true }],
      maraicheres: [false, ],
      varietePlantation: [{ value: '', disabled: true }],
      betail: [false, ],
      typeBetail: [{ value: '', disabled: true }],
      nombreBetail: [{ value: '', disabled: true }],

    });
  }
  onGovernorateChange() {
    const governorate = this.form.get('governorate').value;
    const governorateObj = this.governoratesWithDelegations.find(item => item.governorate === governorate);
    this.delegations = governorateObj ? governorateObj.delegations : [];
  }
  toggleFieldsMaraicheres() {
    const maraicheresControl = this.form.get('maraicheres');
    const varietePlantationControl = this.form.get('varietePlantation');
    const densitePlantation2Control = this.form.get('densitePlantation2');
    const hydroponieControl = this.form.get('hydroponie');
    const autreControl = this.form.get('autre');
    const sousSerreControl = this.form.get('sousSerre');
    const aspersionControl = this.form.get('aspersion');

    if (maraicheresControl?.value) {
      varietePlantationControl?.enable();
      densitePlantation2Control?.enable();
      hydroponieControl?.enable();
      autreControl?.enable();
      sousSerreControl?.enable();
      aspersionControl?.enable();
    } else {
      varietePlantationControl?.disable();
      densitePlantation2Control?.disable();
      hydroponieControl?.disable();
      autreControl?.disable();
      sousSerreControl?.disable();
      aspersionControl?.disable();
    }
  }
  toggleFieldsFruitiere() {
    const fruitiereControl = this.form.get('fruitiere');
    const ageArbresControl = this.form.get('ageArbres');
    const densitePlantationControl = this.form.get('densitePlantation');

    if (fruitiereControl?.value) {
      ageArbresControl?.enable();
      densitePlantationControl?.enable();
    } else {
      ageArbresControl?.disable();
      densitePlantationControl?.disable();
    }
  }

  toggleFieldsBetail() {
    const betailControl = this.form.get('betail');
    const typeBetailControl = this.form.get('typeBetail');
    const nombreBetailControl = this.form.get('nombreBetail');

    if (betailControl?.value) {
      typeBetailControl?.enable();
      nombreBetailControl?.enable();
    } else {
      typeBetailControl?.disable();
      nombreBetailControl?.disable();
    }
  }

  isDisabled(controlName: string): string {
    const control = this.form.get(controlName);
    return control?.disabled ? 'true' : null;
  }
  Create()
  {
    console.log(this.form.value)
    this._terrainService.create(this.form.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/');
      },
      error: e => {
        this.validationErrors = e;
      } 
    })
  }
}
