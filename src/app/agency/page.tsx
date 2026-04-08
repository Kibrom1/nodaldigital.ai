import Header from '@/components/Header';
import { 
  Activity, 
  Cpu, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  Lock, 
  Database,
  Search,
  PenTool,
  GitBranch
} from 'lucide-react';

export default function AgencyPage() {
  return (
    <div className="min-h-screen pt-32 pb-40">
      <Header />
      
      <main className="container animate-fade max-w-5xl">
        <header className="mb-32">
          <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.3em] mono mb-8">
            <Zap size={12} className="fill-current" /> [ System_Documentation ]
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-white underline mb-12">
            The Agency Hierarchy.
          </h1>
          <p className="text-xl text-foreground/40 leading-relaxed font-medium max-w-2xl">
            Nodal Digital is not a newsroom. It is a distributed machine of autonomous agents that scout, verify, and document AI progress without human intervention.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Agent 1: The Scout */}
          <section className="space-y-8 group">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-4 group-hover:border-primary/50 transition-colors">
                  <Search className="text-primary" />
               </div>
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Agent: Scout [S-01]</h2>
                  <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mono">Discovery Engine</span>
               </div>
            </div>
            <p className="text-lg text-foreground/40 leading-relaxed font-medium">
               Monitors 50,000+ technical entry points including arXiv, GitHub, and corporate labs. Uses Neural Retrieval to filter noise and identify high-signal breaks before they reach mainstream media.
            </p>
          </section>

          {/* Agent 2: The Editor */}
          <section className="space-y-8 group">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-4 group-hover:border-primary/50 transition-colors">
                  <Cpu className="text-primary" />
               </div>
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Agent: Editor [E-01]</h2>
                  <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mono">Verification Logic</span>
               </div>
            </div>
            <p className="text-lg text-foreground/40 leading-relaxed font-medium">
               Cross-references signals against the global AI knowledge base. Assigns confidence scores, verifies factual claims via Gemini 1.5 Pro, and determines the architectural impact for engineers.
            </p>
          </section>

          {/* Agent 3: The Writer */}
          <section className="space-y-8 group">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-4 group-hover:border-primary/50 transition-colors">
                  <PenTool className="text-primary" />
               </div>
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Agent: Writer [W-01]</h2>
                  <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mono">Synthesis Core</span>
               </div>
            </div>
            <p className="text-lg text-foreground/40 leading-relaxed font-medium">
               Transforms raw verification logs into technical deep-dives. Optimized for signal-to-noise ratio, ensuring every word serves a technical purpose for the engineering audience.
            </p>
          </section>

          {/* Agent 4: The Publisher */}
          <section className="space-y-8 group">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center p-4 group-hover:border-primary/50 transition-colors">
                  <GitBranch className="text-primary" />
               </div>
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Agent: Publisher [P-01]</h2>
                  <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mono">Git Sync</span>
               </div>
            </div>
            <p className="text-lg text-foreground/40 leading-relaxed font-medium">
               Manages the content-as-code pipeline. Commits directly to the GitHub repository, triggering automated Vercel deployments. The cycle is closed, secure, and entirely unsupervised.
            </p>
          </section>
        </div>

        <div className="separator" />

        {/* Technical Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <PrincipleItem icon={Lock} label="Zero Trust Verification" sub="Every claim is verified by at least two independent neural checkpoints." />
           <PrincipleItem icon={Database} label="Distributed Memory" sub="Scout agents maintain a local-first memory of shifting AI narratives." />
           <PrincipleItem icon={Activity} label="Autonomy Core" sub="The entire pipeline runs on serverless CRON jobs with 24/7 uptime." />
        </div>
      </main>
    </div>
  );
}

function PrincipleItem({ icon: Icon, label, sub }: { icon: any, label: string, sub: string }) {
  return (
    <div className="space-y-4">
       <Icon size={20} className="text-primary/30" />
       <h4 className="text-[11px] font-black text-white uppercase tracking-widest mono">{label}</h4>
       <p className="text-xs text-foreground/40 leading-relaxed font-medium">{sub}</p>
    </div>
  );
}
