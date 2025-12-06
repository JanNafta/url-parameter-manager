import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { QrCode, Download, Copy, Check, Palette } from 'lucide-react'

const QR_COLORS = [
  { name: 'Black', fg: '#000000', bg: '#ffffff' },
  { name: 'Blue', fg: '#2563eb', bg: '#ffffff' },
  { name: 'Indigo', fg: '#4f46e5', bg: '#ffffff' },
  { name: 'Green', fg: '#16a34a', bg: '#ffffff' },
  { name: 'Purple', fg: '#9333ea', bg: '#ffffff' },
  { name: 'Red', fg: '#dc2626', bg: '#ffffff' },
  { name: 'Dark', fg: '#ffffff', bg: '#1f2937' }
]

const QR_SIZES = [
  { name: 'Small', value: 128 },
  { name: 'Medium', value: 200 },
  { name: 'Large', value: 300 }
]

export function QRCodeGenerator({ url }) {
  const [selectedColor, setSelectedColor] = useState(QR_COLORS[0])
  const [selectedSize, setSelectedSize] = useState(QR_SIZES[1])
  const [copied, setCopied] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const qrRef = useRef(null)

  const handleDownload = () => {
    if (!url || !qrRef.current) return

    // Get SVG element
    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    // Create canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const size = selectedSize.value + 40 // Add padding

    canvas.width = size
    canvas.height = size

    // Fill background
    ctx.fillStyle = selectedColor.bg
    ctx.fillRect(0, 0, size, size)

    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 20, 20, selectedSize.value, selectedSize.value)

      // Download
      const link = document.createElement('a')
      link.download = `qr-code-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  const handleCopyUrl = async () => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Failed to copy:', e)
    }
  }

  if (!url) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="font-semibold text-gray-700 mb-1">QR Code Generator</h3>
        <p className="text-sm text-gray-500">
          Enter a URL to generate a QR code
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-800 rounded-lg">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">QR Code</h3>
          </div>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={`p-1.5 rounded-lg transition-colors ${
              showOptions ? 'bg-gray-200 text-gray-700' : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <Palette className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="p-6 flex justify-center" ref={qrRef}>
        <div
          className="p-4 rounded-xl shadow-lg"
          style={{ backgroundColor: selectedColor.bg }}
        >
          <QRCodeSVG
            value={url}
            size={selectedSize.value}
            level="H"
            includeMargin={false}
            fgColor={selectedColor.fg}
            bgColor={selectedColor.bg}
          />
        </div>
      </div>

      {/* Options panel */}
      {showOptions && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 space-y-3">
          {/* Color selection */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">Color</label>
            <div className="flex gap-2 flex-wrap">
              {QR_COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor.name === color.name
                      ? 'border-blue-500 scale-110'
                      : 'border-gray-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.fg }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">Size</label>
            <div className="flex gap-2">
              {QR_SIZES.map(size => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedSize.name === size.name
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white
                     rounded-lg font-medium text-sm hover:bg-gray-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
        <button
          onClick={handleCopyUrl}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                     transition-all ${
                       copied
                         ? 'bg-green-500 text-white'
                         : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                     }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  )
}
