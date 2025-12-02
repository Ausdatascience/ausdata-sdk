import type {
  SearchBusinessParams,
  SearchBusinessResponseData,
  BusinessEntity,
} from "./index";
import { Ausdata } from "./index";

/**
 * High-level business search helpers built on top of the core Ausdata client.
 *
 * These helpers are thin wrappers around `client.business.search` that provide
 * more expressive method names and common patterns for:
 *
 * - Free-text business name search
 * - 11-digit ABN lookup (with enriched ABR detail fields)
 * - Selecting the “first”/primary result
 */
export class BusinessModule {
  private readonly client: Ausdata;

  constructor(client: Ausdata) {
    this.client = client;
  }

  /**
   * Utility: detect if a string looks like an ABN (11 digits after stripping spaces).
   * This is deliberately simple and does not perform checksum validation.
   */
  static looksLikeAbn(query: string): boolean {
    const digits = (query ?? "").toString().replace(/\D/g, "");
    return digits.length === 11;
  }

  /**
   * Search for businesses by name or ABN.
   *
   * - If `q` is a free-text name, this returns a list of matching businesses.
   * - If `q` is an 11-digit ABN (spaces allowed), this returns at most one
   *   enriched BusinessEntity with ABR detail fields populated.
   */
  async search(params: SearchBusinessParams): Promise<SearchBusinessResponseData> {
    // The underlying API currently returns either:
    // - a plain BusinessEntity[] array (data: results[])
    // - or a wrapped object { results, total, ... } in future versions.
    const raw: any = await (this.client as any).business.search(params);

    if (Array.isArray(raw)) {
      const results: BusinessEntity[] = raw;
      return {
        results,
        total: results.length,
        credits_deducted: 0,
        remaining_credits: undefined,
        query: params.q,
      };
    }

    return raw as SearchBusinessResponseData;
  }

  /**
   * Convenience: search by **business name** (free text).
   *
   * This simply forwards to `search({ q: name, ... })` but keeps your
   * call-sites self-documenting and hides the low-level params object.
   */
  async searchByName(
    name: string,
    options?: Omit<SearchBusinessParams, "q">,
  ): Promise<SearchBusinessResponseData> {
    const q = (name ?? "").toString();
    return this.search({ q, ...(options || {}) });
  }

  /**
   * Convenience: run a search and return only the **first** result.
   *
   * - For name searches, this is typically the best-ranked match.
   * - For ABN lookups, this is the single enriched entity (if any).
   */
  async searchFirst(
    params: SearchBusinessParams,
  ): Promise<BusinessEntity | undefined> {
    const { results } = await this.search(params);
    return results[0];
  }

  /**
   * Convenience helper for looking up a single business by ABN.
   * This wraps `business.search({ q: abn })` and returns the first result
   * (or undefined if nothing was found).
   */
  async lookupByAbn(abn: string): Promise<BusinessEntity | undefined> {
    const clean = (abn ?? "").toString().replace(/\s/g, "");
    const result = await this.search({ q: clean });
    return result.results[0];
  }

  /**
   * Alias for `lookupByAbn` for callers that prefer a more explicit name.
   */
  async searchByAbn(abn: string): Promise<BusinessEntity | undefined> {
    return this.lookupByAbn(abn);
  }
}


