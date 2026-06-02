'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { transitionConfig, viewportConfig, buttonHoverVariants } from '@/lib/animations'

export function BrandStory() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-cream via-cream-light to-champagne">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={transitionConfig.smoothLonger}
            viewport={viewportConfig}
            className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src="https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421695/IMG_8635_a6fyqp.png"
              alt="NOOR Story"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={transitionConfig.smoothLonger}
            viewport={viewportConfig}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transitionConfig.smooth}
              viewport={viewportConfig}
              className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-4"
            >
              Our Story
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transitionConfig.smooth, delay: 0.1 }}
              viewport={viewportConfig}
              className="font-display text-display-md mb-6 text-[#1A1A1A]"
            >
              The NOOR Legacy
            </motion.h2>

            <div className="space-y-4 mb-8">
              {[
                'NOOR celebrates confidence, elegance, and individuality through thoughtfully curated ethnic fashion that blends timeless traditions with contemporary style.',
                'Every piece in our collection tells a story—a story of craftsmanship, premium fabrics, and the artistry of skilled hands that bring designs to life.',
                'We believe that luxury ethnic wear should make you feel powerful, beautiful, and uniquely yourself. That\'s the NOOR promise.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transitionConfig.smooth, delay: 0.15 + i * 0.1 }}
                  viewport={viewportConfig}
                  className="font-body text-lg text-[#1A1A1A] leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.button
              {...buttonHoverVariants}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={transitionConfig.smooth}
              viewport={viewportConfig}
              className="inline-flex items-center justify-center px-8 py-3 bg-[#C8A97E] text-white rounded-lg font-semibold hover:bg-[#A88350] transition-all duration-300 shadow-luxury-md"
            >
              Explore Our Story
            </motion.button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
