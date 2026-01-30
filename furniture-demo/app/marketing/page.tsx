"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';

// Refined high-fidelity asset data with consistent views
const PRODUCT_DATA: any = {
  'aero-chair': {
    name: 'Aero Chair',
    angles: [
      { label: 'Front', url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200' },
      { label: 'Side', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200' },
      { label: 'Detail', url: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1200' }
    ]
  },
  'geo-sofa': {
    name: 'Geo Sofa',
    angles: [
      { label: 'Front', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200' },
      { label: 'Side', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200' },
      { label: 'Detail', url: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=1200' }
    ]
  },
  'v-table': {
    name: 'V-Series Table',
    angles: [
      { label: 'Front', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200' },
      { label: 'Side', url: 'https://images.unsplash.com/photo-1615064646637-d3ef0c7175ad?q=80&w=1200' },
      { label: 'Detail', url: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1200' }
    ]
  },
  'zen-bed': {
    name: 'Zen Platform Bed',
    angles: [
      { label: 'Front', url: 'https://images.unsplash.com/photo-1505693419148-ad30b3a4eb33?q=80&w=1200' },
      { label: 'Side', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200' },
      { label: 'Detail', url: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=1200' }
    ]
  }
};

function MarketingContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'aero-chair';
  const product = PRODUCT_DATA[id];
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white space-y-6">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Asset Pipe Broken</h2>
        <Link href="/inventory" className="px-8 py-3 bg-indigo-600 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-10 lg:p-20 space-y-16 animate-in fade-in duration-1000 font-sans">
      
      {/* 1. LIGHTBOX WITH CLOSE FUNCTION */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 lg:p-20 animate-in fade-in zoom-in-95 duration-300">
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white hover:text-black rounded-full text-white transition-all z-[110]"
            aria-label="Close Lightbox"
          >
            <span className="text-2xl font-light">✕</span>
          </button>
          
          <div className="w-full h-full flex flex-col items-center justify-center" onClick={() => setLightboxImg(null)}>
            <img 
              src={lightboxImg} 
              className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-2xl" 
              alt="High Resolution Asset" 
            />
            <p className="mt-8 text-slate-500 font-black text-[10px] uppercase tracking-[0.5em]">Click anywhere to exit view</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-10 gap-6">
        <div className="space-y-2">
          <p className="text-indigo-500 font-black uppercase text-[9px] tracking-[0.6em] italic">Premium Visual Engine</p>
          <h1 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">{product.name}</h1>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Standard</p>
            <p className="text-white font-mono text-sm font-bold">4K PRO-RES</p>
          </div>
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Status</p>
            <p className="text-emerald-400 font-mono text-sm font-bold animate-pulse">VERIFIED</p>
          </div>
        </div>
      </header>

      {/* 2. ASSET GRID WITH DIVERSE VIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {product.angles.map((angle: any, index: number) => (
          <div key={angle.label} className="group relative space-y-6">
            <div 
              className="aspect-[3/4] bg-[#111] rounded-[50px] overflow-hidden border border-white/5 transition-all cursor-zoom-in hover:border-indigo-500/50 hover:shadow-[0_0_60px_rgba(79,70,229,0.1)]"
              onClick={() => setLightboxImg(angle.url)}
            >
               <img 
                 src={angle.url} 
                 className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" 
                 alt={angle.label} 
                 onError={(e:any) => e.target.src = 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800'} 
               />
               <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-white/20" />
                  <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em]">Angle 0{index + 1}</p>
               </div>
            </div>

            <div className="px-4 flex justify-between items-center">
              <div>
                <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter">{angle.label} View</h3>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-1 italic">Studio Capture — 300 DPI</p>
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

      {/* 3. NAVIGATION FOOTER */}
      <footer className="pt-20 flex flex-col items-center gap-10 border-t border-white/5">
         <p className="text-slate-600 font-black text-[9px] uppercase tracking-[0.5em]">Switch Visual Database</p>
         <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(PRODUCT_DATA).map((prodId) => (
               <Link 
                key={prodId} 
                href={`/marketing?id=${prodId}`} 
                className={`px-8 py-3 rounded-2xl border font-black uppercase text-[9px] tracking-widest transition-all ${id === prodId ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'text-slate-500 border-white/10 hover:border-indigo-500 hover:text-white'}`}
               >
                 {prodId.replace('-', ' ')}
               </Link>
            ))}
         </div>
         <Link href="/inventory" className="text-slate-500 hover:text-indigo-400 font-black uppercase text-[10px] tracking-[0.4em] transition-all flex items-center gap-4">
           <span className="w-10 h-[1px] bg-slate-800" />
           Back to Fleet Dashboard
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
          <p className="font-black italic uppercase tracking-[0.3em] text-white text-[10px]">Loading Marketing Assets</p>
        </div>
      </div>
    }>
      <MarketingContent />
    </Suspense>
  );
}