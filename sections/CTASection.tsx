'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/Container'

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden bg-gradient-gold">
      {/* Soft light orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-[50px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl sm:text-6xl md:text-[3.8rem] leading-[1.15] font-normal text-white mb-5 tracking-tight drop-shadow-sm">
            Ready to Elevate<br />Your Wardrobe?
          </h2>

          <p className="font-body text-[1.05rem] text-white/88 mb-10 leading-relaxed max-w-[500px] mx-auto">
            Get exclusive access to new collections, special offers, and styling tips from our team.
          </p>

          {/* Email row */}
          <motion.div
            className="flex max-w-[520px] mx-auto mb-6 rounded-lg overflow-hidden shadow-[0_2px_16px_rgba(120,80,10,0.18)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-[15px] bg-white/92 text-[#7a5c38] placeholder-[#b8956a] text-[0.95rem] outline-none border-none rounded-l-lg"
            />
            <button className="px-6 py-[15px] bg-[#7a5228] hover:bg-[#5e3d1c] text-white font-semibold text-[0.95rem] whitespace-nowrap rounded-r-lg transition-colors">
              Subscribe
            </button>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex justify-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="px-9 py-[13px] bg-[#7a5228] hover:bg-[#5e3d1c] text-white font-bold text-[0.95rem] rounded-[7px] transition-colors tracking-wide">
              Shop Now
            </button>
         <button className="px-9 py-[13px] bg-white text-black  text-[0.95rem] border-2 border-black rounded-[7px] transition-colors hover:bg-black/5">
  Contact Us
</button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}