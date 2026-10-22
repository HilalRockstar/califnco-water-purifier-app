import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Droplets, 
  Compass, 
  ShoppingCart, 
  Building2, 
  LayoutDashboard,
  Wrench
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    activePortal, 
    setActivePortal, 
    activeCustomerView, 
    setActiveCustomerView, 
    cartTotalCount, 
    setIsCartOpen 
  } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl px-2 py-1.5 safe-bottom-padding-inner">
      <div className="grid grid-cols-5 items-center justify-around gap-1 max-w-md mx-auto">
        
        {/* Store Button */}
        <button
          onClick={() => {
            setActivePortal('customer');
            setActiveCustomerView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all tap-highlight-transparent ${
            activePortal === 'customer' && activeCustomerView === 'shop'
              ? 'text-sky-600 font-bold bg-sky-50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Droplets className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Store</span>
        </button>

        {/* Advisor Button */}
        <button
          onClick={() => {
            setActivePortal('customer');
            setActiveCustomerView('advisor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all tap-highlight-transparent ${
            activePortal === 'customer' && activeCustomerView === 'advisor'
              ? 'text-cyan-600 font-bold bg-cyan-50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">TDS Quiz</span>
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-700 relative transition-all tap-highlight-transparent"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5 text-blue-600" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-bold text-[9px] rounded-full min-w-4 h-4 flex items-center justify-center px-1 shadow-xs animate-bounce">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold text-blue-600 leading-tight">Cart</span>
        </button>

        {/* Dealer Wholesale */}
        <button
          onClick={() => {
            setActivePortal('dealer');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all tap-highlight-transparent ${
            activePortal === 'dealer'
              ? 'text-cyan-700 font-bold bg-cyan-50'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Dealer</span>
        </button>

        {/* Admin Console */}
        <button
          onClick={() => {
            setActivePortal('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all tap-highlight-transparent ${
            activePortal === 'admin'
              ? 'text-slate-900 font-bold bg-slate-100'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Admin</span>
        </button>

      </div>
    </div>
  );
};
