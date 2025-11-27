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
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #f0f0f0;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="background-color: #1a1a1a; padding: 40px 40px 30px 40px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: normal; letter-spacing: 1px;">
                Contact Inquiry
              </h1>
              <p style="margin: 10px 0 0 0; color: #cccccc; font-size: 14px; font-style: italic;">
                New submission received
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: normal; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
                      Contact Information
                    </h2>
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 12px 0; width: 120px; vertical-align: top;">
                          <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                        </td>
                        <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px;">
                          ${data.name}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; width: 120px; vertical-align: top; border-top: 1px solid #e0e0e0;">
                          <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                        </td>
                        <td style="padding: 12px 0; border-top: 1px solid #e0e0e0;">
                          <a href="mailto:${data.email}" style="color: #1a1a1a; font-size: 15px; text-decoration: none; border-bottom: 1px solid #1a1a1a;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 12px 0; width: 120px; vertical-align: top; border-top: 1px solid #e0e0e0;">
                          <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</strong>
                        </td>
                        <td style="padding: 12px 0; border-top: 1px solid #e0e0e0;">
                          <a href="tel:${data.phone}" style="color: #1a1a1a; font-size: 15px; text-decoration: none; border-bottom: 1px solid #1a1a1a;">${data.phone}</a>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.company ? `
                      <tr>
                        <td style="padding: 12px 0; width: 120px; vertical-align: top; border-top: 1px solid #e0e0e0;">
                          <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</strong>
                        </td>
                        <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px; border-top: 1px solid #e0e0e0;">
                          ${data.company}
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <div>
                <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: normal; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
                  Message
                </h2>
                <div style="padding: 20px; background-color: #fafafa; border-left: 3px solid #1a1a1a;">
                  <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>

              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                <tr>
                  <td style="text-align: center; padding: 20px 0;">
                    <a href="mailto:${data.email}" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 14px 40px; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Respond</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #1a1a1a; padding: 25px 40px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 12px; font-style: italic;">
                Received on ${submittedAt}
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
CONTACT INQUIRY
═══════════════════════════════════════

CONTACT INFORMATION
───────────────────────────────────────
Name:     ${data.name}
Email:    ${data.email}
${data.phone ? `Phone:    ${data.phone}` : ''}
${data.company ? `Company:  ${data.company}` : ''}

MESSAGE
───────────────────────────────────────
${data.message}

═══════════════════════════════════════
Received: ${submittedAt}
  `.trim();
}
