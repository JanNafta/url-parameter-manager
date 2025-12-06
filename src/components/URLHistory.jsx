import { useState, useEffect } from 'react'
import { History, Trash2, Copy, Check, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

const STORAGE_KEY = 'url-parameter-manager-history'
const MAX_HISTORY = 20

export function URLHistory({ onSelectUrl, currentUrl }) {
  const [history, setHistory] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load history:', e)
    }
  }, [])

  // Save to history when currentUrl changes
  useEffect(() => {
    if (!currentUrl || currentUrl.length < 10) return

    // Don't add duplicates
    const exists = history.some(item => item.url === currentUrl)
    if (exists) return

    const newEntry = {
      id: Date.now(),
      url: currentUrl,
      timestamp: new Date().toISOString(),
      domain: extractDomain(currentUrl)
    }

    const updatedHistory = [newEntry, ...history].slice(0, MAX_HISTORY)
    setHistory(updatedHistory)

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
    } catch (e) {
      console.error('Failed to save history:', e)
    }
  }, [currentUrl])

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (e) {
      console.error('Failed to copy:', e)
    }
  }

  const handleDelete = (id) => {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const handleClearAll = () => {
    if (confirm('Clear all URL history?')) {
      setHistory([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  if (history.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <History className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Recent URLs</h3>
            <p className="text-xs text-gray-500">{history.length} saved URLs</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Clear all button */}
          <div className="px-4 py-2 bg-gray-50 flex justify-end">
            <button
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* History list */}
          <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
            {history.map(item => (
              <div
                key={item.id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => onSelectUrl && onSelectUrl(item.url)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {item.domain && (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=32`}
                          alt=""
                          className="w-4 h-4 rounded"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {item.domain || 'URL'}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate font-mono">
                      {item.url}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(item.url, item.id)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Open URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function extractDomain(url) {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}
