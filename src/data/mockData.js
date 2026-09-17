export const MOCK_FACILITIES = [
  {
    id: 'phc-rampur',
    name: 'Primary Health Centre (PHC) Rampur',
    type: 'PHC',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    distance: '1.8 km',
    bedsTotal: 6,
    bedsAvailable: 4,
    oxygenAvailable: true,
    emergencyReady: true,
    doctorOnDuty: 'Dr. Sunita Sharma (MBBS)',
    dutyHours: '9:00 AM - 4:00 PM',
    phone: '+91 121 2450011',
    rating: 4.6,
    medicinesStockedCount: 142,
    coordinates: { lat: 28.9845, lng: 77.7064 }
  },
  {
    id: 'phc-hastinapur',
    name: 'Primary Health Centre (PHC) Hastinapur',
    type: 'PHC',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    distance: '5.4 km',
    bedsTotal: 6,
    bedsAvailable: 1,
    oxygenAvailable: true,
    emergencyReady: false,
    doctorOnDuty: 'Dr. Vivek Verma (BAMS, MO)',
    dutyHours: '9:00 AM - 3:00 PM',
    phone: '+91 121 2450089',
    rating: 4.2,
    medicinesStockedCount: 118,
    coordinates: { lat: 29.1712, lng: 77.9942 }
  },
  {
    id: 'chc-mawanna',
    name: 'Community Health Centre (CHC) Mawana',
    type: 'CHC',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    distance: '11.2 km',
    bedsTotal: 30,
    bedsAvailable: 12,
    oxygenAvailable: true,
    emergencyReady: true,
    doctorOnDuty: 'Dr. Rajesh Gupta (MD, Physician)',
    dutyHours: '24x7 Emergency / OPD 8 AM - 2 PM',
    phone: '+91 121 2361122',
    rating: 4.7,
    medicinesStockedCount: 380,
    coordinates: { lat: 29.1023, lng: 77.9234 }
  },
  {
    id: 'dist-meerut',
    name: 'Lala Lajpat Rai District Hospital Meerut',
    type: 'District Hospital',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    distance: '18.5 km',
    bedsTotal: 150,
    bedsAvailable: 34,
    oxygenAvailable: true,
    emergencyReady: true,
    doctorOnDuty: 'Dr. Ananya Sen (Chief Medical Officer)',
    dutyHours: '24x7 Emergency & Tertiary Care',
    phone: '+91 121 2600200',
    rating: 4.8,
    medicinesStockedCount: 750,
    coordinates: { lat: 28.9845, lng: 77.7064 }
  }
];

export const MOCK_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Verma',
    qualification: 'MBBS, DNB (Family Medicine)',
    specialty: 'General Medicine & Family Health',
    facilityId: 'phc-rampur',
    facilityName: 'PHC Rampur',
    experience: '7 years',
    languages: ['Hindi', 'English'],
    opdDays: 'Mon - Sat (9 AM - 2 PM)',
    fee: 'Free (Govt. PHC)',
    availabilityToday: true,
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1594824813681-427c8a6b22c6?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ramesh Sharma',
    qualification: 'MD, DM (Cardiology)',
    specialty: 'Cardiology & Internal Medicine',
    facilityId: 'chc-mawanna',
    facilityName: 'CHC Mawana',
    experience: '16 years',
    languages: ['Hindi', 'English', 'Punjabi'],
    opdDays: 'Mon, Wed, Fri (10 AM - 3 PM)',
    fee: '₹0 (Ayushman / Free OPD)',
    availabilityToday: true,
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'doc-3',
    name: 'Dr. Sunita Sharma',
    qualification: 'MBBS, DCH',
    specialty: 'General Physician & Pediatrics',
    facilityId: 'phc-rampur',
    facilityName: 'PHC Rampur',
    experience: '9 years',
    languages: ['Hindi', 'English'],
    opdDays: 'Mon - Fri (9 AM - 2 PM)',
    fee: 'Free (Govt PHC)',
    availabilityToday: true,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'doc-4',
    name: 'Dr. Arvind Chaudhary',
    qualification: 'MS (Orthopaedics)',
    specialty: 'Orthopaedics & Trauma Care',
    facilityId: 'dist-meerut',
    facilityName: 'District Hospital Meerut',
    experience: '12 years',
    languages: ['Hindi', 'English'],
    opdDays: 'Mon to Fri (11 AM - 4 PM)',
    fee: 'Free (Govt)',
    availabilityToday: true,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
  }
];

