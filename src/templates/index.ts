import * as corporate from './corporate';
import * as minimal from './minimal';
import * as modern from './modern';
import * as playful from './playful';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const templates = {
  corporate,
  minimal,
  modern,
  playful,
};

export type TemplateName = keyof typeof templates;

export interface RenderOptions {
  template?: TemplateName;
}

const DEFAULT_TEMPLATE: TemplateName = 'modern';

export function renderEmailHtml(
  data: ContactFormData,
  options?: RenderOptions
) {
  const template = options?.template ?? DEFAULT_TEMPLATE;
  return templates[template].generateHTML(data);
}

export function renderEmailText(
  data: ContactFormData,
  options?: RenderOptions
) {
  const template = options?.template ?? DEFAULT_TEMPLATE;
  return templates[template].generateText(data);
}

export const EmailTemplates = {
  list(): TemplateName[] {
    return Object.keys(templates) as TemplateName[];
  },
};
