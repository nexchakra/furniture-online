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

  const calculatePrice = (config: typeof leftConfig) => {
    let price = 52400;
    if (config.texture === 'leather') price += 5000;
    if (config.texture === 'wood') price += 2500;
    if (config.back === 'cross') price += 4500;
    if (config.arms === 'executive') price += 3500;
    return price;
  };

  const priceA = useMemo(() => calculatePrice(leftConfig), [leftConfig]);
  const priceB = useMemo(() => calculatePrice(rightConfig), [rightConfig]);

  const handleRotate = (direction: 'left' | 'right') => {
    const delta = direction === 'left' ? -0.5 : 0.5;
    if (syncRotation) setSharedRotation(prev => prev + delta);
    else setLeftRotation(prev => prev + delta);
  };

  // Simulated PDF download
  const downloadComparison = () => {
    alert("Generating Studio PDF Report...\nCapturing Renders and Price Points.");
  };

  return (
    <main className="h-screen w-full bg-[#f8f9fa] flex flex-col overflow-hidden font-sans relative">
      
      {/* 1. SELECTION FINALIZE POPUP */}
      {finalizePopup && (
        <div className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-[35px] shadow-2xl w-80 text-center space-y-4 scale-up-center border border-slate-100">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">✓</div>
            <h4 className="text-lg font-black uppercase tracking-tight">Variant Selected</h4>
            <p className="text-slate-500 text-xs font-bold leading-relaxed px-4">The configuration has been locked at <span className="text-slate-900 font-black italic">₹{finalizePopup.price.toLocaleString()}</span>.</p>
            <button onClick={() => setFinalizePopup(null)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">OK</button>
          </div>
        </div>
      )}

      {/* 2. SPEC TABLE OVERLAY */}
      {showSpecTable && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Comparison Logic</h3>
              <div className="flex gap-4">
                <button onClick={downloadComparison} className="px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">Download PDF</button>
                <button onClick={() => setShowSpecTable(false)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold hover:bg-rose-50 hover:text-rose-500 transition-colors">✕</button>
              </div>
            </div>
            <div className="p-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                    <th className="pb-4">Feature Set</th>
                    <th className="pb-4">Configuration A</th>
                    <th className="pb-4 text-rose-500 italic">Configuration B</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] font-bold text-slate-700">
                  <tr className="border-b border-slate-50"><td className="py-4 text-slate-400">Material Texture</td><td>{leftConfig.texture.toUpperCase()}</td><td>{rightConfig.texture.toUpperCase()}</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-4 text-slate-400">Architecture</td><td>{leftConfig.back.toUpperCase()}</td><td>{rightConfig.back.toUpperCase()}</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-4 text-slate-400">Total Valuation</td><td className="text-indigo-600 font-black italic">₹{priceA.toLocaleString()}</td><td className="text-rose-500 font-black italic">₹{priceB.toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. HEADER */}
      <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-12 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 transition-all shadow-sm"><span>←</span></Link>
          <div><h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">AB Studio</h1><p className="text-indigo-600 text-[9px] font-black uppercase tracking-[0.3em] mt-1">Comparison Engine Active</p></div>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
          <button onClick={() => setSyncRotation(!syncRotation)} className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${syncRotation ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400'}`}>{syncRotation ? '🔗 Rotation Synced' : '🔓 Independent View'}</button>
          <div className="flex gap-1 pr-2">
            <button onClick={() => handleRotate('left')} className="w-10 h-10 bg-white rounded-lg shadow-sm font-black hover:bg-indigo-50">⟲</button>
            <button onClick={() => handleRotate('right')} className="w-10 h-10 bg-white rounded-lg shadow-sm font-black hover:bg-indigo-50">⟳</button>
          </div>
        </div>
      </header>

      {/* 4. VIEWPORTS GRID */}
      <section className="flex-1 flex gap-[2px] bg-slate-100 relative">
        <div className="flex-1 bg-white relative group">
          <div className="absolute top-10 left-10 z-10 space-y-2 pointer-events-none">
            <span className="px-3 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-md shadow-lg shadow-indigo-100">Primary Build</span>
            <h2 className="text-3xl font-black italic text-slate-900 uppercase tracking-tighter">{leftConfig.texture} Series</h2>
          </div>
          <Viewer color={leftConfig.color} texture={leftConfig.texture} backStyle={leftConfig.back} armStyle={leftConfig.arms} zoom={5.5} rotation={syncRotation ? sharedRotation : leftRotation} showFloor={true} />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900 p-3 rounded-2xl shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-50">
             <select className="bg-white/10 text-white px-3 py-2 rounded-lg text-[9px] font-black uppercase outline-none cursor-pointer hover:bg-white/20" value={leftConfig.texture} onChange={(e) => setLeftConfig({...leftConfig, texture: e.target.value as any})}>
                <option value="leather" className="bg-slate-900">Leather</option>
                <option value="fabric" className="bg-slate-900">Fabric</option>
                <option value="wood" className="bg-slate-900">Wood</option>
             </select>
             <div className="flex gap-2 border-l pl-3 border-white/20">
                {PREMIUM_FINISHES.map(f => (
                  <button key={f.hex} onClick={() => setLeftConfig({...leftConfig, color: f.hex})} className={`w-5 h-5 rounded-full border-2 ${leftConfig.color === f.hex ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: f.hex }} />
                ))}
             </div>
          </div>
        </div>

        <div className="flex-1 bg-white relative group">
          <div className="absolute top-10 right-10 z-10 text-right space-y-2 pointer-events-none">
            <span className="px-3 py-1 bg-rose-500 text-white text-[8px] font-black uppercase rounded-md shadow-lg shadow-rose-100">Alternative</span>
            <h2 className="text-3xl font-black italic text-slate-900 uppercase tracking-tighter">{rightConfig.back} Spec</h2>
          </div>
          <Viewer color={rightConfig.color} texture={rightConfig.texture} backStyle={rightConfig.back} armStyle={rightConfig.arms} zoom={5.5} rotation={syncRotation ? sharedRotation : rightRotation} showFloor={true} />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900 p-3 rounded-2xl shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-50">
             <select className="bg-white/10 text-white px-3 py-2 rounded-lg text-[9px] font-black uppercase outline-none cursor-pointer hover:bg-white/20" value={rightConfig.back} onChange={(e) => setRightConfig({...rightConfig, back: e.target.value as any})}>
                <option value="classic" className="bg-slate-900">Classic</option>
                <option value="cross" className="bg-slate-900">Cross</option>
                <option value="ergonomic" className="bg-slate-900">Ergonomic</option>
             </select>
             <div className="flex gap-2 border-l pl-3 border-white/20">
                {PREMIUM_FINISHES.map(f => (
                  <button key={f.hex} onClick={() => setRightConfig({...rightConfig, color: f.hex})} className={`w-5 h-5 rounded-full border-2 ${rightConfig.color === f.hex ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: f.hex }} />
                ))}
             </div>
          </div>
        </div>

        <button onClick={() => setShowSpecTable(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group hover:scale-110 transition-transform"><div className="w-16 h-16 bg-slate-900 text-white rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white group-hover:bg-indigo-600 transition-colors"><span className="font-black italic text-xs leading-none">VS</span><span className="text-[6px] font-black uppercase tracking-widest mt-1 opacity-60">Spec</span></div></button>
      </section>

      {/* 5. FOOTER */}
      <footer className="h-36 bg-white border-t border-slate-200 grid grid-cols-2 px-12 divide-x divide-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pr-10">
          <div className="space-y-1"><p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Pricing A</p><span className="text-4xl font-black italic text-slate-900 tracking-tighter">₹{priceA.toLocaleString()}</span></div>
          <button onClick={() => setFinalizePopup({show: true, price: priceA})} className="bg-indigo-600 text-white py-4 px-8 rounded-2xl font-black text-[10px] uppercase hover:bg-slate-900 transition-all shadow-lg">Finalize Variant A</button>
        </div>
        <div className="flex items-center justify-between pl-10">
          <div className="space-y-1 text-right lg:text-left"><p className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Pricing B</p><span className="text-4xl font-black italic text-slate-900 tracking-tighter">₹{priceB.toLocaleString()}</span></div>
          <button onClick={() => setFinalizePopup({show: true, price: priceB})} className="border-2 border-slate-900 text-slate-900 py-4 px-8 rounded-2xl font-black text-[10px] uppercase hover:bg-slate-900 hover:text-white transition-all">Finalize Variant B</button>
        </div>
      </footer>
    </main>
  );
}