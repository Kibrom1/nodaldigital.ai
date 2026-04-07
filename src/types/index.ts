export interface DiscoverySignal {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary?: string;
  score?: number;
  metadata?: Record<string, any>;
}

export interface NewsPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedDate: string;
  author: string;
  category: string;
  thumbnailUrl?: string;
  relevanceScore: number;
  keyTakeaways: string[];
  whyItMatters: string;
  sources: string[];
  metaDescription: string;
  tags: string[];
}
