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
      
      {/* 1. SELECTION FINALIZE POPUP - Compacted text */}
      {finalizePopup && (
        <div className="fixed inset-0 z-[120] bg-slate-900/40 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[35px] shadow-2xl w-80 text-center space-y-4 border border-white/20 animate-in zoom-in-95">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner text-sm">✓</div>
            <div>
               <h4 className="text-base font-black uppercase tracking-tight text-slate-900">Build Confirmed</h4>
               <p className="text-slate-500 text-[10px] font-bold mt-1 leading-relaxed italic">
                 Locked at <span className="text-indigo-600 font-black not-italic">₹{finalizePopup.price.toLocaleString()}</span>
               </p>
            </div>
            <button 
              type="button"
              onClick={() => setFinalizePopup(null)} 
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* 2. SPEC TABLE OVERLAY */}
      {showSpecTable && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-black uppercase tracking-tighter italic text-slate-900">Comparison Logic</h3>
              <div className="flex gap-3">
                <button type="button" onClick={downloadComparison} className="px-5 py-2 bg-indigo-600 text-white rounded-full font-black text-[8px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-md">Export PDF</button>
                <button type="button" title="Close Technical View" onClick={() => setShowSpecTable(false)} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center font-bold hover:bg-rose-50 hover:text-rose-500 transition-colors border border-slate-100">✕</button>
              </div>
            </div>
            <div className="p-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                    <th className="pb-4">Feature Matrix</th>
                    <th className="pb-4">Config A</th>
                    <th className="pb-4 text-rose-500">Config B</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] font-bold text-slate-700">
                  <tr className="border-b border-slate-50"><td className="py-4 text-slate-400 uppercase text-[9px]">Material</td><td>{leftConfig.texture.toUpperCase()}</td><td>{rightConfig.texture.toUpperCase()}</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-4 text-slate-400 uppercase text-[9px]">Backrest</td><td>{leftConfig.back.toUpperCase()}</td><td>{rightConfig.back.toUpperCase()}</td></tr>
                  <tr><td className="py-4 text-slate-400 uppercase text-[9px]">Valuation</td><td className="text-indigo-600 font-black italic text-base">₹{priceA.toLocaleString()}</td><td className="text-rose-500 font-black italic text-base">₹{priceB.toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. HEADER - Compacted from h-24 to h-16 */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 transition-all border border-slate-100 text-sm">←</Link>
          <div>
            <h1 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 leading-none">AB Studio</h1>
            <p className="text-indigo-600 text-[8px] font-black uppercase tracking-[0.4em] mt-0.5">Engine Active</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100 shadow-inner">
          <button type="button" onClick={() => setSyncRotation(!syncRotation)} className={`px-5 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${syncRotation ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200'}`}>
            {syncRotation ? '🔗 Synced' : '🔓 Free'}
          </button>
          <div className="flex gap-1 pr-1">
            <button type="button" title="Rotate left" onClick={() => handleRotate('left')} className="w-9 h-9 bg-white rounded-lg shadow-sm font-black hover:bg-indigo-50 border border-slate-100 active:scale-90 transition-transform">⟲</button>
            <button type="button" title="Rotate right" onClick={() => handleRotate('right')} className="w-9 h-9 bg-white rounded-lg shadow-sm font-black hover:bg-indigo-50 border border-slate-100 active:scale-90 transition-transform">⟳</button>
          </div>
        </div>
      </header>

      {/* 4. VIEWPORTS GRID - Compact titles */}
      <section className="flex-1 flex gap-[1px] bg-slate-200 relative shadow-inner">
        <div className="flex-1 bg-white relative group">
          <div className="absolute top-6 left-6 z-10 space-y-1 pointer-events-none">
            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[7px] font-black uppercase rounded shadow-md">Config A</span>
            <h2 className="text-xl font-black italic text-slate-900 uppercase tracking-tighter">{leftConfig.texture}</h2>
          </div>
          <Viewer color={leftConfig.color} texture={leftConfig.texture} backStyle={leftConfig.back} armStyle={leftConfig.arms} zoom={5.5} rotation={syncRotation ? sharedRotation : leftRotation} showFloor={true} />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-50">
             <select 
               title="Texture A"
               className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase outline-none cursor-pointer border border-white/5"
               value={leftConfig.texture}
               onChange={(e) => setLeftConfig({...leftConfig, texture: e.target.value as any})}
             >
                <option value="leather" className="bg-slate-900">Leather</option>
                <option value="fabric" className="bg-slate-900">Fabric</option>
                <option value="wood" className="bg-slate-900">Wood</option>
             </select>
             <div className="flex gap-2 border-l pl-3 border-white/20">
                {PREMIUM_FINISHES.map(f => (
                  <button type="button" key={f.hex} title={`Color ${f.name}`} onClick={() => setLeftConfig({...leftConfig, color: f.hex})} className={`w-6 h-6 rounded-full border-2 transition-all ${leftConfig.color === f.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`} style={{ backgroundColor: f.hex }} />
                ))}
             </div>
          </div>
        </div>

        <div className="flex-1 bg-white relative group">
          <div className="absolute top-6 right-6 z-10 text-right space-y-1 pointer-events-none">
            <span className="px-2 py-0.5 bg-rose-500 text-white text-[7px] font-black uppercase rounded shadow-md">Config B</span>
            <h2 className="text-xl font-black italic text-slate-900 uppercase tracking-tighter">{rightConfig.back}</h2>
          </div>
          <Viewer color={rightConfig.color} texture={rightConfig.texture} backStyle={rightConfig.back} armStyle={rightConfig.arms} zoom={5.5} rotation={syncRotation ? sharedRotation : rightRotation} showFloor={true} />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-50">
             <select 
               title="Backrest B"
               className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase outline-none cursor-pointer border border-white/5"
               value={rightConfig.back}
               onChange={(e) => setRightConfig({...rightConfig, back: e.target.value as any})}
             >
                <option value="classic" className="bg-slate-900">Classic</option>
                <option value="cross" className="bg-slate-900">Cross</option>
                <option value="ergonomic" className="bg-slate-900">Ergo</option>
             </select>
             <div className="flex gap-2 border-l pl-3 border-white/20">
                {PREMIUM_FINISHES.map(f => (
                  <button type="button" key={f.hex} title={`Color ${f.name}`} onClick={() => setRightConfig({...rightConfig, color: f.hex})} className={`w-6 h-6 rounded-full border-2 transition-all ${rightConfig.color === f.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`} style={{ backgroundColor: f.hex }} />
                ))}
             </div>
          </div>
        </div>

        {/* VS Badge - Reduced size */}
        <button type="button" title="View Logic" onClick={() => setShowSpecTable(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group hover:scale-110 transition-transform"><div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white group-hover:bg-indigo-600 transition-colors font-black italic text-xs">VS</div></button>
      </section>

      {/* 5. FOOTER - Reduced height from h-40 to h-24 */}
      <footer className="h-24 bg-white border-t border-slate-200 grid grid-cols-2 px-8 divide-x divide-slate-100 shadow-2xl z-20">
        <div className="flex items-center justify-between pr-8">
          <div className="space-y-0.5">
            <p className="text-[9px] font-black uppercase text-indigo-600 tracking-widest">Market Value A</p>
            <span className="text-2xl font-black italic text-slate-900 tracking-tighter leading-none">₹{priceA.toLocaleString()}</span>
          </div>
          <button type="button" onClick={() => setFinalizePopup({show: true, price: priceA})} className="bg-indigo-600 text-white py-3 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-md active:scale-95">Select A</button>
        </div>
        <div className="flex items-center justify-between pl-8">
          <div className="space-y-0.5 text-right lg:text-left">
            <p className="text-[9px] font-black uppercase text-rose-500 tracking-widest">Market Value B</p>
            <span className="text-2xl font-black italic text-slate-900 tracking-tighter leading-none">₹{priceB.toLocaleString()}</span>
          </div>
          <button type="button" onClick={() => setFinalizePopup({show: true, price: priceB})} className="border-2 border-slate-900 text-slate-900 py-3 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95">Select B</button>
        </div>
      </footer>
    </main>
  );
}