import { useState } from 'react'
import { Link, AlertCircle, Sparkles, X, CheckCircle } from 'lucide-react'

const EXAMPLE_URLS = [
  {
    label: 'AppsFlyer',
    url: 'https://app.appsflyer.com/com.example.app?pid=partner_int&c={campaign_name}'
  },
  {
    label: 'Google Analytics',
    url: 'https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale'
  },
  {
    label: 'Simple URL',
    url: 'https://example.com/product?ref=homepage'
  }
]

export function UrlInput({ value, onChange, isValid }) {
  const [isFocused, setIsFocused] = useState(false)
  const showValidation = value.trim().length > 0

  const handleExampleClick = (url) => {
    onChange(url)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <div className="mb-6">
      <label
        htmlFor="url-input"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Enter Your URL
      </label>

      <div className="relative">
        <div
          className={`relative flex items-center rounded-xl border-2 transition-all duration-200
            ${isFocused
              ? 'border-blue-500 shadow-lg shadow-blue-500/20'
              : showValidation
                ? isValid
                  ? 'border-green-400 bg-green-50/30'
                  : 'border-red-300 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <div className="pl-4">
            <Link className={`w-5 h-5 ${
              showValidation
                ? isValid ? 'text-green-500' : 'text-red-400'
                : 'text-gray-400'
            }`} />
          </div>

          <input
            id="url-input"
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="https://example.com/page?utm_source=..."
            className="flex-1 px-3 py-4 bg-transparent outline-none text-gray-800
                       placeholder:text-gray-400 text-base font-mono"
            aria-invalid={showValidation && !isValid}
            aria-describedby={showValidation && !isValid ? 'url-error' : undefined}
          />

          {showValidation && (
            <div className="pr-2">
              {isValid ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}

          {value && (
            <button
              onClick={handleClear}
              className="p-2 mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Clear URL"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Error message */}
        {showValidation && !isValid && (
          <div
            id="url-error"
            className="mt-2 flex items-center gap-2 text-sm text-red-600"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Please enter a valid URL (e.g., https://example.com)</span>
          </div>
        )}
      </div>

      {/* Example URLs */}
      {!value && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Try an example:
          </span>
          {EXAMPLE_URLS.map((example, idx) => (
            <button
              key={idx}
              onClick={() => handleExampleClick(example.url)}
              className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-700
                         text-gray-600 rounded-full transition-colors"
            >
              {example.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
