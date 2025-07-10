
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { vercelToken } = await req.json();

    if (!vercelToken) {
      return NextResponse.json({ error: 'Vercel token is required' }, { status: 400 });
    }

    const response = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Vercel connection successful!' });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ success: false, error: `Vercel API error: ${errorData.error.message}` }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'An unexpected error occurred.' }, { status: 500 });
  }
} 