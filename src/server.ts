/**
 * Server-side utilities for @ausdata/sdk
 * 
 * These utilities help create API proxy routes for Next.js and other frameworks
 * to avoid CORS issues and keep API keys secure on the server.
 */

export interface ProxyRequest {
  path: string[];
  method: string;
  searchParams: URLSearchParams;
  body?: string;
}

export interface ProxyResponse {
  status: number;
  data?: unknown;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Get API key from environment variables
 */
export function getApiKey(): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = typeof process !== 'undefined' ? (process as any).env : undefined;
  if (!env) return undefined;
  
  return (
    env.AUSDATA_API_KEY ||
    env.NEXT_PUBLIC_AUSDATA_API_KEY ||
    env.VITE_AUSDATA_API_KEY
  );
}

/**
 * Get base URL from environment variables or return default
 */
export function getBaseUrl(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = typeof process !== 'undefined' ? (process as any).env : undefined;
  if (!env) return 'https://api.ausdata.app/api/v1';
  
  return (
    env.AUSDATA_BASE_URL ||
    env.NEXT_PUBLIC_AUSDATA_BASE_URL ||
    env.VITE_AUSDATA_BASE_URL ||
    'https://api.ausdata.app/api/v1'
  );
}

/**
 * Handle a proxy request to the Ausdata API
 * 
 * This function can be used in Next.js API routes, Express routes, or other server frameworks.
 * 
 * @example Next.js App Router
 * ```ts
 * import { handleProxyRequest } from '@ausdata/sdk/server';
 * import { NextRequest, NextResponse } from 'next/server';
 * 
 * export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
 *   const { path } = await params;
 *   const result = await handleProxyRequest({
 *     path,
 *     method: 'GET',
 *     searchParams: request.nextUrl.searchParams,
 *   });
 *   return NextResponse.json(result.data || result.error, { status: result.status });
 * }
 * ```
 * 
 * @example Express
 * ```ts
 * import { handleProxyRequest } from '@ausdata/sdk/server';
 * 
 * app.all('/api/*', async (req, res) => {
 *   const result = await handleProxyRequest({
 *     path: req.path.split('/').filter(Boolean),
 *     method: req.method,
 *     searchParams: new URLSearchParams(req.query as Record<string, string>),
 *     body: req.body ? JSON.stringify(req.body) : undefined,
 *   });
 *   res.status(result.status).json(result.data || result.error);
 * });
 * ```
 */
export async function handleProxyRequest(
  request: ProxyRequest
): Promise<ProxyResponse> {
  const apiKey = getApiKey();
  const baseUrl = getBaseUrl();

  if (!apiKey) {
    return {
      status: 401,
      error: {
        code: 'AUTH_001',
        message: 'API key is required. Please set AUSDATA_API_KEY or NEXT_PUBLIC_AUSDATA_API_KEY environment variable.',
      },
    };
  }

  try {
    // Reconstruct the API path
    const cleanPath = request.path.filter(p => p !== 'api').join('/');
    const apiPath = `/${cleanPath}`;
    const searchParams = request.searchParams.toString();
    const url = `${baseUrl}${apiPath}${searchParams ? `?${searchParams}` : ''}`;

    // Forward the request to the actual API
    const response = await fetch(url, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-API-Key': apiKey,
      },
      body: request.body || undefined,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return {
        status: response.status,
        data,
      };
    } else {
      const text = await response.text();
      return {
        status: response.status,
        error: {
          code: `HTTP_${response.status}`,
          message: text || response.statusText,
        },
      };
    }
  } catch (error) {
    console.error('API proxy error:', error);
    return {
      status: 500,
      error: {
        code: 'SRV_001',
        message: error instanceof Error ? error.message : 'Internal server error',
        details: error,
      },
    };
  }
}
