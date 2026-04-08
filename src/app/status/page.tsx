import Header from '@/components/Header';
import { 
  Zap, 
  Activity, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Database,
  BarChart3,
  Server
} from 'lucide-react';

export default function StatusPage() {
  return (
    <div className="min-h-screen pt-32 pb-40">
      <Header />
      
      <main className="container animate-fade max-w-5xl">
        <header className="mb-24">
          <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.3em] mono mb-8">
            <Zap size={12} className="fill-current" /> [ System_Pulse ]
          </div>
          <h1 className="text-6xl font-black tracking-tight leading-[0.9] text-white underline mb-8 italic">
            Global_Status.
          </h1>
          <p className="text-xl text-foreground/40 leading-relaxed font-medium max-w-2xl">
            Real-time verification of the autonomous news machine. Monitoring across 50,000+ domain nodes and neural synthesis loops.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           <StatusCard label="Total Scans" val="12.4k" sub="Last 24h" icon={Globe} />
           <StatusCard label="High-Signal Ratio" val="0.82%" sub="Verified Alerts" icon={Zap} />
           <StatusCard label="Neural Confidence" val="99.4%" sub="Aggregation Level" icon={ShieldCheck} />
        </div>

        <div className="space-y-12">
           <h4 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.5em] mb-10 mono">[ Active_Loop_Logs ]</h4>
           
           <div className="p-10 rounded-[2.5rem] bg-white/[0.015] border border-white/5 space-y-10 group relative">
              <div className="absolute top-10 right-10 flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </div>
              <div className="space-y-10">
                 <LogItem label="Domain Retrieval" status="Active" icon={Server} />
                 <LogItem label="Semantic Filtering" status="IDLE" icon={Activity} />
                 <LogItem label="Knowledge Base Sync" status="Active" icon={Database} />
              </div>
           </div>
        </div>

        <div className="separator" />

        <div className="p-1 px-4 space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[10px] font-bold text-foreground/40 uppercase mono tracking-[0.2em]">Ready_For_Deployment</span>
           </div>
           <p className="text-[11px] leading-relaxed text-foreground/20 font-medium italic">
             All systems report operational. Agent scouts are currently synchronized with the global AI knowledge base.
           </p>
        </div>
      </main>
    </div>
  );
}

function StatusCard({ label, val, sub, icon: Icon }: { label: string, val: string, sub: string, icon: any }) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-white/[0.015] border border-white/5 space-y-6 group hover:border-primary/40 transition-colors">
       <div className="flex items-center justify-between">
          <Icon size={16} className="text-foreground/20 group-hover:text-primary transition-colors duration-500" />
          <span className="text-[9px] font-black text-foreground/10 uppercase tracking-[0.2em] mono">{sub}</span>
       </div>
       <div className="space-y-1">
          <div className="text-[11px] font-bold text-foreground/40 uppercase tracking-widest mono">{label}</div>
          <div className="text-4xl font-black text-white leading-none">{val}</div>
       </div>
    </div>
  );
}

function LogItem({ label, status, icon: Icon }: { label: string, status: string, icon: any }) {
  return (
    <div className="flex items-center justify-between pb-8 border-b border-white/[0.03] last:border-0 last:pb-0">
       <div className="flex items-center gap-5">
          <Icon size={20} className="text-primary/40 group-hover:text-primary transition-colors" />
          <h4 className="text-xl font-bold tracking-tight">{label}</h4>
       </div>
       <span className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">{status}</span>
    </div>
  );
}
