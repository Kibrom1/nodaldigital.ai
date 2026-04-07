import { Newsroom } from '../src/lib/newsroom';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables for local/CI execution
dotenv.config();

async function runAgent() {
  console.log('🚀 Starting Agentic Newsroom Runner...');
  
  // Verify required env vars
  const required = ['EXA_API_KEY', 'GOOGLE_GENERATIVE_AI_API_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    console.warn('Stay calm. The agent will attempt to run with mock data if allowed by the sub-agents, but primary intelligence will be disabled.');
  }

  const newsroom = new Newsroom();
  
  try {
    const posts = await newsroom.runDailyCycle();
    if (posts.length > 0) {
      console.log(`✅ Success: Agent published ${posts.length} new posts.`);
    } else {
      console.log('ℹ️ Cycle complete: No high-signal news found today. No posts published.');
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Agent Execution Failed:', error);
    process.exit(1);
  }
}

runAgent();
