var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server.ts
function getApiKey() {
  const env = typeof process !== "undefined" ? process.env : void 0;
  if (!env) return void 0;
  return env.AUSDATA_API_KEY || env.NEXT_PUBLIC_AUSDATA_API_KEY || env.VITE_AUSDATA_API_KEY;
}
function getBaseUrl() {
  const env = typeof process !== "undefined" ? process.env : void 0;
  if (!env) return "https://api.ausdata.app/api/v1";
  return env.AUSDATA_BASE_URL || env.NEXT_PUBLIC_AUSDATA_BASE_URL || env.VITE_AUSDATA_BASE_URL || "https://api.ausdata.app/api/v1";
}
async function handleProxyRequest(request) {
  const apiKey = getApiKey();
  const baseUrl = getBaseUrl();
  if (!apiKey) {
    return {
      status: 401,
      error: {
        code: "AUTH_001",
        message: "API key is required. Please set AUSDATA_API_KEY or NEXT_PUBLIC_AUSDATA_API_KEY environment variable."
      }
    };
  }
  try {
    const cleanPath = request.path.filter((p) => p !== "api").join("/");
    const apiPath = `/${cleanPath}`;
    const searchParams = request.searchParams.toString();
    const url = `${baseUrl}${apiPath}${searchParams ? `?${searchParams}` : ""}`;
    const response = await fetch(url, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-API-Key": apiKey
      },
      body: request.body || void 0
    });
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return {
        status: response.status,
        data
      };
    } else {
      const text = await response.text();
      return {
        status: response.status,
        error: {
          code: `HTTP_${response.status}`,
          message: text || response.statusText
        }
      };
    }
  } catch (error) {
    console.error("API proxy error:", error);
    return {
      status: 500,
      error: {
        code: "SRV_001",
        message: error instanceof Error ? error.message : "Internal server error",
        details: error
      }
    };
  }
}

export { __export, getApiKey, getBaseUrl, handleProxyRequest };
//# sourceMappingURL=chunk-4XWM6D4J.js.map
//# sourceMappingURL=chunk-4XWM6D4J.js.map