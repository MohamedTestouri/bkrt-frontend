// constants.ts

export const EMAIL_REGEX = '^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$';

export const PASSWORD_REGEX = '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$';

export const YEAROFGRADUATION_REGEX = '[0-9]{4}';

export const GOVERNORATES: string[] = [
  'تونس',
  'أريانة',
  'بن عروس',
  'منوبة',
  'نابل',
  'زغوان',
  'بنزرت',
  'باجة',
  'جندوبة',
  'الكاف',
  'سليانة',
  'سوسة',
  'المنستير',
  'المهدية',
  'صفاقس',
  'القيروان',
  'القصرين',
  'سيدي بوزيد',
  'قفصة',
  'توزر',
  'قبلي',
  'تطاوين',
  'مدنين',
  'قابس',
];

export const GOVERNORATESWITHDELEGATIONS = [
  {
    governorate: 'تونس',
    delegations: [
      'تونس',
      'المرسى',
      'الباردو',
      'الكرم',
      'القلعة الكبرى',
      'قرطاج',
      'سيدي حسين',
    ],
  },
  {
    governorate: 'أريانة',
    delegations: [
      'أريانة',
      'التضامن',
      'القلعة الأندلس',
      'السكرة',
      'المنيهلة',
      'رواد',
    ],
  },
  {
    governorate: 'بن عروس',
    delegations: [
      'بن عروس',
      'بومهل البساتين',
      'المروج',
      'الزهراء',
      'فوشانة',
      'حمام الأنف',
      'حمام الشط',
      'مرناق',
      'رادس',
    ],
  },
  {
    governorate: 'منوبة',
    delegations: ['منوبة', 'دوار هيشر', 'مرناقية', 'وادي الليل'],
  },
  {
    governorate: 'نابل',
    delegations: [
      'نابل',
      'بني خلاد',
      'بني خيار',
      'بوعرقوب',
      'دار شعبان الفهري',
      'الهوارية',
      'الميدة',
      'قرمبالية',
      'حمام الغزاز',
      'الحمامات',
      'قليبية',
      'قربة',
      'منزل بوزلفة',
      'منزل تميم',
      'سليمان',
      'تاكلسة',
    ],
  },
  {
    governorate: 'زغوان',
    delegations: ['زغوان', 'بئر مشارقة', 'جبل الأُسط', 'ناظور', 'السواف'],
  },
  {
    governorate: 'بنزرت',
    delegations: [
      'بنزرت الشمالية',
      'بنزرت الجنوبية',
      'العلية',
      'غار الملح',
      'ماطر',
      'منزل بورقيبة',
      'راس الجبل',
      'سجنان',
    ],
  },
  {
    governorate: 'باجة',
    delegations: [
      'باجة الشمالية',
      'باجة الجنوبية',
      'عمدون',
      'قبلاط',
      'مجاز الباب',
      'مجاز الباب',
      'تبرسق',
      'تستور',
      'الثّابر',
    ],
  },
  {
    governorate: 'جندوبة',
    delegations: [
      'جندوبة',
      'عين دراهم',
      'بلطة بوعوان',
      'بوسالم',
      'الفرنانة',
      'القصر',
      'وادي مليز',
    ],
  },
  {
    governorate: 'الكاف',
    delegations: [
      'الكاف',
      'الدّهماني',
      'جريصة',
      'القلعة السنانية',
      'ساقية سيدي يوسف',
      'تاجروين',
    ],
  },
  {
    governorate: 'سليانة',
    delegations: [
      'سليانة',
      'برقو',
      'العروسة',
      'القعدة',
      'الكاف',
      'مكثر',
      'الروحية',
    ],
  },
  {
    governorate: 'سوسة',
    delegations: [
      'سوسة الجوهرة',
      'سوسة المدينة',
      'سوسة الرياض',
      'أكودة',
      'بوفيشة',
      'النفيضة',
      'حمام سوسة',
      'هرقلة',
      'القلعة الكبرى',
      'القلعة الصغرى',
      'قندار',
      'مساعدة',
    ],
  },
  {
    governorate: 'المنستير',
    delegations: [
      'المنستير',
      'بمبلة',
      'جمال',
      'قصر هلال',
      'مكنين',
      'الساحلين',
      'الصيادة-اللمطة-بوهجر',
    ],
  },
  {
    governorate: 'المهدية',
    delegations: [
      'المهدية',
      'بومرداس',
      'الشابة',
      'الجم',
      'السواسي',
      'حبيرة',
      'قصور الساف',
    ],
  },
  {
    governorate: 'صفاقس',
    delegations: [
      'صفاقس المدينة',
      'صفاقس الغربية',
      'صفاقس الجنوبية',
      'أقارب',
      'بئر علي بن خليفة',
      'العمرة',
      'الحنشة',
      'قرمبالية',
      'جبينيانة',
      'جرمدة',
      'قرقنة',
      'المحارزة',
      'ساقية الدائر',
      'ساقية الزيت',
      'ثينة',
    ],
  },
  {
    governorate: 'القيروان',
    delegations: [
      'القيروان الشمالية',
      'القيروان الجنوبية',
      'بوحجلة',
      'الشبيكة',
      'حفوز',
      'حاجب العيون',
      'الوسلاتية',
      'السبيخة',
    ],
  },
  {
    governorate: 'القصرين',
    delegations: [
      'القصرين',
      'عيون العطاروس',
      'العزوغة',
      'فريانة',
      'فوسانة',
      'الحسي الفريد',
      'هضرة',
      'الجدليان',
      'السبيعة',
      'السبيبة',
      'ذهيبة',
    ],
  },
  {
    governorate: 'سيدي بوزيد',
    delegations: [
      'سيدي بوزيد',
      'بئر الحفي',
      'سبالة',
      'جلمة',
      'مكناسي',
      'مازونة',
      'أولاد حفوز',
      'رقاد',
      'سوق الجديد',
    ],
  },
  {
    governorate: 'قفصة',
    delegations: [
      'قفصة الشمالية',
      'قفصة الجنوبية',
      'بلخير',
      'القطار',
      'المظيلة',
      'متلوي',
      'رديف',
      'سند',
    ],
  },
  { governorate: 'توزر', delegations: ['توزر', 'دقاش', 'حامة الجريد', 'نفطة'] },
  {
    governorate: 'قبلي',
    delegations: [
      'قبلي الشمالية',
      'قبلي الجنوبية',
      'دوز الشمالية',
      'دوز الجنوبية',
    ],
  },
  {
    governorate: 'تطاوين',
    delegations: [
      'تطاوين الشمالية',
      'تطاوين الجنوبية',
      'بئر لحلف',
      'الدهايبة',
      'غمراسن',
      'رمادة',
    ],
  },
  {
    governorate: 'مدنين',
    delegations: [
      'مدنين الشمالية',
      'مدنين الجنوبية',
      'بن قردان',
      'جربة أجيم',
      'جربة حومة السوق',
      'جربة ميدون',
    ],
  },
  {
    governorate: 'قابس',
    delegations: [
      'قابس المدينة',
      'قابس الغربية',
      'قابس الجنوبية',
      'الحامة',
      'المطوية',
      'قابس المدينة',
      'الغنوش',
      'مطماطة',
    ],
  },
];

