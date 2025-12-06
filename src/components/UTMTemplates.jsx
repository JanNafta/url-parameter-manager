import { useState } from 'react'
import { Layers, ChevronDown, ChevronUp, Plus, Sparkles } from 'lucide-react'

// Pre-defined UTM templates for different platforms
const UTM_TEMPLATES = {
  google: {
    name: 'Google Ads',
    icon: '🔍',
    color: 'bg-red-500',
    params: [
      { name: 'utm_source', value: 'google' },
      { name: 'utm_medium', value: 'cpc' },
      { name: 'utm_campaign', value: '{campaignid}' },
      { name: 'utm_term', value: '{keyword}' },
      { name: 'utm_content', value: '{creative}' },
      { name: 'gclid', value: '{gclid}' }
    ]
  },
  meta: {
    name: 'Meta Ads',
    icon: '📘',
    color: 'bg-blue-600',
    params: [
      { name: 'utm_source', value: 'facebook' },
      { name: 'utm_medium', value: 'paid_social' },
      { name: 'utm_campaign', value: '{{campaign.name}}' },
      { name: 'utm_content', value: '{{ad.name}}' },
      { name: 'utm_term', value: '{{adset.name}}' }
    ]
  },
  tiktok: {
    name: 'TikTok Ads',
    icon: '🎵',
    color: 'bg-black',
    params: [
      { name: 'utm_source', value: 'tiktok' },
      { name: 'utm_medium', value: 'paid_social' },
      { name: 'utm_campaign', value: '__CAMPAIGN_NAME__' },
      { name: 'utm_content', value: '__AID_NAME__' },
      { name: 'ttclid', value: '__CLICKID__' }
    ]
  },
  appsflyer: {
    name: 'AppsFlyer',
    icon: '📱',
    color: 'bg-green-500',
    params: [
      { name: 'pid', value: 'partner_int' },
      { name: 'c', value: '{campaign_name}' },
      { name: 'af_siteid', value: '{site_id}' },
      { name: 'af_c_id', value: '{campaign_id}' },
      { name: 'af_adset', value: '{adset_name}' },
      { name: 'af_ad', value: '{ad_name}' },
      { name: 'clickid', value: '{click_id}' }
    ]
  },
  adjust: {
    name: 'Adjust',
    icon: '📊',
    color: 'bg-purple-600',
    params: [
      { name: 'tracker', value: 'YOUR_TRACKER' },
      { name: 'campaign', value: '{campaign_name}' },
      { name: 'adgroup', value: '{adgroup_name}' },
      { name: 'creative', value: '{creative_name}' },
      { name: 'click_id', value: '{click_id}' }
    ]
  },
  kayzen: {
    name: 'Kayzen DSP',
    icon: '🎯',
    color: 'bg-orange-500',
    params: [
      { name: 'pid', value: 'kayzen_int' },
      { name: 'c', value: '{campaign_name}' },
      { name: 'af_siteid', value: '{app_bundle}' },
      { name: 'af_c_id', value: '{campaign_id}' },
      { name: 'clickid', value: '{CONVERSION_ID}' },
      { name: 'af_cost_model', value: 'CPI' },
      { name: 'af_cost_value', value: '{bid_price}' }
    ]
  },
  smadex: {
    name: 'Smadex DSP',
    icon: '🚀',
    color: 'bg-teal-500',
    params: [
      { name: 'pid', value: 'smadex_int' },
      { name: 'c', value: '{CAMPAIGN_NAME}' },
      { name: 'af_siteid', value: '{BUNDLE_ID}' },
      { name: 'af_c_id', value: '{CAMPAIGN_ID}' },
      { name: 'clickid', value: '{CLICK_ID}' },
      { name: 'af_adset_id', value: '{CREATIVE_ID}' }
    ]
  },
  moloco: {
    name: 'Moloco DSP',
    icon: '🤖',
    color: 'bg-indigo-600',
    params: [
      { name: 'pid', value: 'moloco_int' },
      { name: 'c', value: '${CAMPAIGN_NAME}' },
      { name: 'af_siteid', value: '${PUB_APP_BUNDLE}' },
      { name: 'af_c_id', value: '${CAMPAIGN_ID}' },
      { name: 'clickid', value: '${CLICK_ID}' },
      { name: 'af_ad_id', value: '${CREATIVE_ID}' }
    ]
  },
  appnext: {
    name: 'Appnext',
    icon: '📲',
    color: 'bg-pink-500',
    params: [
      { name: 'pid', value: 'appnext_int' },
      { name: 'c', value: '{apnt_campname}' },
      { name: 'af_siteid', value: 'xapnt17x' },
      { name: 'af_c_id', value: '{apnt_campid}' },
      { name: 'clickid', value: 'xapnt1x' },
      { name: 'af_ad', value: '{apnt_adname}' }
    ]
  }
}

export function UTMTemplates({ onApplyTemplate, baseUrl }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'analytics', name: 'Analytics', templates: ['google', 'meta', 'tiktok'] },
    { id: 'mmp', name: 'MMP', templates: ['appsflyer', 'adjust'] },
    { id: 'dsp', name: 'DSP', templates: ['kayzen', 'smadex', 'moloco', 'appnext'] }
  ]

  const filteredTemplates = selectedCategory === 'all'
    ? Object.entries(UTM_TEMPLATES)
    : Object.entries(UTM_TEMPLATES).filter(([key]) => {
        const category = categories.find(c => c.id === selectedCategory)
        return category?.templates?.includes(key)
      })

  const handleApply = (templateKey) => {
    const template = UTM_TEMPLATES[templateKey]
    if (template && onApplyTemplate) {
      onApplyTemplate(template.params)
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-indigo-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">UTM Templates</h3>
            <p className="text-xs text-gray-500">Quick presets for popular platforms</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-indigo-600 font-medium bg-indigo-100 px-2 py-1 rounded-full">
            {Object.keys(UTM_TEMPLATES).length} templates
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-indigo-200 p-4">
          {/* Category filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-indigo-100'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTemplates.map(([key, template]) => (
              <TemplateCard
                key={key}
                template={template}
                onApply={() => handleApply(key)}
                disabled={!baseUrl}
              />
            ))}
          </div>

          {!baseUrl && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Enter a base URL first to apply templates
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function TemplateCard({ template, onApply, disabled }) {
  const [showParams, setShowParams] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{template.icon}</span>
            <span className="font-medium text-gray-800">{template.name}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${template.color}`} />
        </div>

        <p className="text-xs text-gray-500 mb-3">
          {template.params.length} parameters
        </p>

        <div className="flex gap-2">
          <button
            onClick={onApply}
            disabled={disabled}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-indigo-600 text-white
                       text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Apply
          </button>
          <button
            onClick={() => setShowParams(!showParams)}
            className="px-3 py-1.5 text-gray-600 text-sm border border-gray-200 rounded-lg
                       hover:bg-gray-50 transition-colors"
          >
            {showParams ? 'Hide' : 'View'}
          </button>
        </div>
      </div>

      {/* Parameter preview */}
      {showParams && (
        <div className="border-t border-gray-100 bg-gray-50 p-3 max-h-40 overflow-y-auto">
          <div className="space-y-1">
            {template.params.map((param, idx) => (
              <div key={idx} className="text-xs font-mono flex">
                <span className="text-indigo-600 font-medium">{param.name}</span>
                <span className="text-gray-400 mx-1">=</span>
                <span className="text-gray-600 truncate">{param.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
