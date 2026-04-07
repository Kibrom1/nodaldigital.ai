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
    <header className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.03]">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-4 group">
            <span className="text-sm font-black tracking-tighter uppercase whitespace-nowrap">
              NODAL <span className="text-primary italic">DIGITAL</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">
            <Link href="/" className="text-white hover:text-primary transition-colors">Home</Link>
            <Link href="/" className="hover:text-primary transition-colors">Intelligence Log</Link>
            <Link href="/" className="hover:text-primary transition-colors opacity-50">Agency</Link>
            <Link href="/" className="hover:text-primary transition-colors opacity-50">System Pulse</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`text-[10px] font-black uppercase tracking-[0.3em] mono transition-all ${isRunning ? 'text-primary animate-pulse' : 'text-foreground/30 hover:text-white'}`}
          >
            {isRunning ? '[ Executing_Cycle ]' : '[ New_Scan ]'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
