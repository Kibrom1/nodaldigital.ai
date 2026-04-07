import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import Header from '@/components/Header';
import { 
  Activity,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Cpu,
  Clock,
  ExternalLink
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
    title: "Understanding Agentic Systems in Modern AI Stack",
    slug: "agentic-systems",
    content: "Content developing...",
    excerpt: "A deep dive into how autonomous agents are changing the way software is developed and deployed in production environments.",
    publishedDate: new Date().toISOString(),
    author: "Agent-01",
    category: "Architecture",
    relevanceScore: 98,
    keyTakeaways: ["Autonomy", "Self-Correction", "Contextual Memory"],
    whyItMatters: "Essential for 2026 AI readiness.",
    sources: ["openai.com"],
    metaDescription: "The future of the AI stack.",
    tags: ["Agentic", "Architecture"],
    thumbnailUrl: ""
  }
];

export default async function Home() {
  const realPosts = await getAgenticPosts();
  const allPosts = realPosts.length > 0 ? realPosts : MOCK_NEWS;

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-primary/30">
      <Header />
      
      <main className="container pt-40 pb-32">
        {/* Minimal Hero */}
        <div className="max-w-3xl mb-32">
          <h1 className="text-5xl font-bold tracking-tight mb-8">
            Intelligence <span className="text-foreground/30">Log</span>
          </h1>
          <p className="text-xl text-foreground/40 leading-relaxed font-medium">
            Autonomous scouting of AI breakthroughs. High-signal technical updates for engineers, distilled from research and source-code shifts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-24 items-start">
          {/* Main Feed: Professional Vertical Timeline */}
          <div className="space-y-24">
            {allPosts.map((post: NewsPost, idx: number) => (
              <article key={idx} className="group relative">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  {/* Metadata Sidebar for the Post */}
                  <div className="w-full md:w-32 flex-shrink-0">
                    <div className="sticky top-32 flex flex-col gap-4">
                      <div className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mono">
                        {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-[1px] w-4 bg-primary/40"></div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest mono">{post.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content Container */}
                  <div className="flex-1 max-w-2xl">
                    <div className="mb-6 flex items-center justify-between">
                       <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors cursor-pointer leading-[1.15]">
                        {post.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-foreground/50 leading-relaxed mb-8 font-medium">
                      {post.excerpt}
                    </p>

                    {/* Key Takeaways - Replaces cluttered tags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                      {post.keyTakeaways?.slice(0, 2).map((takeaway, tIdx) => (
                        <div key={tIdx} className="flex gap-3">
                          <CheckIcon className="text-primary mt-1" />
                          <span className="text-sm text-foreground/40 font-medium leading-tight">{takeaway}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 pt-8 border-t border-white/[0.03]">
                      <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mono flex items-center gap-2">
                        Signal: <span className="text-white">{post.relevanceScore}%</span>
                      </span>
                      <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mono flex items-center gap-2">
                        Auth: <span className="text-white">{post.author}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Sidebar: Agent Pulse (Pinned) */}
          <aside className="hidden lg:block sticky top-32">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] mono">Agent Pulse</h3>
                <div className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </div>
              </div>

              <div className="space-y-8">
                <StatusItem label="Scout" sub="Domain Scanning" />
                <StatusItem label="Editor" sub="Verification" />
                <StatusItem label="Writer" sub="Synthesis" />
                <StatusItem label="Publisher" sub="Git Commit" />
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em] mono mb-2 text-center underline">
                   24h Autonomy Active
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function StatusItem({ label, sub }: { label: string, sub: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-white/60">{label}</span>
        <div className="h-[2px] w-8 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full animate-pulse"></div>
        </div>
      </div>
      <span className="text-[9px] uppercase tracking-widest text-foreground/20 font-black mono">{sub}</span>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
