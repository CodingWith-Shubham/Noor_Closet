'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { transitionConfig, viewportConfig } from '@/lib/animations'

export function EditorialLookbook() {
  const lookbookSections = [
    {
      title: 'The Festive Elegance',
      subtitle: 'Celebrate in timeless grace',
      image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421713/IMG_8663_fswymi.png',
      layout: 'left',
    },
    {
      title: 'Modern Minimalism',
      subtitle: 'Understated luxury meets contemporary style',
      image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421707/IMG_8665_ts2rod.png',
      layout: 'right',
    },
    {
      title: 'Heritage Revisited',
      subtitle: 'Traditional artistry for modern women',
      image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421784/8669_ooay0m.png',
      layout: 'left',
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-champagne">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionConfig.smooth}
          viewport={viewportConfig}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-4">
            Editorial
          </p>
          <h2 className="font-display text-display-md md:text-display-lg text-[#1A1A1A]">
            Lookbook Stories
          </h2>
        </motion.div>

        <div className="space-y-24">
          {lookbookSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={viewportConfig}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                section.layout === 'right' ? 'lg:grid-cols-2 lg:auto-cols-auto' : ''
              }`}
            >
              {section.layout === 'left' ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={transitionConfig.smoothLonger}
                    viewport={viewportConfig}
                    className="relative h-96 lg:h-full min-h-96 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={transitionConfig.smoothLonger}
                    viewport={viewportConfig}
                    className="flex flex-col justify-center"
                  >
                    <p className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-2">
                      {`Story ${index + 1}`}
                    </p>
                    <h3 className="font-display text-4xl sm:text-5xl text-[#1A1A1A] mb-4">
                      {section.title}
                    </h3>
                    <p className="font-body text-lg text-[#6B6B6B] mb-8">
                      {section.subtitle}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-fit px-6 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all"
                    >
                      View Story
                    </motion.button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={transitionConfig.smoothLonger}
                    viewport={viewportConfig}
                    className="flex flex-col justify-center order-2 lg:order-1"
                  >
                    <p className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-2">
                      {`Story ${index + 1}`}
                    </p>
                    <h3 className="font-display text-4xl sm:text-5xl text-[#1A1A1A] mb-4">
                      {section.title}
                    </h3>
                    <p className="font-body text-lg text-[#6B6B6B] mb-8">
                      {section.subtitle}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-fit px-6 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all"
                    >
                      View Story
                    </motion.button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={transitionConfig.smoothLonger}
                    viewport={viewportConfig}
                    className="relative h-96 lg:h-full min-h-96 rounded-xl overflow-hidden order-1 lg:order-2"
                  >
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
