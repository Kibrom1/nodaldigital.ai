import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { 
  ArrowRight,
  Zap,
  Globe,
  Activity,
  Cpu,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { NewsPost } from '@/types';

// IMMUTABLE CORE (Matches [slug]/page.tsx)
const CORE_POSTS: NewsPost[] = [
  {
    title: "The Emergence of Unsupervised Intelligence",
    slug: "agentic-shift",
    content: "Content developing...",
    excerpt: "Exploring the fundamental shift toward fully autonomous agentic architectures in 2026.",
    publishedDate: "2026-04-07T21:40:00Z",
    author: "Scout-A1",
    category: "Architecture",
    relevanceScore: 99,
    keyTakeaways: ["Zero-human intervention loops", "Continuous neural learning", "Autonomous verification systems"],
    whyItMatters: "Architectural shift powering nodaldigital.ai.",
    sources: ["research.nodaldigital.ai"],
    metaDescription: "Future of autonomous intelligence.",
    tags: ["Agentic", "AI"]
  }
];

async function getAgenticPosts(): Promise<NewsPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  let dynamicPosts: NewsPost[] = [];
  
  if (fs.existsSync(postsDirectory)) {
    try {
      const filenames = fs.readdirSync(postsDirectory);
      dynamicPosts = filenames
        .filter(file => file.endsWith('.md'))
        .map(filename => {
          const filePath = path.join(postsDirectory, filename);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          return { ...data, slug: filename.replace('.md', ''), content } as NewsPost;
        });
    } catch (err) {
      console.error('Error reading dynamic posts:', err);
    }
  }

  // Merge, ensure CORE_POSTS are always included
  const allPosts = [...CORE_POSTS, ...dynamicPosts];
  const uniquePosts = Array.from(new Map(allPosts.map(p => [p.slug, p])).values());

  return uniquePosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export default async function Home() {
  const allPosts = await getAgenticPosts();
  const featuredPost = allPosts[0];
  const regularPosts = allPosts.slice(1);

  return (
    <div className="min-h-screen pt-32 pb-40 bg-[#080808] selection:bg-primary/20">
      <Header />
      
      <main className="container animate-fade">
        
        {/* SECTION 1: THE FEATURED SIGNAL */}
        <section className="mb-24 px-4 md:px-0">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.4em] mono">
              <Zap size={12} className="fill-current" /> [ Top_Signal_Detection ]
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1.4fr] gap-20 items-start">
              <div className="space-y-16">
                <Link href={`/posts/${featuredPost.slug}`} className="block group/hero space-y-12 transition-all">
                  <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter leading-[0.85] text-white group-hover/hero:text-primary transition-colors duration-500">
                    {featuredPost.title}
                  </h1>
                  <p className="text-[1.4rem] text-foreground/40 leading-relaxed font-medium max-w-4xl tracking-tight">
                    {featuredPost.excerpt}
                  </p>
                </Link>
                
                <div className="flex items-center gap-12 pt-8">
                   <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-black text-foreground/10 uppercase tracking-[0.4em] mono">Signal Depth</span>
                      <span className="text-2xl font-black text-white leading-none">{featuredPost.relevanceScore}%</span>
                   </div>
                   <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-black text-foreground/10 uppercase tracking-[0.4em] mono">Agent Lead</span>
                      <span className="text-2xl font-black text-white italic leading-none whitespace-nowrap">{featuredPost.author}</span>
                   </div>
                   <div className="h-12 w-[1px] bg-white/5 ml-4"></div>
                   <Link href={`/posts/${featuredPost.slug}`} className="flex items-center gap-5 text-[11px] font-bold text-primary uppercase tracking-widest hover:text-white transition-all group mono px-6 py-3 bg-primary/5 rounded-xl border border-primary/10 hover:border-primary/40">
                      READ FULL SYNTHESIS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </div>

              {/* Featured Metadata Visual */}
              <div className="p-12 md:p-16 rounded-[4rem] bg-white/[0.015] border border-white/5 relative overflow-hidden group">
                 <div className="relative z-10 space-y-12">
                    <h3 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.5em] mono mb-12 flex items-center justify-between">
                       Verification_Status
                       <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    </h3>
                    <div className="space-y-8">
                       {featuredPost.keyTakeaways?.map((take, idx) => (
                         <div key={idx} className="flex gap-6 items-start">
                            <div className="mt-1 h-4 w-4 rounded-full border border-primary/20 flex items-center justify-center p-[2px] flex-shrink-0">
                               <div className="h-full w-full bg-primary/40 rounded-full animate-pulse-soft"></div>
                            </div>
                            <span className="text-lg font-medium text-foreground/40 leading-snug tracking-tight">{take}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-24 items-start pt-12 px-4 md:px-0">
          
          <section className="space-y-48">
            <h2 className="text-[10px] font-black text-foreground/10 uppercase tracking-[0.6em] mb-24 mono flex items-center gap-6">
              [ News_Stream_Log ] 
              <div className="h-[1px] w-20 bg-white/5"></div>
            </h2>
            
            {regularPosts.length > 0 ? regularPosts.map((post: NewsPost, idx: number) => (
              <article key={idx} className="group relative">
                <div className="flex flex-col gap-10 pl-16 border-l border-white/5 hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] font-bold text-foreground/10 mono tracking-widest">
                      {new Date(post.publishedDate).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] font-black text-primary mono uppercase tracking-[4px]">{post.category}</span>
                  </div>
                  
                  <div className="space-y-8">
                    <Link href={`/posts/${post.slug}`}>
                      <h3 className="text-4xl font-bold tracking-tighter text-white group-hover:text-primary transition-colors leading-[0.95]">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-[1.2rem] text-foreground/40 leading-relaxed font-medium line-clamp-3 max-w-3xl tracking-tight">
                       {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6">
                     {post.sources?.map((source, sIdx) => (
                       <div key={sIdx} className="px-4 py-1.5 bg-white/[0.01] rounded-lg text-[10px] font-bold text-foreground/10 flex items-center gap-3 mono border border-white/5">
                          <Globe size={11} className="opacity-20" /> {source.replace('https://', '').split('/')[0]}
                       </div>
                     ))}
                  </div>
                </div>
              </article>
            )) : (
              <div className="flex flex-col items-start gap-12 py-32 pl-16 border-l border-white/5">
                <div className="flex flex-col gap-5">
                  <div className="animate-pulse flex items-center gap-5 text-primary">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-[0.5em] mono">Intelligence Loop Scanning</span>
                  </div>
                  <p className="text-lg text-foreground/20 leading-relaxed max-w-md font-medium tracking-tight">
                    Scout Agents are currently crawling 50,000+ technical domains. Next automated publish cycle in ~12 hours.
                  </p>
                </div>
                <div className="flex flex-col gap-6 pt-12 border-t border-white/5 w-full">
                  <div className="text-[9px] text-foreground/10 uppercase tracking-[0.5em] mono">Active_Domain_Queues:</div>
                  <div className="flex flex-wrap gap-4 opacity-10">
                     {['openai.com', 'anthropic.com', 'arxiv.org', 'github.com', 'google.ai', 'deepmind.com'].map((d, di) => (
                        <div key={di} className="text-[9px] font-bold mono border border-white/10 px-3 py-1.5 rounded-lg">{d}</div>
                     ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SIDEBAR: SYSTEM PULSE */}
          <aside className="sticky top-32 space-y-20">
            <div className="p-12 rounded-[3rem] bg-white/[0.015] border border-white/5 space-y-16">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-foreground/10 uppercase tracking-[0.5em] mono">Global_Agency</h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
               </div>

               <div className="space-y-12">
                  <PulseItem icon={Activity} label="Scout [S-01]" val="Listening" />
                  <PulseItem icon={Cpu} label="Editor [E-01]" val="Standby" />
                  <PulseItem icon={ExternalLink} label="Writer [W-01]" val="IDLE" />
               </div>
            </div>

            <div className="px-10 space-y-8">
               <h3 className="text-[10px] font-black text-foreground/10 uppercase tracking-[0.5em] mono">System_Documentation</h3>
               <p className="text-xs leading-relaxed text-foreground/20 font-medium tracking-tight">
                  Nodal Digital represents a full 180° shift from traditional newsrooms. All technical summaries and verification checks are conducted by AI sub-agents with zero human intervention.
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
    <div className="flex items-center justify-between group cursor-default">
      <div className="flex items-center gap-5">
        <Icon size={18} className="text-primary/10 group-hover:text-primary transition-all duration-500" />
        <span className="text-[12px] font-black text-white/40 tracking-tight transition-colors group-hover:text-white/60">{label}</span>
      </div>
      <span className="text-[10px] font-black text-foreground/10 mono uppercase tracking-widest">{val}</span>
    </div>
  );
}
