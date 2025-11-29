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

/**
 * Ausdata SDK
 * Official TypeScript SDK for Ausdata API
 */
type ApiErrorCode = 'AUTH_001' | 'AUTH_002' | 'AUTH_003' | 'AUTH_004' | 'AUTH_005' | 'VAL_001' | 'VAL_002' | 'VAL_003' | 'BIZ_001' | 'BIZ_002' | 'DB_001' | 'DB_002' | 'SRV_001' | 'SRV_002' | 'RATE_LIMIT';
interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        code: ApiErrorCode | string;
        message: string;
        details?: any;
    };
}
interface SendEmailPayload {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    fromName?: string;
    fromEmail?: string;
}
interface SendEmailResponseData {
    id: string;
    status: string;
    remainingCredits?: number;
}
interface SubmitFormPayload {
    formId: string;
    data: Record<string, any>;
}
interface SubmitFormResponseData {
    id: string;
    remainingCredits?: number;
}
interface SearchBusinessParams {
    q: string;
    limit?: number;
    offset?: number;
}
interface BusinessEntity {
    abn: string;
    name: string;
    state: string;
    postcode: string;
    status: string;
    type: string;
    industry?: string;
    address?: string;
}
interface SearchBusinessResponseData {
    results: BusinessEntity[];
    total: number;
    credits_deducted: number;
    remaining_credits?: number;
    query?: string | null;
}
declare class AusdataError extends Error {
    readonly code: ApiErrorCode | string;
    readonly details?: unknown;
    constructor(code: ApiErrorCode | string, message: string, details?: unknown);
}
declare class Ausdata {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(apiKey: string, options?: {
        baseUrl?: string;
    });
    readonly email: {
        send: (payload: SendEmailPayload) => Promise<SendEmailResponseData>;
    };
    readonly forms: {
        submit: (payload: SubmitFormPayload) => Promise<SubmitFormResponseData>;
    };
    readonly business: {
        search: (params: SearchBusinessParams) => Promise<SearchBusinessResponseData>;
    };
    private request;
}

export { type ApiErrorCode, type ApiResponse, Ausdata, AusdataError, type BusinessEntity, type ContactFormData, EmailTemplates, type RenderOptions, type SearchBusinessParams, type SearchBusinessResponseData, type SendEmailPayload, type SendEmailResponseData, type SubmitFormPayload, type SubmitFormResponseData, type TemplateName, renderEmailHtml, renderEmailText };
