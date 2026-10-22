import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceType } from '../../types';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ServiceBookingView: React.FC = () => {
  const { products, bookService, serviceBookings } = useApp();

  const [serviceType, setServiceType] = useState<ServiceType>('Periodic Multi-Stage Filter Replacement');
  const [customerName, setCustomerName] = useState('Rahul Nair');
  const [phone, setPhone] = useState('+91 98450 77123');
  const [email, setEmail] = useState('rahul.nair@gmail.com');
  const [address, setAddress] = useState('Flat 301, Palm Groves, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('560038');
  const [purifierModel, setPurifierModel] = useState('Califnco AquaPure Pro IX');
  const [preferredDate, setPreferredDate] = useState('2026-10-24');
  const [preferredSlot, setPreferredSlot] = useState('Morning (9 AM - 12 PM)');
  const [notes, setNotes] = useState('TDS indicator light blinking amber. Water flow is normal.');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cost = 
      serviceType === 'Free Standard Installation' || serviceType === 'Free Water Quality TDS & Hardness Test' 
        ? 0 
        : serviceType === 'Periodic Multi-Stage Filter Replacement' 
        ? 2499 
        : serviceType === 'Annual Maintenance Contract (AMC)' 
        ? 4999 
        : 499;

    const booking = bookService({
      customerName,
      phone,
      email,
      address,
      city,
      pincode,
      serviceType,
      purifierModel,
      preferredDate,
      preferredSlot,
      notes,
      estimatedCost: cost
    });

    setSubmittedTicket(booking.ticketNumber);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 mb-1.5">
          <Wrench className="w-3.5 h-3.5 text-blue-600" />
          <span>Doorstep Technician & Service Network</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Book Purifier Service, Installation & AMC
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Our certified technicians carry digital TDS calibrators and genuine Califnco replacement cartridges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {submittedTicket ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Service Ticket #{submittedTicket} Generated!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                A certified Califnco technician will arrive at your address on <strong>{preferredDate}</strong> during the <strong>{preferredSlot}</strong> slot.
              </p>
              <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100 text-xs text-left max-w-sm mx-auto space-y-1">
                <div><strong>Service:</strong> {serviceType}</div>
                <div><strong>Model:</strong> {purifierModel}</div>
                <div><strong>Technician:</strong> Rajesh Kumar (Allocated)</div>
              </div>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 underline"
              >
                Book another service request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Select Service Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Periodic Multi-Stage Filter Replacement',
                    'Free Standard Installation',
                    'Emergency Breakdown / Water Leakage',
                    'Annual Maintenance Contract (AMC)',
                    'Free Water Quality TDS & Hardness Test'
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setServiceType(type as ServiceType)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        serviceType === type
                          ? 'border-sky-600 bg-sky-50/70 text-sky-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purifier Model */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Water Purifier Model
                </label>
                <select
                  value={purifierModel}
                  onChange={(e) => setPurifierModel(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-sky-500 focus:outline-hidden"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.modelCode})
                    </option>
                  ))}
                  <option value="Other Brand RO (Kent/Aquaguard/Pureit)">Other Brand RO System (Multi-Brand Support)</option>
                </select>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Service Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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

              {/* Date and Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Time Window</label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-sky-500 focus:outline-hidden"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Notes / Water Issues Observed</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden"
                  placeholder="e.g., taste change, slow dispensing, pipe leak, routine 6-month checkup"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all hover:scale-[1.01] active:scale-98"
              >
                <span>Confirm Service Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Active Bookings */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AMC Benefits Card */}
          <div className="bg-linear-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Califnco Comprehensive AMC Care</span>
            </div>
            <h4 className="text-lg font-bold text-white">Never Worry About Water Purity</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our Annual Maintenance Contract covers 2 free complete filter replacements (Membrane, Carbon, Sediment), unlimited breakdown visits, and free spare parts replacement.
            </p>
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <div className="text-slate-300">✓ 100% Genuine NSF Parts</div>
              <div className="text-slate-300">✓ Zero Labour Charges</div>
              <div className="text-slate-300">✓ 2-Hour Response Time</div>
              <div className="text-slate-300">✓ Digital TDS Certification</div>
            </div>
          </div>

          {/* Recent Service History */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Your Active Service Tickets ({serviceBookings.length})</span>
              <span className="text-sky-600 text-[11px] font-semibold">Live Status</span>
            </h4>

            <div className="space-y-3">
              {serviceBookings.map((ticket) => (
                <div key={ticket.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{ticket.ticketNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ticket.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ticket.status === 'Technician Assigned' || ticket.status === 'In Progress'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800 line-clamp-1">{ticket.serviceType}</div>
                  <div className="text-slate-500 text-[11px]">
                    Date: <strong>{ticket.preferredDate}</strong> ({ticket.preferredSlot})
                  </div>
                  {ticket.technicianName && (
                    <div className="text-[11px] text-sky-700 bg-sky-50 px-2 py-1 rounded-md font-medium">
                      Technician: {ticket.technicianName} {ticket.technicianPhone && `(${ticket.technicianPhone})`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
