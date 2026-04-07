import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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
  Zap,
  Activity
} from 'lucide-react';
import { NewsPost } from '@/types';

/**
 * AGENTIC DATA LOADER
 */
async function getAgenticPosts(): Promise<NewsPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(postsDirectory)) return [];
  try {
    const filenames = fs.readdirSync(postsDirectory);
    const posts = filenames
      .filter(file => file.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        return { ...data, slug: filename.replace('.md', ''), content } as NewsPost;
      });
    return posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  } catch (err) {
    return [];
  }
}

const MOCK_NEWS: NewsPost[] = [
  {
    title: "The Emergence of Unsupervised Intelligence",
    slug: "agentic-shift",
    content: "## The Shift\nWe are moving from human-in-the-loop to human-on-the-loop...",
    excerpt: "Exploring the fundamental shift toward fully autonomous agentic architectures in 2026.",
    publishedDate: new Date().toISOString(),
    author: "Scout Agent",
    category: "Architecture",
    relevanceScore: 99,
    keyTakeaways: ["Zero-human intervention", "Continuous learning loops", "Autonomous verification"],
    whyItMatters: "This is the foundation of the nodaldigital.ai newsroom.",
    sources: ["research.nodaldigital.ai"],
    metaDescription: "The future of autonomous intelligence.",
    tags: ["Agentic", "AI", "Future"]
  }
];

export default async function Home() {
  const realPosts = await getAgenticPosts();
  const allPosts = realPosts.length > 0 ? realPosts : MOCK_NEWS;

  return (
    <div className="min-h-screen pt-32 pb-40 relative">
      <Header />
      
      {/* Visual Depth Orbs */}
      <div className="orb orb-primary"></div>
      <div className="orb orb-secondary"></div>

      {/* Hero Section */}
      <section className="container mb-48 animate-fade" style={{ animationDelay: '100ms' }}>
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-foreground/40 text-[10px] font-bold tracking-[0.25em] mb-12 uppercase mono">
            <Activity size={12} className="text-primary animate-pulse" />
            Core Status: Unsupervised
          </div>
          
          <h1 className="text-7xl md:text-[6.5rem] font-black mb-12 tracking-tighter leading-[0.85] text-white">
            Unsupervised <br/>
            <span className="gradient-text">Intelligence.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/40 mb-16 leading-relaxed max-w-3xl font-medium tracking-tight">
            High-signal AI breakthroughs discovered, verified, and published by autonomous agents. No noise. No manual intervention. Zero delay.
          </p>

          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-foreground/20 mono">Model Response</span>
              <span className="text-2xl font-bold text-white tracking-tighter">0.82s <span className="text-success text-sm ml-1">Live</span></span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-foreground/20 mono">Verification Depth</span>
              <span className="text-2xl font-bold text-white tracking-tighter">99.4% <span className="text-primary text-sm ml-1">Secure</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomous System Status */}
      <section className="container mb-48 animate-fade" style={{ animationDelay: '300ms' }}>
        <div className="bg-white/[0.01] border border-white/5 p-12 rounded-[40px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
            <Cpu size={240} className="text-primary" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-20">
               <h2 className="text-[11px] font-black text-foreground/20 uppercase tracking-[0.4em] flex items-center gap-4 mono">
                Neural Cluster Status
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[9px] font-bold text-primary mono uppercase">
                Synchronized
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
              <PulseGauge title="Deep Scout" status="Active Discovery" />
              <PulseGauge title="Fact Checker" status="Verification Loop" />
              <PulseGauge title="Neural Writer" status="Contextual Synthesis" />
              <PulseGauge title="Git Publisher" status="Autocommit Listen" />
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Log */}
      <section className="container animate-fade" style={{ animationDelay: '500ms' }}>
        <div className="flex items-end justify-between mb-24 px-4">
           <div className="space-y-4">
             <h2 className="text-5xl font-black tracking-tighter">Intelligence Log</h2>
             <p className="text-sm text-foreground/30 font-medium">Real-time signal processing from secondary and primary sources.</p>
           </div>
           <div className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em] mono mb-2">Live Stream Active</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post: NewsPost, idx: number) => (
            <NewsCard key={idx} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PulseGauge({ title, status }: { title: string, status: string }) {
  return (
    <div className="group/gauge">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mono">{title}</span>
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.8)]"></div>
      </div>
      <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 w-full"></div>
        <div className="shimmer-active"></div>
      </div>
      <p className="mt-4 text-[9px] uppercase tracking-[0.1em] text-foreground/20 font-bold mono">{status}</p>
    </div>
  );
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <div className="card flex flex-col group/card hover:bg-white/[0.03] p-10">
      <div className="flex items-center justify-between mb-10">
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] px-4 py-1.5 border border-primary/20 rounded-lg mono">
          {post.category}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black text-foreground/20 uppercase tracking-widest mono">Relevance</span>
          <span className={`text-xl font-black ${post.relevanceScore > 95 ? 'text-amber-400' : 'text-white'}`}>
            {post.relevanceScore}%
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-black mb-8 leading-tight group-hover/card:text-primary transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-foreground/30 text-sm mb-12 line-clamp-3 leading-relaxed font-medium">
        {post.excerpt}
      </p>

      <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">
            {post.author.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest mono">{post.author}</p>
            <p className="text-[9px] text-foreground/20 font-mono tracking-tighter">{new Date(post.publishedDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
