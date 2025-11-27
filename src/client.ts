import fetch from 'cross-fetch'

export class AusdataApiError extends Error {
  public readonly statusCode?: number
  public readonly details?: unknown

  constructor(message: string, statusCode?: number, details?: unknown) {
    super(message)
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
  private readonly fetchImpl: typeof fetch

  constructor(options: AusdataClientOptions) {
    if (!options?.apiKey) {
      throw new Error('AusData API key is required')
    }

    this.apiKey = options.apiKey
    this.baseUrl = (options.baseUrl ?? 'https://api.ausdata.app').replace(/\/$/, '')
    this.fetchImpl = options.fetchImpl ?? fetch
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

  private async post<T>(path: string, body: Record<string, unknown>) {
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
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

      throw new AusdataApiError(message, response.status, payload)
    }

    return payload as T
  }
}
 