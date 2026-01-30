"use client";

import { useState, useMemo } from 'react';
import Viewer from '@/components/canvas/Viewer';

const PRODUCTS = [
  { id: 'chair', name: 'Aero Chair', price: 52400, type: 'Design Studio Pro', weight: '12kg' },
  { id: 'sofa', name: 'Geo Sofa', price: 85000, type: 'Comfort Series', weight: '45kg' },
  { id: 'table', name: 'Cloud Table', price: 32000, type: 'Minimalist Oak', weight: '22kg' }
];

const PREMIUM_FINISHES = [
  { hex: '#0f172a', name: 'Obsidian Matte' },
  { hex: '#1e40af', name: 'Royal Blue' },
  { hex: '#064e3b', name: 'Forest Grain' },
  { hex: '#78350f', name: 'Sienna Leather' },
  { hex: '#991b1b', name: 'Crimson' }
];

const TEXTURES = [
  { id: 'leather', label: 'Premium Leather', upcharge: 5000 },
  { id: 'fabric', label: 'Woven Fabric', upcharge: 0 },
  { id: 'wood', label: 'Solid Oak', upcharge: 2500 }
] as const;

export default function FurnitureStudio() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);
  const [activeColor, setActiveColor] = useState(PREMIUM_FINISHES[0].hex);
  const [activeTexture, setActiveTexture] = useState<typeof TEXTURES[number]['id']>('leather');
  const [backStyle, setBackStyle] = useState<'classic' | 'cross' | 'ergonomic'>('classic');
  const [armStyle, setArmStyle] = useState<'modern' | 'executive' | 'none'>('modern');
  const [zoom, setZoom] = useState(5);
  const [rotation, setRotation] = useState(0);
  const [showFloor, setShowFloor] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const costData = useMemo(() => {
    let base = activeProduct.price;
    const addOns = [];
    
    const tex = TEXTURES.find(t => t.id === activeTexture);
    if (tex && tex.upcharge > 0) addOns.push({ name: `${tex.label} Finish`, price: tex.upcharge });
    
    if (backStyle === 'cross') addOns.push({ name: 'Artisan Cross Back', price: 4500 });
    if (backStyle === 'ergonomic') addOns.push({ name: 'Ergonomic Curved Shell', price: 3000 });
    if (armStyle === 'executive') addOns.push({ name: 'Executive Padded Arms', price: 3500 });

    const total = base + addOns.reduce((acc, curr) => acc + curr.price, 0);
    return { base, addOns, total };
  }, [activeProduct, activeTexture, backStyle, armStyle]);

  const finalizeBuild = () => {
    const buildSpec = {
      product: activeProduct.name,
      configuration: {
        color: PREMIUM_FINISHES.find(c => c.hex === activeColor)?.name || activeColor,
        texture: activeTexture,
        backrest: backStyle,
        armrests: armStyle,
        weight: activeProduct.weight
      },
      valuation: costData.total,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(buildSpec, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BUILD_SHEET_${activeProduct.id.toUpperCase()}.json`;
    link.click();
    
    alert(`Configuration Finalized!\nTotal: ₹${costData.total.toLocaleString()}\nProduction data exported.`);
  };

  const takeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = `RENDER_${activeProduct.id.toUpperCase()}.png`;
      link.href = image;
      link.click();
    }
  };

  return (
    <main className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans">
      <section className="w-[480px] bg-white p-12 flex flex-col shadow-2xl z-20 overflow-y-auto custom-scrollbar border-r border-slate-100">
        <div className="flex-1 space-y-10">
          <header className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-none italic">Studio Pro</h1>
              <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">Active Terminal</p>
            </div>
            <button onClick={() => setShowFloor(!showFloor)} className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase border-2 transition-all ${showFloor ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'border-slate-100 text-slate-400'}`}>
              Reflection: {showFloor ? 'ON' : 'OFF'}
            </button>
          </header>

          {/* Navigation Controls */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Navigation</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <button onClick={() => setZoom(z => Math.min(8, z + 0.5))} className="w-10 h-10 bg-white rounded-xl shadow-sm font-black text-xl hover:bg-rose-50 transition-colors">-</button>
                <span className="flex-1 text-center font-black text-[9px] uppercase">Zoom</span>
                <button onClick={() => setZoom(z => Math.max(2, z - 0.5))} className="w-10 h-10 bg-white rounded-xl shadow-sm font-black text-xl hover:bg-emerald-50 transition-colors">+</button>
              </div>
              <div className="flex items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <button onClick={() => setRotation(r => r - 0.5)} className="w-10 h-10 bg-white rounded-xl shadow-sm font-black hover:bg-indigo-50">⟲</button>
                <span className="flex-1 text-center font-black text-[9px] uppercase">Rotate</span>
                <button onClick={() => setRotation(r => r + 0.5)} className="w-10 h-10 bg-white rounded-xl shadow-sm font-black hover:bg-indigo-50">⟳</button>
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="space-y-6">
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Structure & Style</p>
               <div className="grid grid-cols-3 gap-2">
                 {(['classic', 'cross', 'ergonomic'] as const).map(s => (
                   <button key={s} onClick={() => setBackStyle(s)} className={`py-3 rounded-xl text-[8px] font-black uppercase border-2 transition-all ${backStyle === s ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>{s}</button>
                 ))}
               </div>
               <div className="grid grid-cols-3 gap-2">
                 {(['none', 'modern', 'executive'] as const).map(s => (
                   <button key={s} onClick={() => setArmStyle(s)} className={`py-3 rounded-xl text-[8px] font-black uppercase border-2 transition-all ${armStyle === s ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>{s === 'none' ? 'Clean' : s}</button>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Material Finish</p>
               <div className="grid grid-cols-3 gap-2">
                 {TEXTURES.map(t => (
                   <button key={t.id} onClick={() => setActiveTexture(t.id)} className={`py-3 rounded-xl text-[8px] font-black uppercase border-2 transition-all ${activeTexture === t.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>{t.id}</button>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Color Palette</p>
              <div className="flex gap-4">
                {PREMIUM_FINISHES.map((c) => (
                  <button key={c.hex} onClick={() => setActiveColor(c.hex)} style={{ backgroundColor: c.hex }} className={`w-10 h-10 rounded-full border-4 transition-all ${activeColor === c.hex ? 'border-indigo-600 scale-110 shadow-xl' : 'border-transparent hover:scale-105'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Tooltip */}
          <div className="bg-slate-50 p-6 rounded-[35px] border border-slate-100 relative shadow-inner">
            <div 
              onMouseEnter={() => setShowTooltip(true)} 
              onMouseLeave={() => setShowTooltip(false)}
              className="flex justify-between items-center cursor-help"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Analysis</p>
                <span className="text-3xl font-black italic text-slate-900 tracking-tighter">₹{costData.total.toLocaleString()}</span>
              </div>
              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[8px] font-black uppercase">Live Calc</span>
            </div>

            {showTooltip && (
              <div className="absolute bottom-full mb-4 left-0 w-full bg-slate-900 text-white p-6 rounded-[30px] shadow-2xl z-50">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3 underline underline-offset-4">Build Specifications</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Base Unit</span>
                    <span>₹{costData.base.toLocaleString()}</span>
                  </div>
                  {costData.addOns.map(item => (
                    <div key={item.name} className="flex justify-between text-[10px] font-black italic text-indigo-300">
                      <span>+ {item.name}</span>
                      <span>₹{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] font-bold text-emerald-400">
                    <span>Shipping Weight</span>
                    <span>{activeProduct.weight}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={takeScreenshot} className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-200 hover:bg-white flex items-center justify-center gap-2 transition-all">
            📸 Snapshot Gallery
          </button>
        </div>

        <button 
          onClick={finalizeBuild} 
          className="mt-8 w-full py-6 bg-slate-900 text-white font-black rounded-[30px] uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all active:scale-95"
        >
          Finalize Production Build
        </button>
      </section>

      <section className="flex-1 bg-gradient-to-br from-white to-slate-200 relative cursor-grab active:cursor-grabbing">
        <Viewer 
          color={activeColor} 
          texture={activeTexture} 
          backStyle={backStyle} 
          armStyle={armStyle} 
          zoom={zoom} 
          rotation={rotation} 
          showFloor={showFloor} 
        />
        <div className="absolute top-12 right-12 text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 italic pointer-events-none">
          High-Fidelity Real-Time Engine
        </div>
      </section>
    </main>
  );
}