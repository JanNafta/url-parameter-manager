import { Link2, Zap, Github, Star } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                URL Parameter Manager
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  v2.0
                </span>
              </h1>
              <p className="text-sm text-blue-100 hidden sm:block">
                Build UTM & tracking URLs for programmatic campaigns
              </p>
            </div>
          </div>

          {/* Right side - badges and links */}
          <div className="flex items-center gap-3">
            {/* Free badge */}
            <span className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-green-500/90 rounded-full text-sm font-semibold shadow-md">
              <Star className="w-4 h-4 fill-current" />
              100% Free
            </span>

            {/* Made by JanNafta */}
            <a
              href="https://www.linkedin.com/in/jannafta-programmatic-performance-dsp-ssp-rtb"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs font-bold">
                JN
              </div>
              <span className="text-sm font-medium">by JanNafta</span>
            </a>
          </div>
        </div>
      </div>

      {/* Feature bar */}
      <div className="bg-black/10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-6 py-2 text-xs sm:text-sm text-blue-100 overflow-x-auto scrollbar-hide">
            <FeatureBadge icon="🎯" text="UTM Builder" />
            <FeatureBadge icon="📱" text="AppsFlyer Ready" />
            <FeatureBadge icon="🔧" text="Macro Safe" />
            <FeatureBadge icon="📊" text="QR Codes" />
            <FeatureBadge icon="💾" text="History" />
          </div>
        </div>
      </div>
    </header>
  )
}

function FeatureBadge({ icon, text }) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  )
}
