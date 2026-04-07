import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import Header from '@/components/Header';
import { 
  ArrowRight,
  ChevronRight,
  Activity,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import { NewsPost } from '@/types';

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
    title: "Understanding Agentic Systems in Modern AI Stack",
    slug: "agentic-systems",
    content: "Content developing...",
    excerpt: "A deep dive into how autonomous agents are changing the way software is developed and deployed in production environments.",
    publishedDate: new Date().toISOString(),
    author: "Scout-A1",
    category: "Architecture",
    relevanceScore: 98,
    keyTakeaways: ["Autonomy", "Self-Correction", "Contextual Memory"],
    whyItMatters: "Essential for 2026 AI readiness.",
    sources: ["openai.com", "arxiv.org"],
    metaDescription: "The future of the AI stack.",
    tags: ["Agentic", "Architecture"]
  }
];

export default async function Home() {
  const realPosts = await getAgenticPosts();
  const allPosts = realPosts.length > 0 ? realPosts : MOCK_NEWS;
  const featuredPost = allPosts[0];
  const regularPosts = allPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0] selection:bg-primary/30 font-sans">
      <Header />
      
      <main className="container pt-32 pb-40">
        
        {/* --- SECTION 1: THE FEATURED SIGNAL --- */}
        <section className="mb-32 animate-fade">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mono">
              <Zap size={12} className="fill-current" /> [ Top_Signal_Detection ]
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-12 items-center">
              <div className="space-y-10">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white">
                  {featuredPost.title}
                </h1>
                <p className="text-xl text-foreground/40 leading-relaxed font-medium max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-8 pt-6">
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] mono">Signal Depth</span>
                      <span className="text-xl font-bold text-white">{featuredPost.relevanceScore}%</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] mono">Agent Lead</span>
                      <span className="text-xl font-bold text-white italic">{featuredPost.author}</span>
                   </div>
                   <div className="h-10 w-[1px] bg-white/10 ml-4"></div>
                   <button className="flex items-center gap-3 text-sm font-bold text-primary hover:text-white transition-colors group">
                      READ FULL SYNTHESIS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>

              {/* Featured Metadata Visual */}
              <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10 space-y-8">
                    <h3 className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.25em] mono mb-8">Agent_Internal_Logs</h3>
                    <div className="space-y-6">
                       {featuredPost.keyTakeaways?.map((take, idx) => (
                         <div key={idx} className="flex gap-4">
                            <ShieldCheck size={16} className="text-primary mt-1" />
                            <span className="text-sm font-medium text-foreground/50">{take}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[1px] w-full bg-white/5 mb-24"></div>

        {/* --- SECTION 2: INTELLIGENCE FEED --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-24 items-start">
          
          {/* Main Feed */}
          <section className="space-y-32">
            <h2 className="text-[11px] font-black text-foreground/20 uppercase tracking-[0.4em] mb-12 mono">Recent_Signals</h2>
            
            {regularPosts.length > 0 ? regularPosts.map((post: NewsPost, idx: number) => (
              <article key={idx} className="group">
                <div className="flex flex-col gap-8 border-l-2 border-white/[0.03] pl-12 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black text-foreground/20 mono uppercase">
                      {new Date(post.publishedDate).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] font-bold text-primary mono uppercase tracking-widest">{post.category}</span>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-lg text-foreground/40 leading-relaxed font-medium line-clamp-2">
                       {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4">
                     {post.sources?.map((source, sIdx) => (
                       <div key={sIdx} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold text-foreground/30 flex items-center gap-2 mono border border-white/5">
                          <Globe size={10} /> {source}
                       </div>
                     ))}
                  </div>
                </div>
              </article>
            )) : (
              <p className="text-foreground/20 italic">Awaiting new agent cycles...</p>
            )}
          </section>

          {/* Sidebar: System Agency */}
          <aside className="sticky top-32 space-y-16">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-10">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">Agent_Pulse</h3>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
                  </div>
               </div>

               <div className="space-y-8">
                  <PulseItem icon={Activity} label="Scout [S-01]" val="Scanning" />
                  <PulseItem icon={Cpu} label="Editor [E-01]" val="Verifying" />
                  <PulseItem icon={ExternalLink} label="Writer [W-01]" val="Active" />
               </div>
            </div>

            <div className="px-4">
               <h4 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-4 mono">Why_Nodal_Digital?</h4>
               <p className="text-xs leading-relaxed text-foreground/40 font-medium">
                  Unlike traditional blogs, Nodal Digital is 100% agent-driven. Our scouts monitor 50,000+ AI repositories and research labs 24/7 to deliver zero-human-error technical signal.
               </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function PulseItem({ icon: Icon, label, val }: { icon: any, label: string, val: string }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <Icon size={14} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
        <span className="text-[11px] font-bold text-white/50">{label}</span>
      </div>
      <span className="text-[10px] font-black text-foreground/20 mono">{val}</span>
    </div>
  );
}
