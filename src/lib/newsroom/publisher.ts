import { Octokit } from '@octokit/rest';
import { NewsPost } from '@/types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER || 'Kb'; // Standardizing on your workspace name
const REPO_NAME = process.env.REPO_NAME || 'nodaldigital.ai';

export class Publisher {
  private octokit: Octokit | null = null;

  constructor() {
    if (GITHUB_TOKEN) {
      this.octokit = new Octokit({ auth: GITHUB_TOKEN });
    }
  }

  /**
   * Publishes a news post as a Markdown file to GitHub.
   * This is a fully agentic action with no manual intervention.
   */
  async publish(post: NewsPost): Promise<boolean> {
    if (!this.octokit) {
      console.warn('⚠️ GITHUB_TOKEN not found. Using local filesystem simulation.');
      return this.simulateLocalPublish(post);
    }

    try {
      const path = `content/posts/${post.slug}.md`;
      const content = this.formatMarkdown(post);
      const message = `🤖 newsroom: publish ${post.slug}`;

      // Check if file already exists to get its SHA (required for updating)
      let sha: string | undefined;
      try {
        const { data }: any = await this.octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path,
        });
        sha = data.sha;
      } catch (e) {
        // File does not exist yet, which is expected for new posts
      }

      await this.octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
      });

      console.log(`✅ Agentic Publication Successful: GitHub://${REPO_OWNER}/${REPO_NAME}/${path}`);
      return true;

    } catch (err) {
      console.error('❌ Agentic Publication Failed:', err);
      return false;
    }
  }

  /**
   * Formats the post objects into a standardized Markdown file with YAML Frontmatter.
   */
  private formatMarkdown(post: NewsPost): string {
    return `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.publishedDate}"
author: "${post.author}"
excerpt: "${post.excerpt.replace(/"/g, '\\"')}"
category: "${post.category}"
relevanceScore: ${post.relevanceScore}
tags: ${JSON.stringify(post.tags)}
sources: ${JSON.stringify(post.sources)}
---

${post.content}

## Key Takeaways
${post.keyTakeaways.map(t => `* ${t}`).join('\n')}

## Why It Matters
${post.whyItMatters}
`;
  }

  /**
   * Fallback for local development or missing tokens.
   */
  private async simulateLocalPublish(post: NewsPost): Promise<boolean> {
    console.log('--- AGENTIC PUBLISH SIMULATION ---');
    console.log(`Target: /content/posts/${post.slug}.md`);
    console.log('Content Start:', this.formatMarkdown(post).substring(0, 100) + '...');
    return true;
  }
}
