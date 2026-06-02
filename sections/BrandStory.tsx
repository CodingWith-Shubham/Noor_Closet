'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function BrandStory() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-gradient-to-r from-cream via-cream-light to-champagne">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src="/fashion_images/IMG_8635.png"
              alt="NOOR Story"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-4">
              Our Story
            </p>

            <h2 className="font-display text-display-md mb-6 text-[#1A1A1A]">
              The NOOR Legacy
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-body text-lg text-[#1A1A1A] leading-relaxed">
                NOOR celebrates confidence, elegance, and individuality through thoughtfully curated ethnic fashion that blends timeless traditions with contemporary style.
              </p>

              <p className="font-body text-lg text-[#1A1A1A] leading-relaxed">
                Every piece in our collection tells a story—a story of craftsmanship, premium fabrics, and the artistry of skilled hands that bring designs to life.
              </p>

              <p className="font-body text-lg text-[#1A1A1A] leading-relaxed">
                We believe that luxury ethnic wear should make you feel powerful, beautiful, and uniquely yourself. That's the NOOR promise.
              </p>
            </div>

            <button className="inline-flex items-center justify-center px-8 py-3 bg-[#C8A97E] text-white rounded-lg font-semibold hover:bg-[#A88350] transition-all duration-300 shadow-luxury-md hover:shadow-luxury-lg">
              Explore Our Story
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
