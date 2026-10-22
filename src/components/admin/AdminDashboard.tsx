import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, ServiceStatus, DealerTier } from '../../types';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Wrench, 
  Sliders, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Filter, 
  Search, 
  Edit3, 
  Check, 
  X, 
  Eye, 
  Building2,
  Truck,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    dealers, 
    updateDealerStatus, 
    serviceBookings, 
    updateServiceStatus, 
    products, 
    updateProductStock, 
    updateProductPrice,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'dealers' | 'services' | 'inventory'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'customer' | 'dealer'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state for price / stock modal
  const [editingProduct, setEditingProduct] = useState<{ id: string; price: number; origPrice: number; stockCount: number; inStock: boolean } | null>(null);

  // Overall calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalUnits = orders.reduce((sum, o) => sum + o.items.reduce((s, it) => s + it.quantity, 0), 0);
  const pendingDealersCount = dealers.filter((d) => d.status === 'Pending').length;
  const activeServicesCount = serviceBookings.filter((s) => s.status !== 'Completed' && s.status !== 'Cancelled').length;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'customer' && o.isDealerOrder) return false;
    if (orderFilter === 'dealer' && !o.isDealerOrder) return false;
    if (searchTerm) {
      const matchNum = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCust = o.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchNum || matchCust;
    }
    return true;
  });

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProductPrice(editingProduct.id, editingProduct.price, editingProduct.origPrice);
    updateProductStock(editingProduct.id, editingProduct.inStock, editingProduct.stockCount);
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Title & Command Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-1.5">
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Califnco Central Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Operations & Administration Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Live fulfillment, B2B wholesale partner underwriting, and nationwide technician dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Cloud Database Synced
          </span>
        </div>
      </div>

      {/* KPI Cards Strip - 2x2 on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-semibold">
            <span>Gross Revenue</span>
            <span className="p-1 sm:p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-base sm:text-2xl font-black text-slate-900">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold block pt-0.5 sm:pt-1">
            ↑ Retail & Wholesale
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-semibold">
            <span>Units Sold</span>
            <span className="p-1 sm:p-1.5 rounded-lg bg-sky-50 text-sky-600">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-base sm:text-2xl font-black text-slate-900">
            {totalUnits.toLocaleString('en-IN')} Units
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500 block pt-0.5 sm:pt-1">
            {orders.length} active orders
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-semibold">
            <span>Dealer Reviews</span>
            <span className={`p-1 sm:p-1.5 rounded-lg ${pendingDealersCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-base sm:text-2xl font-black text-slate-900">
            {pendingDealersCount}
          </div>
          <span className="text-[10px] sm:text-[11px] text-amber-700 font-semibold block pt-0.5 sm:pt-1">
            {pendingDealersCount > 0 ? 'Action required' : 'All approved'}
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-semibold">
            <span>Service Tickets</span>
            <span className="p-1 sm:p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-base sm:text-2xl font-black text-slate-900">
            {activeServicesCount}
          </div>
          <span className="text-[10px] sm:text-[11px] text-blue-600 font-semibold block pt-0.5 sm:pt-1">
            Doorstep pending
          </span>
        </div>

      </div>

      {/* Main Navigation Tabs - Smooth scroll on mobile */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto hide-scrollbar scroll-snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Fulfillment ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('dealers')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'dealers'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Dealers ({dealers.length})</span>
          {pendingDealersCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'services'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Technicians ({serviceBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 scroll-snap-child ${
            activeTab === 'inventory'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 bg-white sm:bg-transparent border sm:border-transparent border-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Inventory & Pricing ({products.length})</span>
        </button>
      </div>

      {/* TAB 1: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
              <button
                onClick={() => setOrderFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  orderFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All ({orders.length})
              </button>
              <button
                onClick={() => setOrderFilter('customer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  orderFilter === 'customer' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Customer Store
              </button>
              <button
                onClick={() => setOrderFilter('dealer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  orderFilter === 'dealer' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Dealer B2B
              </button>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search order # or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Mobile Orders Card View (<sm) */}
          <div className="sm:hidden space-y-3">
            {filteredOrders.map((ord) => (
              <div key={ord.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      #{ord.orderNumber}
                    </span>
                    {ord.isDealerOrder && (
                      <span className="text-[9px] bg-cyan-100 text-cyan-800 font-bold px-1.5 py-0.5 rounded-md">
                        B2B
                      </span>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    ord.paymentStatus === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.paymentStatus === 'Credit Invoiced'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ord.paymentStatus}
                  </span>
                </div>

                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <div className="font-semibold text-slate-800">{ord.customer.name}</div>
                    <div className="text-[11px] text-slate-500">{ord.customer.city}, {ord.customer.state}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900 text-sm">₹{ord.total.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-slate-400">{new Date(ord.createdAt).toLocaleDateString('en-IN')}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                  <span className="font-medium text-slate-700">{ord.items.reduce((s, it) => s + it.quantity, 0)} items: </span>
                  <span className="text-slate-500 line-clamp-1">
                    {ord.items[0]?.product.name} {ord.items.length > 1 ? `+${ord.items.length - 1} more` : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 font-medium">Status:</span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                    className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-hidden ${
                      ord.status === 'Installed' || ord.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : ord.status === 'Dispatched'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : ord.status === 'Out for Delivery'
                        ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Installed">Installed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (>=sm) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Order Number</th>
                  <th className="p-3.5">Customer / Dealer</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Items & Qty</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {ord.orderNumber}
                      {ord.isDealerOrder && (
                        <span className="block text-[10px] text-cyan-600 font-semibold">B2B Wholesale</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{ord.customer.name}</div>
                      <div className="text-[11px] text-slate-500">{ord.customer.city}, {ord.customer.state}</div>
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                      {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">
                        {ord.items.reduce((s, it) => s + it.quantity, 0)} items
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">
                        {ord.items[0]?.product.name} {ord.items.length > 1 ? `+${ord.items.length - 1} more` : ''}
                      </div>
                    </td>
                    <td className="p-3.5 font-black text-slate-900">
                      ₹{ord.total.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.paymentStatus === 'Credit Invoiced'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-hidden ${
                          ord.status === 'Installed' || ord.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ord.status === 'Dispatched'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : ord.status === 'Out for Delivery'
                            ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Installed">Installed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Dealer Approvals & Credit Terms */}
      {activeTab === 'dealers' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Authorized Dealer Partner Roster</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">Approve pending applications, manage revolving credit limits, and assign margin tiers.</p>
          </div>

          {/* Mobile Dealer Cards (<sm) */}
          <div className="sm:hidden space-y-3">
            {dealers.map((dealer) => (
              <div key={dealer.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{dealer.companyName}</div>
                    <div className="text-[11px] text-slate-500">{dealer.name} • {dealer.phone}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    dealer.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : dealer.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {dealer.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tier & Margin</span>
                    <span className="font-semibold text-slate-800">{dealer.tier}</span>
                    <span className="text-[10px] text-emerald-600 font-bold block">{dealer.wholesaleDiscount}% Margin</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Credit Line</span>
                    <span className="font-semibold text-slate-800">₹{dealer.creditLimit.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-500 block">₹{dealer.creditUsed.toLocaleString('en-IN')} used</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono text-[10px]">{dealer.gstNumber}</span>
                  <span>{dealer.city}, {dealer.state}</span>
                </div>

                <div className="pt-1 flex items-center justify-end gap-2">
                  {dealer.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => updateDealerStatus(dealer.id, 'Approved', 'Silver Partner', 200000, 28)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateDealerStatus(dealer.id, 'Rejected')}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        const nextTier: DealerTier = 
                          dealer.tier === 'Silver Partner' ? 'Gold Partner' :
                          dealer.tier === 'Gold Partner' ? 'Apex Platinum' : 'Silver Partner';
                        const nextDiscount = nextTier === 'Apex Platinum' ? 35 : nextTier === 'Gold Partner' ? 30 : 25;
                        const nextLimit = nextTier === 'Apex Platinum' ? 500000 : nextTier === 'Gold Partner' ? 300000 : 150000;
                        updateDealerStatus(dealer.id, 'Approved', nextTier, nextLimit, nextDiscount);
                      }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-1.5 px-3 rounded-lg text-center"
                    >
                      Cycle Partner Tier ({dealer.tier.split(' ')[0]})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Dealer Table (>=sm) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Company & Contact</th>
                  <th className="p-3.5">GSTIN / Region</th>
                  <th className="p-3.5">Tier & Discount</th>
                  <th className="p-3.5">Credit Utilization</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dealers.map((dealer) => (
                  <tr key={dealer.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{dealer.companyName}</div>
                      <div className="text-[11px] text-slate-500">{dealer.name} • {dealer.phone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-mono text-slate-700">{dealer.gstNumber}</div>
                      <div className="text-[11px] text-slate-500">{dealer.city}, {dealer.state}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800">{dealer.tier}</span>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        {dealer.wholesaleDiscount}% Margin
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">
                        ₹{dealer.creditUsed.toLocaleString('en-IN')} / ₹{dealer.creditLimit.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {dealer.totalOrdersCount} lifetime orders
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        dealer.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : dealer.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {dealer.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {dealer.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => updateDealerStatus(dealer.id, 'Approved', 'Silver Partner', 200000, 28)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateDealerStatus(dealer.id, 'Rejected')}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-2.5 py-1 rounded-lg text-xs"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const nextTier: DealerTier = 
                              dealer.tier === 'Silver Partner' ? 'Gold Partner' :
                              dealer.tier === 'Gold Partner' ? 'Apex Platinum' : 'Silver Partner';
                            const nextDiscount = nextTier === 'Apex Platinum' ? 35 : nextTier === 'Gold Partner' ? 30 : 25;
                            const nextLimit = nextTier === 'Apex Platinum' ? 500000 : nextTier === 'Gold Partner' ? 300000 : 150000;
                            updateDealerStatus(dealer.id, 'Approved', nextTier, nextLimit, nextDiscount);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                        >
                          Cycle Tier ({dealer.tier.split(' ')[0]})
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Service Tickets & Technician Dispatch */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Service Tickets & Doorstep Technician Dispatch</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">Assign certified field technicians, monitor ticket progression, and confirm customer sign-offs.</p>
          </div>

          {/* Mobile Service Cards (<sm) */}
          <div className="sm:hidden space-y-3">
            {serviceBookings.map((ticket) => (
              <div key={ticket.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    #{ticket.ticketNumber}
                  </span>
                  <select
                    value={ticket.status}
                    onChange={(e) => updateServiceStatus(ticket.id, e.target.value as ServiceStatus)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-hidden ${
                      ticket.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : ticket.status === 'Technician Assigned' || ticket.status === 'In Progress'
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    <option value="Received">Received</option>
                    <option value="Technician Assigned">Tech Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="text-xs">
                  <div className="font-semibold text-slate-900">{ticket.customerName}</div>
                  <div className="text-[11px] text-slate-500">{ticket.city} • {ticket.phone}</div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="font-medium text-slate-800 line-clamp-1">{ticket.serviceType}</div>
                  <div className="text-[11px] text-slate-500">{ticket.purifierModel}</div>
                  <div className="text-[10px] text-sky-700 font-semibold pt-0.5">
                    Slot: {ticket.preferredDate} ({ticket.preferredSlot})
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-slate-500 font-medium shrink-0">Tech:</label>
                  <input
                    type="text"
                    defaultValue={ticket.technicianName || 'Assign Tech'}
                    onBlur={(e) => updateServiceStatus(ticket.id, ticket.status, e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Service Table (>=sm) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Ticket #</th>
                  <th className="p-3.5">Customer & City</th>
                  <th className="p-3.5">Service Requested</th>
                  <th className="p-3.5">Model</th>
                  <th className="p-3.5">Scheduled Slot</th>
                  <th className="p-3.5">Technician Assigned</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serviceBookings.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {ticket.ticketNumber}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{ticket.customerName}</div>
                      <div className="text-[11px] text-slate-500">{ticket.city} • {ticket.phone}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">
                      {ticket.serviceType}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {ticket.purifierModel}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{ticket.preferredDate}</div>
                      <div className="text-[10px] text-slate-500">{ticket.preferredSlot}</div>
                    </td>
                    <td className="p-3.5">
                      <input
                        type="text"
                        defaultValue={ticket.technicianName || 'Assign Tech'}
                        onBlur={(e) => updateServiceStatus(ticket.id, ticket.status, e.target.value)}
                        className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white font-medium focus:border-sky-500 focus:outline-hidden"
                      />
                    </td>
                    <td className="p-3.5">
                      <select
                        value={ticket.status}
                        onChange={(e) => updateServiceStatus(ticket.id, e.target.value as ServiceStatus)}
                        className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-hidden ${
                          ticket.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ticket.status === 'Technician Assigned' || ticket.status === 'In Progress'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="Received">Received</option>
                        <option value="Technician Assigned">Tech Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Inventory & Pricing */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Purifier Catalog & Pricing Control</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Edit stock levels and consumer prices; changes update live across the customer store.</p>
            </div>
          </div>

          {/* Mobile Inventory Cards (<sm) */}
          <div className="sm:hidden space-y-3">
            {products.map((p) => (
              <div key={p.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
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
                      <span className="text-xs font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-slate-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono font-bold ${p.stockCount < 10 ? 'text-rose-600' : 'text-slate-700'}`}>
                      {p.stockCount} units
                    </span>
                    <button
                      onClick={() => updateProductStock(p.id, !p.inStock, p.stockCount)}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Out'}
                    </button>
                  </div>

                  <button
                    onClick={() => setEditingProduct({
                      id: p.id,
                      price: p.price,
                      origPrice: p.originalPrice,
                      stockCount: p.stockCount,
                      inStock: p.inStock
                    })}
                    className="flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Price/Stock</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Inventory Table (>=sm) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Product SKU</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Retail Price</th>
                  <th className="p-3.5">Original MSRP</th>
                  <th className="p-3.5">Inventory Units</th>
                  <th className="p-3.5">In Stock?</th>
                  <th className="p-3.5 text-right">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-lg object-cover bg-slate-100" 
                        />
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                          <div className="text-[10px] font-mono text-slate-500">{p.modelCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 uppercase font-mono text-[10px]">
                      {p.category}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 text-slate-400 line-through">
                      ₹{p.originalPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      <span className={`font-mono font-bold ${p.stockCount < 10 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {p.stockCount} units
                      </span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => updateProductStock(p.id, !p.inStock, p.stockCount)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setEditingProduct({
                          id: p.id,
                          price: p.price,
                          origPrice: p.originalPrice,
                          stockCount: p.stockCount,
                          inStock: p.inStock
                        })}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-sky-700 hover:bg-sky-50"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Quick Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Update Product Pricing & Units</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProductEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Selling Retail Price (₹)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Original MSRP / Scratch Price (₹)</label>
                <input
                  type="number"
                  value={editingProduct.origPrice}
                  onChange={(e) => setEditingProduct({ ...editingProduct, origPrice: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Inventory Stock Units</label>
                <input
                  type="number"
                  value={editingProduct.stockCount}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="stockToggle"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded"
                />
                <label htmlFor="stockToggle" className="text-slate-700 font-medium">Mark as active and available for customer orders</label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
