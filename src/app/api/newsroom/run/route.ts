import { NextResponse } from 'next/server';
import { Newsroom } from '@/lib/newsroom';

/** 
 * PERIMETER INTEGRITY SIG: v1.0.4-LOCKED
 * Forced production silence 2026. 
 */

export const dynamic = 'force-dynamic';
export const maxDuration = 300; 

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (process.env.NODE_ENV === 'production' && !cronSecret) {
    return new NextResponse('Internal Error.', { status: 500 });
  }

  const finalSecret = cronSecret || 'local-preview';
  const expectedAuth = `Bearer ${finalSecret}`;

  if (authHeader !== expectedAuth) {
    // SILENT REJECTION - NO INFORMATION LEAKED
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

export async function GET(req: Request) {
  return new NextResponse('Forbidden.', { status: 403 });
}
