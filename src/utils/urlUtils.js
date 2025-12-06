/**
 * URL utility functions that preserve macro placeholders like {macro_name}
 * without URL encoding them
 */

/**
 * Checks if a string is a valid URL
 * @param {string} urlString - The URL string to validate
 * @returns {boolean}
 */
export function isValidUrl(urlString) {
  try {
    new URL(urlString)
    return true
  } catch {
    return false
  }
}

/**
 * Parses a URL and extracts parameters while preserving macro values
 * @param {string} urlString - The URL to parse
 * @returns {{ base: string, params: Array<{id: string, name: string, value: string}> } | null}
 */
export function parseUrl(urlString) {
  try {
    const url = new URL(urlString)
    const base = `${url.origin}${url.pathname}`
    const params = []

    // Parse query string manually to preserve original values
    const queryString = url.search.slice(1) // Remove the '?'
    if (queryString) {
      const pairs = queryString.split('&')
      for (const pair of pairs) {
        const [name, ...valueParts] = pair.split('=')
        const value = valueParts.join('=') // Handle values with '=' in them
        params.push({
          id: generateId(),
          name: decodeURIComponent(name),
          // Decode the value to show original macros like {macro_name}
          value: decodeURIComponent(value || '')
        })
      }
    }

    return { base, params }
  } catch {
    return null
  }
}

/**
 * Builds a URL from base and parameters WITHOUT encoding macro placeholders
 * This preserves {macro_name} syntax used in tracking URLs
 * @param {string} base - The base URL (origin + pathname)
 * @param {Array<{name: string, value: string}>} params - URL parameters
 * @returns {string}
 */
export function buildUrl(base, params) {
  if (!base) return ''

  const validParams = params.filter(p => p.name.trim())
  if (validParams.length === 0) return base

  const queryParts = validParams.map(({ name, value }) => {
    // Encode the parameter name (usually safe ASCII)
    const encodedName = encodeURIComponent(name)

    // For the value, we need to selectively encode:
    // - Preserve {macro} placeholders
    // - Encode other special characters
    const encodedValue = encodeValuePreservingMacros(value)

    return `${encodedName}=${encodedValue}`
  })

  return `${base}?${queryParts.join('&')}`
}

/**
 * Encodes a URL parameter value while preserving macro placeholders
 * Macros are patterns like {macro_name}, xapnt1x, etc.
 * @param {string} value - The value to encode
 * @returns {string}
 */
function encodeValuePreservingMacros(value) {
  if (!value) return ''

  // Pattern to match common macro formats:
  // - {macro_name} - curly brace macros
  // - xapnt1x, xapnt5x, etc. - Appnext macros
  // - [macro] - square bracket macros
  // - ${macro} - dollar sign macros
  // - %%macro%% - percentage macros
  const macroPatterns = [
    /\{[^}]+\}/g,           // {macro_name}
    /xapnt\d+x/gi,          // xapnt1x, xapnt5x, etc.
    /\[[^\]]+\]/g,          // [macro]
    /\$\{[^}]+\}/g,         // ${macro}
    /%%[^%]+%%/g,           // %%macro%%
    /@\[[^\]]+\]/g,         // @[macro]
  ]

  // Find all macros and their positions
  const macros = []
  for (const pattern of macroPatterns) {
    let match
    const regex = new RegExp(pattern.source, pattern.flags)
    while ((match = regex.exec(value)) !== null) {
      macros.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0]
      })
    }
  }

  // If no macros, just encode everything
  if (macros.length === 0) {
    return encodeURIComponent(value)
  }

  // Sort macros by position
  macros.sort((a, b) => a.start - b.start)

  // Build the result by encoding non-macro parts
  let result = ''
  let lastEnd = 0

  for (const macro of macros) {
    // Encode the part before this macro
    if (macro.start > lastEnd) {
      result += encodeURIComponent(value.slice(lastEnd, macro.start))
    }
    // Add the macro as-is (not encoded)
    result += macro.text
    lastEnd = macro.end
  }

  // Encode any remaining part after the last macro
  if (lastEnd < value.length) {
    result += encodeURIComponent(value.slice(lastEnd))
  }

  return result
}

/**
 * Generates a unique ID for parameters
 * Uses crypto.randomUUID with fallback for older browsers
 * @returns {string}
 */
export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Extracts the domain from a URL
 * @param {string} urlString - The URL
 * @returns {string | null}
 */
export function extractDomain(urlString) {
  try {
    const url = new URL(urlString)
    return url.hostname
  } catch {
    return null
  }
}

/**
 * Gets a logo URL for a domain using Clearbit or Google fallback
 * @param {string} domain - The domain name
 * @returns {string}
 */
export function getDomainLogoUrl(domain) {
  if (!domain) return null
  // Try Clearbit first (higher quality), with Google as fallback
  return `https://logo.clearbit.com/${domain}`
}

/**
 * Gets a fallback favicon URL from Google
 * @param {string} domain - The domain name
 * @returns {string}
 */
export function getGoogleFaviconUrl(domain) {
  if (!domain) return null
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}
