"use client";
import React, { useState } from 'react';
import Viewer from '@/components/canvas/Viewer';
import Link from 'next/link';

const PRODUCTS = [
  { id: '1', name: 'Aero Chair', type: 'Chair', price: '₹12,500', img: '/images/chairs/chair_1/front_view.png', modelType: 'chair' },
  { id: '2', name: 'Rero Sofa', type: 'Sofa', price: '₹45,000', img: '/images/sofa/sofa_1/front_view.png', modelType: 'sofa' },
  { id: '3', name: 'Geo Table', type: 'Table', price: '₹22,000', img: '/images/table/table_1/front_view.png', modelType: 'table' },
];

export default function FurnitureDemoSuite() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);
  const [activeColor, setActiveColor] = useState('#1E2139');
  const [isExploded, setIsExploded] = useState(false);

  return (
    <main className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans">
      {/* 1. Inventory Sidebar */}
      <section className="w-[450px] bg-white border-r border-slate-200 flex flex-col shadow-2xl z-20 overflow-y-auto">
        <div className="p-10 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Catalog</h1>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mt-2">Select to Configure</p>
            </div>
            <Link href="/inventory" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
               ✕
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {PRODUCTS.map((p) => (
              <button 
                type="button" // Fix: Added explicit button type
                key={p.id}
                title={`Configure ${p.name}`} // Fix: A11y discernible text
                onClick={() => setActiveProduct(p)}
                className={`flex items-center gap-6 p-4 rounded-[30px] border-2 transition-all ${activeProduct.id === p.id ? 'border-indigo-600 bg-indigo-50/30 shadow-lg' : 'border-slate-50 hover:border-slate-200'}`}
              >
                <img src={p.img} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={p.name} />
                <div className="text-left">
                  <p className="text-lg font-black italic leading-none">{p.name}</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase mt-2 tracking-widest">{p.type}</p>
                </div>
              </button>
            ))}
          </div>

          <hr className="border-slate-100" />

          {/* 2. Modification Controls */}
          <div className="space-y-6">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Modification Options</p>
             <div className="flex gap-3">
               {['#1E2139', '#4F46E5', '#10B981', '#F59E0B'].map(c => (
                 <button 
                   type="button"
                   key={c}
                   title={`Select color ${c}`}
                   onClick={() => setActiveColor(c)}
                   className={`w-10 h-10 rounded-full border-2 transition-transform ${activeColor === c ? 'border-slate-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                   style={{ backgroundColor: c }}
                 />
               ))}
             </div>
             <button 
                type="button"
                onClick={() => setIsExploded(!isExploded)}
                className={`w-full py-4 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] transition-all ${isExploded ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-900'}`}
             >
                {isExploded ? 'Collapse' : 'Exploded View'}
             </button>
          </div>
        </div>
      </section>

      {/* 3. High-Fidelity 3D Viewport */}
      <section className="flex-1 bg-gradient-to-br from-white to-slate-100 relative">
        <div className="absolute top-12 left-12 z-10">
          <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Live Rendering Engine</p>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">{activeProduct.name}</h2>
          <p className="text-3xl font-black italic text-slate-400 mt-2">{activeProduct.price}</p>
        </div>
        
        {/* Pass all required props to Viewer */}
        <Viewer 
          color={activeColor} 
          texture="leather" 
          backStyle="classic" 
          armStyle="modern" 
          zoom={5} 
          rotation={0} 
          showFloor={true} 
          isExploded={isExploded} 
        />
      </section>
    </main>
  );
}