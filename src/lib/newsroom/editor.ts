import { GoogleGenerativeAI } from '@google/generative-ai';
import { DiscoverySignal } from '@/types';

const GEN_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export class Editor {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    if (GEN_AI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(GEN_AI_API_KEY);
    }
  }

  /**
   * Filters and ranks signals based on their relevance to software engineers.
   */
  async filterAndRank(signals: DiscoverySignal[]): Promise<DiscoverySignal[]> {
    if (!this.genAI) return signals;

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Analyze the following AI development signals and rank them (0-100) based on their impact and relevance to Software Engineers.
Signals:
${JSON.stringify(signals.map(s => ({ id: s.id, title: s.title, summary: s.summary })), null, 2)}

Return a JSON array of signals with their scores in this format: [{"id": "...", "score": number, "reasoning": "string"}]`;

      const result = await model.generateContent(prompt);
      const rankingData = JSON.parse(result.response.text());

      return signals.map(s => {
        const ranking = rankingData.find((rd: any) => rd.id === s.id);
        return {
          ...s,
          score: ranking ? ranking.score : 0,
        };
      }).sort((a, b) => (b.score || 0) - (a.score || 0));

    } catch (err) {
      console.error('Error in Editor filtering and ranking:', err);
      return [];
    }
  }

  /**
   * Summarizes a signal into key takeaways.
   */
  async summarize(signal: DiscoverySignal): Promise<{ keyTakeaways: string[], whyItMatters: string, excerpt: string }> {
    if (!this.genAI) return { keyTakeaways: [], whyItMatters: '', excerpt: '' };

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Distill the following AI news signal for a Software Engineer audience.
Title: ${signal.title}
Data: ${signal.summary}

Provide:
1. Three "Key Takeaways" for a developer.
2. A "Why it matters to Devs" insight.
3. A short excerpt (1-2 sentences).

Return a JSON object: {"keyTakeaways": ["...", "...", "..."], "whyItMatters": "...", "excerpt": "..."}`;

      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());

    } catch (err) {
      console.error('Error in Editor summarization:', err);
      return { keyTakeaways: [], whyItMatters: '', excerpt: '' };
    }
  }

  /**
   * Verified claims against multiple sources to avoid hallucinations.
   */
  async verifyClaims(signal: DiscoverySignal, sources: string[]): Promise<{ verified: boolean, confidence: number, notes: string }> {
    if (!this.genAI) return { verified: true, confidence: 100, notes: 'Verification skipped (No GenAI).' };

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Cross-reference and verify the following AI news claim.
Claim: ${signal.title} - ${signal.summary}
Sources provided: ${sources.join(', ')}

Check for:
1. Factual consistency across sources.
2. Potential hallucinations or "AI-slop" characteristics.
3. Technical accuracy.

Return a JSON object: {"verified": boolean, "confidence": number, "notes": "string"}`;

      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());

    } catch (err) {
      console.error('Error in Editor verification:', err);
      return { verified: false, confidence: 0, notes: 'Verification failed during processing.' };
    }
  }
}
