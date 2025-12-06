import { useState } from 'react'
import { Copy, Check, Link } from 'lucide-react'

export function UpdatedUrl({ url }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!url) return

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Link className="w-4 h-4" aria-hidden="true" />
        Updated URL
      </h3>

      <div className="space-y-3">
        {/* URL Display */}
        <div
          className="w-full bg-white rounded-lg border border-gray-300 p-4 font-mono text-sm
                     break-all min-h-[60px] max-h-[150px] overflow-y-auto scrollbar-thin"
          role="textbox"
          aria-readonly="true"
          aria-label="Updated URL"
        >
          {url ? (
            <HighlightedUrl url={url} />
          ) : (
            <span className="text-gray-400">
              Enter a URL to see the updated version
            </span>
          )}
        </div>

        {/* Copy button and status */}
        <div className="flex justify-end items-center gap-3">
          {/* Accessible live region for copy status */}
          <div
            role="status"
            aria-live="polite"
            className={`text-sm transition-opacity duration-200 ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" aria-hidden="true" />
              URL copied to clipboard!
            </span>
          </div>

          <button
            onClick={handleCopy}
            disabled={!url}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                       transition-all duration-200
                       ${copied
                         ? 'bg-green-600 text-white'
                         : 'bg-gray-700 text-white hover:bg-gray-800'
                       }
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
            aria-label={copied ? 'URL copied' : 'Copy URL to clipboard'}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                Copy URL
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Highlights different parts of the URL for better readability
 */
function HighlightedUrl({ url }) {
  try {
    const urlObj = new URL(url)
    const base = `${urlObj.origin}${urlObj.pathname}`
    const queryString = url.slice(base.length)

    return (
      <>
        <span className="text-gray-700">{base}</span>
        {queryString && (
          <span className="text-blue-600">{queryString}</span>
        )}
      </>
    )
  } catch {
    return <span className="text-gray-700">{url}</span>
  }
}
