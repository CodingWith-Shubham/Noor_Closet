'use client'

import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { Container } from '@/components/Container'
import { transitionConfig, viewportConfig } from '@/lib/animations'

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error()
      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer id="contact-us" className="scroll-mt-8 bg-[#1A1A1A] text-white py-12 sm:py-16">
      <Container>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={viewportConfig}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transitionConfig.smooth}
            viewport={viewportConfig}
          >
            <h3 className="font-display text-2xl mb-4 text-[#C8A97E]">NOOR</h3>
            <p className="font-body text-sm text-white/70">
              Embrace Your Noor ✨
            </p>
            <p className="font-body text-xs text-white/50 mt-4">
              Premium ethnic fashion for the modern woman.
            </p>
          </motion.div>

          {/* Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig.smooth, delay: 0.1 }}
            viewport={viewportConfig}
          >
            <h4 className="font-display text-lg mb-4">Collections</h4>
            <ul className="space-y-2">
              {['Anarkalis', 'Co-ord Sets', 'Festive Wear', 'Everyday Elegance'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ ...transitionConfig.smooth, delay: 0.15 + i * 0.05 }}
                  viewport={viewportConfig}
                >
                  <a href="#" className="font-body text-sm text-white/70 hover:text-[#C8A97E] transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig.smooth, delay: 0.2 }}
            viewport={viewportConfig}
          >
            <h4 className="font-display text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Shipping Info', 'Returns'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ ...transitionConfig.smooth, delay: 0.25 + i * 0.05 }}
                  viewport={viewportConfig}
                >
                  <a href="#" className="font-body text-sm text-white/70 hover:text-[#C8A97E] transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig.smooth, delay: 0.3 }}
            viewport={viewportConfig}
          >
            <h4 className="font-display text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Pinterest'].map((platform, i) => (
                <motion.a
                  key={platform}
                  href="#"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, color: '#C8A97E' }}
                  transition={{ ...transitionConfig.smooth, delay: 0.35 + i * 0.05 }}
                  viewport={viewportConfig}
                  className="font-body text-sm text-white/70 transition-colors"
                >
                  {platform}
                </motion.a>
              ))}
            </div>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionConfig.smooth, delay: 0.4 }}
              viewport={viewportConfig}
            >
              <p className="font-body text-xs text-white/50 mb-2">Subscribe to updates</p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 rounded-l-lg focus:outline-none"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#C8A97E] px-4 py-2 text-sm font-semibold rounded-r-lg hover:bg-[#A88350] transition-colors"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </motion.button>
              </form>
              {status === 'success' && (
                <p className="mt-2 font-body text-xs text-[#C8A97E]">Subscribed successfully.</p>
              )}
              {status === 'error' && (
                <p className="mt-2 font-body text-xs text-red-300">Please try again.</p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={transitionConfig.smooth}
          viewport={viewportConfig}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-white/50">
              © 2024 NOOR - The Closet. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms & Conditions'].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ color: 'white' }}
                  transition={{ ...transitionConfig.smooth, delay: i * 0.05 }}
                  viewport={viewportConfig}
                  className="font-body text-xs text-white/50 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
