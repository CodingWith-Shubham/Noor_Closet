'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/Container'
import { transitionConfig, viewportConfig } from '@/lib/animations'

export function EditorialLookbook() {
  const [openStory, setOpenStory] = useState<number | null>(null)

  const lookbookSections = [
    {
      title: 'The Festive Elegance',
      subtitle: 'Celebrate in timeless grace',
      story: 'A celebration of luminous fabrics, intricate mirror work, and silhouettes designed to move beautifully through every festive moment.',
      image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421713/IMG_8663_fswymi.png',
      layout: 'left',
    },
    {
      title: 'Modern Minimalism',
      subtitle: 'Understated luxury meets contemporary style',
      story: 'Clean lines and considered details create effortless pieces for women who prefer quiet confidence, comfort, and modern refinement.',
      image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421707/IMG_8665_ts2rod.png',
      layout: 'right',
    },
    {
      title: 'Heritage Revisited',
      subtitle: 'Traditional artistry for modern women',
      story: 'Heritage techniques are reimagined through contemporary cuts, bringing the richness of traditional craft into a distinctly modern wardrobe.',
      image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421784/8669_ooay0m.png',
      layout: 'left',
    },
  ]

  return (
    <section id="lookbook-stories" className="scroll-mt-8 py-20 sm:py-32 bg-champagne">
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
                    {openStory === index && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-body text-base leading-relaxed text-[#1A1A1A] mb-8 max-w-xl"
                      >
                        {section.story}
                      </motion.p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setOpenStory(openStory === index ? null : index)}
                      aria-expanded={openStory === index}
                      className="w-fit px-6 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all"
                    >
                      {openStory === index ? 'Hide Story' : 'View Story'}
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
                    {openStory === index && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-body text-base leading-relaxed text-[#1A1A1A] mb-8 max-w-xl"
                      >
                        {section.story}
                      </motion.p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setOpenStory(openStory === index ? null : index)}
                      aria-expanded={openStory === index}
                      className="w-fit px-6 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all"
                    >
                      {openStory === index ? 'Hide Story' : 'View Story'}
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
