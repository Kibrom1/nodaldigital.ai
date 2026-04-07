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
    <header className="fixed top-0 left-0 right-0 z-[100] h-20 flex items-center bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.03]">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tighter leading-none mb-1">
              NODAL<span className="text-primary italic">DIGITAL</span>
            </span>
            <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em] mono">Intelligence Core</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[11px] font-bold text-foreground/30 uppercase tracking-[0.2em] mono">
          <Link href="/" className="text-white hover:text-primary transition-colors">Daily Cycle</Link>
          <span className="opacity-10 cursor-not-allowed">Archive</span>
          <span className="opacity-10 cursor-not-allowed">Status</span>
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`text-[11px] font-bold uppercase tracking-[0.2em] mono transition-all ${isRunning ? 'text-primary animate-pulse' : 'text-foreground/40 hover:text-white'}`}
          >
            {isRunning ? '[ System_Sync ]' : '[ Run_Machine ]'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
