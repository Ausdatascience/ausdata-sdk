import { NextRequest, NextResponse } from 'next/server';

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

    const response = await fetch('https://api.ausdata.app/api/v1/forms/submit', {
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
            subject: `New Contact Form Submission from ${body.data.name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${body.data.name}</p>
              <p><strong>Email:</strong> ${body.data.email}</p>
              ${body.data.phone ? `<p><strong>Phone:</strong> ${body.data.phone}</p>` : ''}
              ${body.data.company ? `<p><strong>Company:</strong> ${body.data.company}</p>` : ''}
              <p><strong>Message:</strong></p>
              <p>${body.data.message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
            `,
            text: `
New Contact Form Submission

Name: ${body.data.name}
Email: ${body.data.email}
${body.data.phone ? `Phone: ${body.data.phone}` : ''}
${body.data.company ? `Company: ${body.data.company}` : ''}
Message: ${body.data.message}

Submitted at: ${new Date().toLocaleString()}
            `
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
