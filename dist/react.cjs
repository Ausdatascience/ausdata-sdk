'use strict';

var chunkZCVEUCE2_cjs = require('./chunk-ZCVEUCE2.cjs');
require('./chunk-TKXNGZDK.cjs');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

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
  const [query, setQuery] = react.useState("");
  const [results, setResults] = react.useState([]);
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const [hasSearched, setHasSearched] = react.useState(false);
  const [total, setTotal] = react.useState(0);
  const [page, setPage] = react.useState(1);
  const [pageSize, setPageSize] = react.useState(10);
  const [currentTheme, setCurrentTheme] = react.useState(defaultTheme);
  const [variant, setVariant] = react.useState(defaultVariant);
  const apiKey = react.useMemo(() => {
    if (propApiKey) return propApiKey;
    if (typeof window !== "undefined") {
      const env = window.__ENV__ || globalThis.process?.env;
      return env?.NEXT_PUBLIC_AUSDATA_API_KEY || env?.VITE_AUSDATA_API_KEY;
    }
    return void 0;
  }, [propApiKey]);
  const baseUrl = react.useMemo(() => {
    if (propBaseUrl) return propBaseUrl;
    if (typeof window !== "undefined") {
      if (window.__NEXT_DATA__) return "/api";
      if (typeof globalThis.import !== "undefined") return "/api";
    }
    return "/api";
  }, [propBaseUrl]);
  react.useEffect(() => {
    injectStyles();
  }, []);
  react.useEffect(() => {
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
  const performSearch = react.useCallback(async (searchTerm, nextPage, size) => {
    if (!apiKey) {
      setError("API key is required. Please provide apiKey prop or set NEXT_PUBLIC_AUSDATA_API_KEY / VITE_AUSDATA_API_KEY environment variable.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const client = new chunkZCVEUCE2_cjs.Ausdata(apiKey, { baseUrl });
      const business = new chunkZCVEUCE2_cjs.BusinessModule(client);
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
  const handleSearch = react.useCallback(async (event) => {
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
  const handlePageChange = react.useCallback(async (direction) => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    const nextPage = direction === "prev" ? page - 1 : page + 1;
    if (nextPage < 1 || nextPage > maxPage) return;
    await performSearch(trimmed, nextPage, pageSize);
  }, [query, loading, total, pageSize, page, performSearch]);
  const handlePageSizeChange = react.useCallback(async (event) => {
    const newSize = Number(event.target.value) || 10;
    setPageSize(newSize);
    const trimmed = query.trim();
    if (!trimmed) return;
    await performSearch(trimmed, 1, newSize);
  }, [query, performSearch]);
  const themeClass = `business-search-tone-${currentTheme}`;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: `app-root ${themeClass} ${className ?? ""}`, style, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search", children: [
    title && /* @__PURE__ */ jsxRuntime.jsxs("header", { className: "business-search-header", children: [
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "business-search-title", children: title }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "business-search-subtitle", children: "Search Australian businesses by name or ABN, with enriched ABR details when available." })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-panel", children: [
      /* @__PURE__ */ jsxRuntime.jsx("form", { onSubmit: handleSearch, className: "business-search-form", children: /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "business-search-label", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Search business" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-input-row", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-input-wrapper", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-search-input-icon", children: "\u{1F50D}" }),
            /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "submit", className: "business-search-button", disabled: loading, children: [
            loading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-search-button-dot" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: loading ? "Searching\u2026" : "Search" })
          ] })
        ] })
      ] }) }),
      showControlPanel && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-style-controls", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor: "ausdata-theme-select", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Theme" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "select",
            {
              id: "ausdata-theme-select",
              value: currentTheme,
              onChange: (e) => setCurrentTheme(e.target.value),
              children: THEMES.map((theme) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: theme, children: theme.charAt(0).toUpperCase() + theme.slice(1) }, theme))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor: "ausdata-variant-select", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Layout" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "select",
            {
              id: "ausdata-variant-select",
              value: variant,
              onChange: (e) => setVariant(e.target.value),
              children: VARIANTS.map((v) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: v.value, children: v.label }, v.value))
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-meta", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-search-meta-pill", children: "Live Ausdata API" }),
        total > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "\u2022" }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
            "Showing ",
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: results.length }),
            " of",
            " ",
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: total || results.length }),
            " matches"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-badge", children: "ABN lookup supported" }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-search-error", children: error }),
    !loading && !error && hasSearched && results.length === 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-empty", children: [
      /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "No results found." }),
      " ",
      "Try refining the business name, adding a state, or searching directly by 11\u2011digit ABN."
    ] }),
    results.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("section", { className: "business-search-results", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-results-header", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "Showing ",
          /* @__PURE__ */ jsxRuntime.jsx("strong", { children: results.length }),
          " of",
          " ",
          /* @__PURE__ */ jsxRuntime.jsx("strong", { children: total || results.length })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-pagination-controls", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Rows per page" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              "select",
              {
                value: pageSize,
                onChange: handlePageSizeChange,
                disabled: loading,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("option", { value: 10, children: "10" }),
                  /* @__PURE__ */ jsxRuntime.jsx("option", { value: 25, children: "25" }),
                  /* @__PURE__ */ jsxRuntime.jsx("option", { value: 50, children: "50" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "business-pagination-page", children: [
            "Page ",
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: page }),
            " of",
            " ",
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: Math.max(1, Math.ceil(total / pageSize)) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-pagination-buttons", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange("prev"),
                disabled: loading || page <= 1,
                children: "\u2039 Prev"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
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
      variant === "table" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-table-wrapper", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "business-table", children: [
        /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "ABN" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Location" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: results.map((biz, index) => {
          const statusKey = (biz.status || "").toLowerCase();
          const statusClass = statusKey === "active" ? "status-active" : statusKey === "cancelled" || statusKey === "inactive" ? "status-cancelled" : "";
          return /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-table-name", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-table-name-main", children: biz.name }),
              biz.industry && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-table-name-sub", children: biz.industry })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "business-table-abn", children: [
              "ABN ",
              biz.abn
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: `business-badge ${statusClass}`, children: biz.status || "Unknown" }) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: biz.type || "\u2014" }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: biz.address ? biz.address : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              biz.state,
              " ",
              biz.postcode
            ] }) })
          ] }, `${biz.abn}-${index}`);
        }) })
      ] }) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-card-grid", children: results.map((biz, index) => {
        const statusKey = (biz.status || "").toLowerCase();
        const statusClass = statusKey === "active" ? "status-active" : statusKey === "cancelled" || statusKey === "inactive" ? "status-cancelled" : "";
        return /* @__PURE__ */ jsxRuntime.jsxs("article", { className: "business-card", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-header", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-card-name", children: biz.name }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-abn", children: [
                "ABN ",
                biz.abn
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-badges", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: `business-badge ${statusClass}`, children: biz.status || "Unknown" }),
              biz.type && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-badge", children: biz.type === "IND" ? "Individual" : biz.type === "CO" ? "Company" : biz.type })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-meta", children: [
            biz.industry && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-card-meta-label", children: "Industry" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: biz.industry })
            ] }),
            biz.score !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-card-meta-label", children: "Match score" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: biz.score })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-card-address", children: biz.address ? biz.address : `${biz.state ?? ""} ${biz.postcode ?? ""}`.trim() }),
          biz.gst && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-score", children: [
            "GST: ",
            biz.gst
          ] })
        ] }, `${biz.abn}-${index}`);
      }) })
    ] })
  ] }) });
}
function AusdataUI(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AusdataUIContent, { ...props });
}

exports.AusdataUI = AusdataUI;
//# sourceMappingURL=react.cjs.map
//# sourceMappingURL=react.cjs.map