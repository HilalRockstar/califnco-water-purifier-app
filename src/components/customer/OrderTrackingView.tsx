import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Wrench, 
  FileText, 
  ExternalLink,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, recentOrder, updateOrderStatus, showToast } = useApp();

  const [lookupQuery, setLookupQuery] = useState(
    recentOrder ? recentOrder.orderNumber : (orders[0]?.orderNumber || '')
  );

  const currentOrder = orders.find(
    (o) => o.orderNumber.toLowerCase() === lookupQuery.trim().toLowerCase() || o.id === lookupQuery.trim()
  ) || orders[0];

  const handleNextStage = () => {
    if (!currentOrder) return;
    const stages: OrderStatus[] = ['Processing', 'Dispatched', 'Out for Delivery', 'Delivered', 'Installed'];
    const currentIdx = stages.indexOf(currentOrder.status);
    if (currentIdx < stages.length - 1) {
      const nextStatus = stages[currentIdx + 1];
      updateOrderStatus(currentOrder.id, nextStatus);
    } else {
      showToast('Completed', 'This order is already fully delivered and installed!', 'info');
    }
  };

  const downloadSimulatedInvoice = () => {
    showToast('Invoice Generated', `Simulated PDF tax invoice for #${currentOrder?.orderNumber} prepared.`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-800 text-xs font-bold px-3 py-1 rounded-full border border-sky-200 mb-1">
            <PackageCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Live Califnco Dispatch Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Order Fulfillment & Tracking
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Monitor real-time assembly, quality TDS inspection, and doorstep technician dispatch.
          </p>
        </div>

        {/* Lookup Box */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order Number (e.g. CAL-2026-9812)"
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white font-mono focus:border-sky-500 focus:outline-hidden shadow-xs"
          />
        </div>
      </div>

      {!currentOrder ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center">
          <p className="text-slate-500 text-sm">No orders found matching "{lookupQuery}".</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Order Header Summary Banner */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-md p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-base sm:text-lg">
                  #{currentOrder.orderNumber}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  currentOrder.status === 'Installed' || currentOrder.status === 'Delivered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : currentOrder.status === 'Dispatched'
                    ? 'bg-blue-100 text-blue-800'
                    : currentOrder.status === 'Out for Delivery'
                    ? 'bg-cyan-100 text-cyan-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {currentOrder.status}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })} • {currentOrder.paymentStatus} ({currentOrder.paymentMethod.toUpperCase()})
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleNextStage}
                className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 sm:px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                title="Advance order to next pipeline state in demo"
              >
                <span>Simulate Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={downloadSimulatedInvoice}
                className="flex items-center justify-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold px-3 sm:px-3.5 py-2.5 rounded-xl border border-sky-200 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>PDF Invoice</span>
              </button>
            </div>
          </div>

          {/* Visual Tracking Stepper */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-6">
              Fulfillment Journey
            </h3>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
                {currentOrder.trackingSteps.map((step, idx) => (
                  <div key={idx} className="relative flex md:flex-col items-start gap-3.5 pb-2 md:pb-0">
                    
                    {/* Vertical Connector Line for Mobile (<md) */}
                    {idx < currentOrder.trackingSteps.length - 1 && (
                      <div 
                        className={`md:hidden absolute left-[17px] top-9 w-0.5 bottom-0 -mb-6 ${
                          step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                        }`} 
                      />
                    )}

                    {/* Circle icon */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all relative z-10 ${
                      step.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : step.current
                        ? 'bg-sky-600 border-sky-600 text-white animate-pulse'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Step details */}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-xs leading-snug">
                        {step.status}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {step.description}
                      </div>
                      <div className="text-[10px] font-mono text-sky-700 font-semibold mt-1">
                        {step.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid: Ordered Items + Delivery Address */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Items */}
            <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Order Items ({currentOrder.items.length})
              </h4>

              <div className="space-y-3">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-slate-900 text-xs line-clamp-1">{item.product.name}</h5>
                      <span className="text-[11px] font-mono text-slate-500">{item.product.modelCode}</span>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Qty: <strong>{item.quantity}</strong> × ₹{item.product.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 text-xs">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{currentOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {currentOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{currentOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {currentOrder.warrantyFee > 0 && (
                  <div className="flex justify-between">
                    <span>Extended Warranty Plan</span>
                    <span>+₹{currentOrder.warrantyFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Paid</span>
                  <span className="text-sky-700">₹{currentOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Delivery & Technician Info */}
            <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  Delivery Address
                </h4>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900">{currentOrder.customer.name}</div>
                  <div>{currentOrder.customer.address}</div>
                  <div>{currentOrder.customer.city}, {currentOrder.customer.state} - {currentOrder.customer.pincode}</div>
                  <div className="text-slate-500 font-mono pt-1">Phone: {currentOrder.customer.phone}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-600" />
                  Assigned Doorstep Engineer
                </h4>
                <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Califnco Care Team #409</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Certified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    The installation engineer carries a pre-calibrated digital TDS meter, water hardness test strips, and genuine food-grade plumbing fittings.
                  </p>
                  <div className="text-[11px] font-semibold text-sky-800">
                    Helpline: 1800-266-CALIF
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Orders Switcher Chips */}
      {orders.length > 1 && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-600 block mb-2">Switch Recent Orders:</span>
          <div className="flex flex-wrap gap-2">
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => setLookupQuery(ord.orderNumber)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-mono transition-colors ${
                  ord.orderNumber === currentOrder?.orderNumber
                    ? 'border-sky-600 bg-sky-600 text-white font-bold'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {ord.orderNumber} ({ord.customer.name.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
