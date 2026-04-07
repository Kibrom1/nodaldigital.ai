import { NextResponse } from 'next/server';
import { Newsroom } from '@/lib/newsroom';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minute timeout for deep AI research

/**
 * FULLY AGENTIC TRIGGER
 * This route is called by Vercel Cron or GitHub Actions.
 */
export async function POST(req: Request) {
  // Security Check
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('⚠️ Unauthorized trigger attempt on Newsroom.');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const newsroom = new Newsroom();
    const results = await newsroom.runDailyCycle();

    return NextResponse.json({
      status: 'success',
      published: results.length,
      signals: results.map(r => r.slug)
    });
  } catch (error: any) {
    console.error('❌ CRITICAL ERROR in Agentic Newsroom:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message 
    }, { status: 500 });
  }
}

// Allow GET for easy manual testing in browser (if you provide the secret via query)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.CRON_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const newsroom = new Newsroom();
  const results = await newsroom.runDailyCycle();
  return NextResponse.json(results);
}
