import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, CheckCircle2, Droplets, Sparkles, ArrowRight, RotateCcw, ShieldCheck, ShoppingCart } from 'lucide-react';

export const WaterAdvisorQuiz: React.FC = () => {
  const { products, addToCart, setSelectedProduct, setActiveCustomerView } = useApp();

  const [step, setStep] = useState(1);
  const [source, setSource] = useState<'borewell' | 'municipal' | 'tanker'>('borewell');
  const [familySize, setFamilySize] = useState<'small' | 'medium' | 'large'>('medium');
  const [priority, setPriority] = useState<'alkaline-copper' | 'hot-cold' | 'smart-iot' | 'eco-saver' | 'commercial'>('alkaline-copper');

  // Match logic
  const getRecommendation = () => {
    if (priority === 'commercial' || familySize === 'large') {
      return {
        product: products.find((p) => p.id === 'califnco-aquamax-comm-50') || products[0],
        reason: 'Recommended for high daily volume and deep filtration with dual high-pressure booster pumps.',
        recommendedTds: '1,500 - 3,000 ppm',
        purificationTech: 'Commercial Double-Membrane High Pressure RO'
      };
    }
    if (priority === 'hot-cold') {
      return {
        product: products.find((p) => p.id === 'califnco-glacier-hot-cold') || products[0],
        reason: 'Instant 90°C hot water for beverages and 8°C chilled pure mineral water on tap.',
        recommendedTds: 'Up to 2,000 ppm',
        purificationTech: '10-Stage RO + Alkaline Thermal Dispenser'
      };
    }
    if (priority === 'smart-iot') {
      return {
        product: products.find((p) => p.id === 'califnco-purealka-iot') || products[0],
        reason: 'Features Wi-Fi smart companion app tracking real-time TDS and precise filter health.',
        recommendedTds: 'Up to 2,200 ppm',
        purificationTech: '8-Stage Smart IoT RO + Bio-Ceramic'
      };
    }
    if (priority === 'eco-saver') {
      return {
        product: products.find((p) => p.id === 'califnco-zerowaste-eco-ro') || products[0],
        reason: 'Patented high-yield recovery saving up to 20,000 litres of water annually.',
        recommendedTds: 'Up to 2,000 ppm',
        purificationTech: '68% Ultra-High Recovery Eco RO'
      };
    }
    // Default to flagship AquaPure Pro IX
    return {
      product: products.find((p) => p.id === 'califnco-aquapure-pro-9') || products[0],
      reason: 'Perfect all-around solution: Aerospace RO with real Copper and Alkaline re-mineralization.',
      recommendedTds: 'Up to 2,500 ppm',
      purificationTech: '9-Stage RO + UV + UF + Alkaline + Active Copper'
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full text-xs font-bold text-cyan-800 mb-2">
          <Compass className="w-4 h-4 text-cyan-600" />
          <span>Interactive Water Quality Diagnostic</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Find Your Ideal Califnco Purifier
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
          Answer 3 quick questions about your home water source to get an engineer-backed recommendation.
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 1 ? 'text-sky-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step >= 1 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>1</span>
          <span>Source</span>
        </div>
        <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-sky-600' : 'bg-slate-200'}`} />
        <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 2 ? 'text-sky-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step >= 2 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>2</span>
          <span>Household</span>
        </div>
        <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-sky-600' : 'bg-slate-200'}`} />
        <div className={`flex items-center gap-2 text-xs font-semibold ${step >= 3 ? 'text-sky-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step >= 3 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>3</span>
          <span>Preferences</span>
        </div>
      </div>

      {/* Card container */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">
              Step 1: Where does your drinking water come from?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setSource('borewell')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  source === 'borewell'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Borewell / Ground Water</h4>
                <p className="text-xs text-slate-500 mt-1">
                  High TDS (typically 800 - 2,500 ppm). Hard water with calcium, magnesium & heavy salts. Requires high-rejection RO.
                </p>
              </div>

              <div
                onClick={() => setSource('municipal')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  source === 'municipal'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Municipal / Tap Supply</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Moderate TDS (typically 150 - 500 ppm). Potential chlorine taste, rust from city pipes, and bacterial contamination.
                </p>
              </div>

              <div
                onClick={() => setSource('tanker')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  source === 'tanker'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Tanker / Mixed Supply</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Fluctuating TDS (500 - 1,800 ppm). Water quality varies season to season; needs adaptive multi-stage RO.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                <span>Next: Household Size</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">
              Step 2: How many members in your household?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setFamilySize('small')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  familySize === 'small'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl font-black text-sky-700 mb-1">1 - 3</div>
                <h4 className="font-bold text-slate-900 text-sm">Small Family / Couple</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Daily consumption ~8-10 Litres. Standard 8L storage tank is ideal.
                </p>
              </div>

              <div
                onClick={() => setFamilySize('medium')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  familySize === 'medium'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl font-black text-sky-700 mb-1">4 - 6</div>
                <h4 className="font-bold text-slate-900 text-sm">Medium Family</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Daily consumption ~15-20 Litres. Needs 10L tank and rapid 18 L/hr flow rate.
                </p>
              </div>

              <div
                onClick={() => setFamilySize('large')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  familySize === 'large'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl font-black text-sky-700 mb-1">7+ / Office</div>
                <h4 className="font-bold text-slate-900 text-sm">Large Family / Clinic / Office</h4>
                <p className="text-xs text-slate-500 mt-1">
                  High continuous volume ~50+ Litres. High output commercial pump recommended.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-2"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                <span>Next: Special Needs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">
              Step 3: What is your primary wellness or convenience priority?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div
                onClick={() => setPriority('alkaline-copper')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  priority === 'alkaline-copper'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Alkaline Minerals & Active Copper</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Boost immunity, rebalance body pH to 8.5+, and replenish vital electrolytes.
                </p>
              </div>

              <div
                onClick={() => setPriority('hot-cold')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  priority === 'hot-cold'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Instant Hot & Chilled Water</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Get instant 90°C hot water for tea/coffee and 8°C chilled water at the touch of a button.
                </p>
              </div>

              <div
                onClick={() => setPriority('smart-iot')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  priority === 'smart-iot'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Smart Wi-Fi & Mobile App Tracking</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time TDS monitor on your phone, filter life countdown, and automated service reminders.
                </p>
              </div>

              <div
                onClick={() => setPriority('eco-saver')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  priority === 'eco-saver'
                    ? 'border-sky-600 bg-sky-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Maximum Water Saving (ZeroWaste)</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Save 65%+ water compared to ordinary RO purifiers; eco-friendly membrane system.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-2"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Best Match</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Diagnostic Result */}
        {step === 4 && (
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-bold text-slate-800 text-sm">Diagnostic Complete</span>
              </div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-800 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Quiz</span>
              </button>
            </div>

            <div className="bg-linear-to-br from-sky-50 via-cyan-50/50 to-white rounded-2xl p-6 border border-sky-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-sky-700 mb-1">
                Engineering Recommendation
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {recommendation.product.name}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {recommendation.purificationTech}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {recommendation.reason}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                  <span className="text-slate-400 block text-[10px]">TDS Compatibility</span>
                  <span className="font-bold text-slate-800">{recommendation.recommendedTds}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                  <span className="text-slate-400 block text-[10px]">Storage Tank</span>
                  <span className="font-bold text-slate-800">{recommendation.product.tankCapacity}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                  <span className="text-slate-400 block text-[10px]">Water Recovery</span>
                  <span className="font-bold text-emerald-600">{recommendation.product.recoveryRate}</span>
                </div>
              </div>

              {/* Price & Cart */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-sky-200/60">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{recommendation.product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{recommendation.product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    ✓ Includes Free Pan-India Installation & TDS Verification
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(recommendation.product)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => {
                      addToCart(recommendation.product, 1, true, 0);
                      setActiveCustomerView('shop');
                    }}
                    className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md shadow-sky-600/20"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setActiveCustomerView('shop')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                &larr; Or view all models in catalog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
