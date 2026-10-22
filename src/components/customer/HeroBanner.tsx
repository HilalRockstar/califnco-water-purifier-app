import React from 'react';
import { useApp } from '../../context/AppContext';
import { Droplets, Sparkles, ShieldCheck, Wrench, Compass, ArrowRight, Award, Zap } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveCustomerView } = useApp();

  return (
    <div className="relative overflow-hidden bg-radial from-sky-900 via-blue-950 to-slate-950 text-white rounded-2xl sm:rounded-3xl mx-3 sm:mx-6 lg:mx-8 my-3 sm:my-6 p-4 sm:p-8 lg:p-12 shadow-2xl border border-sky-800/40">
      
      {/* Background Decorative Glows */}
      <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            <span>Alkaline Mineral RO + Active Copper</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Drink Pure. <br />
            <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-white bg-clip-text text-transparent">
              Live Healthier with Califnco.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Aerospace-grade reverse osmosis engineered for Indian water conditions. Removes 99.9% heavy metals and dissolved solids while enriching water with vital Calcium, Magnesium, and antioxidant Copper.
          </p>

          {/* Action CTAs - Responsive grid/flex on mobile */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('products-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore RO Models</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveCustomerView('advisor')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-all hover:border-cyan-400/40"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>TDS Advisor Quiz</span>
            </button>

            <button
              onClick={() => setActiveCustomerView('service')}
              className="w-full sm:w-auto col-span-full xs:col-span-2 sm:col-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-sky-200 hover:text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm transition-colors"
            >
              <Wrench className="w-4 h-4 text-sky-400" />
              <span>Book Service / AMC</span>
            </button>
          </div>

          {/* Trust Highlights - 2x2 on mobile, 4 in row on tablet */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 sm:pt-6 border-t border-slate-800/80 text-left">
            <div className="bg-slate-900/50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-black text-cyan-300">99.9%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-medium">TDS & Lead Removal</div>
            </div>
            <div className="bg-slate-900/50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-black text-white">65%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-medium">Eco Water Saver</div>
            </div>
            <div className="bg-slate-900/50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-black text-cyan-300">450+</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-medium">Pan-India Hubs</div>
            </div>
            <div className="bg-slate-900/50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border border-slate-800/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-black text-white">24 Hrs</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-medium">Free Installation</div>
            </div>
          </div>
        </div>

        {/* Right Feature Card Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm rounded-2xl bg-linear-to-b from-slate-900/90 to-slate-950/90 p-5 border border-sky-500/30 shadow-2xl backdrop-blur-md">
            
            {/* Top Device Status simulation */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-200">AquaPure Pro IX • Active</span>
              </div>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono">
                pH 8.4 Alkaline
              </span>
            </div>

            {/* Visual Purifier Image */}
            <div className="relative my-4 rounded-xl overflow-hidden aspect-4/3 bg-slate-800">
              <img
                src="/src/assets/images/ro_water_purifier_1792690477147.jpg"
                alt="Califnco Flagship Purifier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
              
              {/* Floating metrics badge on image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/60 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Input TDS: 1450 ppm</div>
                  <div className="text-xs font-bold text-emerald-400">Pure Output TDS: 45 ppm</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Filter Health</div>
                  <div className="text-xs font-bold text-cyan-300">98% Optimal</div>
                </div>
              </div>
            </div>

            {/* Quick Benefits pills */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>9-Stage RO + UV + UF + Mineralizer + Copper</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Smart LED alerts when filter replacement is due</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Installation Fee + 1 Year Free Onsite AMC</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