export const MOCK_MEDICINES = [
  {
    id: 'med-1',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    category: 'Antipyretic / Analgesic',
    indications: 'Fever, Body aches, Mild headaches',
    form: 'Tablet (Strip of 10)',
    stockStatus: 'In Stock',
    totalQuantity: 840,
    facilityId: 'phc-rampur',
    facilityName: 'PHC Rampur',
    govtScheme: 'Jan Aushadhi Scheme (Free at PHC)',
    unitPrice: '₹0'
  },
  {
    id: 'med-2',
    name: 'ORS (Oral Rehydration Salts) 21.8g',
    genericName: 'Sodium Chloride + Glucose',
    category: 'Essential Electrolytes',
    indications: 'Dehydration, Diarrhea, Heat exhaustion',
    form: 'Sachet',
    stockStatus: 'In Stock',
    totalQuantity: 520,
    facilityId: 'phc-rampur',
    facilityName: 'PHC Rampur',
    govtScheme: 'National Health Mission (Free)',
    unitPrice: '₹0'
  },
  {
    id: 'med-3',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotic',
    indications: 'Bacterial throat infections, Chest infections',
    form: 'Capsule (Strip of 10)',
    stockStatus: 'Low Stock',
    totalQuantity: 34,
    facilityId: 'chc-mawanna',
    facilityName: 'CHC Mawana',
    govtScheme: 'Jan Aushadhi Scheme',
    unitPrice: '₹14 (Jan Aushadhi)'
  },
  {
    id: 'med-4',
    name: 'Metformin 500mg',
    genericName: 'Metformin Hydrochloride',
    category: 'Diabetes Care',
    indications: 'Type 2 Diabetes Mellitus glycemic control',
    form: 'Tablet (Strip of 10)',
    stockStatus: 'In Stock',
    totalQuantity: 310,
    facilityId: 'phc-rampur',
    facilityName: 'PHC Rampur',
    govtScheme: 'NCD Program (Free)',
    unitPrice: '₹0'
  },
  {
    id: 'med-5',
    name: 'Iron & Folic Acid (IFA) Tablets',
    genericName: 'Ferrous Sulfate + Folic Acid',
    category: 'Maternal Health',
    indications: 'Anaemia prevention in pregnant women',
    form: 'Tablet (Strip of 30)',
    stockStatus: 'In Stock',
    totalQuantity: 1200,
    facilityId: 'phc-rampur',
    facilityName: 'PHC Rampur',
    govtScheme: 'Anemia Mukt Bharat (Free)',
    unitPrice: '₹0'
  },
  {
    id: 'med-6',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine Dihydrochloride',
    category: 'Antihistamine',
    indications: 'Allergies, Runny nose, Skin rashes',
    form: 'Tablet (Strip of 10)',
    stockStatus: 'Out of Stock',
    totalQuantity: 0,
    facilityId: 'phc-rampur',
    facilityName: 'PHC Rampur',
    govtScheme: 'Jan Aushadhi Scheme',
    unitPrice: '₹8'
  },
  {
    id: 'med-7',
    name: 'Amlodipine 5mg',
    genericName: 'Amlodipine Besylate',
    category: 'Hypertension',
    indications: 'High blood pressure management',
    form: 'Tablet (Strip of 14)',
    stockStatus: 'In Stock',
    totalQuantity: 420,
    facilityId: 'chc-mawanna',
    facilityName: 'CHC Mawana',
    govtScheme: 'NCD Care Program',
    unitPrice: '₹0'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-2026-1042',
    serviceId: 'SRV-1042',
    patientName: 'Tanushree Yadav',
    phone: '+91 98765 43210',
    abhaId: '91-4829-1029-4821',
    channel: 'IVR Call (104)',
    facility: 'PHC Rampur',
    doctor: 'Dr. Priya Verma',
    specialty: 'General Medicine',
    date: '18 Sep 2026',
    timeSlot: '10:30 AM',
    status: 'Confirmed',
    symptoms: 'Persistent fever (101°F) for 3 days and severe body ache',
    urgency: 'Medium',
    smsSent: true
  },
  {
    id: 'APT-2026-1088',
    serviceId: 'SRV-1088',
    patientName: 'Tanushree Yadav',
    phone: '+91 98765 43210',
    abhaId: '91-4829-1029-4821',
    channel: 'Web Portal',
    facility: 'CHC Mawana',
    doctor: 'Dr. Ramesh Sharma',
    specialty: 'Cardiology',
    date: '22 Sep 2026',
    timeSlot: '11:00 AM',
    status: 'Scheduled',
    symptoms: 'Cardiac consultation & routine lipid review',
    urgency: 'Routine',
    smsSent: true
  }
];

