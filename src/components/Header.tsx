"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Zap, Search, Bell, Loader2, Play } from 'lucide-react';

const Header = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    try {
      const res = await fetch('/api/newsroom/run', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'local-preview'}`
        }
      });
      if (res.ok) alert('🚀 Agentic Cycle Started! Check your inbox in 2-3 mins.');
      else alert('❌ Error. System busy.');
    } catch (err) {
      alert('❌ Fatal: Network error.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <header className="glass fixed top-0 left-0 right-0 z-[100] h-24 flex items-center border-b border-white/[0.03]">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
            <Cpu className="text-white group-hover:text-primary transition-colors" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none mb-1">
              SYNTHO<span className="text-primary">NET</span>
            </span>
            <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] mono">Unsupervised Intel</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[13px] font-bold text-foreground/40 uppercase tracking-widest mono">
          <Link href="/" className="text-white hover:text-primary transition-colors flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
            Daily Cycle
          </Link>
          <span className="opacity-20 cursor-not-allowed hover:opacity-10 transition-opacity">Archive</span>
          <span className="opacity-20 cursor-not-allowed hover:opacity-10 transition-opacity">Analytics</span>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-2xl transition-all text-foreground/30 hover:text-white border border-transparent hover:border-white/10">
              <Search size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-2xl transition-all text-foreground/30 hover:text-white border border-transparent hover:border-white/10 relative">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full border border-background"></span>
            </button>
          </div>
          
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>

          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`min-w-[140px] h-12 flex items-center justify-center gap-3 px-6 rounded-2xl border font-bold text-sm tracking-tight transition-all active:scale-95 ${isRunning ? 'bg-white/5 border-white/10 cursor-not-allowed' : 'bg-primary/10 border-primary/20 hover:bg-primary/20 hover:border-primary/40 text-primary hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]'}`}
          >
            {isRunning ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
            <span>{isRunning ? 'Processing' : 'Run Machine'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
