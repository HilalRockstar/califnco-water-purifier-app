import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Droplets, 
  CheckCircle2, 
  Sparkles, 
  Wrench, 
  ShoppingCart, 
  Layers, 
  Info,
  ChevronRight,
  Truck
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'filtration' | 'specs' | 'wholesale'>('overview');
  const [quantity, setQuantity] = useState(1);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [warrantyYears, setWarrantyYears] = useState<number>(0);

  if (!selectedProduct) return null;

  const handleAddToCart = (directCheckout = false) => {
    addToCart(selectedProduct, quantity, includeInstallation, warrantyYears);
    setSelectedProduct(null);
    if (directCheckout) {
      setIsCartOpen(true);
    }
  };

  const discountPercentage = Math.round(
    ((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image & Highlights */}
          <div className="md:col-span-5 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div>
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner mb-4 relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {selectedProduct.tag && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                    {selectedProduct.tag}
                  </span>
                )}
              </div>

              {/* Badges strip */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[10px]">Purification Capacity</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedProduct.filtrationSpeed}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[10px]">TDS Compatibility</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedProduct.tdsLimit}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[10px]">Storage Tank</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedProduct.tankCapacity}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[10px]">Recovery Rate</div>
                  <div className="font-bold text-emerald-600 mt-0.5">{selectedProduct.recoveryRate}</div>
                </div>
              </div>
            </div>

            {/* Quality Certifications */}
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NSF & WQA Certified Purification Cartridges</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Express Delivery + Doorstep Installation within 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{selectedProduct.warranty}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Configuration */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md font-semibold">
                  {selectedProduct.modelCode}
                </span>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800">{selectedProduct.rating}</span>
                  <span className="text-slate-400">({selectedProduct.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xs font-semibold text-sky-700 mt-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                {selectedProduct.purificationStages}
              </p>

              {/* Pricing Box */}
              <div className="my-4 p-4 rounded-2xl bg-linear-to-r from-sky-50 to-blue-50/50 border border-sky-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-sm text-slate-400 line-through">
                        ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {discountPercentage > 0 && (
                      <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-600 mt-0.5 block">
                    Inclusive of all taxes & free delivery
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                    Ready to Ship
                  </span>
                </div>
              </div>

              {/* Tabs Navigation - Scrollable on mobile */}
              <div className="flex items-center border-b border-slate-200 text-xs font-semibold mb-4 gap-3 sm:gap-4 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 transition-colors relative whitespace-nowrap shrink-0 ${
                    activeTab === 'overview'
                      ? 'text-sky-600 border-b-2 border-sky-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Features & Details
                </button>
                <button
                  onClick={() => setActiveTab('filtration')}
                  className={`pb-2.5 transition-colors relative whitespace-nowrap shrink-0 ${
                    activeTab === 'filtration'
                      ? 'text-sky-600 border-b-2 border-sky-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Filtration Tech
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 transition-colors relative whitespace-nowrap shrink-0 ${
                    activeTab === 'specs'
                      ? 'text-sky-600 border-b-2 border-sky-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Tech Specifications
                </button>
                <button
                  onClick={() => setActiveTab('wholesale')}
                  className={`pb-2.5 transition-colors relative whitespace-nowrap shrink-0 ${
                    activeTab === 'wholesale'
                      ? 'text-sky-600 border-b-2 border-sky-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Wholesale Tiers
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs text-slate-600 space-y-3 min-h-[140px]">
                {activeTab === 'overview' && (
                  <>
                    <p className="leading-relaxed text-slate-700">{selectedProduct.description}</p>
                    <div className="space-y-1.5 pt-2">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Key Highlights:</h4>
                      {selectedProduct.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'filtration' && (
                  <div className="space-y-2.5">
                    <p className="leading-relaxed">
                      Califnco utilizes high-efficiency semi-permeable membranes (pore size 0.0001 microns) coupled with dual-stage mineralization:
                    </p>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">1-3</span>
                        <span className="font-medium text-slate-800">Spun Pre-Filter + Carbon Block (traps dirt, chlorine & VOCs)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-[10px]">4-5</span>
                        <span className="font-medium text-slate-800">Thin Film Composite RO Membrane (removes dissolved solids, arsenic, lead)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center text-[10px]">6-7</span>
                        <span className="font-medium text-slate-800">UV LED Chamber + Ultrafiltration (bacteriostatic protection)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">8-9</span>
                        <span className="font-medium text-slate-800">Active Copper & Bio-Alkaline Mineral Cartridge (pH 8.2 & immunity)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedProduct.specs).map(([label, val]) => (
                      <div key={label} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                        <div className="text-[10px] text-slate-400 font-medium">{label}</div>
                        <div className="font-semibold text-slate-800 mt-0.5">{val}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'wholesale' && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-500">
                      Califnco offers direct bulk pricing for authorized retail dealers, architects, and institutions:
                    </p>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-600">
                          <tr>
                            <th className="p-2 font-semibold">Tier Order Qty</th>
                            <th className="p-2 font-semibold">B2B Unit Price</th>
                            <th className="p-2 font-semibold">Margin Discount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedProduct.wholesaleTiers.map((tier, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2 font-medium">{tier.minUnits}+ Units</td>
                              <td className="p-2 font-bold text-sky-700">₹{tier.pricePerUnit.toLocaleString('en-IN')}</td>
                              <td className="p-2 text-emerald-600 font-semibold">{tier.discountPercentage}% Off Retail</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Add-on Options Box */}
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2.5">
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeInstallation}
                      onChange={(e) => setIncludeInstallation(e.target.checked)}
                      className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-slate-800 text-xs">Professional Doorstep Installation</span>
                      <span className="block text-[10px] text-slate-500">Includes free plumbing connectors & raw water testing</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 uppercase">FREE</span>
                </label>

                {/* Extended Warranty Selector */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      Califnco Shield Extended Warranty
                    </span>
                    <span className="text-[10px] text-slate-500">Zero maintenance costs</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setWarrantyYears(0)}
                      className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                        warrantyYears === 0
                          ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Standard (1 Yr)
                    </button>
                    <button
                      type="button"
                      onClick={() => setWarrantyYears(1)}
                      className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                        warrantyYears === 1
                          ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      +1 Year (+₹1,499)
                    </button>
                    <button
                      type="button"
                      onClick={() => setWarrantyYears(2)}
                      className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                        warrantyYears === 2
                          ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      +2 Years (+₹2,499)
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-slate-800 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-2 flex-1 justify-end min-w-[200px]">
                <button
                  onClick={() => handleAddToCart(false)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  <ShoppingCart className="w-4 h-4 text-slate-600" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => handleAddToCart(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Buy Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
