interface ContactFormData$4 {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}
declare function generateHTML$3(data: ContactFormData$4): string;
declare function generateText$3(data: ContactFormData$4): string;

declare namespace corporate {
  export { generateHTML$3 as generateHTML, generateText$3 as generateText };
}

interface ContactFormData$3 {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}
declare function generateHTML$2(data: ContactFormData$3): string;
declare function generateText$2(data: ContactFormData$3): string;

declare namespace minimal {
  export { generateHTML$2 as generateHTML, generateText$2 as generateText };
}

interface ContactFormData$2 {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}
declare function generateHTML$1(data: ContactFormData$2): string;
declare function generateText$1(data: ContactFormData$2): string;

declare namespace modern {
  export { generateHTML$1 as generateHTML, generateText$1 as generateText };
}

interface ContactFormData$1 {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}
declare function generateHTML(data: ContactFormData$1): string;
declare function generateText(data: ContactFormData$1): string;

declare const playful_generateHTML: typeof generateHTML;
declare const playful_generateText: typeof generateText;
declare namespace playful {
  export { playful_generateHTML as generateHTML, playful_generateText as generateText };
}

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}
declare const templates: {
    corporate: typeof corporate;
    minimal: typeof minimal;
    modern: typeof modern;
    playful: typeof playful;
};
type TemplateName = keyof typeof templates;
interface RenderOptions {
    template?: TemplateName;
}
declare function renderEmailHtml(data: ContactFormData, options?: RenderOptions): string;
declare function renderEmailText(data: ContactFormData, options?: RenderOptions): string;
declare const EmailTemplates: {
    list(): TemplateName[];
};

export { type ContactFormData, EmailTemplates, type RenderOptions, type TemplateName, renderEmailHtml, renderEmailText };
