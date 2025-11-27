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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                📬 New Contact Form Submission
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 6px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; width: 24px;">👤</span>
                          <strong style="color: #333;">Name:</strong>
                          <span style="color: #666; margin-left: 8px;">${data.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; width: 24px;">📧</span>
                          <strong style="color: #333;">Email:</strong>
                          <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none; margin-left: 8px;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; width: 24px;">📱</span>
                          <strong style="color: #333;">Phone:</strong>
                          <a href="tel:${data.phone}" style="color: #667eea; text-decoration: none; margin-left: 8px;">${data.phone}</a>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.company ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; width: 24px;">🏢</span>
                          <strong style="color: #333;">Company:</strong>
                          <span style="color: #666; margin-left: 8px;">${data.company}</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px; font-weight: 600;">💬 Message</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>

              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 5px 0 0; width: 50%;">
                    <a href="mailto:${data.email}" style="display: block; text-align: center; background-color: #667eea; color: #fff; padding: 14px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">Reply via Email</a>
                  </td>
                  ${data.phone ? `
                  <td style="padding: 0 0 0 5px; width: 50%;">
                    <a href="tel:${data.phone}" style="display: block; text-align: center; background-color: #10b981; color: #fff; padding: 14px 20px; text-decoration: none; border-radius: 8px; font-weight: 500;">Call Now</a>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #999; font-size: 13px;">🕐 ${submittedAt}</p>
              <p style="margin: 0; color: #999; font-size: 12px;">Automated notification from contact form</p>
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
NEW CONTACT FORM SUBMISSION
═══════════════════════════════════════

Name:     ${data.name}
Email:    ${data.email}
${data.phone ? `Phone:    ${data.phone}` : ''}
${data.company ? `Company:  ${data.company}` : ''}

MESSAGE
───────────────────────────────────────
${data.message}

═══════════════════════════════════════
Submitted: ${submittedAt}
  `.trim();
}
