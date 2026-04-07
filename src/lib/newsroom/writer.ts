import { GoogleGenerativeAI } from '@google/generative-ai';
import { DiscoverySignal, NewsPost } from '@/types';
import { format } from 'date-fns';

const GEN_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export class Writer {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    if (GEN_AI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(GEN_AI_API_KEY);
    }
  }

  /**
   * Generates a technical, witty, and concise AI news post from a signal.
   */
  async generatePost(signal: DiscoverySignal, summary: any): Promise<NewsPost> {
    if (!this.genAI) return this.getMockPost(signal);

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
      const prompt = `Write a high-signal AI news post for software engineers based on:
Title: ${signal.title}
Key Takeaways: ${summary.keyTakeaways.join(', ')}
Why It Matters: ${summary.whyItMatters}

Use a technical, witty, and concise brand voice. No fluff. No placeholders.
Include a catchy title, metadata, and the full content in markdown.
Also provide a slug, meta-description, and tags.

Return a JSON object: {"title": "string", "slug": "string", "content": "string", "metaDescription": "string", "tags": ["string"]}`;

      const result = await model.generateContent(prompt);
      const postData = JSON.parse(result.response.text());

      return {
        ...postData,
        excerpt: summary.excerpt,
        publishedDate: new Date().toISOString(),
        author: 'Antigravity AI',
        category: 'AI Developments',
        relevanceScore: signal.score || 0,
        keyTakeaways: summary.keyTakeaways,
        whyItMatters: summary.whyItMatters,
        sources: [signal.url],
        thumbnailUrl: `/api/og?title=${encodeURIComponent(postData.title)}` // Placeholder for dynamic generation logic
      };

    } catch (err) {
      console.error('Error in Writer generation:', err);
      return this.getMockPost(signal);
    }
  }

  private getMockPost(signal: DiscoverySignal): NewsPost {
    return {
      title: signal.title,
      slug: signal.title.toLowerCase().replace(/ /g, '-'),
      content: '## Technical Deep Dive\n' + (signal.summary || 'Developing content...'),
      excerpt: signal.summary?.substring(0, 50).trim() + '...' || 'AI development update.',
      publishedDate: new Date().toISOString(),
      author: 'Antigravity AI',
      category: 'AI Developments',
      relevanceScore: signal.score || 85,
      keyTakeaways: ['Dev Takeaway 1', 'Dev Takeaway 2', 'Dev Takeaway 3'],
      whyItMatters: 'Important for cloud-native AI architecture.',
      sources: [signal.url],
      metaDescription: 'Latest updates in AI engineering and deployment.',
      tags: ['AI', 'Engineering'],
      thumbnailUrl: ''
    };
  }
}
