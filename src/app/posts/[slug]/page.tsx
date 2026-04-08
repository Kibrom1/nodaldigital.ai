import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, Clock, ShieldCheck, Globe, Share2, Printer } from 'lucide-react';
import Header from '@/components/Header';
import { NewsPost } from '@/types';
import { notFound } from 'next/navigation';

async function getPostData(slug: string): Promise<NewsPost | null> {
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return { ...data, slug, content } as NewsPost;
  } catch (err) {
    return null;
  }
}

/**
 * TECHNICAL POST DETAIL VIEW
 * Editorial focus with machine-readable verification sidebars.
 */
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-40">
      <Header />
      
      <article className="container">
        {/* Navigation / Metadata */}
        <div className="max-w-4xl mx-auto mb-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-[10px] font-black text-foreground/30 hover:text-primary uppercase tracking-[0.3em] mono transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Log
          </Link>
          <div className="flex items-center gap-6">
             <button className="text-foreground/20 hover:text-white transition-colors"><Share2 size={16} /></button>
             <button className="text-foreground/20 hover:text-white transition-colors"><Printer size={16} /></button>
          </div>
        </div>

        {/* Hero Segment */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mono">{post.category}</span>
            <div className="h-[1px] w-12 bg-white/10"></div>
            <span className="text-[10px] font-medium text-foreground/40 mono">{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-12 text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 p-1 bg-white/[0.02] border border-white/5 rounded-2xl w-fit pr-6">
             <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-black text-primary">AI</div>
             <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black text-white uppercase tracking-widest mono">{post.author}</span>
                <span className="text-[9px] text-foreground/30 font-medium tracking-tight">Autonomous Synthesis Engine v1.0</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-24 items-start max-w-7xl mx-auto px-4">
          
          {/* Main Context: Editorial Body */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-foreground/50 prose-p:leading-relaxed prose-strong:text-white prose-code:text-primary prose-pre:bg-white/[0.02] prose-pre:border prose-pre:border-white/[0.05]">
            <ReactMarkdown>{post.content || ''}</ReactMarkdown>
          </div>

          {/* Machine Interaction: Signal Sidebar */}
          <aside className="sticky top-32 space-y-16">
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-10">
               <h3 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em] mono">Signal_Audit</h3>
               
               <div className="space-y-8">
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">Signal Depth</span>
                    <div className="flex items-baseline gap-2">
                       <span className="text-3xl font-black text-white leading-none">{post.relevanceScore}%</span>
                       <span className="text-[10px] font-bold text-success uppercase mono">High</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">Verified Checks</span>
                    {post.keyTakeaways?.map((take, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                         <ShieldCheck size={14} className="text-primary mt-0.5" />
                         <span className="text-xs font-medium text-foreground/50 leading-tight">{take}</span>
                      </div>
                    ))}
                 </div>

                 <div className="pt-8 border-t border-white/5 space-y-4">
                    <span className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em] mono">Primary Sources</span>
                    <div className="flex flex-col gap-3">
                       {post.sources?.map((source, sIdx) => (
                         <a key={sIdx} href={source} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-foreground/30 hover:text-white transition-colors truncate mono">
                           <Globe size={12} /> {source.replace('https://', '').split('/')[0]}
                         </a>
                       ))}
                    </div>
                 </div>
               </div>
            </div>

            <div className="p-1 px-4 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                  <span className="text-[10px] font-black text-foreground/30 uppercase mono tracking-[0.2em]">Zero_Human_Correction</span>
               </div>
               <p className="text-[11px] leading-relaxed text-foreground/20 font-medium italic">
                 This synthesis was automatically generated from high-signal discoveries. No editorial adjustments were made by biological lifeforms.
               </p>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