export const TYPEAGRICULTURES = [
  { name: 'Agriculture Conventionnelle زراعة تقليدية' },
  { name: 'Agriculture Biologique      زراعة عضوية' },
  { name: 'Agriculture Urbaine      زراعة حضرية' },
  { name: 'Agriculture de Conservation      زراعة الحفاظ على التربة' },
  { name: 'Agroforesterie      زراعة الأشجار المختلطة' },
  { name: 'Agriculture de Précision      زراعة دقيقة' },
  { name: 'Périurbain et Rural      زراعة في المناطق الحضرية والريفية' },
  { name: 'Agriculture Agroécologique      زراعة الزراعة البيئية' },
  { name: 'Hydroponie      الزراعة المائية' },
  { name: 'Aquaculture      الزراعة المائية (تربية الأحياء المائية)' },
];

export const TYPECULTURES = [
  { label: 'Cultures céréalières | الزراعات الحبوبية' },
  { label: 'Cultures oléagineuses | الزراعات الزيتية' },
  { label: 'Cultures légumières | الزراعات الخضرية' },
  { label: 'Cucurbitacées | البقوليات' },
  { label: 'Légumes feuilles | الخضر الورقية' },
  { label: 'Culture maraîchère | زراعة الخضر للسوق' },
  { label: 'Plantes aromatiques | النباتات العطرية' },
  { label: 'Cultures fourragères | الزراعات العلفية' },

  {
    name: 'Industrial Crops',
    label: 'Cultures industrielles | الزراعة الصناعية',
  },
  {
    name: 'Horticultural Crops',
    label: 'Cultures horticoles | الزراعة البستانية',
  },
];

