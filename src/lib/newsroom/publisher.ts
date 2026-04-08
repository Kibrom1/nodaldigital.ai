import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import { NewsPost } from '@/types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER || 'Kibrom1'; // Matching your workspace ID
const REPO_NAME = process.env.REPO_NAME || 'nodaldigital.ai';

export class Publisher {
  private octokit: Octokit | null = null;

  constructor() {
    if (GITHUB_TOKEN) {
      this.octokit = new Octokit({ auth: GITHUB_TOKEN });
    }
  }

  /**
   * Publishes a news post. Uses GitHub in Production or Filesystem in Local.
   */
  async publish(post: NewsPost): Promise<boolean> {
    if (!this.octokit) {
      console.warn('⚠️ GITHUB_TOKEN missing. Using Local Filesystem Publish.');
      return this.localPublish(post);
    }

    try {
      const filePath = `content/posts/${post.slug}.md`;
      const markdown = this.formatMarkdown(post);
      const message = `🤖 agent: discovery publish [${post.slug}]`;

      // Check for existing file SHA for updates
      let sha: string | undefined;
      try {
        const { data }: any = await this.octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: filePath,
        });
        sha = data.sha;
      } catch (e) {}

      await this.octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
        message,
        content: Buffer.from(markdown).toString('base64'),
        sha,
      });

      console.log(`✅ GitHub Publish Success: ${REPO_OWNER}/${REPO_NAME}`);
      return true;
    } catch (err) {
      console.error('❌ GitHub Publish Failed:', err);
      return false;
    }
  }

  /**
   * Writes the post to the local content directory for instant feedback.
   */
  private async localPublish(post: NewsPost): Promise<boolean> {
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const filePath = path.join(postsDir, `${post.slug}.md`);

    try {
      if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
      }
      const markdown = this.formatMarkdown(post);
      fs.writeFileSync(filePath, markdown);
      console.log(`✅ Local Discovery Log Saved: ${filePath}`);
      return true;
    } catch (err) {
      console.error('❌ Local Publish Failed:', err);
      return false;
    }
  }

  /**
   * Formats technical synthesis into YAML Frontmatter Markdown.
   */
  private formatMarkdown(post: NewsPost): string {
    return `---
title: "${post.title.replace(/"/g, '\\"')}"
publishedDate: "${post.publishedDate}"
author: "${post.author}"
category: "${post.category}"
relevanceScore: ${post.relevanceScore}
excerpt: "${post.excerpt.replace(/"/g, '\\"')}"
keyTakeaways: 
${post.keyTakeaways.map(t => `  - "${t.replace(/"/g, '\\"')}"`).join('\n')}
whyItMatters: "${post.whyItMatters.replace(/"/g, '\\"')}"
sources: 
${post.sources.map(s => `  - "${s}"`).join('\n')}
tags: ${JSON.stringify(post.tags)}
---

${post.content}
`;
  }
}
