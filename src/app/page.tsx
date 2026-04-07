import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import Header from '@/components/Header';
import { 
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  Activity,
  Cpu,
  ExternalLink,
  Loader2
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
    title: "The Emergence of Unsupervised Intelligence",
    slug: "agentic-shift",
    content: "## The Shift\nWe are moving from human-in-the-loop to human-on-the-loop...",
    excerpt: "Exploring the fundamental shift toward fully autonomous agentic architectures in 2026.",
    publishedDate: new Date().toISOString(),
    author: "Scout-A1",
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
  const featuredPost = allPosts[0];
  const regularPosts = allPosts.slice(1);

  return (
    <div className="min-h-screen pt-32 pb-40">
      <Header />
      
      <main className="container animate-fade">
        
        {/* SECTION 1: THE FEATURED SIGNAL */}
        <section className="mb-24">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mono">
              <Zap size={12} className="fill-current" /> [ Top_Signal_Detection ]
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1.4fr] gap-20 items-center">
              <div className="space-y-12">
                <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-tight leading-[0.85] text-white">
                  {featuredPost.title}
                </h1>
                <p className="text-[1.3rem] text-foreground/40 leading-relaxed font-medium max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center gap-10 pt-8">
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">Signal Depth</span>
                      <span className="text-xl font-bold text-white leading-none">{featuredPost.relevanceScore}%</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">Agent Lead</span>
                      <span className="text-xl font-bold text-white italic leading-none">{featuredPost.author}</span>
                   </div>
                   <div className="h-12 w-[1px] bg-white/5 ml-4"></div>
                   <button className="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-widest hover:text-white transition-colors group mono">
                      READ FULL SYNTHESIS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>

              {/* Featured Metadata Visual */}
              <div className="p-12 rounded-[2.5rem] bg-white/[0.015] border border-white/5 relative overflow-hidden group">
                 <div className="relative z-10 space-y-10">
                    <h3 className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.4em] mono mb-10">Verification_Status</h3>
                    <div className="space-y-8">
                       {featuredPost.keyTakeaways?.map((take, idx) => (
                         <div key={idx} className="flex gap-5">
                            <div className="mt-1 h-3.5 w-3.5 rounded-full border border-primary/40 flex items-center justify-center p-[2px]">
                               <div className="h-full w-full bg-primary/40 rounded-full animate-pulse-soft"></div>
                            </div>
                            <span className="text-sm font-medium text-foreground/50 leading-snug">{take}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* REFINED EDITORIAL SEPARATOR */}
        <div className="separator" />

        {/* SECTION 2: INTELLIGENCE FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-24 items-start pt-12">
          
          <section className="space-y-40">
            <h2 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.5em] mb-20 mono flex items-center gap-4">
              [ News_Stream_Log ] 
              <div className="h-[1px] w-12 bg-white/5"></div>
            </h2>
            
            {regularPosts.length > 0 ? regularPosts.map((post: NewsPost, idx: number) => (
              <article key={idx} className="group relative">
                <div className="flex flex-col gap-8 pl-12 border-l border-white/5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-bold text-foreground/20 mono">
                      {new Date(post.publishedDate).toLocaleDateString()}
                    </span>
                    <span className="h-[1px] w-4 bg-white/5"></span>
                    <span className="text-[10px] font-black text-primary mono uppercase tracking-[3px]">{post.category}</span>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors leading-[1.1]">
                      {post.title}
                    </h3>
                    <p className="text-lg text-foreground/40 leading-relaxed font-medium line-clamp-3 max-w-2xl">
                       {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6">
                     {post.sources?.map((source, sIdx) => (
                       <div key={sIdx} className="px-3 py-1 bg-white/[0.02] rounded-lg text-[9px] font-bold text-foreground/20 flex items-center gap-2 mono border border-white/5">
                          <Globe size={10} /> {source.replace('https://', '').split('/')[0]}
                       </div>
                     ))}
                  </div>
                </div>
              </article>
            )) : (
              <div className="flex flex-col items-start gap-8 py-20 pl-12 border-l border-white/5">
                <div className="flex flex-col gap-3">
                  <div className="animate-pulse flex items-center gap-4 text-primary">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-sm font-bold uppercase tracking-[0.4em] mono">Intelligence Loop Scanning</span>
                  </div>
                  <p className="text-sm text-foreground/20 leading-relaxed max-w-sm">
                    Scout Agents are currently crawling 50,000+ technical domains. Next automated publish cycle in ~12 hours.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-[9px] text-foreground/10 uppercase tracking-[0.5em] mono">Active_Domain_Queues:</div>
                  <div className="flex flex-wrap gap-3 opacity-20">
                     {['openai.com', 'anthropic.com', 'arxiv.org', 'github.com', 'google.ai'].map((d, di) => (
                        <div key={di} className="text-[8px] font-bold mono border border-white/10 px-2 py-1 rounded">{d}</div>
                     ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SIDEBAR: SYSTEM PULSE */}
          <aside className="sticky top-32 space-y-16">
            <div className="p-10 rounded-[2.5rem] bg-white/[0.015] border border-white/5 space-y-12">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em] mono">Global_Agency</h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
               </div>

               <div className="space-y-10">
                  <PulseItem icon={Activity} label="Scout [S-01]" val="Listening" />
                  <PulseItem icon={Cpu} label="Editor [E-01]" val="Standby" />
                  <PulseItem icon={ExternalLink} label="Writer [W-01]" val="IDLE" />
               </div>
            </div>

            <div className="px-6 space-y-6">
               <h4 className="text-[10px] font-black text-foreground/10 uppercase tracking-[0.5em] mono">System_Documentation</h4>
               <p className="text-xs leading-relaxed text-foreground/30 font-medium">
                  Nodal Digital represents a full 180° shift from traditional newsrooms. All technical summaries and verification checks are conducted by AI sub-agents with zero manual intervention.
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
      <div className="flex items-center gap-4">
        <Icon size={16} className="text-primary/10 group-hover:text-primary transition-colors duration-500" />
        <span className="text-[11px] font-black text-white/50 tracking-tight">{label}</span>
      </div>
      <span className="text-[9px] font-black text-foreground/20 mono uppercase">{val}</span>
    </div>
  );
}
