import React from 'react';
import { useApp } from '../../context/AppContext';
import { Droplets, ShieldCheck, Award, PhoneCall, Mail, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePortal, setActiveCustomerView } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">100% Genuine NSF Parts</h4>
              <p className="text-xs text-slate-400 mt-1">Food-grade certified Dow & Toray RO membranes for purest water.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Alkaline + Active Copper</h4>
              <p className="text-xs text-slate-400 mt-1">Natural remineralization elevating pH to optimal 8.0-8.5.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Free Doorstep Installation</h4>
              <p className="text-xs text-slate-400 mt-1">Certified engineers in 450+ cities within 24 hours of delivery.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">65% High Water Recovery</h4>
              <p className="text-xs text-slate-400 mt-1">Eco-saver technology that slashes RO reject wastewater by half.</p>
            </div>
          </div>
        </div>

        {/* Links & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                CALIF<span className="text-cyan-400">NCO</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Califnco is a premier water purification brand delivering medical-grade reverse osmosis, active copper infusion, and commercial high-flow purification systems engineered for modern living.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> ISO 9001:2015
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> CE Certified
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> WQA Member
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Purifiers & Spares</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('shop'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Residential Alkaline RO
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('shop'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Instant Hot & Cold Dispensers
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('shop'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Commercial & Industrial 50-100 LPH
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('shop'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  4-Stage Universal Filter Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('shop'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Active Copper Cartridges
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Portals & Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('advisor'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Water Quality & TDS Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('service'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Book Doorstep AMC & Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePortal('customer'); setActiveCustomerView('tracking'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Live Order Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePortal('dealer')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Dealer B2B Wholesale Portal &rarr;
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePortal('admin')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Admin Management Console
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customer Care</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1800-266-CALIF (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>support@califnco-purifiers.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Califnco AquaTech Tech Park, Sector 62, Innovation Zone</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Mon - Sun: 8:00 AM - 9:00 PM (IST)
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Califnco Water Purifiers India Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Warranty Terms</span>
            <span>B2B Dealer Agreement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
