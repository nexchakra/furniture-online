"use client";

import React, { useState } from 'react';
import Link from 'next/link';


const PRODUCT_DATA = [
  // CHAIRS
  { 
    id: 'c1', name: 'Aero Chair', type: 'CHAIR', price: '₹52,400', status: 'IN STOCK', 
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80', 
    desc: 'Ergonomic studio chair with premium fabric and 4D armrests.',
    specs: { material: 'Recycled Polymer', weight: '12kg', dims: '65 x 65 x 110 cm' }
  },
  { 
    id: 'c2', name: 'Mamt Shair', type: 'CHAIR', price: '₹14,500', status: 'TRENDING', 
    img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80', 
    desc: 'Classic velvet accent chair with hand-polished gold legs.',
    specs: { material: 'Velvet / Steel', weight: '8kg', dims: '50 x 55 x 85 cm' }
  },
  { 
    id: 'c3', name: 'Nordic Stool', type: 'CHAIR', price: '₹9,800', status: 'NEW', 
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80', 
    desc: 'Minimalist bar stool with a contoured oak seat.',
    specs: { material: 'Oak / Iron', weight: '5kg', dims: '40 x 40 x 75 cm' }
  },

  // SOFAS
  { 
    id: 's1', name: 'Rero Sofa', type: 'SOFA', price: '₹85,000', status: 'TRENDING', 
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80', 
    desc: 'Luxury deep-seat lounge sofa designed for corporate suites.',
    specs: { material: 'Italian Leather', weight: '45kg', dims: '220 x 95 x 75 cm' }
  },
  { 
    id: 's2', name: 'Cloud Modular', type: 'SOFA', price: '₹1,20,000', status: 'EXCLUSIVE', 
    img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80', 
    desc: 'Ultra-soft modular sofa system that adapts to your living space.',
    specs: { material: 'Bouclé Fabric', weight: '55kg', dims: '300 x 100 x 70 cm' }
  },

  // TABLES
  { 
    id: 't1', name: 'Geo Table', type: 'TABLE', price: '₹32,000', status: 'IN STOCK', 
    img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80', 
    desc: 'Industrial coffee table with a Carrara marble top.',
    specs: { material: 'Marble / Iron', weight: '22kg', dims: '100 x 60 x 45 cm' }
  },
  { 
    id: 't2', name: 'Apex Desk', type: 'TABLE', price: '₹42,500', status: 'NEW', 
    img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80', 
    desc: 'Executive walnut desk with integrated wireless charging.',
    specs: { material: 'Walnut / Brass', weight: '28kg', dims: '140 x 70 x 75 cm' }
  },

  // BEDS
  { 
    id: 'b1', name: 'Luna Platform', type: 'BED', price: '₹92,000', status: 'NEW', 
    img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80', 
    desc: 'Minimalist platform bed with an integrated oak headboard and LED strip.',
    specs: { material: 'Solid Oak / Fabric', weight: '55kg', dims: '180 x 210 x 35 cm' }
  },
  { 
    id: 'b2', name: 'Velvet Haven', type: 'BED', price: '₹1,15,000', status: 'EXCLUSIVE', 
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80', 
    desc: 'Hand-tufted velvet wingback bed for ultimate comfort and luxury.',
    specs: { material: 'Velvet / Pine', weight: '62kg', dims: '200 x 220 x 120 cm' }
  }
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filteredProducts = activeTab === 'ALL' 
    ? PRODUCT_DATA 
    : PRODUCT_DATA.filter(p => p.type === activeTab);

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans">
      <aside className="w-80 border-r border-slate-50 p-12 flex flex-col justify-between bg-white h-screen">
        <div className="space-y-12">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black italic shadow-xl">F</div>
             <div>
                <p className="text-[10px] font-black tracking-widest text-slate-900 uppercase">Terminal</p>
                <p className="text-slate-400 text-[8px] font-bold">V1.02.26</p>
             </div>
          </div>

          <nav className="space-y-10">
            {['ALL', 'CHAIR', 'SOFA', 'TABLE', 'BED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block text-[10px] font-black tracking-[0.4em] uppercase transition-all ${
                  activeTab === tab ? 'text-indigo-600 translate-x-4' : 'text-slate-300 hover:text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        <Link href="/" className="flex items-center gap-3 p-5 bg-slate-50 rounded-3xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all">
            🏗️ Back to 3D Studio
        </Link>
      </aside>

      {/* 2. MAIN GRID */}
      <main className="flex-1 p-20 bg-slate-50/50 overflow-y-auto">
        <header className="mb-20 flex justify-between items-end">
          <div>
            <h1 className="text-7xl font-black italic tracking-tighter uppercase text-slate-900 leading-none">Inventory</h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-6">Product Catalog</p>
          </div>
          <div className="bg-indigo-600 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl">
              <span className="text-2xl font-black leading-none">{filteredProducts.length}</span>
              <span className="text-[7px] font-bold uppercase mt-1">Units</span>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProduct(p)}
              className="bg-white rounded-[60px] p-6 shadow-sm hover:shadow-2xl transition-all duration-700 group cursor-pointer border border-slate-100"
            >
              <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden mb-6 bg-slate-100">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-5 py-2 rounded-2xl text-[8px] font-black uppercase tracking-widest italic shadow-lg">{p.status}</div>
              </div>
              <div className="flex justify-between items-end px-4 pb-2">
                  <div>
                      <h3 className="text-3xl font-black italic text-slate-900 tracking-tighter">{p.name}</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{p.type}</p>
                  </div>
                  <p className="text-2xl font-black italic text-slate-900">{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl h-[550px] rounded-[50px] overflow-hidden shadow-2xl flex relative animate-in zoom-in-95 duration-500 border border-white/20">
              
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-900 font-black hover:bg-rose-500 hover:text-white transition-all shadow-xl"
              >✕</button>

              <div className="w-1/2 h-full relative bg-slate-100">
                <img src={selectedProduct.img} className="w-full h-full object-cover" alt="" />
              </div>

              <div className="w-1/2 p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4 text-slate-900">{selectedProduct.name}</h2>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.4em] mb-10">{selectedProduct.type} SERIES</p>
                  
                  <div className="space-y-8">
                    <p className="text-slate-400 text-sm leading-relaxed italic">{selectedProduct.desc}</p>
                    
                    <div className="grid grid-cols-1 gap-4 pt-6 border-t border-slate-50">
                        <div className="flex justify-between">
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Material</span>
                            <span className="text-[9px] font-black text-slate-900 uppercase">{selectedProduct.specs.material}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Dimensions</span>
                            <span className="text-[9px] font-black text-slate-900 uppercase">{selectedProduct.specs.dims}</span>
                        </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-3xl font-black italic tracking-tighter text-slate-900">{selectedProduct.price}</span>
                    <Link href={`/?id=${selectedProduct.id}`} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
                        Launch 3D →
                    </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}