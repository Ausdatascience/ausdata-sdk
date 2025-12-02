/**
 * Ausdata SDK
 * Official TypeScript SDK for Ausdata API
 */

// --- Type Definitions from API Contract ---

export type ApiErrorCode = 
  | 'AUTH_001'  // Unauthorized
  | 'AUTH_002'  // Invalid API key
  | 'AUTH_003'  // API key not found
  | 'AUTH_004'  // API key inactive
  | 'AUTH_005'  // Insufficient scope
  | 'VAL_001'   // Validation error
  | 'VAL_002'   // Missing field
  | 'VAL_003'   // Invalid format
  | 'BIZ_001'   // Form not found
  | 'BIZ_002'   // Submission failed
  | 'DB_001'    // Database error
  | 'DB_002'    // Query failed
  | 'SRV_001'   // Internal error
  | 'SRV_002'   // Service unavailable
  | 'RATE_LIMIT'; // Rate limit exceeded

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: ApiErrorCode | string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
  };
}

// --- Email Module ---

export interface SendEmailPayload {
  to: string;
  subject: string;
  html?: string;
  text?: string; // One of html or text is required
  fromName?: string;
  fromEmail?: string;
}

export interface SendEmailResponseData {
  id: string;      // Message ID (UUID)
  status: string;  // 'queued' | 'sent'
  remainingCredits?: number; // Optional: remaining credits after deduction
}

// --- Form Module ---

export interface SubmitFormPayload {
  formId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>; // Flexible JSON data
}

export interface SubmitFormResponseData {
  id: string; // Submission ID (UUID)
  remainingCredits?: number; // Optional: remaining credits after deduction
}

// --- Business Search Module ---

export interface SearchBusinessParams {
  q: string;
  limit?: number;  // default 10
  offset?: number; // default 0
}

// Clean Business Entity (No database fields like createdAt)
export interface BusinessEntity {
  abn: string;
  name: string;
  state: string;
  postcode: string;
  status: string; // 'Active' | 'Cancelled' | 'Inactive'
  type: string;   // 'IND' | 'CO' | 'OTHER'
  industry?: string; // Optional: industry classification
  address?: string;  // Optional: full address
  // Extended ABR fields (available when searching by 11‑digit ABN)
  abnStatus?: string;        // e.g. "Active"
  gst?: string;              // e.g. "Registered (from 2000-07-01)" | "Not registered"
  businessNames?: string[];  // Trading names / business names
  // Name-search specific scoring/meta (mainly available for name searches).
  score?: number;      // Match score from name search (0‑100)
  nameType?: string;   // ABR name type code (e.g. "BN", "LN")
  isCurrent?: string;  // Raw current indicator from ABR (e.g. "Y"/"N")
}

export interface SearchBusinessResponseData {
  results: BusinessEntity[];
  total: number;
  credits_deducted: number;
  remaining_credits?: number; // Optional: remaining credits after deduction
  query?: string | null;     // Optional: the search query used
}

// --- Error Class ---

export class AusdataError extends Error {
  public readonly code: ApiErrorCode | string;
  public readonly details?: unknown;

  constructor(code: ApiErrorCode | string, message: string, details?: unknown) {
    super(message);
    this.name = 'AusdataError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AusdataError.prototype);
  }
}

// --- SDK Class ---

export class Ausdata {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
    this.baseUrl = (options?.baseUrl ?? 'https://app.ausdata.ai/api/v1').replace(/\/$/, '');
  }

  // Email module
  readonly email = {
    send: async (payload: SendEmailPayload): Promise<SendEmailResponseData> => {
      return this.request<SendEmailResponseData>('POST', '/emails/send', payload);
    },
  };

  // Forms module
  readonly forms = {
    submit: async (payload: SubmitFormPayload): Promise<SubmitFormResponseData> => {
      return this.request<SubmitFormResponseData>('POST', '/forms/submit', payload);
    },
  };

  // Business search module
  readonly business = {
    search: async (params: SearchBusinessParams): Promise<SearchBusinessResponseData> => {
      const queryParams = new URLSearchParams();
      queryParams.set('q', params.q);
      if (params.limit !== undefined) {
        queryParams.set('limit', params.limit.toString());
      }
      if (params.offset !== undefined) {
        queryParams.set('offset', params.offset.toString());
      }
      const queryString = queryParams.toString();
      const url = `/business/search${queryString ? `?${queryString}` : ''}`;
      return this.request<SearchBusinessResponseData>('GET', url);
    },
  };

  // Private request method
  private async request<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (method === 'POST' && body) {
      fetchOptions.body = JSON.stringify(body);
    }

    let response: Response;
    try {
      // Use global fetch (works in both Node.js 18+ and browsers)
      response = await fetch(url, fetchOptions);
    } catch (error) {
      throw new AusdataError(
        'NETWORK_ERROR',
        `Network request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }

    let apiResponse: ApiResponse<T>;
    try {
      apiResponse = await response.json();
    } catch (error) {
      throw new AusdataError(
        'PARSE_ERROR',
        `Failed to parse response: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }

    if (!response.ok || !apiResponse.success || apiResponse.error) {
      const error = apiResponse.error || {
        code: `HTTP_${response.status}`,
        message: response.statusText || 'Request failed',
      };
      throw new AusdataError(error.code, error.message, error.details);
    }

    if (!apiResponse.data) {
      throw new AusdataError(
        'INVALID_RESPONSE',
        'Response data is missing',
        apiResponse
      );
    }

    return apiResponse.data;
  }
}

// --- Re-export template utilities ---
export {
  renderEmailHtml,
  renderEmailText,
  EmailTemplates,
} from './templates';

export type {
  ContactFormData,
  TemplateName,
  RenderOptions,
} from './templates';

// Business helpers module
export { BusinessModule } from './business';
