"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

/** 
 * UI INTEGRITY SIG: v1.0.5-FINAL-HARDENED
 * Wrapped in Suspense to resolve Next.js 15 build failure.
 */

const StealthAdminControls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'true';

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
      if (res.ok) alert('🚀 Agentic Cycle Started!');
      else alert('❌ Access Denied.');
    } catch (err) {
      alert('❌ Fatal Error.');
    } finally {
      setIsRunning(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <button 
      onClick={handleRun}
      disabled={isRunning}
      className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] mono transition-all border ${isRunning ? 'text-primary border-primary/20 animate-pulse bg-primary/5' : 'text-foreground/30 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5'}`}
    >
      {isRunning ? '[ Executing_Cycle ]' : '[ New_Scan ]'}
    </button>
  );
}

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.03]">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-4 group">
            <span className="text-sm font-black tracking-tighter uppercase whitespace-nowrap">
              NODAL <span className="text-primary italic">DIGITAL</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mono">
            <Link href="/" className="text-white hover:text-primary transition-colors">Home</Link>
            <Link href="/" className="hover:text-primary transition-colors">Intelligence Log</Link>
            <Link href="/agency" className="hover:text-primary transition-colors">Agency</Link>
            <Link href="/status" className="hover:text-primary transition-colors">System Pulse</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Suspense fallback={null}>
            <StealthAdminControls />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
