import { ImageResponse } from 'next/og';
// App router path: src/app/api/og/route.tsx

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const title = searchParams.get('title');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0a0a0c',
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="15" x2="23" y2="15"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="15" x2="4" y2="15"></line>
              </svg>
            </div>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              SYNTHO<span style={{ color: '#6366f1' }}>NET</span>
            </span>
          </div>
          <h1
            style={{
              fontSize: '84px',
              fontWeight: '900',
              color: 'white',
              lineHeight: '1.1',
              letterSpacing: '-0.04em',
              marginBottom: '20px',
            }}
          >
            {title || 'AI Intelligence'}
          </h1>
          <div
            style={{
              height: '4px',
              width: '200px',
              background: 'linear-gradient(90deg, #6366f1, #a855f7)',
              borderRadius: '2px',
              marginBottom: '40px',
            }}
          ></div>
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.4)',
              fontWeight: '500',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Verified Autonomous Insight • v1.0
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
