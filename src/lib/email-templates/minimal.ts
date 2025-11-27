interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export function generateHTML(data: ContactFormData): string {
  const submittedAt = new Date().toLocaleString('en-AU', {
    dateStyle: 'medium',
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
<body style="margin: 0; padding: 0; font-family: 'Courier New', monospace; background-color: #ffffff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 60px 20px;">
        <table role="presentation" style="max-width: 560px; margin: 0 auto; border: 2px solid #000;">
          
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #000;">
              <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                New Contact
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #000; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</strong><br>
                    <span style="color: #333; font-size: 16px; margin-top: 5px; display: block;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #000; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</strong><br>
                    <a href="mailto:${data.email}" style="color: #000; font-size: 16px; margin-top: 5px; display: block; text-decoration: underline;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #000; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</strong><br>
                    <a href="tel:${data.phone}" style="color: #000; font-size: 16px; margin-top: 5px; display: block; text-decoration: underline;">${data.phone}</a>
                  </td>
                </tr>
                ` : ''}
                ${data.company ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #000; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</strong><br>
                    <span style="color: #333; font-size: 16px; margin-top: 5px; display: block;">${data.company}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 20px 0 10px 0;">
                    <strong style="color: #000; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</strong><br>
                    <p style="margin: 10px 0 0 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 30px; background-color: #f5f5f5; border-top: 2px solid #000; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${submittedAt}</p>
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
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney'
  });

  return `
NEW CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NAME
${data.name}

EMAIL
${data.email}

${data.phone ? `PHONE\n${data.phone}\n\n` : ''}${data.company ? `COMPANY\n${data.company}\n\n` : ''}MESSAGE
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${submittedAt}
  `.trim();
}
