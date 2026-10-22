import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    placeOrder, 
    recentOrder, 
    setActiveCustomerView 
  } = useApp();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [createdOrderNum, setCreatedOrderNum] = useState<string>('');

  // Form State
  const [name, setName] = useState('Ananya Sen');
  const [email, setEmail] = useState('ananya.sen@example.com');
  const [phone, setPhone] = useState('+91 98301 23456');
  const [address, setAddress] = useState('Apt 5B, Diamond Heights, Residency Road');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560025');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('ananya@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8891');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');

  if (!isCheckoutOpen) return null;

  const warrantyFee = cart.reduce((sum, item) => {
    const fee = item.extendedWarrantyYears === 1 ? 1499 : item.extendedWarrantyYears === 2 ? 2499 : 0;
    return sum + fee * item.quantity;
  }, 0);

  const grandTotal = cartSubtotal + warrantyFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const order = placeOrder({
      customer: {
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode
      },
      items: [...cart],
      subtotal: cartSubtotal,
      discount: 0,
      installationFee: 0,
      warrantyFee,
      shippingFee: 0,
      total: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
      status: 'Processing'
    });

    setCreatedOrderNum(order.orderNumber);
    setStep('success');

    // Confetti celebration burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore in tests
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  const handleGoToTracking = () => {
    handleClose();
    setActiveCustomerView('tracking');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full mb-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Califnco 256-Bit SSL Demo Checkout</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Delivery & Payment Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Provide your address for free certified delivery and technician doorstep installation.
              </p>
            </div>

            {/* Address Form */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                Shipping & Installation Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number (For OTP & Technician)</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address (For Tax Invoice)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Delivery Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
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
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-600" />
                Select Payment Mode (Simulated Demo)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-sky-600" />
                  <span className="text-xs block">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <span className="text-xs block">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                  <span className="text-xs block">NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-sky-600 bg-sky-50/70 text-sky-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs block">Cash On Delivery</span>
                </button>
              </div>

              {/* Dynamic Payment field */}
              {paymentMethod === 'upi' && (
                <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                  <div className="flex-1 min-w-[180px]">
                    <label className="block text-[10px] text-slate-500 font-semibold">Virtual Payment Address (VPA)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="bg-transparent font-mono text-xs font-bold text-slate-800 focus:outline-hidden w-full"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-sky-700 bg-sky-100 px-2 py-1 rounded shrink-0">
                    Instant Auto-Verify
                  </span>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-400">Card Number (Demo)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="bg-transparent font-mono text-xs font-semibold text-slate-800 focus:outline-hidden w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Exp / CVV</label>
                    <div className="text-xs font-mono font-semibold text-slate-800">
                      {cardExpiry} / {cardCvv}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800">
                  You can pay in cash or via technician QR code at the time of delivery and installation.
                </div>
              )}
            </div>

            {/* Total & Action */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 block">Grand Total Payable</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Authorize & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
                Payment Authorized Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2">
                Thank You For Choosing Califnco!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your order is confirmed and has been routed to our nearest regional fulfillment hub.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 max-w-sm mx-auto text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{createdOrderNum}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Delivery To:</span>
                <span className="font-semibold text-slate-800">{city}, {state}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Installation:</span>
                <span className="font-bold text-emerald-600 uppercase">Free Doorstep Visit</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleGoToTracking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Track Order Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Back to Califnco Store
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
