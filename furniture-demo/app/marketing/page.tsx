"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';


const getLocalAssets = (category: string, id: string) => [
  { label: 'Front', url: `/images/${category}/${id}/front_view.png` },
  { label: 'Side', url: `/images/${category}/${id}/side_view.png` },
  { label: 'Profile', url: `/images/${category}/${id}/profile_view.png` }
];

const PRODUCT_DATA: any = {
  // CHAIRS
  'c1': { name: 'Aero Chair', category: 'chairs', angles: getLocalAssets('chairs', 'chair_1') },
  'c2': { name: 'Mamt Shair', category: 'chairs', angles: getLocalAssets('chairs', 'chair_2') },
  'c3': { name: 'Nordic Stool', category: 'chairs', angles: getLocalAssets('chairs', 'chair_3') },

  // SOFAS
  's1': { name: 'Rero Sofa', category: 'sofa', angles: getLocalAssets('sofa', 'sofa_1') },
  's2': { name: 'Cloud Modular', category: 'sofa', angles: getLocalAssets('sofa', 'sofa_2') },

  // TABLES
  't1': { name: 'Geo Table', category: 'table', angles: getLocalAssets('table', 'table_1') },
  't2': { name: 'Apex Desk', category: 'table', angles: getLocalAssets('table', 'table_2') },

  // BEDS
  'b1': { name: 'Luna Platform', category: 'bed', angles: getLocalAssets('bed', 'bed_1') },
  'b2': { name: 'Velvet Haven', category: 'bed', angles: getLocalAssets('bed', 'bed_2') }
};

function MarketingContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'c1';
  const product = PRODUCT_DATA[id];
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white space-y-6">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-center">Asset Sequence<br/>Not Found</h2>
        <Link href="/inventory" className="px-8 py-3 bg-indigo-600 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">Return to Inventory</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-10 lg:p-20 space-y-16 animate-in fade-in duration-1000 font-sans">
      
      
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 lg:p-20 animate-in fade-in zoom-in-95 duration-300">
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-10 right-10 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white hover:text-black rounded-full text-white transition-all z-[110]"
          >
            <span className="text-2xl font-light">✕</span>
          </button>
          
          <div className="w-full h-full flex flex-col items-center justify-center" onClick={() => setLightboxImg(null)}>
            <img 
              src={lightboxImg} 
              className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(79,70,229,0.2)] rounded-2xl" 
              alt="High Resolution Asset" 
            />
            <p className="mt-8 text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">4K Studio Master View</p>
          </div>
        </div>
      )}

      
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-10 gap-6">
        <div className="space-y-2">
          <p className="text-indigo-500 font-black uppercase text-[9px] tracking-[0.6em] italic">Visual Asset Repository</p>
          <h1 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">{product.name}</h1>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Source</p>
            <p className="text-white font-mono text-sm font-bold uppercase tracking-tighter">Local Render</p>
          </div>
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Status</p>
            <p className="text-emerald-400 font-mono text-sm font-bold animate-pulse uppercase">Synced</p>
          </div>
        </div>
      </header>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {product.angles.map((angle: any, index: number) => (
          <div key={angle.label} className="group relative space-y-6">
            <div 
              className="aspect-[3/4] bg-[#111] rounded-[50px] overflow-hidden border border-white/5 transition-all cursor-zoom-in hover:border-indigo-500/50 hover:shadow-[0_0_60px_rgba(79,70,229,0.1)]"
              onClick={() => setLightboxImg(angle.url)}
            >
               <img 
                 src={angle.url} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out" 
                 alt={angle.label} 
                 
                 onError={(e:any) => e.target.src = 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800'} 
               />
               <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-indigo-500/50" />
                  <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em]">Angle 0{index + 1}</p>
               </div>
            </div>

            <div className="px-4 flex justify-between items-center">
              <div>
                <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter">{angle.label} View</h3>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-1 italic tracking-widest">Internal DB — PNG Asset</p>
              </div>
              <button 
                onClick={() => setLightboxImg(angle.url)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                ↗
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <footer className="pt-20 flex flex-col items-center gap-10 border-t border-white/5">
         <p className="text-slate-600 font-black text-[9px] uppercase tracking-[0.5em]">Inventory Synchronization</p>
         <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(PRODUCT_DATA).map((prodId) => (
               <Link 
                key={prodId} 
                href={`/marketing?id=${prodId}`} 
                className={`px-8 py-3 rounded-2xl border font-black uppercase text-[9px] tracking-widest transition-all ${id === prodId ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'text-slate-500 border-white/10 hover:border-indigo-500 hover:text-white'}`}
               >
                 {PRODUCT_DATA[prodId].name}
               </Link>
            ))}
         </div>
         <Link href="/inventory" className="text-slate-500 hover:text-indigo-400 font-black uppercase text-[10px] tracking-[0.4em] transition-all flex items-center gap-4">
           <span className="w-10 h-[1px] bg-slate-800" />
           Return to Fleet Dashboard
           <span className="w-10 h-[1px] bg-slate-800" />
         </Link>
      </footer>
    </div>
  );
}

export default function ThreeAngleDashboard() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-black italic uppercase tracking-[0.3em] text-white text-[10px]">Syncing Local Assets...</p>
        </div>
      </div>
    }>
      <MarketingContent />
    </Suspense>
  );
}