import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Droplets, 
  ShoppingCart, 
  Search, 
  Wrench, 
  ShieldCheck, 
  Building2, 
  LayoutDashboard, 
  Menu, 
  X, 
  MapPin, 
  SlidersHorizontal,
  Compass,
  PhoneCall
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePortal, 
    setActivePortal, 
    activeCustomerView, 
    setActiveCustomerView, 
    cartTotalCount, 
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    currentDealer
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Top Bar Announcement */}
      <div className="bg-linear-to-r from-sky-900 via-blue-900 to-cyan-900 text-sky-100 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center justify-center bg-cyan-400/20 text-cyan-300 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0">
              Califnco Certified
            </span>
            <span className="truncate">💧 100% Pure Alkaline RO | Free Pan-India Doorstep Installation</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 shrink-0 text-slate-300">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              Toll-Free Support: <strong className="text-white">1800-266-CALIF</strong>
            </span>
            <span className="text-sky-300/40">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" /> 450+ Service Hubs
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => {
              setActiveCustomerView('shop');
              if (activePortal !== 'customer') setActivePortal('customer');
            }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-tr from-blue-600 via-sky-500 to-cyan-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  CALIF<span className="text-sky-600">NCO</span>
                </span>
                <span className="text-[9px] sm:text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded-full tracking-wide uppercase">
                  AQUA
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 tracking-wider -mt-0.5 font-medium hidden xs:block">Pure Water, Alkaline Health</p>
            </div>
          </div>

          {/* Portal Switcher Pill - Key prominent switcher */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setActivePortal('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePortal === 'customer'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Customer Store
            </button>
            <button
              onClick={() => setActivePortal('dealer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePortal === 'dealer'
                  ? 'bg-white text-cyan-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Dealer Wholesale
              {currentDealer && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Dealer Active" />
              )}
            </button>
            <button
              onClick={() => setActivePortal('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePortal === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin Console
            </button>
          </div>

          {/* Customer Portal Search & Nav */}
          {activePortal === 'customer' && (
            <div className="hidden md:flex flex-1 max-w-xs items-center relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search RO models, filters, TDS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white text-xs pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {activePortal === 'customer' ? (
              <>
                <button
                  onClick={() => setActiveCustomerView('advisor')}
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-colors ${
                    activeCustomerView === 'advisor'
                      ? 'bg-cyan-50 text-cyan-700 font-semibold border border-cyan-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Water Quality & Purifier Selector"
                >
                  <Compass className="w-4 h-4 text-cyan-600" />
                  <span>TDS Advisor</span>
                </button>

                <button
                  onClick={() => setActiveCustomerView('service')}
                  className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-colors ${
                    activeCustomerView === 'service'
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>Book Service</span>
                </button>

                <button
                  onClick={() => setActiveCustomerView('tracking')}
                  className={`hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-colors ${
                    activeCustomerView === 'tracking'
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Track Order</span>
                </button>

                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex items-center gap-2 bg-linear-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Cart</span>
                  {cartTotalCount > 0 && (
                    <span className="inline-flex items-center justify-center bg-cyan-300 text-slate-900 font-bold text-[11px] rounded-full min-w-5 h-5 px-1">
                      {cartTotalCount}
                    </span>
                  )}
                </button>
              </>
            ) : activePortal === 'dealer' ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {currentDealer ? `${currentDealer.companyName} (${currentDealer.tier})` : 'Guest Partner'}
                </span>
                <button
                  onClick={() => setActivePortal('customer')}
                  className="text-xs text-sky-700 hover:text-sky-900 font-medium px-2 py-1"
                >
                  View Store &rarr;
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  System Live
                </span>
                <button
                  onClick={() => setActivePortal('customer')}
                  className="text-xs text-sky-700 hover:text-sky-900 font-medium px-2 py-1"
                >
                  View Store &rarr;
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 py-3 space-y-3">
            {/* Mobile Portal Selector */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => { setActivePortal('customer'); setMobileMenuOpen(false); }}
                className={`text-center py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activePortal === 'customer' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Store
              </button>
              <button
                onClick={() => { setActivePortal('dealer'); setMobileMenuOpen(false); }}
                className={`text-center py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activePortal === 'dealer' ? 'bg-white text-cyan-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Dealer
              </button>
              <button
                onClick={() => { setActivePortal('admin'); setMobileMenuOpen(false); }}
                className={`text-center py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activePortal === 'admin' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Customer links */}
            {activePortal === 'customer' && (
              <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                <button
                  onClick={() => { setActiveCustomerView('shop'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-sky-50 text-left"
                >
                  <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                  All Califnco Purifiers
                </button>
                <button
                  onClick={() => { setActiveCustomerView('advisor'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-sky-50 text-left"
                >
                  <Compass className="w-4 h-4 text-cyan-600" />
                  TDS Advisor & Purifier Finder
                </button>
                <button
                  onClick={() => { setActiveCustomerView('service'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-sky-50 text-left"
                >
                  <Wrench className="w-4 h-4 text-blue-600" />
                  Book Doorstep Service & AMC
                </button>
                <button
                  onClick={() => { setActiveCustomerView('tracking'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-sky-50 text-left"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Track Order / Status
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
