import { Scout } from './scout';
import { Editor } from './editor';
import { Writer } from './writer';
import { Publisher } from './publisher';
import { DiscoverySignal, NewsPost } from '@/types';

export class Newsroom {
  private scout: Scout;
  private editor: Editor;
  private writer: Writer;
  private publisher: Publisher;

  constructor() {
    this.scout = new Scout();
    this.editor = new Editor();
    this.writer = new Writer();
    this.publisher = new Publisher();
  }

  /**
   * Orchestrates the entire pipeline from discovery to publication.
   */
  async runDailyCycle(): Promise<NewsPost[]> {
    console.log('🔄 Starting Daily AI News Cycle...');

    // Phase 1: Scout
    const githubSignals = await this.scout.scanSocialSignals();
    const blogSignals = await this.scout.scanPrimarySources();
    const allSignals = [...githubSignals, ...blogSignals];

    console.log(`✅ Scout Phase: Found ${allSignals.length} potential signals.`);

    // Phase 2: Editor
    const rankedSignals = await this.editor.filterAndRank(allSignals);
    const topSignals = rankedSignals.filter(s => (s.score || 0) > 20).slice(0, 5);

    console.log(`✅ Editor Phase: Screened signals down to ${topSignals.length} high-signal developments.`);

    // Phase 3 & 4: Writer & Publisher
    const publishedPosts: NewsPost[] = [];

    for (const signal of topSignals) {
      console.log(`✍️ Processing signal: ${signal.title}`);
      
      // Accuracy Phase: Source Check
      const verification = await this.editor.verifyClaims(signal, [signal.url, ...(signal.metadata?.otherSources || [])]);
      if (!verification.verified || verification.confidence < 70) {
        console.warn(`⚠️ Verification failed for: ${signal.title}. Skipping. Notes: ${verification.notes}`);
        continue;
      }

      const summary = await this.editor.summarize(signal);
      const post = await this.writer.generatePost(signal, summary);
      
      const success = await this.publisher.publish(post);
      if (success) {
        publishedPosts.push(post);
      }
    }

    console.log(`🏁 Cycle Complete: Published ${publishedPosts.length} posts.`);
    return publishedPosts;
  }
}
