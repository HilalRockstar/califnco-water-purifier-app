export type ProductCategory = 
  | 'all'
  | 'home-ro'
  | 'alkaline-uv'
  | 'hot-cold'
  | 'commercial'
  | 'cartridges-spares'
  | 'smart-iot';

export interface WholesaleTier {
  minUnits: number;
  pricePerUnit: number;
  discountPercentage: number;
}

export interface Product {
  id: string;
  name: string;
  modelCode: string;
  category: 'home-ro' | 'alkaline-uv' | 'hot-cold' | 'commercial' | 'cartridges-spares' | 'smart-iot';
  tag?: 'Bestseller' | 'New Launch' | 'Commercial Pro' | 'Smart Edition' | 'Eco Water Saver';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  purificationStages: string;
  tdsLimit: string; // e.g. "Up to 2,000 ppm"
  tankCapacity: string; // e.g. "10 Litres"
  filtrationSpeed: string; // e.g. "15-18 L/hr"
  recoveryRate: string; // e.g. "65% High Recovery"
  warranty: string;
  description: string;
  keyFeatures: string[];
  specs: Record<string, string>;
  wholesaleTiers: WholesaleTier[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  includeInstallation: boolean;
  extendedWarrantyYears: number; // 0, 1 (+1499), 2 (+2499)
}

export type OrderStatus = 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Installed' | 'Cancelled';

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderTrackingStep {
  status: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  installationFee: number;
  warrantyFee: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cod' | 'card' | 'upi' | 'netbanking' | 'dealer_credit';
  paymentStatus: 'Paid' | 'Pending COD' | 'Credit Invoiced';
  status: OrderStatus;
  trackingSteps: OrderTrackingStep[];
  isDealerOrder?: boolean;
  dealerId?: string;
  dealerCompanyName?: string;
}

export type DealerTier = 'Silver Partner' | 'Gold Partner' | 'Apex Platinum';

export interface Dealer {
  id: string;
  name: string;
  companyName: string;
  gstNumber: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  tier: DealerTier;
  wholesaleDiscount: number; // percentage, e.g. 28%
  status: 'Approved' | 'Pending' | 'Rejected';
  creditLimit: number;
  creditUsed: number;
  totalOrdersCount: number;
  totalVolumeSpend: number;
  joinedDate: string;
}

export type ServiceType = 
  | 'Free Standard Installation'
  | 'Periodic Multi-Stage Filter Replacement'
  | 'Emergency Breakdown / Water Leakage'
  | 'Annual Maintenance Contract (AMC)'
  | 'Free Water Quality TDS & Hardness Test';

export type ServiceStatus = 'Received' | 'Technician Assigned' | 'In Progress' | 'Completed' | 'Cancelled';

export interface ServiceBooking {
  id: string;
  ticketNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  serviceType: ServiceType;
  purifierModel: string;
  preferredDate: string;
  preferredSlot: string; // 'Morning (9 AM - 12 PM)' | 'Afternoon (1 PM - 4 PM)' | 'Evening (4 PM - 7 PM)'
  notes?: string;
  status: ServiceStatus;
  technicianName?: string;
  technicianPhone?: string;
  createdAt: string;
  estimatedCost: number; // 0 for warranty/free, or spare cost
}

export interface WaterAdvisorResult {
  recommendedModelId: string;
  recommendedReason: string;
  suggestedTdsRange: string;
  purificationMatch: string;
}
