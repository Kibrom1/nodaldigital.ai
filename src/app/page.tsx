import React from 'react';
import Header from '@/components/Header';
import { 
  Terminal, 
  Search, 
  FileText, 
  CloudUpload, 
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { NewsPost } from '@/types';

// Mock data for the latest AI news
const LATEST_NEWS: NewsPost[] = [
  {
    title: "GPT-5 Developer Preview: Multi-Model Reasoning and Performance",
    slug: "gpt-5-preview",
    content: "## Technical Deep Dive\nOpenAI has released a developer preview of GPT-5...",
    excerpt: "OpenAI has released a developer preview of GPT-5, featuring enhanced reasoning and multimodel capabilities...",
    publishedDate: "2026-04-05T12:00:00Z",
    author: "Antigravity AI",
    category: "LLM Developments",
    relevanceScore: 98,
    keyTakeaways: ["Multi-model reasoning natively", "10x context window growth", "Direct API access for early testers"],
    whyItMatters: "This marks a generational leap in AI reasoning and infrastructure capabilities.",
    sources: ["openai.com"],
    metaDescription: "Detailed analysis of GPT-5 developer preview features and impacts.",
    tags: ["GPT-5", "OpenAI", "Reasoning"]
  },
  {
    title: "Claude 4.0: Better Coding, Better Thinking",
    slug: "claude-4-preview",
    content: "## Technical Deep Dive\nAnthropic introduces Claude 4.0...",
    excerpt: "Anthropic introduces Claude 4.0, a new family of models that excels in logical reasoning and software engineering tasks...",
    publishedDate: "2026-04-05T08:30:00Z",
    author: "Antigravity AI",
    category: "Code Generation",
    relevanceScore: 92,
    keyTakeaways: ["State-of-the-art coding performance", "New 'Thinking' mode for complex logical tasks", "Lower latency for real-time applications"],
    whyItMatters: "It's the most capable coding assistant released yet, challenging current benchmarks.",
    sources: ["anthropic.com"],
    metaDescription: "Claude 4.0's advancements in coding and reasoning.",
    tags: ["Claude 4.0", "Anthropic", "Coding"]
  },
  {
    title: "Google DeepMind's Gemini 2.0: Ultra-Long Context and Native Vision",
    slug: "gemini-2-preview",
    content: "## Technical Deep Dive\nGoogle DeepMind announces Gemini 2.0...",
    excerpt: "Google DeepMind announces Gemini 2.0, with a 2-million token context window and native video understanding...",
    publishedDate: "2026-04-04T18:45:00Z",
    author: "Antigravity AI",
    category: "Multimodal AI",
    relevanceScore: 88,
    keyTakeaways: ["2-million token context window", "Native video understanding capabilities", "Massive performance gains in vision-language tasks"],
    whyItMatters: "Long-form context processing opens up new enterprise AI use cases for massive document analysis.",
    sources: ["deepmind.google"],
    metaDescription: "Gemini 2.0's breakthroughs in long-context management and native vision.",
    tags: ["Gemini 2.0", "Google", "Context Window"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <Header />
      
      {/* Hero Section */}
      <section className="container mb-20 animate-fade">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYNTHETIC NEWSROOM V1.0 IS LIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 transition-all tracking-tight leading-[1.1]">
            Engineering the <span className="gradient-text">Future of Intelligence</span>.
          </h1>
          <p className="text-xl text-foreground/50 mb-10 leading-relaxed max-w-2xl">
            Autonomous AI discovery, verification, and summarized insights direct from the source. Zero noise, high-signal intelligence for the modern developer.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="button text-lg px-8 py-4">
              Explore Live Feed <ArrowRight size={20} />
            </button>
            <button className="button button-secondary text-lg px-8 py-4 bg-white/5 border border-white/10">
              API Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Agent Status Section */}
      <section className="container mb-24 animate-fade" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
          <Terminal size={24} className="text-primary" />
          Autonomous Pipeline Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatusCard 
            icon={<Search className="text-blue-400" />} 
            title="Discovery (Scout)" 
            status="Scanning Domains"
            progress={85}
            active
          />
          <StatusCard 
            icon={<ShieldCheck className="text-green-400" />} 
            title="Synthesis (Editor)" 
            status="Deduplicating"
            progress={40}
            active
          />
          <StatusCard 
            icon={<FileText className="text-purple-400" />} 
            title="Generation (Writer)" 
            status="Idle"
            progress={0}
          />
          <StatusCard 
            icon={<CloudUpload className="text-cyan-400" />} 
            title="Distribution (Publisher)" 
            status="Idle"
            progress={0}
          />
        </div>
      </section>

      {/* Main Feed Section */}
      <section className="container animate-fade" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-8 sticky top-20 z-40 bg-background/80 backdrop-blur-md py-4 border-b border-white/5">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="text-white font-bold border-b-2 border-primary pb-1 whitespace-nowrap">All Intelligence</button>
            <button className="text-foreground/50 font-medium hover:text-white transition-colors pb-1 whitespace-nowrap">LLM Developments</button>
            <button className="text-foreground/50 font-medium hover:text-white transition-colors pb-1 whitespace-nowrap">Code Generation</button>
            <button className="text-foreground/50 font-medium hover:text-white transition-colors pb-1 whitespace-nowrap">Multimodal AI</button>
          </div>
          <div className="hidden md:flex gap-4 items-center">
             <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-foreground/40">
              Live updates enabled
            </div>
          </div>
        </div>

        <div className="grid-cols-3 gap-8">
          {LATEST_NEWS.map((post, idx) => (
            <NewsCard key={idx} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatusCard({ icon, title, status, progress, active }: any) {
  return (
    <div className={`card ${active ? 'border-primary/20 bg-primary/[0.02]' : 'opacity-60'}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${active ? 'text-white' : 'text-foreground/30'}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold mb-1">{title}</h3>
          <p className="text-xs text-foreground/40 font-mono uppercase tracking-wider">{status}</p>
        </div>
      </div>
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-30'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <div className="card h-full flex flex-col group cursor-pointer relative overflow-hidden">
      {/* Relevance Badge */}
      <div className="absolute top-6 right-6 flex flex-col items-end gap-1">
        <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Relevance</div>
        <div className={`text-xl font-black ${post.relevanceScore > 95 ? 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]' : 'text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]'}`}>
          {post.relevanceScore}%
        </div>
      </div>

      <div className="mb-6">
        <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
          {post.category}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      
      <p className="text-foreground/70 text-sm mb-8 line-clamp-3" style={{ lineHeight: 1.75 }}>
        {post.excerpt}
      </p>

      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
            A
          </div>
          <div>
            <p className="text-xs font-bold text-white mb-0.5">{post.author}</p>
            <p className="text-[10px] text-foreground/30 font-mono">2026-04-05</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {post.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[11px] bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-foreground/70 font-semibold hover:bg-primary/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
