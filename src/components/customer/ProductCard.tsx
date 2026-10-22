import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, ShoppingCart, Info, Droplets, Check, Shield, Activity } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useApp();

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap gap-1.5">
          {product.tag && (
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shadow-xs ${
              product.tag === 'Bestseller'
                ? 'bg-amber-500 text-white'
                : product.tag === 'New Launch'
                ? 'bg-cyan-600 text-white'
                : product.tag === 'Eco Water Saver'
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 text-white'
            }`}>
              {product.tag}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
          product.inStock 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Product Image Area */}
      <div 
        onClick={() => setSelectedProduct(product)}
        className="relative aspect-4/3 bg-slate-50 cursor-pointer overflow-hidden p-4 flex items-center justify-center group-hover:bg-sky-50/40 transition-colors"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-600" /> View Full Specs
          </span>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Rating and Model Code */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
            {product.modelCode}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1 font-bold text-slate-800 text-xs">{product.rating}</span>
            </div>
            <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => setSelectedProduct(product)}
          className="font-bold text-slate-900 text-base leading-snug cursor-pointer hover:text-sky-600 transition-colors line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Purification Stage Banner */}
        <p className="text-xs text-sky-700 font-medium mt-1 mb-3 line-clamp-1 flex items-center gap-1">
          <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          {product.purificationStages}
        </p>

        {/* Key Metrics Chips */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] mb-4">
          <div>
            <span className="text-slate-400 block text-[10px]">TDS Compatibility</span>
            <span className="font-semibold text-slate-700">{product.tdsLimit}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Tank Storage</span>
            <span className="font-semibold text-slate-700">{product.tankCapacity}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Water Recovery</span>
            <span className="font-semibold text-emerald-600">{product.recoveryRate}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Flow Rate</span>
            <span className="font-semibold text-slate-700">{product.filtrationSpeed}</span>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">
              ✓ Free Installation Included
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSelectedProduct(product)}
              className="p-2 rounded-xl text-slate-600 hover:text-sky-700 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 transition-colors"
              title="Specifications"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={() => addToCart(product, 1, true, 0)}
              disabled={!product.inStock}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                product.inStock
                  ? 'bg-sky-600 hover:bg-sky-700 text-white hover:shadow-sky-600/25 active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
