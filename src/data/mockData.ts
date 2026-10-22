import { Product, Order, Dealer, ServiceBooking } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'califnco-aquapure-pro-9',
    name: 'Califnco AquaPure Pro IX',
    modelCode: 'CAL-AQ9-COPPER',
    category: 'home-ro',
    tag: 'Bestseller',
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviewsCount: 384,
    inStock: true,
    stockCount: 42,
    image: '/src/assets/images/ro_water_purifier_1792690477147.jpg',
    purificationStages: '9-Stage RO + UV + UF + Alkaline Mineralizer + Active Copper',
    tdsLimit: 'Up to 2,500 ppm',
    tankCapacity: '10 Litres',
    filtrationSpeed: '18 L/hr',
    recoveryRate: '65% Eco Water Saver',
    warranty: '1 Year Comprehensive + 1 Year RO Membrane',
    description: 'The pinnacle of residential water purification. AquaPure Pro IX combines aerospace-grade reverse osmosis with real copper infusion and alkaline minerals, balancing pH to a healthy 8.2 with high recovery eco-filtration.',
    keyFeatures: [
      'Active Copper & Zinc mineralization chamber for immunity boost',
      'Patented 65% water recovery eco-filtration membrane',
      'Smart Real-Time TDS & Filter Life Digital Display',
      'Food-grade antibacterial stainless steel internal reservoir',
      'Auto-flush cycle prevents membrane scaling and bio-fouling'
    ],
    specs: {
      'Mounting': 'Wall Mounted or Countertop',
      'Input Water Pressure': '0.3 to 3.0 kg/cm²',
      'Power Consumption': '45 Watts',
      'Dimensions (W x D x H)': '370 x 275 x 490 mm',
      'Weight': '9.4 kg'
    },
    wholesaleTiers: [
      { minUnits: 5, pricePerUnit: 14200, discountPercentage: 25 },
      { minUnits: 20, pricePerUnit: 12900, discountPercentage: 32 },
      { minUnits: 50, pricePerUnit: 11800, discountPercentage: 38 }
    ]
  },
  {
    id: 'califnco-hydroshield-prime',
    name: 'Califnco HydroShield Prime',
    modelCode: 'CAL-HS8-PRIME',
    category: 'home-ro',
    tag: 'Value Pick' as any,
    price: 13499,
    originalPrice: 17999,
    rating: 4.8,
    reviewsCount: 246,
    inStock: true,
    stockCount: 65,
    image: '/src/assets/images/alkaline_purifier_1792690477893.jpg',
    purificationStages: '8-Stage RO + UV + Micro-Sediment + Post-Carbon',
    tdsLimit: 'Up to 1,800 ppm',
    tankCapacity: '8 Litres',
    filtrationSpeed: '15 L/hr',
    recoveryRate: '50% Recovery',
    warranty: '1 Year Free Onsite Service',
    description: 'Engineered for municipal and mixed water supplies, HydroShield Prime delivers 100% pure, bacteria-free water with crystal clear taste and zero chemical smell.',
    keyFeatures: [
      'UV In-Tank disinfection LED kills residual pathogens every 2 hours',
      'Double O-Ring leak-proof push-fit fittings for zero drips',
      'Transparent water level gauge with level sensor',
      'Pre-filter with antiscalant balls included free'
    ],
    specs: {
      'Mounting': 'Wall Mounted',
      'Input Water Pressure': '0.3 to 2.5 kg/cm²',
      'Power Consumption': '36 Watts',
      'Dimensions (W x D x H)': '340 x 260 x 470 mm',
      'Weight': '8.1 kg'
    },
    wholesaleTiers: [
      { minUnits: 5, pricePerUnit: 10200, discountPercentage: 24 },
      { minUnits: 20, pricePerUnit: 9200, discountPercentage: 32 },
      { minUnits: 50, pricePerUnit: 8400, discountPercentage: 38 }
    ]
  },
  {
    id: 'califnco-glacier-hot-cold',
    name: 'Califnco GlacierFlow Instant Hot & Cold',
    modelCode: 'CAL-GL-HC12',
    category: 'hot-cold',
    tag: 'New Launch',
    price: 29999,
    originalPrice: 38999,
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    stockCount: 18,
    image: '/src/assets/images/hot_cold_dispenser_1792690478344.jpg',
    purificationStages: '10-Stage RO + Alkaline + Instant Dual Thermal Dispensers',
    tdsLimit: 'Up to 2,000 ppm',
    tankCapacity: '12 Litres (8L Ambient, 2L Hot 90°C, 2L Chilled 8°C)',
    filtrationSpeed: '20 L/hr',
    recoveryRate: '60% Eco Saver',
    warranty: '2 Years Comprehensive Warranty',
    description: 'Instant near-boiling water for tea/coffee or refreshingly chilled mineral water at touch of a button. Featuring smart child-safety lock, digital temperature selector, and continuous purification.',
    keyFeatures: [
      'Dual tank thermal architecture: 90°C hot water & 8°C chilled water on demand',
      'Touch-sensitive glass panel with child lock safety system',
      'Integrated Alkaline booster ensuring pH 8.0-8.5 in all temperature modes',
      'Silent thermoelectric chilling unit with zero compressor vibration'
    ],
    specs: {
      'Mounting': 'Table Top / Island Countertop',
      'Heating Power': '500W (Instant)',
      'Cooling Power': '75W',
      'Dimensions (W x D x H)': '310 x 410 x 510 mm',
      'Weight': '13.5 kg'
    },
    wholesaleTiers: [
      { minUnits: 5, pricePerUnit: 22800, discountPercentage: 24 },
      { minUnits: 20, pricePerUnit: 20500, discountPercentage: 32 },
      { minUnits: 50, pricePerUnit: 18900, discountPercentage: 37 }
    ]
  },
  {
    id: 'califnco-purealka-iot',
    name: 'Califnco PureAlka Bio-Energy Smart IoT',
    modelCode: 'CAL-PA-IOT7',
    category: 'smart-iot',
    tag: 'Smart Edition',
    price: 22499,
    originalPrice: 28999,
    rating: 4.9,
    reviewsCount: 189,
    inStock: true,
    stockCount: 29,
    image: '/src/assets/images/smart_iot_purifier_1792690479030.jpg',
    purificationStages: '8-Stage Smart RO + UV + Bio-Ceramic + Mineral Controller',
    tdsLimit: 'Up to 2,200 ppm',
    tankCapacity: '9 Litres',
    filtrationSpeed: '16 L/hr',
    recoveryRate: '60% Recovery',
    warranty: '1 Year Comprehensive + Complimentary Smart Hub',
    description: 'Wi-Fi enabled water purifier that syncs with the Califnco Mobile Companion. Monitor real-time input vs output TDS, track cartridge lifespan down to single litres, and book instant filter servicing directly from your phone.',
    keyFeatures: [
      'Embedded Wi-Fi IoT chip with real-time water quality telemetry',
      'In-App water consumption statistics and daily hydration tracking',
      'Predictive filter life algorithm with automatic service notifications',
      'Bio-ceramic far-infrared balls for enhanced cellular hydration'
    ],
    specs: {
      'Mounting': 'Wall Mounted or Countertop',
      'Connectivity': 'Wi-Fi 2.4GHz & Bluetooth 5.2',
      'Power Consumption': '42 Watts',
      'Dimensions (W x D x H)': '360 x 280 x 480 mm',
      'Weight': '9.0 kg'
    },
    wholesaleTiers: [
      { minUnits: 5, pricePerUnit: 16900, discountPercentage: 25 },
      { minUnits: 20, pricePerUnit: 15200, discountPercentage: 32 },
      { minUnits: 50, pricePerUnit: 13900, discountPercentage: 38 }
    ]
  },
  {
    id: 'califnco-aquamax-comm-50',
    name: 'Califnco AquaMax Commercial 50 LPH',
    modelCode: 'CAL-COMM-50LPH',
    category: 'commercial',
    tag: 'Commercial Pro',
    price: 36999,
    originalPrice: 47999,
    rating: 5.0,
    reviewsCount: 78,
    inStock: true,
    stockCount: 14,
    image: '/src/assets/images/commercial_ro_plant_1792690479704.jpg',
    purificationStages: 'Commercial 6-Stage Double Membrane High-Pressure RO',
    tdsLimit: 'Up to 3,000 ppm',
    tankCapacity: 'External Pressure Tank Compatible (Supports 50-200L)',
    filtrationSpeed: '50 L/hr continuous',
    recoveryRate: '60% Industrial Grade',
    warranty: '1 Year Industrial Warranty with Quarterly Onsite Audits',
    description: 'Workhorse system designed for offices, restaurants, cafes, schools, and health clinics. Built with heavy-duty 304 stainless steel skid, dual 100 GPD rotary vane boosters, and precision flow meters.',
    keyFeatures: [
      'Dual high-pressure booster pumps with dry-run auto cut-off protection',
      'Heavy-duty food-grade SS304 anti-rust chassis with vibration dampeners',
      'Digital panel displays dual TDS, system pressure, and working voltage',
      'Direct pipeline connection for espresso machines, water coolers, and dispensers'
    ],
    specs: {
      'Mounting': 'Floor Skid / Wall Mountable',
      'Input Water Pressure': '0.5 to 4.0 kg/cm²',
      'Power Consumption': '120 Watts',
      'Dimensions (W x D x H)': '480 x 320 x 750 mm',
      'Weight': '21.0 kg'
    },
    wholesaleTiers: [
      { minUnits: 3, pricePerUnit: 28500, discountPercentage: 23 },
      { minUnits: 10, pricePerUnit: 25500, discountPercentage: 31 },
      { minUnits: 25, pricePerUnit: 23200, discountPercentage: 37 }
    ]
  },
  {
    id: 'califnco-progrand-comm-100',
    name: 'Califnco ProGrand Industrial 100 LPH',
    modelCode: 'CAL-IND-100LPH',
    category: 'commercial',
    tag: 'Commercial Pro',
    price: 64999,
    originalPrice: 84999,
    rating: 4.9,
    reviewsCount: 35,
    inStock: true,
    stockCount: 8,
    image: '/src/assets/images/commercial_ro_plant_1792690479704.jpg',
    purificationStages: 'Multi-Skid Industrial 4-Membrane Automatic RO Station',
    tdsLimit: 'Up to 3,500 ppm',
    tankCapacity: 'Direct High Flow / Commercial Storage',
    filtrationSpeed: '100 L/hr continuous',
    recoveryRate: '70% High Yield Commercial',
    warranty: '1 Year Industrial Onsite Support',
    description: 'High capacity automated reverse osmosis station for factories, luxury hotels, hospital dialysis preparation, and residential apartment clubhouses.',
    keyFeatures: [
      'Quad Dow-Filmtec RO Membranes in parallel pressure vessels',
      'Automated permeate backwash cycle prolongs membrane life by 300%',
      'Integrated raw water pressure gauge and pure water rotameter',
      'Siemens micro-controller with phase sequence & voltage surge protector'
    ],
    specs: {
      'Mounting': 'Floor Standing Industrial Skid',
      'Power Consumption': '250 Watts',
      'Dimensions (W x D x H)': '650 x 450 x 1150 mm',
      'Weight': '42.0 kg'
    },
    wholesaleTiers: [
      { minUnits: 2, pricePerUnit: 51000, discountPercentage: 21 },
      { minUnits: 5, pricePerUnit: 46000, discountPercentage: 29 },
      { minUnits: 10, pricePerUnit: 41500, discountPercentage: 36 }
    ]
  },
  {
    id: 'califnco-ultraslim-undersink',
    name: 'Califnco UltraSlim Compact Undersink RO',
    modelCode: 'CAL-US-SLIM',
    category: 'home-ro',
    tag: 'New Launch',
    price: 19499,
    originalPrice: 25999,
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    stockCount: 22,
    image: '/src/assets/images/alkaline_purifier_1792690477893.jpg',
    purificationStages: '7-Stage Direct Flow Tankless RO + Natural Mineralizer',
    tdsLimit: 'Up to 2,000 ppm',
    tankCapacity: 'Tankless Instant Fresh Flow (Zero Stagnation)',
    filtrationSpeed: '1.2 L/min Direct Dispense',
    recoveryRate: '65% Eco Saver',
    warranty: '1 Year Onsite Support',
    description: 'Keep your kitchen clutter-free. Hidden neatly under your sink with a luxury brushed-nickel goose neck faucet mounted on your countertop. Instant pure water without stale storage tanks.',
    keyFeatures: [
      'Tankless rapid filtration delivers water straight from the fresh membrane',
      'Designer SS304 lead-free faucet with embedded LED filter status ring',
      'Ultra-thin 14cm profile fits even small modern modular kitchen cabinetry',
      'Quick-twist 3-second DIY filter replacement cartridges'
    ],
    specs: {
      'Mounting': 'Under-Sink Cabinet',
      'Faucet Finish': 'Brushed Nickel Food Grade',
      'Power Consumption': '60 Watts',
      'Dimensions (W x D x H)': '140 x 420 x 410 mm',
      'Weight': '8.6 kg'
    },
    wholesaleTiers: [
      { minUnits: 5, pricePerUnit: 14900, discountPercentage: 23 },
      { minUnits: 20, pricePerUnit: 13400, discountPercentage: 31 },
      { minUnits: 50, pricePerUnit: 12200, discountPercentage: 37 }
    ]
  },
  {
    id: 'califnco-cartridge-full-kit',
    name: 'Califnco Universal 4-Stage Replacement Filter Kit',
    modelCode: 'CAL-KIT-UNI4',
    category: 'cartridges-spares',
    tag: 'Bestseller',
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviewsCount: 512,
    inStock: true,
    stockCount: 180,
    image: '/src/assets/images/filter_cartridges_1792690479327.jpg',
    purificationStages: 'Sediment + Pre-Carbon + RO 80 GPD Membrane + Post-Carbon',
    tdsLimit: 'Compatible with all RO systems up to 2500 ppm',
    tankCapacity: 'N/A',
    filtrationSpeed: 'Up to 15 L/hr',
    recoveryRate: 'High rejection',
    warranty: '6 Months Performance Guarantee',
    description: 'Universal service kit containing 1x 5-Micron Spun Sediment Filter, 1x Coconut Shell Activated Carbon Block, 1x 80 GPD Thin Film Composite (TFC) RO Membrane, and 1x Post-Carbon Silver Polisher.',
    keyFeatures: [
      '100% Genuine NSF-certified activated carbon with 1200+ IV iodine value',
      'Compatible with Califnco, Kent, Aquaguard, Pureit, and standard RO cabinets',
      'Removes chlorine, microplastics, pesticide residues, and heavy metals',
      'Includes Teflon tape, John Guest push-fit clips, and color-coded connecting tubes'
    ],
    specs: {
      'Compatibility': 'Universal 10-inch RO systems',
      'Rated Life': '6,000 Litres or 12 Months',
      'Membrane Capacity': '80 GPD',
      'Weight': '1.8 kg'
    },
    wholesaleTiers: [
      { minUnits: 10, pricePerUnit: 1650, discountPercentage: 34 },
      { minUnits: 50, pricePerUnit: 1400, discountPercentage: 44 },
      { minUnits: 100, pricePerUnit: 1250, discountPercentage: 50 }
    ]
  },
  {
    id: 'califnco-alkaline-copper-cartridge',
    name: 'Califnco Alkaline Mineral & Copper Booster Cartridge',
    modelCode: 'CAL-ALKA-COPPER',
    category: 'cartridges-spares',
    price: 1299,
    originalPrice: 1799,
    rating: 4.8,
    reviewsCount: 310,
    inStock: true,
    stockCount: 140,
    image: '/src/assets/images/filter_cartridges_1792690479327.jpg',
    purificationStages: '5-Layer Re-Mineralization (Ca, Mg, K, Active Copper, Tourmaline)',
    tdsLimit: 'Post-RO Re-enrichment',
    tankCapacity: 'Inline Cartridge',
    filtrationSpeed: 'Up to 2 L/min',
    recoveryRate: 'N/A',
    warranty: '6 Months Guarantee',
    description: 'Transform acidic RO water into alkaline mineral elixir. Enriches water with essential Calcium, Magnesium, Potassium, and pure Copper ions, raising pH to 8.0-8.5 with negative ORP antioxidant properties.',
    keyFeatures: [
      'Adds essential bio-available minerals stripped away during RO process',
      'Natural biocidal properties of pure copper suppress bacterial re-growth',
      'Decreases negative ORP (Oxidation Reduction Potential) by -150mV',
      'Simple plug-and-play 1/4" push-fit inline connection'
    ],
    specs: {
      'Connection': '1/4 inch Push Fit',
      'Cartridge Life': '4,500 Litres / 9-12 Months',
      'Target pH Range': '8.0 to 8.8',
      'Weight': '420 grams'
    },
    wholesaleTiers: [
      { minUnits: 10, pricePerUnit: 850, discountPercentage: 34 },
      { minUnits: 50, pricePerUnit: 720, discountPercentage: 44 },
      { minUnits: 100, pricePerUnit: 640, discountPercentage: 50 }
    ]
  },
  {
    id: 'califnco-zerowaste-eco-ro',
    name: 'Califnco ZeroWaste EcoSaver High-Yield RO',
    modelCode: 'CAL-ECO-ZERO',
    category: 'home-ro',
    tag: 'Eco Water Saver',
    price: 17499,
    originalPrice: 22999,
    rating: 4.9,
    reviewsCount: 167,
    inStock: true,
    stockCount: 34,
    image: '/src/assets/images/ro_water_purifier_1792690477147.jpg',
    purificationStages: '8-Stage Eco-Recovery RO + UF + Activated Carbon Polisher',
    tdsLimit: 'Up to 2,000 ppm',
    tankCapacity: '9.5 Litres',
    filtrationSpeed: '18 L/hr',
    recoveryRate: '68% Ultra-High Water Recovery',
    warranty: '1 Year Free Onsite Service',
    description: 'Traditional RO purifiers waste 75% of water. Califnco ZeroWaste uses patented multi-pass recirculation technology to achieve 68% clean water recovery, saving up to 20,000 litres of water annually.',
    keyFeatures: [
      'Saves up to 60 litres of reject water every single day',
      'Reject water TDS sensor lets you safely divert water to plants or cleaning',
      'Double sediment stage for turbid borewell or old municipal pipe lines',
      'Super-quiet brushless booster pump with thermal overload cut-off'
    ],
    specs: {
      'Mounting': 'Wall Mounted or Countertop',
      'Power Consumption': '38 Watts',
      'Dimensions (W x D x H)': '360 x 270 x 480 mm',
      'Weight': '8.8 kg'
    },
    wholesaleTiers: [
      { minUnits: 5, pricePerUnit: 13100, discountPercentage: 25 },
      { minUnits: 20, pricePerUnit: 11900, discountPercentage: 32 },
      { minUnits: 50, pricePerUnit: 10800, discountPercentage: 38 }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'CAL-2026-9812',
    createdAt: '2026-10-21T09:30:00Z',
    customer: {
      name: 'Aditi Deshmukh',
      email: 'aditi.d@gmail.com',
      phone: '+91 98201 44521',
      address: 'Flat 402, Sea Breeze Tower, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        includeInstallation: true,
        extendedWarrantyYears: 1
      }
    ],
    subtotal: 18999,
    discount: 1000,
    couponCode: 'CALIFPURE10',
    installationFee: 0,
    warrantyFee: 1499,
    shippingFee: 0,
    total: 19498,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    status: 'Dispatched',
    trackingSteps: [
      { status: 'Order Placed', description: 'Order confirmed and verified', timestamp: '21 Oct, 09:30 AM', completed: true, current: false },
      { status: 'Quality Inspected', description: 'Passed 24-point TDS & leak testing', timestamp: '21 Oct, 02:15 PM', completed: true, current: false },
      { status: 'Dispatched', description: 'Handed over to Califnco Express Logistics', timestamp: '22 Oct, 08:00 AM', completed: true, current: true },
      { status: 'Out for Delivery', description: 'Courier partner en route to delivery address', timestamp: 'Expected 23 Oct', completed: false, current: false },
      { status: 'Doorstep Installation', description: 'Certified Califnco technician will arrive within 2 hours of delivery', timestamp: 'Expected 23 Oct', completed: false, current: false }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'CAL-2026-9813',
    createdAt: '2026-10-22T04:15:00Z',
    customer: {
      name: 'Dr. Rohan Verma',
      email: 'dr.verma@dentcare.in',
      phone: '+91 97112 88921',
      address: 'Shop 4, Sunrise Arcade, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        quantity: 1,
        includeInstallation: true,
        extendedWarrantyYears: 2
      }
    ],
    subtotal: 36999,
    discount: 0,
    installationFee: 0,
    warrantyFee: 2499,
    shippingFee: 0,
    total: 39498,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    status: 'Processing',
    trackingSteps: [
      { status: 'Order Placed', description: 'Order confirmed and payment verified', timestamp: '22 Oct, 04:15 AM', completed: true, current: false },
      { status: 'Quality Inspected', description: 'Commercial pressure skid calibration', timestamp: 'In progress', completed: false, current: true },
      { status: 'Dispatched', description: 'Commercial transport booking', timestamp: 'Pending', completed: false, current: false },
      { status: 'Out for Delivery', description: 'Direct freight to Indiranagar clinic', timestamp: 'Pending', completed: false, current: false },
      { status: 'Doorstep Installation', description: 'Commercial installer technician scheduled', timestamp: 'Pending', completed: false, current: false }
    ]
  },
  {
    id: 'ord-1003',
    orderNumber: 'CAL-DLR-5042',
    createdAt: '2026-10-20T14:10:00Z',
    customer: {
      name: 'Vikas Aggarwal (Apex Water Solutions)',
      email: 'vikas@apexwatersolutions.com',
      phone: '+91 98110 33219',
      address: 'Plot 18, Phase 2, Okhla Industrial Area',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110020'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 20,
        includeInstallation: false,
        extendedWarrantyYears: 0
      },
      {
        product: INITIAL_PRODUCTS[7],
        quantity: 50,
        includeInstallation: false,
        extendedWarrantyYears: 0
      }
    ],
    subtotal: 328000,
    discount: 104960,
    installationFee: 0,
    warrantyFee: 0,
    shippingFee: 0,
    total: 223040,
    paymentMethod: 'dealer_credit',
    paymentStatus: 'Credit Invoiced',
    status: 'Delivered',
    isDealerOrder: true,
    dealerId: 'dlr-01',
    dealerCompanyName: 'Apex Water Solutions',
    trackingSteps: [
      { status: 'Order Placed', description: 'B2B Wholesale PO received under Silver Tier', timestamp: '20 Oct, 02:10 PM', completed: true, current: false },
      { status: 'Warehouse Staged', description: 'Palletized 20 purifiers + 50 cartridge sets', timestamp: '20 Oct, 05:00 PM', completed: true, current: false },
      { status: 'Dispatched', description: 'Shipped via V-Trans Heavy Freight', timestamp: '21 Oct, 09:00 AM', completed: true, current: false },
      { status: 'Out for Delivery', description: 'Delivered to Delhi Hub', timestamp: '21 Oct, 04:30 PM', completed: true, current: false },
      { status: 'Delivered', description: 'Signed and received by warehouse manager', timestamp: '21 Oct, 06:00 PM', completed: true, current: false }
    ]
  }
];

