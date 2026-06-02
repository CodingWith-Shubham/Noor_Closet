'use client'

import { Container } from '@/components/Container'

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl mb-4 text-[#C8A97E]">NOOR</h3>
            <p className="font-body text-sm text-white/70">
              Embrace Your Noor ✨
            </p>
            <p className="font-body text-xs text-white/50 mt-4">
              Premium ethnic fashion for the modern woman.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-display text-lg mb-4">Collections</h4>
            <ul className="space-y-2">
              {['Anarkalis', 'Co-ord Sets', 'Festive Wear', 'Everyday Elegance'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm text-white/70 hover:text-[#C8A97E] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Shipping Info', 'Returns'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm text-white/70 hover:text-[#C8A97E] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Pinterest'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="font-body text-sm text-white/70 hover:text-[#C8A97E] transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="font-body text-xs text-white/50 mb-2">Subscribe to updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 rounded-l-lg focus:outline-none"
                />
                <button className="bg-[#C8A97E] px-4 py-2 text-sm font-semibold rounded-r-lg hover:bg-[#A88350] transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-white/50">
              © 2024 NOOR - The Closet. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms & Conditions'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-body text-xs text-white/50 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
