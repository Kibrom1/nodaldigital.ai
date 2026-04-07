import { DiscoverySignal } from '@/types';
import { Exa } from 'exa-js';

const EXA_API_KEY = process.env.EXA_API_KEY;

export class Scout {
  private exa: Exa | null = null;

  constructor() {
    if (EXA_API_KEY) {
      this.exa = new Exa(EXA_API_KEY);
    }
  }

  /**
   * Scans primary sources for recent AI breakthroughs.
   */
  async scanPrimarySources(): Promise<DiscoverySignal[]> {
    if (!this.exa) {
      console.warn('Exa API key not found. Using fallback mock data for testing.');
      return this.getMockSignals();
    }

    try {
      const results = await this.exa.searchAndContents(
        "Latest breakthroughs and releases from OpenAI, Anthropic, Google DeepMind, Meta AI, and Mistral.",
        {
          numResults: 10,
          useAutoprompt: true,
          type: 'keyword',
          category: 'news',
          includeDomains: ['openai.com', 'anthropic.com', 'deepmind.google', 'ai.meta.com', 'mistral.ai']
        }
      );

      return results.results.map((res: any) => ({
        id: res.id,
        title: res.title,
        url: res.url,
        source: this.extractDomain(res.url),
        publishedAt: res.publishedDate || new Date().toISOString(),
        summary: res.text?.substring(0, 500),
        metadata: {
          score: res.score,
        }
      }));
    } catch (err) {
      console.error('Error scanning primary sources:', err);
      return [];
    }
  }

  /**
   * Scans for trending GitHub repositories and ArXiv papers.
   */
  async scanSocialSignals(): Promise<DiscoverySignal[]> {
    if (!this.exa) return [];

    try {
      const results = await this.exa.searchAndContents(
        "Trending AI GitHub repositories and breakthrough research papers on ArXiv from the last 24 hours.",
        {
          numResults: 5,
          useAutoprompt: true,
          category: 'research paper',
          includeDomains: ['github.com', 'arxiv.org']
        }
      );

      return results.results.map((res: any) => ({
        id: res.id,
        title: res.title,
        url: res.url,
        source: res.url.includes('github') ? 'GitHub' : 'ArXiv',
        publishedAt: res.publishedDate || new Date().toISOString(),
        summary: res.text?.substring(0, 500),
      }));
    } catch (err) {
      console.error('Error scanning social signals:', err);
      return [];
    }
  }

  private extractDomain(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'Unknown';
    }
  }

  private getMockSignals(): DiscoverySignal[] {
    return [
      {
        id: 'mock-1',
        title: 'OpenAI Announces GPT-5 Developer Preview',
        url: 'https://openai.com/blog/gpt-5-preview',
        source: 'openai.com',
        publishedAt: new Date().toISOString(),
        summary: 'OpenAI has released a developer preview of GPT-5, featuring enhanced reasoning and multimodel capabilities...',
      },
      {
        id: 'mock-2',
        title: 'Claude 4.0: Better Coding, Better Thinking',
        url: 'https://anthropic.com/claude-4',
        source: 'anthropic.com',
        publishedAt: new Date().toISOString(),
        summary: 'Anthropic introduces Claude 4.0, a new family of models that excels in logical reasoning and software engineering tasks...',
      }
    ];
  }
}
