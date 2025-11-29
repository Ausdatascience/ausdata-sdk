"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AusdataApiError: () => AusdataApiError,
  AusdataClient: () => AusdataClient,
  EmailTemplates: () => EmailTemplates,
  renderEmailHtml: () => renderEmailHtml,
  renderEmailText: () => renderEmailText
});
module.exports = __toCommonJS(index_exports);

// src/templates/corporate.ts
var corporate_exports = {};
__export(corporate_exports, {
  generateHTML: () => generateHTML,
  generateText: () => generateText
});
function generateHTML(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
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
                      ` : ""}
                      ${data.company ? `
                      <tr>
                        <td style="padding: 12px 0; width: 120px; vertical-align: top; border-top: 1px solid #e0e0e0;">
                          <strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</strong>
                        </td>
                        <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px; border-top: 1px solid #e0e0e0;">
                          ${data.company}
                        </td>
                      </tr>
                      ` : ""}
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
function generateText(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
  });
  return `
CONTACT INQUIRY
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

CONTACT INFORMATION
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
Name:     ${data.name}
Email:    ${data.email}
${data.phone ? `Phone:    ${data.phone}` : ""}
${data.company ? `Company:  ${data.company}` : ""}

MESSAGE
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
${data.message}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Received: ${submittedAt}
  `.trim();
}

// src/templates/minimal.ts
var minimal_exports = {};
__export(minimal_exports, {
  generateHTML: () => generateHTML2,
  generateText: () => generateText2
});
function generateHTML2(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
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
                ` : ""}
                ${data.company ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <strong style="color: #000; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</strong><br>
                    <span style="color: #333; font-size: 16px; margin-top: 5px; display: block;">${data.company}</span>
                  </td>
                </tr>
                ` : ""}
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
function generateText2(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
  });
  return `
NEW CONTACT
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

NAME
${data.name}

EMAIL
${data.email}

${data.phone ? `PHONE
${data.phone}

` : ""}${data.company ? `COMPANY
${data.company}

` : ""}MESSAGE
${data.message}

\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
${submittedAt}
  `.trim();
}

// src/templates/modern.ts
var modern_exports = {};
__export(modern_exports, {
  generateHTML: () => generateHTML3,
  generateText: () => generateText3
});
function generateHTML3(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
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
                \u{1F4EC} New Contact Form Submission
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
                          <span style="display: inline-block; width: 24px;">\u{1F464}</span>
                          <strong style="color: #333;">Name:</strong>
                          <span style="color: #666; margin-left: 8px;">${data.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; width: 24px;">\u{1F4E7}</span>
                          <strong style="color: #333;">Email:</strong>
                          <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none; margin-left: 8px;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; width: 24px;">\u{1F4F1}</span>
                          <strong style="color: #333;">Phone:</strong>
                          <a href="tel:${data.phone}" style="color: #667eea; text-decoration: none; margin-left: 8px;">${data.phone}</a>
                        </td>
                      </tr>
                      ` : ""}
                      ${data.company ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="display: inline-block; width: 24px;">\u{1F3E2}</span>
                          <strong style="color: #333;">Company:</strong>
                          <span style="color: #666; margin-left: 8px;">${data.company}</span>
                        </td>
                      </tr>
                      ` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px; font-weight: 600;">\u{1F4AC} Message</h2>
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
                  ` : ""}
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #999; font-size: 13px;">\u{1F550} ${submittedAt}</p>
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
function generateText3(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
  });
  return `
NEW CONTACT FORM SUBMISSION
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

Name:     ${data.name}
Email:    ${data.email}
${data.phone ? `Phone:    ${data.phone}` : ""}
${data.company ? `Company:  ${data.company}` : ""}

MESSAGE
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
${data.message}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Submitted: ${submittedAt}
  `.trim();
}

