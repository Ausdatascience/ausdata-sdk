interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export function generateHTML(data: ContactFormData): string {
  const submittedAt = new Date().toLocaleString('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center; position: relative;">
              <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                Woohoo! New Message!
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                Someone wants to chat! 💬
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">👤</div>
                      <strong style="color: #ffffff; font-size: 14px;">Name</strong><br>
                      <span style="color: #ffffff; font-size: 18px; font-weight: bold;">${data.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">📧</div>
                      <strong style="color: #ffffff; font-size: 14px;">Email</strong><br>
                      <a href="mailto:${data.email}" style="color: #ffffff; font-size: 16px; text-decoration: underline;">${data.email}</a>
                    </td>
                  </tr>
                  ${data.phone ? `
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">📱</div>
                      <strong style="color: #ffffff; font-size: 14px;">Phone</strong><br>
                      <a href="tel:${data.phone}" style="color: #ffffff; font-size: 16px; text-decoration: underline;">${data.phone}</a>
                    </td>
                  </tr>
                  ` : ''}
                  ${data.company ? `
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">🏢</div>
                      <strong style="color: #ffffff; font-size: 14px;">Company</strong><br>
                      <span style="color: #ffffff; font-size: 18px; font-weight: bold;">${data.company}</span>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <div style="margin-bottom: 30px;">
                <div style="font-size: 32px; margin-bottom: 10px;">💌</div>
                <h2 style="margin: 0 0 15px 0; color: #667eea; font-size: 22px; font-weight: bold;">Their Message</h2>
                <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(252, 182, 159, 0.3);">
                  <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>

              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding: 10px;">
                    <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                      🚀 Reply Now!
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 25px 30px; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px; font-weight: bold;">
                ⏰ ${submittedAt}
              </p>
              <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">
                Time to make someone's day! ✨
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateText(data: ContactFormData): string {
  const submittedAt = new Date().toLocaleString('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney'
  });

  return `
🎉 WOOHOO! NEW MESSAGE! 🎉
═══════════════════════════════════════

👤 NAME
${data.name}

📧 EMAIL
${data.email}

${data.phone ? `📱 PHONE\n${data.phone}\n\n` : ''}${data.company ? `🏢 COMPANY\n${data.company}\n\n` : ''}💌 MESSAGE
${data.message}

═══════════════════════════════════════
⏰ ${submittedAt}
  `.trim();
}
