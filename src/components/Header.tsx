"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Zap, Search, Bell, Loader2 } from 'lucide-react';

const Header = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    try {
      // Note: In production, this would require a Bearer token if we kept the CRON_SECRET check
      // For this user-facing button, we might want a different auth or a bypass for authenticated users
      const res = await fetch('/api/newsroom/run', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'local-preview'}`
        }
      });
      
      if (res.ok) {
        alert('🚀 Agentic Cycle Started! Check the GitHub repo in 2-3 minutes for new posts.');
      } else {
        alert('❌ Failed to trigger agent. Check Vercel logs.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Network error triggering agent.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <header className="glass fixed top-0 left-0 right-0 z-50 h-20 flex items-center border-b border-white/5">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
            <Cpu className="text-primary" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            SYNTHO<span className="text-primary">NET</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
          <Link href="/" className="hover:text-primary transition-colors text-white font-bold">Daily Cycle</Link>
          <span className="opacity-30 cursor-not-allowed">Archive</span>
          <span className="opacity-30 cursor-not-allowed">Analytics</span>
          <span className="opacity-30 cursor-not-allowed">Agent Config</span>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-foreground/50 hover:text-white">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-foreground/50 hover:text-white relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
          </button>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={`button-secondary bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-white/10 transition-all ${isRunning ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isRunning ? (
              <Loader2 size={16} className="animate-spin text-primary" />
            ) : (
              <Zap size={16} className="text-yellow-400" />
            )}
            <span className="hidden sm:inline">{isRunning ? 'Agent Working...' : 'Run Now'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
