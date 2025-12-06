import { useState } from 'react'
import { Globe, Image, ExternalLink, AlertTriangle } from 'lucide-react'
import { extractDomain, getDomainLogoUrl, getGoogleFaviconUrl } from '../utils/urlUtils'

export function MetadataPreview({ metadata, isLoading, url, error }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const domain = extractDomain(url)

  // Reset image states when metadata changes
  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  const handleLogoError = () => {
    setLogoError(true)
  }

  // Reset states when URL changes
  if (!metadata && !isLoading) {
    if (imageLoaded || imageError || logoError) {
      setImageLoaded(false)
      setImageError(false)
      setLogoError(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5 text-blue-600" aria-hidden="true" />
        URL Metadata
      </h2>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState message={error} />
      ) : metadata ? (
        <MetadataContent
          metadata={metadata}
          domain={domain}
          imageLoaded={imageLoaded}
          imageError={imageError}
          logoError={logoError}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
          onLogoError={handleLogoError}
        />
      ) : url ? (
        <EmptyState message="Enter a valid URL to view metadata" />
      ) : (
        <EmptyState message="No URL provided" />
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Loading metadata">
      <div className="h-48 bg-gray-200 rounded-lg" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="text-center py-8">
      <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="text-center py-8 text-gray-500">
      <Image className="w-12 h-12 mx-auto mb-3 text-gray-300" />
      <p>{message}</p>
    </div>
  )
}

function MetadataContent({
  metadata,
  domain,
  imageLoaded,
  imageError,
  logoError,
  onImageLoad,
  onImageError,
  onLogoError
}) {
  const hasValidImage = metadata.image && !imageError
  const showDomainLogo = !hasValidImage || imageError

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {/* Show domain logo as fallback when no OG image or image fails to load */}
        {showDomainLogo ? (
          <DomainLogoFallback
            domain={domain}
            logoError={logoError}
            onLogoError={onLogoError}
          />
        ) : (
          <>
            {/* Loading placeholder - only show while image is loading */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse">
                  <Image className="w-12 h-12 text-gray-300" />
                </div>
              </div>
            )}
            {/* Actual image */}
            <img
              src={metadata.image}
              alt={`Preview of ${metadata.title || 'page'}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={onImageLoad}
              onError={onImageError}
              loading="lazy"
            />
          </>
        )}
      </div>

      {/* Title and favicon */}
      <div className="flex items-start gap-3">
        {metadata.favicon && (
          <img
            src={metadata.favicon}
            alt=""
            className="w-6 h-6 rounded flex-shrink-0 mt-0.5"
            onError={(e) => {
              // Fallback to Google favicon
              if (domain) {
                e.target.src = getGoogleFaviconUrl(domain)
              }
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {metadata.title || 'No title available'}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {metadata.description || 'No description available'}
      </p>

      {/* Status badge */}
      <div className="flex items-center justify-between">
        <StatusBadge status={metadata.status} />
        {metadata.url && (
          <a
            href={metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Visit page
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  )
}

function DomainLogoFallback({ domain, logoError, onLogoError }) {
  if (!domain) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <Globe className="w-16 h-16 text-gray-300" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {!logoError ? (
        <img
          src={getDomainLogoUrl(domain)}
          alt={`${domain} logo`}
          className="max-w-[120px] max-h-[120px] object-contain drop-shadow-md"
          onError={(e) => {
            // Try Google favicon as fallback
            e.target.src = getGoogleFaviconUrl(domain)
            onLogoError()
          }}
        />
      ) : (
        <div className="text-center">
          <Globe className="w-16 h-16 text-blue-300 mx-auto mb-2" />
          <span className="text-sm text-blue-600 font-medium">{domain}</span>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const isSuccess = status >= 200 && status < 300

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isSuccess
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      Status: {status || 'Unknown'}
    </span>
  )
}
