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
  /** Default variant: 'table' or 'card' (default: 'table') */
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
    // Try to get from environment
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const env = (window as any).__ENV__ || (globalThis as any).process?.env;
      return env?.NEXT_PUBLIC_AUSDATA_API_KEY || env?.VITE_AUSDATA_API_KEY;
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

  // Inject styles dynamically (no-op in dev if CSS is imported manually)
  useEffect(() => {
    injectStyles();
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
        <div className="business-search-meta">
          <span>
            <span className="business-search-meta-pill">Live Ausdata API</span>
            {total > 0 && (
              <>
                <span>•</span>
                <span>
                  Showing <strong>{results.length}</strong> of{' '}
                  <strong>{total || results.length}</strong> matches
                </span>
              </>
            )}
          </span>
          <span>
            <span className="business-badge">ABN lookup supported</span>
          </span>
        </div>

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

            {/* Results Table/Card View */}
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
            ) : (
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

