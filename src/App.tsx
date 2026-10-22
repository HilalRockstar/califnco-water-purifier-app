/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomerStore } from './components/customer/CustomerStore';
import { DealerPortal } from './components/dealer/DealerPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { ToastContainer } from './components/common/ToastContainer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

const MainLayout: React.FC = () => {
  const { activePortal } = useApp();

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Body with mobile bottom-nav padding */}
      <main className="flex-1 pb-20 md:pb-0">
        {activePortal === 'customer' && <CustomerStore />}
        {activePortal === 'dealer' && <DealerPortal />}
        {activePortal === 'admin' && <AdminDashboard />}
      </main>

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <ToastContainer />

      {/* Brand Footer */}
      <Footer />

      {/* Mobile Sticky Navigation Dock */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
