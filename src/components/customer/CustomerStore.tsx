import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, Product } from '../../types';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { WaterAdvisorQuiz } from './WaterAdvisorQuiz';
import { ServiceBookingView } from './ServiceBookingView';
import { OrderTrackingView } from './OrderTrackingView';
import { 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  CheckCircle2, 
  Search, 
  ArrowRight,
  Compass,
  Wrench,
  Layers,
  Zap
} from 'lucide-react';

const CATEGORIES: { id: ProductCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Products', icon: '💧' },
  { id: 'home-ro', label: 'Home RO Systems', icon: '🏠' },
  { id: 'alkaline-uv', label: 'Alkaline & Copper', icon: '✨' },
  { id: 'hot-cold', label: 'Instant Hot & Cold', icon: '❄️' },
  { id: 'commercial', label: 'Commercial 50-100 LPH', icon: '🏭' },
  { id: 'cartridges-spares', label: 'Filters & Spare Kits', icon: '🔄' },
  { id: 'smart-iot', label: 'Smart IoT App', icon: '📱' },
];

export const CustomerStore: React.FC = () => {
  const { 
    activeCustomerView, 
    setActiveCustomerView, 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery,
    setSearchQuery 
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'capacity'>('featured');

  if (activeCustomerView === 'advisor') {
    return (
      <div>
        <div className="bg-sky-50/60 py-3 px-4 border-b border-sky-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActiveCustomerView('shop')}
              className="text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1"
            >
              &larr; Back to Purifier Catalog
            </button>
            <span className="text-xs text-slate-500">Califnco Water Quality Lab Diagnostic</span>
          </div>
        </div>
        <WaterAdvisorQuiz />
      </div>
    );
  }

  if (activeCustomerView === 'service') {
    return (
      <div>
        <div className="bg-sky-50/60 py-3 px-4 border-b border-sky-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActiveCustomerView('shop')}
              className="text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1"
            >
              &larr; Back to Purifier Catalog
            </button>
            <span className="text-xs text-slate-500">Pan-India Doorstep Service & AMC</span>
          </div>
        </div>
        <ServiceBookingView />
      </div>
    );
  }

  if (activeCustomerView === 'tracking') {
    return (
      <div>
        <div className="bg-sky-50/60 py-3 px-4 border-b border-sky-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActiveCustomerView('shop')}
              className="text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1"
            >
              &larr; Back to Purifier Catalog
            </button>
            <span className="text-xs text-slate-500">Live Delivery & Installation Tracker</span>
          </div>
        </div>
        <OrderTrackingView />
      </div>
    );
  }

  // Filter and sort products
  const filteredProducts = products.filter((p) => {
    // category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'alkaline-uv') {
        const matchesCategory = p.category === 'alkaline-uv' || p.purificationStages.toLowerCase().includes('alkaline') || p.purificationStages.toLowerCase().includes('copper');
        if (!matchesCategory) return false;
      } else if (p.category !== selectedCategory) {
        return false;
      }
    }

    // search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCode = p.modelCode.toLowerCase().includes(q);
      const matchStages = p.purificationStages.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchCode || matchStages || matchDesc;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'capacity') return parseInt(b.tankCapacity) - parseInt(a.tankCapacity);
    return 0; // featured
  });

  return (
    <div className="space-y-10">
      
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Catalog Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-700 mb-0.5 sm:mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Certified Water Purification Appliances</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Califnco Purifier Range
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
              Engineered with medical-grade semi-permeable membranes, bio-ceramic minerals & pure active copper.
            </p>
          </div>

          {/* Quick Helper Badges */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCustomerView('advisor')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-cyan-200 transition-colors"
            >
              <Compass className="w-4 h-4 text-cyan-600" />
              <span>Not sure which model? Take 30s Quiz &rarr;</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Visible on mobile only */}
        <div className="md:hidden relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search RO models, filter stages, TDS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-xs pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-hidden shadow-2xs"
          />
        </div>

        {/* Category Pills & Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          
          {/* Categories Pill Scroller with snap */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scroll-snap-x hide-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap scroll-snap-child transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 font-medium text-slate-700 focus:border-sky-500 focus:outline-hidden"
            >
              <option value="featured">Featured Models</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="capacity">Largest Storage Tank</option>
            </select>
          </div>
        </div>

        {/* Active Search/Category indicator */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex items-center justify-between bg-sky-50/70 p-2.5 sm:p-3 rounded-2xl border border-sky-100 text-xs">
            <span className="text-slate-700 truncate mr-2">
              Showing <strong>{sortedProducts.length}</strong> result(s)
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-sky-700 font-bold hover:underline shrink-0"
            >
              Reset
            </button>
          </div>
        )}

        {/* Product Cards Grid - 1-col on mobile, 2 on tablet, 3 on laptop, 4 on desktop */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-50 text-sky-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">No models found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any purifiers matching your criteria. Try resetting the search or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-sky-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs"
            >
              View All Purifiers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </section>

      {/* Tech & Health Education Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-linear-to-br from-slate-900 via-sky-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 border border-sky-800/40 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
              The Califnco Health Advantage
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why Ordinary RO Isn't Enough: The Alkaline & Copper Difference
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Standard reverse osmosis strips away all minerals, turning water mildly acidic (pH 5.8 - 6.5). Califnco restores natural bio-available Calcium, Magnesium, and pure Copper ions, raising the pH to a therapeutic 8.0 - 8.5 with antioxidant negative ORP.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
                <div className="font-bold text-cyan-300 text-sm">pH 8.5 Balance</div>
                <p className="text-xs text-slate-300 mt-1">Neutralizes acidity and helps maintain natural blood alkalinity.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
                <div className="font-bold text-amber-300 text-sm">Active Copper Ions</div>
                <p className="text-xs text-slate-300 mt-1">Naturally anti-microbial; strengthens immune function.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
                <div className="font-bold text-emerald-300 text-sm">65% Water Saver</div>
                <p className="text-xs text-slate-300 mt-1">High-recovery membrane cuts waste water by up to 60 litres/day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
