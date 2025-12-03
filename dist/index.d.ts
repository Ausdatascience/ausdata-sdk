export { ProxyRequest, ProxyResponse, getApiKey as getServerApiKey, getBaseUrl as getServerBaseUrl, handleProxyRequest } from './server.js';

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
 * High-level business search helpers built on top of the core Ausdata client.
 *
 * These helpers are thin wrappers around `client.business.search` that provide
 * more expressive method names and common patterns for:
 *
 * - Free-text business name search
 * - 11-digit ABN lookup (with enriched ABR detail fields)
 * - Selecting the “first”/primary result
 */
declare class BusinessModule {
    private readonly client;
    constructor(client: Ausdata);
    /**
     * Utility: detect if a string looks like an ABN (11 digits after stripping spaces).
     * This is deliberately simple and does not perform checksum validation.
     */
    static looksLikeAbn(query: string): boolean;
    /**
     * Search for businesses by name or ABN.
     *
     * - If `q` is a free-text name, this returns a list of matching businesses.
     * - If `q` is an 11-digit ABN (spaces allowed), this returns at most one
     *   enriched BusinessEntity with ABR detail fields populated.
     */
    search(params: SearchBusinessParams): Promise<SearchBusinessResponseData>;
    /**
     * Convenience: search by **business name** (free text).
     *
     * This simply forwards to `search({ q: name, ... })` but keeps your
     * call-sites self-documenting and hides the low-level params object.
     */
    searchByName(name: string, options?: Omit<SearchBusinessParams, "q">): Promise<SearchBusinessResponseData>;
    /**
     * Convenience: run a search and return only the **first** result.
     *
     * - For name searches, this is typically the best-ranked match.
     * - For ABN lookups, this is the single enriched entity (if any).
     */
    searchFirst(params: SearchBusinessParams): Promise<BusinessEntity | undefined>;
    /**
     * Convenience helper for looking up a single business by ABN.
     * This wraps `business.search({ q: abn })` and returns the first result
     * (or undefined if nothing was found).
     */
    lookupByAbn(abn: string): Promise<BusinessEntity | undefined>;
    /**
     * Alias for `lookupByAbn` for callers that prefer a more explicit name.
     */
    searchByAbn(abn: string): Promise<BusinessEntity | undefined>;
}

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
    abnStatus?: string;
    gst?: string;
    businessNames?: string[];
    score?: number;
    nameType?: string;
    isCurrent?: string;
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

export { type ApiErrorCode, type ApiResponse, Ausdata, AusdataError, type BusinessEntity, BusinessModule, type ContactFormData, EmailTemplates, type RenderOptions, type SearchBusinessParams, type SearchBusinessResponseData, type SendEmailPayload, type SendEmailResponseData, type SubmitFormPayload, type SubmitFormResponseData, type TemplateName, renderEmailHtml, renderEmailText };
