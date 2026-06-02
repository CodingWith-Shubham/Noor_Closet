'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { testimonials } from '@/lib/data'
import { transitionConfig, viewportConfig, buttonHoverVariants } from '@/lib/animations'

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 sm:py-32 bg-cream">
      <Container>
        <SectionTitle
          main="Customer Love"
          sub="Hear from our valued community"
        />

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionConfig.smooth}
          viewport={viewportConfig}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={transitionConfig.smooth}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-luxury-md"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className="text-2xl"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              <p className="font-body text-lg text-[#1A1A1A] mb-6 italic">
                "{testimonials[current].text}"
              </p>

              <div>
                <p className="font-display text-xl text-[#1A1A1A]">
                  {testimonials[current].name}
                </p>
                <p className="font-body text-sm text-[#6B6B6B]">Verified Customer</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transitionConfig.smooth}
            viewport={viewportConfig}
          >
            <motion.button
              {...buttonHoverVariants}
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-[#C8A97E] hover:bg-[#C8A97E] text-[#C8A97E] hover:text-white transition-all flex items-center justify-center font-bold text-lg"
            >
              ←
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-[#C8A97E] w-8' : 'bg-[#C8A97E]/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              {...buttonHoverVariants}
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-[#C8A97E] hover:bg-[#C8A97E] text-[#C8A97E] hover:text-white transition-all flex items-center justify-center font-bold text-lg"
            >
              →
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