export const SPECIALITES = [
  { id: 'ingenieur', value: 'مهندس فلاحي', label: 'مهندس فلاحي' },
  { id: 'veterinaire', value: 'طبيب بيطري', label: 'طبيب بيطري' },
  { id: 'technicienMontage', value: 'فني مختص في التركيب', label: 'فني مختص في التركيب' },
  { id: 'technicien2', value: 'فني مختص في الزبيرة', label: 'فني مختص في الزبيرة' }
];

export const DOMAINESAGRICULTURE = [
  { id: 'plantation', value: 'زراعات', label: 'زراعات' },
  { id: 'animaux', value: 'حيوانات', label: 'حيوانات' },
  { id: 'administratif', value: 'مسائل إدارية وإجرائية تخص بعث مشروع فلاحي', label: 'مسائل إدارية وإجرائية تخص بعث مشروع فلاحي' },
  { id: 'alimentaire', value: 'مشروع تحويلي و صناعات غذائية', label: 'مشروع تحويلي و صناعات غذائية' },
  { id: 'autre', value: 'أخرى', label: 'أخرى' }
];

export const SUJETAGRICULTURE = [
  { id: 'remiseSolFertilisation', value: 'استصلاح تربة و تسميد', label: 'استصلاح تربة و تسميد' },
  { id: 'eauIrrigation', value: 'مياه و ري', label: 'مياه و ري' },
  { id: 'maladiesPlantes', value: 'أمراض النباتات', label: 'أمراض النباتات' },
  { id: 'autre2', value: 'أخرى', label: 'أخرى' }
];

export const TYPEAGRICULTURE = [
  { id: 'agricultureNormale', value: 'فلاحة عادية', label: 'فلاحة عادية' },
  { id: 'agricultureBiologique', value: 'فلاحة بيولوجية', label: 'فلاحة بيولوجية' },
  { id: 'agricultureRefuge', value: 'فلاحة مستدامة', label: 'فلاحة مستدامة' },
  { id: 'agricultureAquatique', value: 'زراعات مائية', label: 'زراعات مائية' }
];

export const PERIODES =[
  { id: 'matin', label: 'الفترة الصباحية', value: 'الفترة الصباحية', checked: true },
  { id: 'soir', label: 'الفترة المسائية', value: 'الفترة المسائية', checked: false },
];

export const REVOIROPTIONS = [
  { id: 'visite', label: 'زيارة ميدانية', value: 'زيارة ميدانية' },
  { id: 'aDistance', label: 'مقابلة عبر الإنترنت', value: 'مقابلة عبر الإنترنت' }
];
export const FACULTES = [
  { 
    name: 'INAT', 
    label: 'Institut National Agronomique de Tunis', 
    
  },
  { 
    name: 'ESAM', 
    label: 'École Supérieure d Agriculture de Mograne', 
  },
  { 
    name: 'ISACM', 
    label: 'Institut Supérieur Agronomique de Chott Mariem', 
  },
  { 
    name: 'ESAK', 
    label: 'École Supérieure d Agriculture de Kef', 
  },
  { 
    name: 'ESAMB', 
    label: 'École Supérieure d Agriculture de Medjez El Bab', 
  },
  
];

export const SPECIALITESUNIVERSITY = [
  {faculte: 'Institut National Agronomique de Tunis',
  specialites: ['Génie agricole', 'Agronomie', 'Sciences de l environnement', 'Horticulture', 'Zootechnie', 'Protection des cultures']
  },

   {faculte: 'École Supérieure d Agriculture de Mograne',
   specialites: ['Génie rural', 'Agriculture biologique', 'Agroalimentaire', 'Aménagement du territoire', 'Économie agricole', 'Systèmes d information géographique appliqués à l agriculture']

  },

  {faculte: 'Institut Supérieur Agronomique de Chott Mariem',
  specialites: ['Génie agricole', 'Agronomie', 'Sciences de l environnement', 'Horticulture', 'Zootechnie', 'Protection des cultures']
},

  {faculte: 'École Supérieure d Agriculture de Kef',
  specialites: ['Génie rural', 'Agriculture biologique', 'Agroalimentaire', 'Aménagement du territoire', 'Économie agricole', 'Systèmes d information géographique appliqués à l agriculture']
},

  {faculte: 'École Supérieure d Agriculture de Medjez El Bab',
  specialites: ['Génie rural', 'Agriculture biologique', 'Agroalimentaire', 'Aménagement du territoire', 'Économie agricole', 'Systèmes d information géographique appliqués à l agriculture']
},

];