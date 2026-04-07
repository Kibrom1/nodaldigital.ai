import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NewsPost } from '@/types';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '';

export class Publisher {
  private supabase: SupabaseClient | null = null;

  constructor() {
    if (SUPABASE_URL && SUPABASE_KEY) {
      this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    }
  }

  /**
   * Publishes a news post to Supabase.
   */
  async publish(post: NewsPost): Promise<boolean> {
    if (!this.supabase) {
      console.warn('Supabase not configured. Simulating publication.');
      return true;
    }

    try {
      const { data, error } = await this.supabase
        .from('news_posts')
        .upsert(post, { onConflict: 'slug' });

      if (error) {
        console.error('Error publishing to Supabase:', error);
        return false;
      }

      console.log('Post published successfully:', post.slug);
      return true;

    } catch (err) {
      console.error('Error in Publisher publication:', err);
      return false;
    }
  }
}
