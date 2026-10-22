import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  ShoppingCart, 
  Tag, 
  Check, 
  Sparkles,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQty, 
    removeFromCart, 
    cartSubtotal, 
    setIsCheckoutOpen,
    showToast
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>(null);

  if (!isCartOpen) return null;

  // Calculate fees
  const warrantyFee = cart.reduce((sum, item) => {
    const fee = item.extendedWarrantyYears === 1 ? 1499 : item.extendedWarrantyYears === 2 ? 2499 : 0;
    return sum + fee * item.quantity;
  }, 0);

  const discountAmount = appliedPromo 
    ? Math.round((cartSubtotal * appliedPromo.discountPct) / 100) 
    : 0;

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + warrantyFee);

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'CALIFPURE10') {
      setAppliedPromo({ code: 'CALIFPURE10', discountPct: 10 });
      showToast('Coupon Applied!', '10% promotional discount applied.', 'success');
      setPromoCode('');
    } else if (cleanCode === 'FREESERVICE') {
      setAppliedPromo({ code: 'FREESERVICE', discountPct: 5 });
      showToast('Coupon Applied!', '5% special festive discount applied.', 'success');
      setPromoCode('');
    } else {
      showToast('Invalid Coupon', 'Try using code CALIFPURE10 for 10% off.', 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Your Water Cart</h3>
              <span className="text-xs text-slate-500">
                {cart.length === 0 ? 'Cart is empty' : `${cart.length} unique item(s)`}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-400 flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our advanced alkaline RO purifiers and high-purity filter cartridges.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs font-bold text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-colors"
              >
                Browse Califnco Purifiers &rarr;
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-sky-200 transition-colors space-y-3"
              >
                <div className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 block">
                      {item.product.modelCode}
                    </span>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-slate-900 text-sm">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Free Installation Badge */}
                <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-lg text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Wrench className="w-3.5 h-3.5 text-blue-600" /> Doorstep Installation
                  </span>
                  <span className="font-bold text-emerald-600 uppercase text-[10px]">Included Free</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={applyPromoCode} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. CALIFPURE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-300 bg-white uppercase font-mono tracking-wider focus:border-sky-500 focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shrink-0"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 p-2 rounded-lg">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPct}% off)
                </span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {warrantyFee > 0 && (
                <div className="flex justify-between">
                  <span>Califnco Shield Warranty</span>
                  <span>+₹{warrantyFee.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-slate-700">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-sky-600" /> Pan-India Express Delivery
                </span>
                <span className="text-emerald-600 font-bold uppercase text-[11px]">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-sky-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-sky-600/20 active:scale-98 transition-all"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
