import { Heart, Linkedin, Mail, Calendar, ArrowRight, Sparkles, Target, BarChart3, Rocket } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Need Help With Your Programmatic Campaigns?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              I help companies optimize their DSP campaigns, set up proper tracking,
              and scale their user acquisition. Let's talk!
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="https://www.linkedin.com/in/jannafta-programmatic-performance-dsp-ssp-rtb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-lg
                         font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg
                         hover:shadow-xl hover:scale-105"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
              <a
                href="mailto:jannafta@gmail.com?subject=Programmatic%20Campaign%20Help"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/30
                         rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </a>
              <a
                href="https://calendly.com/jannafta/1-1-kickoff-call"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg
                         font-semibold hover:bg-green-400 transition-all duration-200 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h3 className="text-lg font-semibold text-center mb-8 text-gray-400">
            Services I Offer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Target className="w-6 h-6" />}
              title="DSP Optimization"
              description="Kayzen, Smadex, Moloco, AppLovin - I optimize campaigns for maximum ROAS"
            />
            <ServiceCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Attribution Setup"
              description="AppsFlyer, Adjust, Branch, Singular - proper tracking from day one"
            />
            <ServiceCard
              icon={<Rocket className="w-6 h-6" />}
              title="UA Strategy"
              description="Full-funnel user acquisition strategies for mobile apps"
            />
            <ServiceCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Performance Audits"
              description="Deep dive into your campaigns to find optimization opportunities"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" aria-hidden="true" />
            <span>by</span>
            <a
              href="https://www.linkedin.com/in/jannafta-programmatic-performance-dsp-ssp-rtb"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-blue-400 transition-colors"
            >
              JanNafta
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Programmatic Advertising Expert</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">DSP/SSP Specialist</span>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} URL Parameter Manager
          </div>
        </div>
      </div>
    </footer>
  )
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50
                    transition-all duration-300 hover:bg-gray-800 group">
      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4
                      text-blue-400 group-hover:bg-blue-600/30 transition-colors">
        {icon}
      </div>
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}