export const INITIAL_REFERRALS = [
  {
    serviceId: 'REF-2024-001',
    patientName: 'Tanushree Yadav',
    age: 32,
    gender: 'Female',
    abhaId: '91-4829-1029-4821',
    phone: '+91 98765 43210',
    fromFacility: 'PHC Rampur',
    toFacility: 'District Hospital Meerut',
    referringDoctor: 'Dr. Priya Verma',
    specialistRequired: 'Cardiology Consult (ECG Telemetry)',
    urgency: 'Urgent',
    dateInitiated: '2026-09-16',
    status: 'Urgent Referral',
    transportType: '108 Ambulance (Vehicle UP-15-G-4421)',
    notes: 'Specialist consult: Cardiology • ECG Telemetry attached • Bed #14 reserved at District Hospital.',
    timeline: [
      { time: '02:15 PM', text: 'Initial checkup at PHC Rampur with Dr. Priya Verma' },
      { time: '02:30 PM', text: 'ECG conducted; Digital Referral REF-2024-001 generated' },
      { time: '02:45 PM', text: 'Urgent transfer reserved at District Hospital Meerut' }
    ]
  },
  {
    serviceId: 'REF-2024-002',
    patientName: 'Tanushree Yadav',
    age: 32,
    gender: 'Female',
    abhaId: '91-4829-1029-4821',
    phone: '+91 98765 43210',
    fromFacility: 'PHC Rampur',
    toFacility: 'CHC Mawana',
    referringDoctor: 'Dr. Priya Verma',
    specialistRequired: 'Obstetrics & High-Risk ANC',
    urgency: 'In Progress',
    dateInitiated: '2026-09-14',
    status: 'In Progress',
    transportType: 'JSSK Mobile Health Van',
    notes: 'ANC High Risk: Ultrasound scan & specialized obstetric consultation scheduled.',
    timeline: [
      { time: '14 Sep 10:00 AM', text: 'ANC checkup at PHC Rampur' },
      { time: '14 Sep 11:30 AM', text: 'Referral generated to CHC Mawana' }
    ]
  }
];

export const PATIENT_USER = {
  name: 'Tanushree Yadav',
  age: 32,
  gender: 'Female',
  bloodGroup: 'B+',
  abhaId: '91-4829-1029-4821',
  phone: '+91 98765 43210',
  village: 'Rampur, Dist. Meerut',
  pinCode: '250401',
  linkedPhc: 'Rampur Primary Health Centre',
  rationCardNo: 'NFSA-UP-8892110',
  pmjayEligible: true,
  allergies: ['None reported'],
  chronicConditions: ['Mild Asthma']
};

export const ADMIN_ANALYTICS = {
  totalCallsIVR: 14850,
  totalSmsReceived: 8320,
  totalWebSessions: 6140,
  avgResponseTimeSecs: 4.2,
  appointmentsBookedToday: 342,
  referralsCompletedMonth: 1289,
  medicineStockFulfillmentRate: '94.6%',
  activeDistricts: 18,
  channelsBreakdown: [
    { name: 'IVR Voice Calls (104)', percentage: 51, count: 14850, color: '#0d9488' },
    { name: 'SMS Gateway (56161)', percentage: 28, count: 8320, color: '#0284c7' },
    { name: 'Web & App Portal', percentage: 21, count: 6140, color: '#8b5cf6' }
  ],
  diseaseSurveillance: [
    { disease: 'Viral Fever & Dengue', cases: 284, trend: '+14%', severity: 'High Alert', alertDistricts: 'Meerut, Ghaziabad, Baghpat' },
    { disease: 'Acute Gastroenteritis', cases: 92, trend: '-5%', severity: 'Moderate', alertDistricts: 'Bulandshahr' },
    { disease: 'Hypertension & Diabetes', cases: 412, trend: '+2%', severity: 'Routine OPD', alertDistricts: 'All Districts' },
    { disease: 'Maternal ANC Tracking', cases: 188, trend: '+8%', severity: 'Optimal Coverage', alertDistricts: 'All PHCs' }
  ]
};
