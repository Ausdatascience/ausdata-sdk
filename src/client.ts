import fetch from 'cross-fetch'

export class AusdataApiError extends Error {
  public readonly statusCode?: number
  public readonly details?: unknown

  constructor(message: string, statusCode?: number, details?: unknown) {
    super(message)
    // Ensure the error name is set correctly
    Object.setPrototypeOf(this, AusdataApiError.prototype)
    this.name = 'AusdataApiError'
    this.statusCode = statusCode
    this.details = details
  }
}

export interface AusdataClientOptions {
  apiKey: string
  baseUrl?: string
  fetchImpl?: typeof fetch
}

export interface SubmitFormParams {
  formId: string
  data: Record<string, unknown>
}

export interface SendEmailParams {
  to: string
  subject: string
  html?: string
  text?: string
  fromEmail?: string
  fromName?: string
}

export interface Business {
  name: string
  abn: string
  state: string
  status: 'Active' | 'Inactive' | 'Cancelled'
  industry?: string
  address?: string
}

export interface SearchBusinessParams {
  query?: string
}

export interface SearchBusinessResponse {
  success: boolean
  data: Business[]
  credits_deducted: number
  remaining_credits: number
  query: string | null
}

type JsonValue =
  | Record<string, unknown>
  | Array<unknown>
  | string
  | number
  | null
  | boolean

export class AusdataClient {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly fetchImpl?: typeof fetch

  constructor(options: AusdataClientOptions) {
    if (!options?.apiKey) {
      throw new Error('AusData API key is required')
    }

    this.apiKey = options.apiKey
    this.baseUrl = (options.baseUrl ?? 'https://api.ausdata.app').replace(/\/$/, '')
    // Store fetch implementation if provided, otherwise use global fetch directly
    this.fetchImpl = options.fetchImpl
  }

  async submitForm(params: SubmitFormParams) {
    if (!params?.formId) {
      throw new Error('formId is required')
    }

    if (!params.data || typeof params.data !== 'object') {
      throw new Error('data must be an object')
    }

    return this.post<{ id: string }>('/api/v1/forms/submit', {
      formId: params.formId,
      data: params.data,
    })
  }

  async sendEmail(params: SendEmailParams) {
    if (!params?.to) {
      throw new Error('"to" is required')
    }

    if (!params.subject) {
      throw new Error('"subject" is required')
    }

    if (!params.html && !params.text) {
      throw new Error('Either "html" or "text" content must be provided')
    }

    return this.post<{ id: string }>('/api/v1/emails/send', {
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      fromEmail: params.fromEmail,
      fromName: params.fromName,
    })
  }

  async searchBusiness(params?: SearchBusinessParams): Promise<SearchBusinessResponse> {
    const query = params?.query || ''
    const queryString = query ? `?q=${encodeURIComponent(query)}` : ''

    return this.get<SearchBusinessResponse>(`/api/v1/business/search${queryString}`)
  }

  private async get<T>(path: string) {
    // Use provided fetch or global fetch - call it directly to avoid context issues
    const fetchFn = this.fetchImpl ?? (typeof window !== 'undefined' ? window.fetch : fetch)
    const response = await fetchFn(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    let payload: JsonValue | undefined
    try {
      payload = await response.json()
    } catch {
      payload = undefined
    }

    if (!response.ok) {
      const message =
        (payload &&
        typeof payload === 'object' &&
        'error' in payload &&
        typeof (payload as Record<string, unknown>).error === 'string'
          ? ((payload as Record<string, unknown>).error as string)
          : response.statusText) || 'AusData API request failed'

      // Ensure AusdataApiError is properly referenced
      const error = new AusdataApiError(message, response.status, payload)
      throw error
    }

    return payload as T
  }

  private async post<T>(path: string, body: Record<string, unknown>) {
    // Use provided fetch or global fetch - call it directly to avoid context issues
    const fetchFn = this.fetchImpl ?? (typeof window !== 'undefined' ? window.fetch : fetch)
    const response = await fetchFn(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    let payload: JsonValue | undefined
    try {
      payload = await response.json()
    } catch {
      payload = undefined
    }

    if (!response.ok) {
      const message =
        (payload &&
        typeof payload === 'object' &&
        'error' in payload &&
        typeof (payload as Record<string, unknown>).error === 'string'
          ? ((payload as Record<string, unknown>).error as string)
          : response.statusText) || 'AusData API request failed'

      // Ensure AusdataApiError is properly referenced
      const error = new AusdataApiError(message, response.status, payload)
      throw error
    }

    return payload as T
  }
}
 