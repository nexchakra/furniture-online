"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: '3D Studio', path: '/', icon: '🏗️' },
  { label: 'Inventory', path: '/inventory', icon: '📦' },
  { label: 'Visual Assets', path: '/marketing', icon: '📸' },
  { label: 'Comparison', path: '/comparison', icon: '⚖️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-24 lg:w-72 bg-white border-r border-slate-100 flex flex-col h-screen transition-all duration-500 z-50">
      {/* Branding */}
      <div className="p-10 mb-6">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-14 h-14 bg-slate-900 rounded-[20px] flex items-center justify-center text-white font-black italic text-2xl shadow-2xl group-hover:bg-indigo-600 transition-colors duration-500">
            F
          </div>
          <div className="hidden lg:block">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">Furniture</p>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">Terminal V1</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-5 px-6 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all duration-500 group ${
                isActive 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 translate-x-2' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`text-xl transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="hidden lg:block whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="p-8 mt-auto">
        <div className="bg-slate-50 p-6 rounded-[30px] border border-slate-100 shadow-inner">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Engine Status</p>
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 italic">Live Studio</span>
          </div>
        </div>
      </div>
    </aside>
  );
}