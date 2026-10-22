import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Dealer, Product } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  CreditCard, 
  FileText, 
  Download, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Minus,
  ShoppingCart, 
  ArrowRight, 
  DollarSign, 
  Printer, 
  UserPlus, 
  Award, 
  Users,
  Search,
  Sparkles
} from 'lucide-react';

export const DealerPortal: React.FC = () => {
  const { 
    dealers, 
    currentDealer, 
    setCurrentDealer, 
    registerDealer, 
    products, 
    orders, 
    placeOrder, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'order-pad' | 'orders-history' | 'marketing' | 'apply'>('order-pad');

  // Bulk order matrix state: { [productId]: quantity }
  const [bulkQuantities, setBulkQuantities] = useState<{ [productId: string]: number }>({
    'califnco-aquapure-pro-9': 10,
    'califnco-cartridge-full-kit': 25,
    'califnco-hydroshield-prime': 5
  });

  // New dealer registration form
  const [applicantName, setApplicantName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Calculate bulk order totals
  const bulkItems = Object.entries(bulkQuantities)
    .filter(([_, qty]) => qty > 0)
    .map(([productId, qty]) => {
      const product = products.find((p) => p.id === productId)!;
      // find wholesale price tier
      let unitPrice = product.price;
      const sortedTiers = [...product.wholesaleTiers].sort((a, b) => b.minUnits - a.minUnits);
      const matchedTier = sortedTiers.find((t) => qty >= t.minUnits);
      if (matchedTier) {
        unitPrice = matchedTier.pricePerUnit;
      } else if (currentDealer) {
        // apply dealer discount if tier not met
        unitPrice = Math.round(product.price * (1 - currentDealer.wholesaleDiscount / 100));
      }

      return {
        product,
        quantity: qty,
        unitPrice,
        retailTotal: product.price * qty,
        wholesaleTotal: unitPrice * qty
      };
    });

  const totalWholesalePrice = bulkItems.reduce((sum, item) => sum + item.wholesaleTotal, 0);
  const totalRetailPrice = bulkItems.reduce((sum, item) => sum + item.retailTotal, 0);
  const totalDealerSavings = totalRetailPrice - totalWholesalePrice;

  const handleQtyChange = (productId: string, val: number) => {
    setBulkQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, val)
    }));
  };

  const handlePlaceBulkOrder = () => {
    if (bulkItems.length === 0) {
      showToast('Empty Order', 'Please select at least 1 unit in the order pad.', 'warning');
      return;
    }

    if (!currentDealer) {
      showToast('Login Required', 'Please select a dealer account or submit an application.', 'error');
      return;
    }

    // Check credit limit
    const availableCredit = currentDealer.creditLimit - currentDealer.creditUsed;
    const canUseCredit = availableCredit >= totalWholesalePrice;

    const cartItems = bulkItems.map((item) => ({
      product: {
        ...item.product,
        price: item.unitPrice
      },
      quantity: item.quantity,
      includeInstallation: false,
      extendedWarrantyYears: 0
    }));

    placeOrder({
      customer: {
        name: `${currentDealer.name} (${currentDealer.companyName})`,
        email: currentDealer.email,
        phone: currentDealer.phone,
        address: `${currentDealer.companyName} Central Warehouse, Commercial Complex`,
        city: currentDealer.city,
        state: currentDealer.state,
        pincode: '110020'
      },
      items: cartItems,
      subtotal: totalRetailPrice,
      discount: totalDealerSavings,
      installationFee: 0,
      warrantyFee: 0,
      shippingFee: 0,
      total: totalWholesalePrice,
      paymentMethod: canUseCredit ? 'dealer_credit' : 'netbanking',
      paymentStatus: canUseCredit ? 'Credit Invoiced' : 'Paid',
      status: 'Processing',
      isDealerOrder: true,
      dealerId: currentDealer.id,
      dealerCompanyName: currentDealer.companyName
    });

    try {
      confetti({ particleCount: 80, spread: 60 });
    } catch (e) {}

    showToast('B2B Order Confirmed', `Purchase order generated under ${currentDealer.companyName}.`, 'success');
    setActiveTab('orders-history');
  };

  const handleApplyDealer = (e: React.FormEvent) => {
    e.preventDefault();
    const newDlr = registerDealer({
      name: applicantName,
      companyName,
      gstNumber,
      email,
      phone,
      city,
      state
    });
    setApplicantName('');
    setCompanyName('');
    setGstNumber('');
    setEmail('');
    setPhone('');
    setCity('');
    setState('');
    setCurrentDealer(newDlr);
    setActiveTab('order-pad');
  };

  const dealerOrders = orders.filter((o) => o.isDealerOrder && (o.dealerId === currentDealer?.id || !o.dealerId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dealer Header & Account Switcher Banner */}
      <div className="bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Califnco Authorized B2B Partner Portal</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {currentDealer ? currentDealer.companyName : 'Guest Partner'}
            </h1>
            {currentDealer && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentDealer.tier === 'Apex Platinum'
                  ? 'bg-amber-400 text-slate-950'
                  : currentDealer.tier === 'Gold Partner'
                  ? 'bg-sky-400 text-slate-950'
                  : 'bg-slate-200 text-slate-900'
              }`}>
                {currentDealer.tier} ({currentDealer.wholesaleDiscount}% Off Catalog)
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-1.5 max-w-xl">
            Access tier-based volume pricing, manage wholesale dispatch consignments, utilize revolving dealer credit, and download lab test certifications.
          </p>
        </div>

        {/* Demo Switcher Dropdown */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md space-y-2 shrink-0 max-w-xs w-full">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
            Demo Partner Switcher:
          </label>
          <select
            value={currentDealer?.id || ''}
            onChange={(e) => {
              const selected = dealers.find((d) => d.id === e.target.value);
              setCurrentDealer(selected || null);
            }}
            className="w-full text-xs bg-slate-900 text-white px-3 py-2 rounded-xl border border-slate-700 focus:outline-hidden"
          >
            {dealers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.companyName} ({d.tier} - {d.status})
              </option>
            ))}
          </select>
          <div className="text-[10px] text-cyan-300">
            Switch accounts to demo tier discounts or pending approvals
          </div>
        </div>
      </div>

      {/* Credit & Volume KPI Cards (If dealer logged in) - 2x2 on mobile, 4 on desktop */}
      {currentDealer && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">B2B Credit Line</span>
            <div className="text-base sm:text-xl font-black text-slate-900">
              ₹{currentDealer.creditLimit.toLocaleString('en-IN')}
            </div>
            <div className="w-full bg-slate-100 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1.5 sm:mt-2">
              <div 
                className="bg-sky-600 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (currentDealer.creditUsed / currentDealer.creditLimit) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 block pt-0.5 sm:pt-1">
              ₹{(currentDealer.creditLimit - currentDealer.creditUsed).toLocaleString('en-IN')} avail
            </span>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Margin Discount</span>
            <div className="text-base sm:text-xl font-black text-emerald-600">
              {currentDealer.wholesaleDiscount}% Margin
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 line-clamp-2">
              Applied automatically across all residential & commercial purifiers.
            </p>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Lifetime Spend</span>
            <div className="text-base sm:text-xl font-black text-slate-900">
              ₹{currentDealer.totalVolumeSpend.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold block pt-0.5 sm:pt-1">
              ✓ {currentDealer.totalOrdersCount} Consignments
            </span>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">GST Identification</span>
            <div className="text-xs sm:text-sm font-mono font-bold text-slate-800 break-all">
              {currentDealer.gstNumber}
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-500 block pt-0.5 sm:pt-1">
              {currentDealer.city}, {currentDealer.state}
            </span>
          </div>
        </div>
      )}

      {/* Tabs Bar - Scroll-snapping on mobile */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto hide-scrollbar scroll-snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab('order-pad')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'order-pad'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Wholesale Bulk Order Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('orders-history')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'orders-history'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Wholesale Invoices ({dealerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('marketing')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'marketing'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Marketing Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('apply')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'apply'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Register Dealership</span>
        </button>
      </div>

      {/* TAB 1: Bulk Order Pad */}
      {activeTab === 'order-pad' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Order Pad Matrix */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Califnco B2B Price Matrix & Order Pad</h3>
                <p className="text-[11px] sm:text-xs text-slate-500">Tier discounts adjust automatically based on quantity.</p>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg shrink-0">
                GST Included
              </span>
            </div>

            {/* Mobile Cards View (<sm) */}
            <div className="sm:hidden divide-y divide-slate-100 p-3 space-y-3">
              {products.map((p) => {
                const qty = bulkQuantities[p.id] || 0;
                let unitPrice = p.price;
                const sortedTiers = [...p.wholesaleTiers].sort((a, b) => b.minUnits - a.minUnits);
                const matchedTier = sortedTiers.find((t) => qty >= t.minUnits);
                if (matchedTier) {
                  unitPrice = matchedTier.pricePerUnit;
                } else if (currentDealer) {
                  unitPrice = Math.round(p.price * (1 - currentDealer.wholesaleDiscount / 100));
                }

                return (
                  <div key={p.id} className="pt-3 first:pt-0 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-xs line-clamp-1">{p.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{p.modelCode}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-slate-400 line-through">₹{p.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs font-bold text-sky-700">₹{unitPrice.toLocaleString('en-IN')}/ea</span>
                        </div>
                      </div>
                    </div>

                    {matchedTier && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold inline-block">
                        Tier {matchedTier.minUnits}+ applied
                      </span>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity stepper with touch targets */}
                      <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, Math.max(0, qty - 1))}
                          className="w-9 h-9 flex items-center justify-center hover:bg-slate-200 text-slate-700 font-bold text-sm active:bg-slate-300"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={qty}
                          onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value) || 0)}
                          className="w-12 h-9 text-xs text-center border-x border-slate-300 bg-white font-mono font-bold focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => handleQtyChange(p.id, qty + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-slate-200 text-slate-700 font-bold text-sm active:bg-slate-300"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Subtotal</span>
                        <span className="text-xs font-black text-slate-900">
                          ₹{(unitPrice * qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View (>=sm) */}
            <div className="hidden sm:block divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[550px]">
                <thead className="bg-slate-50 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-3.5">Purifier Model / SKU</th>
                    <th className="p-3.5">Standard Retail</th>
                    <th className="p-3.5">Dealer Unit Price</th>
                    <th className="p-3.5 w-32">Order Quantity</th>
                    <th className="p-3.5 text-right">Wholesale Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => {
                    const qty = bulkQuantities[p.id] || 0;
                    
                    // calculate unit price for this product
                    let unitPrice = p.price;
                    const sortedTiers = [...p.wholesaleTiers].sort((a, b) => b.minUnits - a.minUnits);
                    const matchedTier = sortedTiers.find((t) => qty >= t.minUnits);
                    if (matchedTier) {
                      unitPrice = matchedTier.pricePerUnit;
                    } else if (currentDealer) {
                      unitPrice = Math.round(p.price * (1 - currentDealer.wholesaleDiscount / 100));
                    }

                    return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100" 
                            />
                            <div>
                              <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                              <div className="text-[10px] font-mono text-slate-500">{p.modelCode}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-500 line-through">
                          ₹{p.price.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-sky-700">
                            ₹{unitPrice.toLocaleString('en-IN')}
                          </div>
                          {matchedTier && (
                            <span className="text-[10px] text-emerald-600 font-semibold block">
                              Tier {matchedTier.minUnits}+ applied
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={qty}
                            onChange={(e) => handleQtyChange(p.id, parseInt(e.target.value) || 0)}
                            className="w-20 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold focus:border-sky-500 focus:outline-hidden"
                          />
                        </td>
                        <td className="p-3.5 text-right font-black text-slate-900">
                          ₹{(unitPrice * qty).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Summary & PO Generation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Wholesale Order Summary
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Total Ordered Units</span>
                  <span className="font-bold text-slate-900">
                    {bulkItems.reduce((sum, item) => sum + item.quantity, 0)} Units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Retail Catalog Value</span>
                  <span className="line-through">₹{totalRetailPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Dealer Margin Savings</span>
                  <span>-₹{totalDealerSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Palletized Freight Logistics</span>
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">Free B2B Freight</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Net Payable</span>
                  <span className="text-2xl font-black text-sky-700">
                    ₹{totalWholesalePrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Payment selector for wholesale */}
              {currentDealer && (
                <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100 text-xs space-y-1">
                  <span className="font-bold text-sky-900 block">Payment Method:</span>
                  <span className="text-slate-700 block">
                    {currentDealer.creditLimit - currentDealer.creditUsed >= totalWholesalePrice
                      ? `✓ Dealer 30-Day Credit Line (₹${(currentDealer.creditLimit - currentDealer.creditUsed).toLocaleString('en-IN')} available)`
                      : 'Credit Limit Exceeded - Will generate Proforma Invoice for RTGS / NetBanking'}
                  </span>
                </div>
              )}

              <button
                onClick={handlePlaceBulkOrder}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] active:scale-98"
              >
                <span>Authorize Bulk Purchase Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dealer Assistance Hotline */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-900 block">Dedicated B2B Desk:</span>
              <p>For custom container shipments (100+ units) or OEM branding, contact your Key Account Manager at <strong>b2b@califnco-purifiers.com</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Order History */}
      {activeTab === 'orders-history' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Wholesale Consignments & Invoices</h3>
              <p className="text-xs text-slate-500">Track heavy freight dispatches and download commercial GST invoices.</p>
            </div>
          </div>

          {dealerOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No wholesale orders placed yet under this account. Use the order pad above to place your first bulk consignment.
            </div>
          ) : (
            <div className="space-y-4">
              {dealerOrders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {ord.orderNumber}
                        </span>
                        <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {ord.status}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {ord.paymentStatus}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total Invoice</span>
                        <span className="text-sm font-black text-slate-900">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => showToast('Invoice Downloaded', `PDF tax invoice for ${ord.orderNumber} downloaded.`, 'success')}
                        className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                        <span>PDF Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs">
                    <span className="text-[11px] font-bold text-slate-500 block mb-1">Items In Shipment:</span>
                    <div className="space-y-1">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-slate-700">
                          <span>{it.quantity}× {it.product.name}</span>
                          <span className="font-mono font-medium">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Marketing Collateral Hub */}
      {activeTab === 'marketing' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Marketing & Technical Assets Hub</h3>
            <p className="text-xs text-slate-500">
              Download high-resolution product catalogs, lab test certificates, and showroom display banners for your retail store.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">2026 Comprehensive Product Catalog</h4>
              <p className="text-xs text-slate-500">Full specification sheets, dimensional drawings, and comparison charts.</p>
              <button
                onClick={() => showToast('Download Started', 'Downloading Califnco_2026_Catalog.pdf', 'info')}
                className="flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (14.2 MB)</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">NABL Water Test Reports & Certifications</h4>
              <p className="text-xs text-slate-500">Official third-party laboratory verification for 99.9% heavy metal & microbial rejection.</p>
              <button
                onClick={() => showToast('Download Started', 'Downloading NABL_Lab_Certificates.zip', 'info')}
                className="flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certificates (8.1 MB)</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Authorized Dealership Certificate</h4>
              <p className="text-xs text-slate-500">Personalized high-resolution framed certificate for display in retail dealerships.</p>
              <button
                onClick={() => showToast('Generated', `Dealership Certificate for ${currentDealer?.companyName || 'Partner'} ready to print.`, 'success')}
                className="flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Partner Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Register Dealership Form */}
      {activeTab === 'apply' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-800 text-xs font-bold px-3 py-1 rounded-full mb-1">
              <UserPlus className="w-3.5 h-3.5 text-sky-600" />
              <span>Expand With Califnco</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Apply for Authorized Dealership
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Join 450+ distributors across India. Approved partners receive credit terms, showroom demo displays, and promotional leads.
            </p>
          </div>

          <form onSubmit={handleApplyDealer} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contact Person Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Firm / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Patel Aqua Care Systems"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">GSTIN Number (Mandatory for Wholesale)</label>
              <input
                type="text"
                required
                placeholder="24AAAAA0000A1Z5"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 uppercase font-mono focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] active:scale-98"
            >
              <span>Submit Dealership Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