export const INITIAL_DEALERS: Dealer[] = [
  {
    id: 'dlr-01',
    name: 'Vikas Aggarwal',
    companyName: 'Apex Water Solutions & Appliances',
    gstNumber: '07AABCA1234D1Z5',
    email: 'vikas@apexwatersolutions.com',
    phone: '+91 98110 33219',
    city: 'New Delhi',
    state: 'Delhi',
    tier: 'Apex Platinum',
    wholesaleDiscount: 35,
    status: 'Approved',
    creditLimit: 500000,
    creditUsed: 223040,
    totalOrdersCount: 14,
    totalVolumeSpend: 1845000,
    joinedDate: '2025-08-12'
  },
  {
    id: 'dlr-02',
    name: 'Suresh Menon',
    companyName: 'Menon PureTech Enterprises',
    gstNumber: '32AAECM5421P1Z9',
    email: 'contact@menonpuretech.com',
    phone: '+91 94471 22890',
    city: 'Kochi',
    state: 'Kerala',
    tier: 'Gold Partner',
    wholesaleDiscount: 30,
    status: 'Approved',
    creditLimit: 300000,
    creditUsed: 84000,
    totalOrdersCount: 9,
    totalVolumeSpend: 920000,
    joinedDate: '2025-11-04'
  },
  {
    id: 'dlr-03',
    name: 'Pooja Chawla',
    companyName: 'CrystalClear Aqua Distributors',
    gstNumber: '08BAPPC9981K1Z2',
    email: 'pooja@crystalclearaqua.in',
    phone: '+91 99281 77211',
    city: 'Jaipur',
    state: 'Rajasthan',
    tier: 'Silver Partner',
    wholesaleDiscount: 25,
    status: 'Pending',
    creditLimit: 150000,
    creditUsed: 0,
    totalOrdersCount: 0,
    totalVolumeSpend: 0,
    joinedDate: '2026-10-21'
  },
  {
    id: 'dlr-04',
    name: 'Harpreet Singh',
    companyName: 'Punjab Water Care Agency',
    gstNumber: '03AAOPH4412B1Z8',
    email: 'harpreet@punjabwatercare.com',
    phone: '+91 98762 11099',
    city: 'Ludhiana',
    state: 'Punjab',
    tier: 'Silver Partner',
    wholesaleDiscount: 25,
    status: 'Pending',
    creditLimit: 150000,
    creditUsed: 0,
    totalOrdersCount: 0,
    totalVolumeSpend: 0,
    joinedDate: '2026-10-22'
  }
];

