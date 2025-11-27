import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: { message: 'API Key not configured' } },
        { status: 500 }
      );
    }

    const apiUrl = process.env.AUSDATA_API_URL || 'https://api.ausdata.app';

    const response = await fetch(`${apiUrl}/api/v1/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: body.to,
        subject: body.subject,
        html: body.html,
        text: body.text
      })
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error instanceof Error ? error.message : 'Server error' 
        } 
      },
      { status: 500 }
    );
  }
}
