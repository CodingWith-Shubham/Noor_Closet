'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  const { ref } = useScrollAnimation()
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-cream">
      <Container>
        <SectionTitle
          main="Customer Love"
          sub="Hear from our valued community"
        />

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-luxury-md"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
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

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-[#C8A97E] hover:bg-[#C8A97E] text-[#C8A97E] hover:text-white transition-all flex items-center justify-center font-bold text-lg"
            >
              ←
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-[#C8A97E] w-8' : 'bg-[#C8A97E]/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-[#C8A97E] hover:bg-[#C8A97E] text-[#C8A97E] hover:text-white transition-all flex items-center justify-center font-bold text-lg"
            >
              →
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
