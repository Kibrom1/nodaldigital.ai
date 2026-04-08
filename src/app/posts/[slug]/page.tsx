import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, Clock, ShieldCheck, Globe, Share2, Printer, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import { NewsPost } from '@/types';

/**
 * PRODUCTION-RESILIENT DATA LOADER
 * Ensures content is found in serverless environments.
 */
async function getPostData(slug: string): Promise<NewsPost | null> {
  // Use a more robust path resolution for Vercel
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`Post not found: ${filePath}`);
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return { ...data, slug, content } as NewsPost;
  } catch (err) {
    console.error(`Error reading post ${slug}:`, err);
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 bg-[#080808]">
        <Header />
        <main className="container h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
               <AlertTriangle className="text-primary" size={32} />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">Signal_Lost.</h1>
            <p className="text-foreground/30 max-w-md mb-12 font-medium">
               The requested intelligence signal was either purged or has not yet been synchronized from the autonomous nodes.
            </p>
            <Link href="/" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
               Back to Core Feed
            </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-40">
      <Header />
      
      <article className="container animate-fade">
        <div className="max-w-4xl mx-auto mb-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-[10px] font-black text-foreground/30 hover:text-primary uppercase tracking-[0.3em] mono transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Log
          </Link>
          <div className="flex items-center gap-6">
             <button className="text-foreground/20 hover:text-white transition-colors"><Share2 size={16} /></button>
             <button className="text-foreground/20 hover:text-white transition-colors"><Printer size={16} /></button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mono">{post.category}</span>
            <div className="h-[1px] w-12 bg-white/10"></div>
            <span className="text-[10px] font-medium text-foreground/20 mono">{new Date(post.publishedDate).toLocaleDateString()}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-12 text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 p-1 bg-white/[0.02] border border-white/5 rounded-2xl w-fit pr-6">
             <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-black text-primary">AI</div>
             <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black text-white uppercase tracking-widest mono">{post.author}</span>
                <span className="text-[9px] text-foreground/30 font-medium tracking-tight whitespace-nowrap">Autonomous Synthesis Engine</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-24 items-start max-w-7xl mx-auto px-4">
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-foreground/40 prose-strong:text-white prose-code:text-primary">
            <ReactMarkdown>{post.content || ''}</ReactMarkdown>
          </div>

          <aside className="sticky top-32 space-y-16">
            <div className="p-10 rounded-[2.5rem] bg-white/[0.015] border border-white/5 space-y-10">
               <h3 className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em] mono">Signal_Audit</h3>
               <div className="space-y-8">
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-foreground/10 uppercase tracking-[0.3em] mono">Signal Depth</span>
                    <span className="text-3xl font-black text-white leading-none">{post.relevanceScore}%</span>
                 </div>
                 <div className="space-y-4">
                    <span className="text-[9px] font-black text-foreground/10 uppercase tracking-[0.3em] mono">Verified Checks</span>
                    {post.keyTakeaways?.map((take, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                         <ShieldCheck size={14} className="text-primary mt-0.5" />
                         <span className="text-xs font-medium text-foreground/40 leading-tight">{take}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