// src/templates/playful.ts
var playful_exports = {};
__export(playful_exports, {
  generateHTML: () => generateHTML4,
  generateText: () => generateText4
});
function generateHTML4(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
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
              <div style="font-size: 60px; margin-bottom: 10px;">\u{1F389}</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                Woohoo! New Message!
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                Someone wants to chat! \u{1F4AC}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">\u{1F464}</div>
                      <strong style="color: #ffffff; font-size: 14px;">Name</strong><br>
                      <span style="color: #ffffff; font-size: 18px; font-weight: bold;">${data.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">\u{1F4E7}</div>
                      <strong style="color: #ffffff; font-size: 14px;">Email</strong><br>
                      <a href="mailto:${data.email}" style="color: #ffffff; font-size: 16px; text-decoration: underline;">${data.email}</a>
                    </td>
                  </tr>
                  ${data.phone ? `
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">\u{1F4F1}</div>
                      <strong style="color: #ffffff; font-size: 14px;">Phone</strong><br>
                      <a href="tel:${data.phone}" style="color: #ffffff; font-size: 16px; text-decoration: underline;">${data.phone}</a>
                    </td>
                  </tr>
                  ` : ""}
                  ${data.company ? `
                  <tr>
                    <td style="padding: 10px 0;">
                      <div style="font-size: 24px; margin-bottom: 5px;">\u{1F3E2}</div>
                      <strong style="color: #ffffff; font-size: 14px;">Company</strong><br>
                      <span style="color: #ffffff; font-size: 18px; font-weight: bold;">${data.company}</span>
                    </td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <div style="margin-bottom: 30px;">
                <div style="font-size: 32px; margin-bottom: 10px;">\u{1F48C}</div>
                <h2 style="margin: 0 0 15px 0; color: #667eea; font-size: 22px; font-weight: bold;">Their Message</h2>
                <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(252, 182, 159, 0.3);">
                  <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>

              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding: 10px;">
                    <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                      \u{1F680} Reply Now!
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 25px 30px; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px; font-weight: bold;">
                \u23F0 ${submittedAt}
              </p>
              <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">
                Time to make someone's day! \u2728
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
function generateText4(data) {
  const submittedAt = (/* @__PURE__ */ new Date()).toLocaleString("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Sydney"
  });
  return `
\u{1F389} WOOHOO! NEW MESSAGE! \u{1F389}
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

\u{1F464} NAME
${data.name}

\u{1F4E7} EMAIL
${data.email}

${data.phone ? `\u{1F4F1} PHONE
${data.phone}

` : ""}${data.company ? `\u{1F3E2} COMPANY
${data.company}

` : ""}\u{1F48C} MESSAGE
${data.message}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
\u23F0 ${submittedAt}
  `.trim();
}

// src/templates/index.ts
var templates = {
  corporate: corporate_exports,
  minimal: minimal_exports,
  modern: modern_exports,
  playful: playful_exports
};
var DEFAULT_TEMPLATE = "modern";
function renderEmailHtml(data, options) {
  const template = options?.template ?? DEFAULT_TEMPLATE;
  return templates[template].generateHTML(data);
}
function renderEmailText(data, options) {
  const template = options?.template ?? DEFAULT_TEMPLATE;
  return templates[template].generateText(data);
}
var EmailTemplates = {
  list() {
    return Object.keys(templates);
  }
};

// src/client.ts
var import_cross_fetch = __toESM(require("cross-fetch"), 1);
var AusdataApiError = class _AusdataApiError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    Object.setPrototypeOf(this, _AusdataApiError.prototype);
    this.name = "AusdataApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
};
var AusdataClient = class {
  constructor(options) {
    if (!options?.apiKey) {
      throw new Error("AusData API key is required");
    }
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? "https://api.ausdata.app").replace(/\/$/, "");
    this.fetchImpl = options.fetchImpl;
  }
  async submitForm(params) {
    if (!params?.formId) {
      throw new Error("formId is required");
    }
    if (!params.data || typeof params.data !== "object") {
      throw new Error("data must be an object");
    }
    return this.post("/api/v1/forms/submit", {
      formId: params.formId,
      data: params.data
    });
  }
  async sendEmail(params) {
    if (!params?.to) {
      throw new Error('"to" is required');
    }
    if (!params.subject) {
      throw new Error('"subject" is required');
    }
    if (!params.html && !params.text) {
      throw new Error('Either "html" or "text" content must be provided');
    }
    return this.post("/api/v1/emails/send", {
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      fromEmail: params.fromEmail,
      fromName: params.fromName
    });
  }
  async searchBusiness(params) {
    const query = params?.query || "";
    const queryString = query ? `?q=${encodeURIComponent(query)}` : "";
    return this.get(`/api/v1/business/search${queryString}`);
  }
  async get(path) {
    const fetchFn = this.fetchImpl ?? (typeof window !== "undefined" ? window.fetch : import_cross_fetch.default);
    const response = await fetchFn(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      }
    });
    let payload;
    try {
      payload = await response.json();
    } catch {
      payload = void 0;
    }
    if (!response.ok) {
      const message = (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" ? payload.error : response.statusText) || "AusData API request failed";
      const error = new AusdataApiError(message, response.status, payload);
      throw error;
    }
    return payload;
  }
  async post(path, body) {
    const fetchFn = this.fetchImpl ?? (typeof window !== "undefined" ? window.fetch : import_cross_fetch.default);
    const response = await fetchFn(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    let payload;
    try {
      payload = await response.json();
    } catch {
      payload = void 0;
    }
    if (!response.ok) {
      const message = (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" ? payload.error : response.statusText) || "AusData API request failed";
      const error = new AusdataApiError(message, response.status, payload);
      throw error;
    }
    return payload;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AusdataApiError,
  AusdataClient,
  EmailTemplates,
  renderEmailHtml,
  renderEmailText
});
