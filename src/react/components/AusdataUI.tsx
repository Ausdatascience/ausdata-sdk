/**
 * AusdataUI Component
 * Complete, ready-to-use business search interface with all features built-in
 * 
 * @example
 * ```tsx
 * import { AusdataUI } from '@ausdata/sdk/react';
 * 
 * export default function BusinessPage() {
 *   return <AusdataUI apiKey="your-api-key" />;
 * }
 * ```
 */

'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import type { BusinessEntity } from '../../index';
import { Ausdata, BusinessModule } from '../../index';
import { injectStyles } from '../utils/injectStyles';

const THEMES = [
  'minimal',
  'brand',
  'light',
  'dark',
  'eye',
] as const;

const VARIANTS = [
  { value: 'table', label: 'Table' },
  { value: 'card', label: 'Card' },
  { value: 'list', label: 'List' },
] as const;

type Theme = (typeof THEMES)[number];
type Variant = (typeof VARIANTS)[number]['value'];

export interface AusdataUIProps {
  /** Required: Your Ausdata API key */
  apiKey?: string;
  /** Base URL for the API (optional, defaults to '/api' for proxy) */
  baseUrl?: string;
  /** Default theme (default: 'minimal') */
  defaultTheme?: Theme;
  /** Default variant: 'table', 'card', or 'list' (default: 'table') */
  defaultVariant?: Variant;
  /** Compact mode (default: false) */
  dense?: boolean;
  /** Show control panel for theme/variant selection (default: true) */
  showControlPanel?: boolean;
  /** Page title (default: 'Ausdata Business Search') */
  title?: string;
  /** Custom CSS class name for the container */
  className?: string;
  /** Custom styles for the container */
  style?: React.CSSProperties;
}

