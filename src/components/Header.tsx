"use client";

import React from 'react';
import Link from 'next/link';
import { Cpu, Zap, Search, Bell } from 'lucide-react';

const Header = () => {
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
          <Link href="/" className="hover:text-primary transition-colors">Daily Cycle</Link>
          <Link href="/archive" className="hover:text-primary transition-colors">Archive</Link>
          <Link href="/analytics" className="hover:text-primary transition-colors">Analytics</Link>
          <Link href="/settings" className="hover:text-primary transition-colors">Agent Config</Link>
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
          <button className="button-secondary bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-white/10 transition-all">
            <Zap size={16} className="text-yellow-400" />
            <span className="hidden sm:inline">Run Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
