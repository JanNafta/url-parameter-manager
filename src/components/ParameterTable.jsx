import { Plus, Trash2, GripVertical, Info } from 'lucide-react'
import { useState } from 'react'

// Common parameter hints
const PARAM_HINTS = {
  utm_source: 'Traffic source (e.g., google, facebook, newsletter)',
  utm_medium: 'Marketing medium (e.g., cpc, email, social)',
  utm_campaign: 'Campaign name (e.g., summer_sale, product_launch)',
  utm_term: 'Paid keywords (for search ads)',
  utm_content: 'Differentiate ads/links (e.g., banner_1, text_link)',
  pid: 'Partner ID for MMP attribution',
  c: 'Campaign name for MMP',
  af_siteid: 'Publisher/Site ID',
  clickid: 'Click ID for attribution',
  gclid: 'Google Click ID'
}

export function ParameterTable({ parameters, onAdd, onRemove, onUpdate }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              URL Parameters
              {parameters.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {parameters.length}
                </span>
              )}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Add, edit or remove query parameters
            </p>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
            aria-label="Add new parameter"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Parameter
          </button>
        </div>
      </div>

      {/* Content */}
      {parameters.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-700 mb-1">No parameters yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Enter a URL with parameters or click "Add Parameter" to start building your tracking URL
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full" role="grid" aria-label="URL Parameters">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Parameter Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-4 py-3 w-16">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parameters.map((param, index) => (
                <ParameterRow
                  key={param.id}
                  param={param}
                  index={index}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ParameterRow({ param, index, onUpdate, onRemove }) {
  const [showHint, setShowHint] = useState(false)
  const hint = PARAM_HINTS[param.name.toLowerCase()]

  return (
    <tr className="group hover:bg-blue-50/50 transition-colors">
      <td className="px-4 py-3">
        <div className="relative">
          <input
            type="text"
            value={param.name}
            onChange={(e) => onUpdate(param.id, 'name', e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 text-sm bg-white"
            placeholder="e.g., utm_source"
            aria-label={`Parameter ${index + 1} name`}
          />
          {hint && (
            <button
              onMouseEnter={() => setShowHint(true)}
              onMouseLeave={() => setShowHint(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
          {showHint && hint && (
            <div className="absolute z-10 left-0 right-0 top-full mt-1 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
              {hint}
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <input
          type="text"
          value={param.value}
          onChange={(e) => onUpdate(param.id, 'value', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200 text-sm font-mono bg-white"
          placeholder="Value or {macro}"
          aria-label={`Parameter ${index + 1} value`}
        />
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onRemove(param.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50
                     rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label={`Remove parameter ${param.name || index + 1}`}
        >
          <Trash2 className="w-5 h-5" aria-hidden="true" />
        </button>
      </td>
    </tr>
  )
}