export const INITIAL_SERVICES: ServiceBooking[] = [
  {
    id: 'srv-201',
    ticketNumber: 'SRV-2026-781',
    customerName: 'Kavita Nair',
    phone: '+91 98452 99014',
    email: 'kavita.nair@outlook.com',
    address: 'B-604, Godrej Woodsman Estate, Bellary Road',
    city: 'Bengaluru',
    pincode: '560024',
    serviceType: 'Periodic Multi-Stage Filter Replacement',
    purifierModel: 'Califnco AquaPure Pro IX',
    preferredDate: '2026-10-23',
    preferredSlot: 'Morning (9 AM - 12 PM)',
    notes: 'Buzzer beep indicated 12-month cartridge replacement alert. Water flow slightly slowed.',
    status: 'Technician Assigned',
    technicianName: 'Rajesh Kumar (Senior Califnco Tech)',
    technicianPhone: '+91 98450 11200',
    createdAt: '2026-10-21T11:20:00Z',
    estimatedCost: 2499
  },
  {
    id: 'srv-202',
    ticketNumber: 'SRV-2026-782',
    customerName: 'Sunil Mehta',
    phone: '+91 98210 55412',
    email: 'sunil.mehta@gmail.com',
    address: 'House 14, Sector 15',
    city: 'Gurugram',
    pincode: '122001',
    serviceType: 'Emergency Breakdown / Water Leakage',
    purifierModel: 'Califnco HydroShield Prime',
    preferredDate: '2026-10-22',
    preferredSlot: 'Afternoon (1 PM - 4 PM)',
    notes: 'Slow drip from raw water inlet elbow. Shut off stopcock for now.',
    status: 'In Progress',
    technicianName: 'Manish Rawat',
    technicianPhone: '+91 98101 44321',
    createdAt: '2026-10-22T08:10:00Z',
    estimatedCost: 0
  },
  {
    id: 'srv-203',
    ticketNumber: 'SRV-2026-783',
    customerName: 'Meera Iyer',
    phone: '+91 94441 66723',
    email: 'meera.iyer@yahoo.com',
    address: '12/4, 4th Main Road, RA Puram',
    city: 'Chennai',
    pincode: '600028',
    serviceType: 'Free Water Quality TDS & Hardness Test',
    purifierModel: 'Interested in buying new RO',
    preferredDate: '2026-10-24',
    preferredSlot: 'Evening (4 PM - 7 PM)',
    notes: 'Moved into new apartment with ground water borewell. Need TDS and heavy metal check before purchasing purifier.',
    status: 'Received',
    createdAt: '2026-10-22T09:40:00Z',
    estimatedCost: 0
  }
];
