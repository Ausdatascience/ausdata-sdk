import { NextRequest, NextResponse } from 'next/server';
import { generateEmailHTML, generateEmailText } from '@/lib/email-template';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: { message: 'API Key 未配置' } },
        { status: 500 }
      );
    }

    const apiUrl = process.env.AUSDATA_API_URL || 'https://api.ausdata.app';

    const response = await fetch(`${apiUrl}/api/v1/forms/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        formId: 'contact-form',
        data: body.data
      })
    });

    const result = await response.json();

    // If form submission successful, send email notification
    if (response.ok && result.success) {
      try {
        const baseUrl = request.nextUrl.origin;
        const emailResponse = await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: 'ausdata.ai@gmail.com',
            subject: `📬 New Contact: ${body.data.name}${body.data.company ? ` from ${body.data.company}` : ''}`,
            html: generateEmailHTML(body.data),
            text: generateEmailText(body.data)
          })
        });

        if (!emailResponse.ok) {
          console.error('Email sending failed:', await emailResponse.text());
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the form submission if email fails
      }
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('API 代理错误:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error instanceof Error ? error.message : '服务器错误' 
        } 
      },
      { status: 500 }
    );
  }
}
