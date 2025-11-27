import * as modern from './email-templates/modern';
import * as minimal from './email-templates/minimal';
import * as corporate from './email-templates/corporate';
import * as playful from './email-templates/playful';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export type EmailTemplate = 'modern' | 'minimal' | 'corporate' | 'playful';

// ============================================
// 🎨 CHANGE EMAIL TEMPLATE HERE
// ============================================
// Options: 'modern' | 'minimal' | 'corporate' | 'playful'
const ACTIVE_TEMPLATE: EmailTemplate = 'playful';
// ============================================

const templates = {
  modern,
  minimal,
  corporate,
  playful
};

export function generateEmailHTML(data: ContactFormData): string {
  return templates[ACTIVE_TEMPLATE].generateHTML(data);
}

export function generateEmailText(data: ContactFormData): string {
  return templates[ACTIVE_TEMPLATE].generateText(data);
}
