import { NextResponse } from 'next/server';
import { Newsroom } from '@/lib/newsroom';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; 

/**
 * PRODUCTION-SECURE AGENTIC TRIGGER
 * Strictly protected. Absolutely zero information leakage on 401.
 */
export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  // SECURE PRODUCTION POLICY: Strict requirement, no fallback in Vercel
  if (process.env.NODE_ENV === 'production' && !cronSecret) {
    return new NextResponse('Configuration Error.', { status: 500 });
  }

  const finalSecret = cronSecret || 'local-preview';
  const expectedAuth = `Bearer ${finalSecret}`;

  if (authHeader !== expectedAuth) {
    // SILENT REJECTION: No information leaked to the requestor
    return new NextResponse('Unauthorized.', { status: 401 });
  }

  try {
    const newsroom = new Newsroom();
    const results = await newsroom.runDailyCycle();

    return NextResponse.json({
      status: 'success',
      published: results.length
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error'
    }, { status: 500 });
  }
}

/**
 * RESTRICTED GET ACCESS
 * Disabled in production. No secret leakage.
 */
export async function GET(req: Request) {
  return new NextResponse('Forbidden.', { status: 403 });
}
