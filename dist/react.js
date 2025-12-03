import { Ausdata, BusinessModule } from './chunk-IZSB5OM6.js';
import './chunk-4XWM6D4J.js';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/react/utils/injectStyles.ts
var stylesInjected = false;
var CSS_CONTENT = `/* CSS will be injected here during build */`;
function injectStyles() {
  if (typeof document === "undefined" || stylesInjected) {
    return;
  }
  const existingStyle = document.getElementById("ausdata-sdk-styles");
  if (existingStyle) {
    stylesInjected = true;
    return;
  }
  const style = document.createElement("style");
  style.id = "ausdata-sdk-styles";
  style.textContent = getStylesContent();
  document.head.appendChild(style);
  stylesInjected = true;
}
function getStylesContent() {
  if (CSS_CONTENT.includes("will be injected")) {
    return "";
  }
  return CSS_CONTENT;
}
var THEMES = [
  "minimal",
  "brand",
  "light",
  "dark",
  "eye"
];
var VARIANTS = [
  { value: "table", label: "Table" },
  { value: "card", label: "Card" }
];
function AusdataUIContent({
  apiKey: propApiKey,
  baseUrl: propBaseUrl,
  defaultTheme = "minimal",
  defaultVariant = "table",
  dense = false,
  showControlPanel = true,
  title = "Ausdata Business Search",
  className,
  style
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [variant, setVariant] = useState(defaultVariant);
  const apiKey = useMemo(() => {
    if (propApiKey) return propApiKey;
    if (typeof window !== "undefined") {
      const env = window.__ENV__ || globalThis.process?.env;
      return env?.NEXT_PUBLIC_AUSDATA_API_KEY || env?.VITE_AUSDATA_API_KEY;
    }
    return void 0;
  }, [propApiKey]);
  const baseUrl = useMemo(() => {
    if (propBaseUrl) return propBaseUrl;
    if (typeof window !== "undefined") {
      if (window.__NEXT_DATA__) return "/api";
      if (typeof globalThis.import !== "undefined") return "/api";
    }
    return "/api";
  }, [propBaseUrl]);
  useEffect(() => {
    injectStyles();
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.getAttribute("data-ausdata-theme");
    document.body.setAttribute("data-ausdata-theme", currentTheme);
    return () => {
      if (prev) {
        document.body.setAttribute("data-ausdata-theme", prev);
      } else {
        document.body.removeAttribute("data-ausdata-theme");
      }
    };
  }, [currentTheme]);
  const performSearch = useCallback(async (searchTerm, nextPage, size) => {
    if (!apiKey) {
      setError("API key is required. Please provide apiKey prop or set NEXT_PUBLIC_AUSDATA_API_KEY / VITE_AUSDATA_API_KEY environment variable.");
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
      let message = err instanceof Error ? err.message : "Unknown error while searching";
      if (message.includes("Failed to fetch") || message.includes("Network request failed") || message.includes("CORS") || message.includes("network")) {
        if (baseUrl.startsWith("http")) {
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
  const handleSearch = useCallback(async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a business name or ABN.");
      setResults([]);
      return;
    }
    setPage(1);
    await performSearch(trimmed, 1, pageSize);
  }, [query, pageSize, performSearch]);
  const handlePageChange = useCallback(async (direction) => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    const nextPage = direction === "prev" ? page - 1 : page + 1;
    if (nextPage < 1 || nextPage > maxPage) return;
    await performSearch(trimmed, nextPage, pageSize);
  }, [query, loading, total, pageSize, page, performSearch]);
  const handlePageSizeChange = useCallback(async (event) => {
    const newSize = Number(event.target.value) || 10;
    setPageSize(newSize);
    const trimmed = query.trim();
    if (!trimmed) return;
    await performSearch(trimmed, 1, newSize);
  }, [query, performSearch]);
  const themeClass = `business-search-tone-${currentTheme}`;
  return /* @__PURE__ */ jsx("div", { className: `app-root ${themeClass} ${className ?? ""}`, style, children: /* @__PURE__ */ jsxs("div", { className: "business-search", children: [
    title && /* @__PURE__ */ jsxs("header", { className: "business-search-header", children: [
      /* @__PURE__ */ jsx("h1", { className: "business-search-title", children: title }),
      /* @__PURE__ */ jsx("p", { className: "business-search-subtitle", children: "Search Australian businesses by name or ABN, with enriched ABR details when available." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "business-search-panel", children: [
      /* @__PURE__ */ jsx("form", { onSubmit: handleSearch, className: "business-search-form", children: /* @__PURE__ */ jsxs("label", { className: "business-search-label", children: [
        /* @__PURE__ */ jsx("span", { children: "Search business" }),
        /* @__PURE__ */ jsxs("div", { className: "business-search-input-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "business-search-input-wrapper", children: [
            /* @__PURE__ */ jsx("span", { className: "business-search-input-icon", children: "\u{1F50D}" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "business-search-input",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                placeholder: 'Try "Commonwealth Bank", "Woolworths", or an 11\u2011digit ABN'
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "business-search-button", disabled: loading, children: [
            loading && /* @__PURE__ */ jsx("span", { className: "business-search-button-dot" }),
            /* @__PURE__ */ jsx("span", { children: loading ? "Searching\u2026" : "Search" })
          ] })
        ] })
      ] }) }),
      showControlPanel && /* @__PURE__ */ jsxs("div", { className: "business-style-controls", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "ausdata-theme-select", children: [
          /* @__PURE__ */ jsx("span", { children: "Theme" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              id: "ausdata-theme-select",
              value: currentTheme,
              onChange: (e) => setCurrentTheme(e.target.value),
              children: THEMES.map((theme) => /* @__PURE__ */ jsx("option", { value: theme, children: theme.charAt(0).toUpperCase() + theme.slice(1) }, theme))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { htmlFor: "ausdata-variant-select", children: [
          /* @__PURE__ */ jsx("span", { children: "Layout" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              id: "ausdata-variant-select",
              value: variant,
              onChange: (e) => setVariant(e.target.value),
              children: VARIANTS.map((v) => /* @__PURE__ */ jsx("option", { value: v.value, children: v.label }, v.value))
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "business-search-meta", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("span", { className: "business-search-meta-pill", children: "Live Ausdata API" }),
        total > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "\u2022" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Showing ",
            /* @__PURE__ */ jsx("strong", { children: results.length }),
            " of",
            " ",
            /* @__PURE__ */ jsx("strong", { children: total || results.length }),
            " matches"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("span", { className: "business-badge", children: "ABN lookup supported" }) })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "business-search-error", children: error }),
    !loading && !error && hasSearched && results.length === 0 && /* @__PURE__ */ jsxs("div", { className: "business-search-empty", children: [
      /* @__PURE__ */ jsx("strong", { children: "No results found." }),
      " ",
      "Try refining the business name, adding a state, or searching directly by 11\u2011digit ABN."
    ] }),
    results.length > 0 && /* @__PURE__ */ jsxs("section", { className: "business-search-results", children: [
      /* @__PURE__ */ jsxs("div", { className: "business-search-results-header", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { children: [
          "Showing ",
          /* @__PURE__ */ jsx("strong", { children: results.length }),
          " of",
          " ",
          /* @__PURE__ */ jsx("strong", { children: total || results.length })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "business-pagination-controls", children: [
          /* @__PURE__ */ jsxs("label", { children: [
            /* @__PURE__ */ jsx("span", { children: "Rows per page" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: pageSize,
                onChange: handlePageSizeChange,
                disabled: loading,
                children: [
                  /* @__PURE__ */ jsx("option", { value: 10, children: "10" }),
                  /* @__PURE__ */ jsx("option", { value: 25, children: "25" }),
                  /* @__PURE__ */ jsx("option", { value: 50, children: "50" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "business-pagination-page", children: [
            "Page ",
            /* @__PURE__ */ jsx("strong", { children: page }),
            " of",
            " ",
            /* @__PURE__ */ jsx("strong", { children: Math.max(1, Math.ceil(total / pageSize)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "business-pagination-buttons", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange("prev"),
                disabled: loading || page <= 1,
                children: "\u2039 Prev"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange("next"),
                disabled: loading || total > 0 && page >= Math.ceil(total / pageSize),
                children: "Next \u203A"
              }
            )
          ] })
        ] })
      ] }),
      variant === "table" ? /* @__PURE__ */ jsx("div", { className: "business-table-wrapper", children: /* @__PURE__ */ jsxs("table", { className: "business-table", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsx("th", { children: "ABN" }),
          /* @__PURE__ */ jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsx("th", { children: "Location" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: results.map((biz, index) => {
          const statusKey = (biz.status || "").toLowerCase();
          const statusClass = statusKey === "active" ? "status-active" : statusKey === "cancelled" || statusKey === "inactive" ? "status-cancelled" : "";
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "business-table-name", children: [
              /* @__PURE__ */ jsx("span", { className: "business-table-name-main", children: biz.name }),
              biz.industry && /* @__PURE__ */ jsx("span", { className: "business-table-name-sub", children: biz.industry })
            ] }) }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("span", { className: "business-table-abn", children: [
              "ABN ",
              biz.abn
            ] }) }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: `business-badge ${statusClass}`, children: biz.status || "Unknown" }) }),
            /* @__PURE__ */ jsx("td", { children: biz.type || "\u2014" }),
            /* @__PURE__ */ jsx("td", { children: biz.address ? biz.address : /* @__PURE__ */ jsxs(Fragment, { children: [
              biz.state,
              " ",
              biz.postcode
            ] }) })
          ] }, `${biz.abn}-${index}`);
        }) })
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "business-card-grid", children: results.map((biz, index) => {
        const statusKey = (biz.status || "").toLowerCase();
        const statusClass = statusKey === "active" ? "status-active" : statusKey === "cancelled" || statusKey === "inactive" ? "status-cancelled" : "";
        return /* @__PURE__ */ jsxs("article", { className: "business-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "business-card-header", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "business-card-name", children: biz.name }),
              /* @__PURE__ */ jsxs("div", { className: "business-card-abn", children: [
                "ABN ",
                biz.abn
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "business-card-badges", children: [
              /* @__PURE__ */ jsx("span", { className: `business-badge ${statusClass}`, children: biz.status || "Unknown" }),
              biz.type && /* @__PURE__ */ jsx("span", { className: "business-badge", children: biz.type === "IND" ? "Individual" : biz.type === "CO" ? "Company" : biz.type })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "business-card-meta", children: [
            biz.industry && /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "business-card-meta-label", children: "Industry" }),
              /* @__PURE__ */ jsx("span", { children: biz.industry })
            ] }),
            biz.score !== void 0 && /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "business-card-meta-label", children: "Match score" }),
              /* @__PURE__ */ jsx("span", { children: biz.score })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "business-card-address", children: biz.address ? biz.address : `${biz.state ?? ""} ${biz.postcode ?? ""}`.trim() }),
          biz.gst && /* @__PURE__ */ jsxs("div", { className: "business-card-score", children: [
            "GST: ",
            biz.gst
          ] })
        ] }, `${biz.abn}-${index}`);
      }) })
    ] })
  ] }) });
}
function AusdataUI(props) {
  return /* @__PURE__ */ jsx(AusdataUIContent, { ...props });
}

export { AusdataUI };
//# sourceMappingURL=react.js.map
//# sourceMappingURL=react.js.map