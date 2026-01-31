"use client";

import { useState, useMemo } from 'react';
import Viewer from '@/components/canvas/Viewer';
import Link from 'next/link';

const PREMIUM_FINISHES = [
  { hex: '#0f172a', name: 'Obsidian' },
  { hex: '#1e40af', name: 'Royal Blue' },
  { hex: '#78350f', name: 'Sienna' },
];

export default function ComparisonPage() {
  const [syncRotation, setSyncRotation] = useState(true);
  const [sharedRotation, setSharedRotation] = useState(0);
  const [leftRotation, setLeftRotation] = useState(0);
  const [rightRotation, setRightRotation] = useState(0);
  const [showSpecTable, setShowSpecTable] = useState(false);
  const [finalizePopup, setFinalizePopup] = useState<{show: boolean, price: number} | null>(null);

  const [leftConfig, setLeftConfig] = useState({
    color: PREMIUM_FINISHES[0].hex,
    texture: 'leather' as const,
    back: 'classic' as const,
    arms: 'modern' as const,
  });

  const [rightConfig, setRightConfig] = useState({
    color: PREMIUM_FINISHES[1].hex,
    texture: 'fabric' as const,
    back: 'ergonomic' as const,
    arms: 'executive' as const,
  });

  const calculatePrice = (config: any) => {
    let price = 52400;
    if (String(config.texture) === 'leather') price += 5000;
    if (String(config.texture) === 'wood') price += 2500;
    if (String(config.back) === 'cross') price += 4500;
    if (String(config.arms) === 'executive') price += 3500;
    return price;
  };

  const priceA = useMemo(() => calculatePrice(leftConfig), [leftConfig]);
  const priceB = useMemo(() => calculatePrice(rightConfig), [rightConfig]);

  const handleRotate = (direction: 'left' | 'right') => {
    const delta = direction === 'left' ? -0.5 : 0.5;
    if (syncRotation) setSharedRotation(prev => prev + delta);
    else setLeftRotation(prev => prev + delta);
  };

  const downloadComparison = () => {
    alert("Generating High-Res Comparison Report...\nCapturing 4K Renders and Pricing Metadata.");
  };

  return (
    <main className="h-screen w-full bg-[#f8f9fa] flex flex-col overflow-hidden font-sans relative">
      
      {/* 1. SELECTION FINALIZE POPUP */}
      {finalizePopup && (
        <div className="fixed inset-0 z-[120] bg-slate-900/40 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-10 rounded-[45px] shadow-2xl w-96 text-center space-y-6 border border-white/20 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner text-xl">✓</div>
            <div>
               <h4 className="text-xl font-black uppercase tracking-tight text-slate-900">Build Confirmed</h4>
               <p className="text-slate-500 text-[11px] font-bold mt-2 leading-relaxed italic">
                 Selected variant successfully locked at <span className="text-indigo-600 font-black not-italic">₹{finalizePopup.price.toLocaleString()}</span>
               </p>
            </div>
            <button 
              type="button" // Fix: Added button type
              onClick={() => setFinalizePopup(null)} 
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}

      {/* 2. SPEC TABLE OVERLAY */}
      {showSpecTable && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black uppercase tracking-tighter italic text-slate-900">Comparison Logic</h3>
              <div className="flex gap-3">
                <button type="button" onClick={downloadComparison} className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-md">Export PDF</button>
                <button type="button" title="Close Technical View" onClick={() => setShowSpecTable(false)} className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center font-bold hover:bg-rose-50 hover:text-rose-500 transition-colors border border-slate-100">✕</button>
              </div>
            </div>
            <div className="p-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                    <th className="pb-5">Feature Matrix</th>
                    <th className="pb-5">Config A</th>
                    <th className="pb-5 text-rose-500">Config B</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] font-bold text-slate-700">
                  <tr className="border-b border-slate-50"><td className="py-5 text-slate-400 font-black uppercase text-[10px]">Material</td><td>{leftConfig.texture.toUpperCase()}</td><td>{rightConfig.texture.toUpperCase()}</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-5 text-slate-400 font-black uppercase text-[10px]">Backrest</td><td>{leftConfig.back.toUpperCase()}</td><td>{rightConfig.back.toUpperCase()}</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-5 text-slate-400 font-black uppercase text-[10px]">Arm Support</td><td>{leftConfig.arms.toUpperCase()}</td><td>{rightConfig.arms.toUpperCase()}</td></tr>
                  <tr><td className="py-5 text-slate-400 font-black uppercase text-[10px]">Valuation</td><td className="text-indigo-600 font-black italic text-lg">₹{priceA.toLocaleString()}</td><td className="text-rose-500 font-black italic text-lg">₹{priceB.toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. HEADER */}
      <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-12 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 transition-all shadow-sm border border-slate-100 text-xl font-light">←</Link>
          <div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">AB Studio</h1>
            <p className="text-indigo-600 text-[9px] font-black uppercase tracking-[0.4em] mt-1">Comparison Engine Active</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 shadow-inner">
          <button type="button" onClick={() => setSyncRotation(!syncRotation)} className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${syncRotation ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-200'}`}>
            {syncRotation ? '🔗 Rotation Synced' : '🔓 Independent View'}
          </button>
          <div className="flex gap-1.5 pr-2">
            <button type="button" title="Rotate Counter-Clockwise" onClick={() => handleRotate('left')} className="w-11 h-11 bg-white rounded-xl shadow-sm font-black hover:bg-indigo-50 border border-slate-100 active:scale-90 transition-transform">⟲</button>
            <button type="button" title="Rotate Clockwise" onClick={() => handleRotate('right')} className="w-11 h-11 bg-white rounded-xl shadow-sm font-black hover:bg-indigo-50 border border-slate-100 active:scale-90 transition-transform">⟳</button>
          </div>
        </div>
      </header>

      {/* 4. VIEWPORTS GRID */}
      <section className="flex-1 flex gap-[2px] bg-slate-200 relative shadow-inner">
        {/* VIEWPORT A */}
        <div className="flex-1 bg-white relative group">
          <div className="absolute top-10 left-10 z-10 space-y-2 pointer-events-none">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-[9px] font-black uppercase rounded-lg shadow-xl">Configuration A</span>
            <h2 className="text-4xl font-black italic text-slate-900 uppercase tracking-tighter">{leftConfig.texture} Pro</h2>
          </div>
          <Viewer color={leftConfig.color} texture={leftConfig.texture} backStyle={leftConfig.back} armStyle={leftConfig.arms} zoom={5.5} rotation={syncRotation ? sharedRotation : leftRotation} showFloor={true} />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/90 backdrop-blur-xl p-4 rounded-[25px] shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-50">
             <select 
               title="Material Type Selection A" // Fix: Discernible label
               className="bg-white/10 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase outline-none cursor-pointer hover:bg-white/20 transition-all border border-white/5"
               value={leftConfig.texture}
               onChange={(e) => setLeftConfig({...leftConfig, texture: e.target.value as any})}
             >
                <option value="leather" className="bg-slate-900">Premium Leather</option>
                <option value="fabric" className="bg-slate-900">Woven Fabric</option>
                <option value="wood" className="bg-slate-900">Solid Oak</option>
             </select>
             <div className="flex gap-2.5 border-l pl-4 border-white/20">
                {PREMIUM_FINISHES.map(f => (
                  <button 
                    type="button" // Fix: Added button type
                    key={f.hex} 
                    title={`Set color to ${f.name}`} // Fix: Discernible text
                    onClick={() => setLeftConfig({...leftConfig, color: f.hex})} 
                    className={`w-7 h-7 rounded-full border-2 transition-all ${leftConfig.color === f.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`} 
                    style={{ backgroundColor: f.hex }} 
                  />
                ))}
             </div>
          </div>
        </div>

        {/* VIEWPORT B */}
        <div className="flex-1 bg-white relative group">
          <div className="absolute top-10 right-10 z-10 text-right space-y-2 pointer-events-none">
            <span className="px-4 py-1.5 bg-rose-500 text-white text-[9px] font-black uppercase rounded-lg shadow-xl">Configuration B</span>
            <h2 className="text-4xl font-black italic text-slate-900 uppercase tracking-tighter">{rightConfig.back} Core</h2>
          </div>
          <Viewer color={rightConfig.color} texture={rightConfig.texture} backStyle={rightConfig.back} armStyle={rightConfig.arms} zoom={5.5} rotation={syncRotation ? sharedRotation : rightRotation} showFloor={true} />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/90 backdrop-blur-xl p-4 rounded-[25px] shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-50">
             <select 
               title="Backrest Design Selection B"
               className="bg-white/10 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase outline-none cursor-pointer hover:bg-white/20 border border-white/5"
               value={rightConfig.back}
               onChange={(e) => setRightConfig({...rightConfig, back: e.target.value as any})}
             >
                <option value="classic" className="bg-slate-900">Classic Mesh</option>
                <option value="cross" className="bg-slate-900">Artisan Cross</option>
                <option value="ergonomic" className="bg-slate-900">Ergo Shell</option>
             </select>
             <div className="flex gap-2.5 border-l pl-4 border-white/20">
                {PREMIUM_FINISHES.map(f => (
                  <button 
                    type="button"
                    key={f.hex} 
                    title={`Set color to ${f.name}`}
                    onClick={() => setRightConfig({...rightConfig, color: f.hex})} 
                    className={`w-7 h-7 rounded-full border-2 transition-all ${rightConfig.color === f.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`} 
                    style={{ backgroundColor: f.hex }} 
                  />
                ))}
             </div>
          </div>
        </div>

        <button type="button" title="View Technical Comparison Table" onClick={() => setShowSpecTable(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group hover:scale-110 transition-transform"><div className="w-20 h-20 bg-slate-900 text-white rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white group-hover:bg-indigo-600 transition-colors"><span className="font-black italic text-sm leading-none">VS</span><span className="text-[7px] font-black uppercase tracking-[0.2em] mt-1.5 opacity-60">Logic</span></div></button>
      </section>

      {/* 5. FOOTER */}
      <footer className="h-40 bg-white border-t border-slate-200 grid grid-cols-2 px-12 divide-x divide-slate-100 shadow-2xl z-20">
        <div className="flex items-center justify-between pr-10">
          <div className="space-y-1.5"><p className="text-[11px] font-black uppercase text-indigo-600 tracking-widest">Market Value A</p><span className="text-5xl font-black italic text-slate-900 tracking-tighter leading-none">₹{priceA.toLocaleString()}</span></div>
          <button type="button" onClick={() => setFinalizePopup({show: true, price: priceA})} className="bg-indigo-600 text-white py-5 px-10 rounded-[20px] font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95">Finalize Variant A</button>
        </div>
        <div className="flex items-center justify-between pl-10">
          <div className="space-y-1.5 text-right lg:text-left"><p className="text-[11px] font-black uppercase text-rose-500 tracking-widest">Market Value B</p><span className="text-5xl font-black italic text-slate-900 tracking-tighter leading-none">₹{priceB.toLocaleString()}</span></div>
          <button type="button" onClick={() => setFinalizePopup({show: true, price: priceB})} className="border-2 border-slate-900 text-slate-900 py-5 px-10 rounded-[20px] font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95">Finalize Variant B</button>
        </div>
      </footer>
    </main>
  );
}