/**
 * Server-side utilities for @ausdata/sdk
 *
 * These utilities help create API proxy routes for Next.js and other frameworks
 * to avoid CORS issues and keep API keys secure on the server.
 */
interface ProxyRequest {
    path: string[];
    method: string;
    searchParams: URLSearchParams;
    body?: string;
}
interface ProxyResponse {
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
declare function getApiKey(): string | undefined;
/**
 * Get base URL from environment variables or return default
 */
declare function getBaseUrl(): string;
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
declare function handleProxyRequest(request: ProxyRequest): Promise<ProxyResponse>;

export { type ProxyRequest, type ProxyResponse, getApiKey, getBaseUrl, handleProxyRequest };
