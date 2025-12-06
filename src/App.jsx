import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Header,
  Footer,
  UrlInput,
  ParameterTable,
  MetadataPreview,
  UpdatedUrl,
  UTMTemplates,
  URLHistory,
  QRCodeGenerator
} from './components'
import { useDebounce } from './hooks/useDebounce'
import {
  isValidUrl,
  parseUrl,
  buildUrl,
  generateId,
  extractDomain
} from './utils/urlUtils'

// API configuration
const MICROLINK_API = 'https://api.microlink.io'
const API_TIMEOUT = 10000 // 10 seconds

export default function App() {
  // State
  const [inputUrl, setInputUrl] = useState('')
  const [parameters, setParameters] = useState([])
  const [baseUrl, setBaseUrl] = useState('')
  const [metadata, setMetadata] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('builder') // 'builder' | 'preview'

  // Debounce the URL input to avoid spamming the API
  const debouncedUrl = useDebounce(inputUrl, 500)

  // Ref to track if the component is mounted (for cleanup)
  const isMounted = useRef(true)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // Check if the current input URL is valid
  const urlIsValid = inputUrl.trim().length === 0 || isValidUrl(inputUrl)

  // Parse URL when input changes
  useEffect(() => {
    if (!inputUrl.trim()) {
      setParameters([])
      setBaseUrl('')
      setMetadata(null)
      setError(null)
      return
    }

    const parsed = parseUrl(inputUrl)
    if (parsed) {
      setBaseUrl(parsed.base)
      setParameters(parsed.params)
    } else {
      setParameters([])
      setBaseUrl('')
    }
  }, [inputUrl])

  // Fetch metadata when debounced URL changes
  useEffect(() => {
    if (!debouncedUrl.trim() || !isValidUrl(debouncedUrl)) {
      setMetadata(null)
      setError(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    const controller = new AbortController()

    const fetchMetadata = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

        const response = await fetch(
          `${MICROLINK_API}?url=${encodeURIComponent(debouncedUrl)}`,
          { signal: controller.signal }
        )

        clearTimeout(timeoutId)

        if (cancelled) return

        const data = await response.json()

        if (cancelled) return

        if (data.status === 'success' && data.data) {
          setMetadata({
            title: data.data.title || null,
            description: data.data.description || null,
            image: data.data.image?.url || null,
            favicon: data.data.logo?.url || null,
            status: 200,
            url: debouncedUrl
          })
        } else {
          setMetadata({
            title: 'Could not fetch metadata',
            description: data.message || 'The page might be blocking requests or unavailable',
            image: null,
            favicon: null,
            status: data.statusCode || 404,
            url: debouncedUrl
          })
        }
      } catch (err) {
        if (cancelled) return

        if (err.name === 'AbortError') {
          setError('Request timed out. The page might be slow or unavailable.')
        } else {
          setError('Failed to fetch metadata. Please check your connection.')
        }
        setMetadata(null)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchMetadata()

    // Cleanup: abort fetch if URL changes before it completes
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [debouncedUrl])

  // Build the updated URL from base and parameters
  const updatedUrl = buildUrl(baseUrl, parameters)

  // Parameter handlers
  const handleAddParameter = useCallback(() => {
    setParameters(prev => [
      ...prev,
      { id: generateId(), name: '', value: '' }
    ])
  }, [])

  const handleRemoveParameter = useCallback((id) => {
    setParameters(prev => prev.filter(p => p.id !== id))
  }, [])

  const handleUpdateParameter = useCallback((id, field, value) => {
    setParameters(prev =>
      prev.map(p => p.id === id ? { ...p, [field]: value } : p)
    )
  }, [])

  // Template handler
  const handleApplyTemplate = useCallback((templateParams) => {
    const newParams = templateParams.map(p => ({
      id: generateId(),
      name: p.name,
      value: p.value
    }))
    setParameters(prev => [...prev, ...newParams])
  }, [])

  // History handler
  const handleSelectFromHistory = useCallback((url) => {
    setInputUrl(url)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* URL Input Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
            <UrlInput
              value={inputUrl}
              onChange={setInputUrl}
              isValid={urlIsValid}
            />

            {/* UTM Templates */}
            <UTMTemplates
              onApplyTemplate={handleApplyTemplate}
              baseUrl={baseUrl}
            />
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left column: Parameters and Updated URL */}
            <div className="lg:col-span-2 space-y-6">
              <ParameterTable
                parameters={parameters}
                onAdd={handleAddParameter}
                onRemove={handleRemoveParameter}
                onUpdate={handleUpdateParameter}
              />

              <UpdatedUrl url={updatedUrl} />

              {/* URL History */}
              <URLHistory
                onSelectUrl={handleSelectFromHistory}
                currentUrl={updatedUrl}
              />
            </div>

            {/* Right column: Preview tools */}
            <div className="space-y-6">
              {/* Mobile tabs for switching views */}
              <div className="lg:hidden flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all
                    ${activeTab === 'builder'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  Metadata
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all
                    ${activeTab === 'preview'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  QR Code
                </button>
              </div>

              {/* Content based on tab (mobile) or show all (desktop) */}
              <div className={`${activeTab === 'builder' ? 'block' : 'hidden'} lg:block`}>
                <MetadataPreview
                  metadata={metadata}
                  isLoading={isLoading}
                  url={inputUrl}
                  error={error}
                />
              </div>

              <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block`}>
                <QRCodeGenerator url={updatedUrl} />
              </div>
            </div>
          </div>

          {/* SEO Content Section - for crawlers */}
          <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What is a URL Parameter Manager?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                A <strong>URL Parameter Manager</strong> is an essential tool for digital marketers,
                performance advertisers, and developers who need to build, edit, and manage
                URL query parameters. Whether you're creating UTM tracking links for Google Analytics,
                setting up attribution URLs for AppsFlyer, Adjust, or Branch, or configuring
                programmatic advertising campaigns with DSPs like Kayzen, Smadex, or Moloco,
                this tool makes the process simple and error-free.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>UTM Builder</strong> - Create tracking parameters for any platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Macro Preservation</strong> - Keeps {'{macros}'} intact for DSPs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Template Library</strong> - Presets for Google, Meta, TikTok, and more</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>QR Code Generator</strong> - Create scannable codes instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>URL History</strong> - Access your recent URLs anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>100% Free</strong> - No login required, no data stored</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                Perfect For
              </h3>
              <p className="text-gray-600">
                Performance marketers, mobile app developers, programmatic advertising specialists,
                growth hackers, and anyone working with attribution platforms (AppsFlyer, Adjust,
                Branch, Singular) or DSPs (Kayzen, Smadex, Moloco, AppLovin, IronSource).
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