function AusdataUIContent({
  apiKey: propApiKey,
  baseUrl: propBaseUrl,
  defaultTheme = 'minimal',
  defaultVariant = 'table',
  dense = false,
  showControlPanel = true,
  title = 'Ausdata Business Search',
  className,
  style,
}: Omit<AusdataUIProps, 'apiKey' | 'baseUrl'> & { apiKey?: string; baseUrl?: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BusinessEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [variant, setVariant] = useState<Variant>(defaultVariant);

  // Get API key from prop or environment
  const apiKey = useMemo(() => {
    if (propApiKey) return propApiKey;
    
    // Next.js: process.env.NEXT_PUBLIC_* is replaced at build time in the consuming app
    // We need to access it directly - Next.js will inline the value at build time
    // Since this is a library, we need to check multiple ways
    
    // Method 1: Direct access (works when Next.js inlines the value)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (globalThis as any).process !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processEnv = (globalThis as any).process.env;
      if (processEnv?.NEXT_PUBLIC_AUSDATA_API_KEY) {
        return processEnv.NEXT_PUBLIC_AUSDATA_API_KEY;
      }
    }
    
    // Method 2: Try direct process.env access (Next.js will inline this at build time)
    // This works when the consuming app builds, Next.js replaces process.env.NEXT_PUBLIC_*
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const directEnv = (globalThis as any).process?.env;
    if (directEnv?.NEXT_PUBLIC_AUSDATA_API_KEY) {
      return directEnv.NEXT_PUBLIC_AUSDATA_API_KEY;
    }
    
    // Method 3: Try window.__NEXT_DATA__ (Next.js runtime)
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nextData = (window as any).__NEXT_DATA__;
      if (nextData?.env?.NEXT_PUBLIC_AUSDATA_API_KEY) {
        return nextData.env.NEXT_PUBLIC_AUSDATA_API_KEY;
      }
    }
    
    // Method 4: Vite: import.meta.env
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const viteEnv = (globalThis as any).import?.meta?.env;
      if (viteEnv?.VITE_AUSDATA_API_KEY) {
        return viteEnv.VITE_AUSDATA_API_KEY;
      }
    } catch {
      // import.meta not available
    }
    
    // Method 5: Fallback: try window globals (for custom setups or runtime injection)
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const env = (window as any).__ENV__ || (globalThis as any).process?.env;
      if (env) {
        return env.NEXT_PUBLIC_AUSDATA_API_KEY || env.VITE_AUSDATA_API_KEY;
      }
    }
    
    // Method 6: Server-side: read from process.env
    if (typeof window === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processEnv = (globalThis as any).process?.env;
      if (processEnv) {
        return processEnv.AUSDATA_API_KEY || processEnv.NEXT_PUBLIC_AUSDATA_API_KEY;
      }
    }
    
    return undefined;
  }, [propApiKey]);

  // Get base URL
  const baseUrl = useMemo(() => {
    if (propBaseUrl) return propBaseUrl;
    // Auto-detect environment
    if (typeof window !== 'undefined') {
      if ((window as any).__NEXT_DATA__) return '/api';
      if (typeof (globalThis as any).import !== 'undefined') return '/api';
    }
    return '/api';
  }, [propBaseUrl]);

  // Inject styles dynamically (works in both dev and prod)
  useEffect(() => {
    // Use async injection to handle both development and production
    injectStyles().catch((error) => {
      // Silently fail - user can import styles manually if needed
      if (process.env.NODE_ENV === 'development') {
        console.warn('[@ausdata/sdk] Style injection failed. You can import styles manually: import "@ausdata/sdk/styles"', error);
      }
    });
  }, []);

  // Sync theme to body
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prev = document.body.getAttribute('data-ausdata-theme');
    document.body.setAttribute('data-ausdata-theme', currentTheme);
    return () => {
      if (prev) {
        document.body.setAttribute('data-ausdata-theme', prev);
      } else {
        document.body.removeAttribute('data-ausdata-theme');
      }
    };
  }, [currentTheme]);

  const performSearch = useCallback(async (searchTerm: string, nextPage: number, size: number) => {
    if (!apiKey) {
      setError('API key is required. Please provide apiKey prop or set NEXT_PUBLIC_AUSDATA_API_KEY / VITE_AUSDATA_API_KEY environment variable.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const client = new Ausdata(apiKey, { baseUrl });
      const business = new BusinessModule(client);

      const offset = (nextPage - 1) * size;
      const response = await business.search({ q: searchTerm, limit: size, offset });
      setResults(response.results ?? []);
      setTotal(response.total ?? response.results?.length ?? 0);
      setPage(nextPage);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Unknown error while searching';
      
      if (
        message.includes('Failed to fetch') ||
        message.includes('Network request failed') ||
        message.includes('CORS') ||
        message.includes('network')
      ) {
        if (baseUrl.startsWith('http')) {
          message = `Network error: Cannot connect to API. This is likely a CORS issue. Please set up an API proxy route at '/api/[...path]' or use the '/api' baseUrl with a proxy configuration.`;
        } else {
          message = `Network error: Cannot connect to API. Please ensure you have set up an API route at '/api/[...path]' for Next.js, or configure a proxy for your framework.`;
        }
      }
      
      setError(message);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [apiKey, baseUrl]);

  const handleSearch = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a business name or ABN.');
      setResults([]);
      return;
    }
    setPage(1);
    await performSearch(trimmed, 1, pageSize);
  }, [query, pageSize, performSearch]);

  const handlePageChange = useCallback(async (direction: 'prev' | 'next') => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    const nextPage = direction === 'prev' ? page - 1 : page + 1;
    if (nextPage < 1 || nextPage > maxPage) return;

    await performSearch(trimmed, nextPage, pageSize);
  }, [query, loading, total, pageSize, page, performSearch]);

  const handlePageSizeChange = useCallback(async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(event.target.value) || 10;
    setPageSize(newSize);

    const trimmed = query.trim();
    if (!trimmed) return;

    await performSearch(trimmed, 1, newSize);
  }, [query, performSearch]);

  const themeClass = `business-search-tone-${currentTheme}`;

  return (
    <div className={`app-root ${themeClass} ${className ?? ''}`} style={style}>
      <div className="business-search">
        {/* Header */}
        {title && (
          <header className="business-search-header">
            <h1 className="business-search-title">{title}</h1>
            <p className="business-search-subtitle">
              Search Australian businesses by name or ABN, with enriched ABR details when available.
            </p>
          </header>
        )}

        {/* Main Search Panel */}
        <div className="business-search-panel">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="business-search-form">
            <label className="business-search-label">
              <span>Search business</span>
              <div className="business-search-input-row">
                <div className="business-search-input-wrapper">
                  <span className="business-search-input-icon">🔍</span>
                  <input
                    type="text"
                    className="business-search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Try "Commonwealth Bank", "Woolworths", or an 11‑digit ABN'
                  />
                </div>

                <button type="submit" className="business-search-button" disabled={loading}>
                  {loading && <span className="business-search-button-dot" />}
                  <span>{loading ? 'Searching…' : 'Search'}</span>
                </button>
              </div>
            </label>
          </form>

          {/* Style Controls */}
          {showControlPanel && (
            <div className="business-style-controls">
              <label htmlFor="ausdata-theme-select">
                <span>Theme</span>
                <select
                  id="ausdata-theme-select"
                  value={currentTheme}
                  onChange={(e) => setCurrentTheme(e.target.value as Theme)}
                >
                  {THEMES.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="ausdata-variant-select">
                <span>Layout</span>
                <select
                  id="ausdata-variant-select"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as Variant)}
                >
                  {VARIANTS.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>

        {/* Meta Line */}
        {total > 0 && (
          <div className="business-search-meta">
            <span>
              Showing <strong>{results.length}</strong> of{' '}
              <strong>{total || results.length}</strong> matches
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="business-search-error">{error}</div>}

        {/* No Results */}
        {!loading && !error && hasSearched && results.length === 0 && (
          <div className="business-search-empty">
            <strong>No results found.</strong>{' '}
            Try refining the business name, adding a state, or searching directly by 11‑digit ABN.
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <section className="business-search-results">
            <div className="business-search-results-header">
              <div>
                <span>
                  Showing <strong>{results.length}</strong> of{' '}
                  <strong>{total || results.length}</strong>
                </span>
              </div>

              <div className="business-pagination-controls">
                <label>
                  <span>Rows per page</span>
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    disabled={loading}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </label>

                <span className="business-pagination-page">
                  Page <strong>{page}</strong> of{' '}
                  <strong>{Math.max(1, Math.ceil(total / pageSize))}</strong>
                </span>

                <div className="business-pagination-buttons">
                  <button
                    type="button"
                    onClick={() => handlePageChange('prev')}
                    disabled={loading || page <= 1}
                  >
                    ‹ Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePageChange('next')}
                    disabled={loading || (total > 0 && page >= Math.ceil(total / pageSize))}
                  >
                    Next ›
                  </button>
                </div>
              </div>
            </div>

            {/* Results Table/Card/List View */}
            {variant === 'table' ? (
              <div className="business-table-wrapper">
                <table className="business-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ABN</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((biz, index) => {
                      const statusKey = (biz.status || '').toLowerCase();
                      const statusClass =
                        statusKey === 'active'
                          ? 'status-active'
                          : statusKey === 'cancelled' || statusKey === 'inactive'
                          ? 'status-cancelled'
                          : '';

                      return (
                        <tr key={`${biz.abn}-${index}`}>
                          <td>
                            <div className="business-table-name">
                              <span className="business-table-name-main">{biz.name}</span>
                              {biz.industry && (
                                <span className="business-table-name-sub">{biz.industry}</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className="business-table-abn">ABN {biz.abn}</span>
                          </td>
                          <td>
                            <span className={`business-badge ${statusClass}`}>
                              {biz.status || 'Unknown'}
                            </span>
                          </td>
                          <td>{biz.type || '—'}</td>
                          <td>
                            {biz.address ? (
                              biz.address
                            ) : (
                              <>
                                {biz.state} {biz.postcode}
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : variant === 'card' ? (
              <div className="business-card-grid">
                {results.map((biz, index) => {
                  const statusKey = (biz.status || '').toLowerCase();
                  const statusClass =
                    statusKey === 'active'
                      ? 'status-active'
                      : statusKey === 'cancelled' || statusKey === 'inactive'
                      ? 'status-cancelled'
                      : '';

                  return (
                    <article key={`${biz.abn}-${index}`} className="business-card">
                      <div className="business-card-header">
                        <div>
                          <div className="business-card-name">{biz.name}</div>
                          <div className="business-card-abn">ABN {biz.abn}</div>
                        </div>
                        <div className="business-card-badges">
                          <span className={`business-badge ${statusClass}`}>
                            {biz.status || 'Unknown'}
                          </span>
                          {biz.type && (
                            <span className="business-badge">
                              {biz.type === 'IND'
                                ? 'Individual'
                                : biz.type === 'CO'
                                ? 'Company'
                                : biz.type}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="business-card-meta">
                        {biz.industry && (
                          <span>
                            <span className="business-card-meta-label">Industry</span>
                            <span>{biz.industry}</span>
                          </span>
                        )}

                        {biz.score !== undefined && (
                          <span>
                            <span className="business-card-meta-label">Match score</span>
                            <span>{biz.score}</span>
                          </span>
                        )}
                      </div>

                      <div className="business-card-address">
                        {biz.address
                          ? biz.address
                          : `${biz.state ?? ''} ${biz.postcode ?? ''}`.trim()}
                      </div>

                      {biz.gst && (
                        <div className="business-card-score">
                          GST: {biz.gst}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="business-list">
                {results.map((biz, index) => {
                  const statusKey = (biz.status || '').toLowerCase();
                  const statusClass =
                    statusKey === 'active'
                      ? 'status-active'
                      : statusKey === 'cancelled' || statusKey === 'inactive'
                      ? 'status-cancelled'
                      : '';

                  return (
                    <div key={`${biz.abn}-${index}`} className="business-list-item">
                      <div className="business-list-main">
                        <div className="business-list-name-row">
                          <div className="business-list-name">{biz.name}</div>
                          <div className="business-list-badges">
                            <span className={`business-badge ${statusClass}`}>
                              {biz.status || 'Unknown'}
                            </span>
                            {biz.type && (
                              <span className="business-badge">
                                {biz.type === 'IND'
                                  ? 'Individual'
                                  : biz.type === 'CO'
                                  ? 'Company'
                                  : biz.type}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="business-list-details">
                          <span className="business-list-abn">ABN {biz.abn}</span>
                          {biz.industry && (
                            <>
                              <span className="business-list-separator">•</span>
                              <span className="business-list-industry">{biz.industry}</span>
                            </>
                          )}
                          <span className="business-list-separator">•</span>
                          <span className="business-list-location">
                            {biz.address
                              ? biz.address
                              : `${biz.state ?? ''} ${biz.postcode ?? ''}`.trim()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export function AusdataUI(props: AusdataUIProps) {
  return <AusdataUIContent {...props} />;
}

