'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function EditorialLookbook() {
  const { ref, isVisible } = useScrollAnimation()

  const lookbookSections = [
    {
      title: 'The Festive Elegance',
      subtitle: 'Celebrate in timeless grace',
      image: '/fashion_images/IMG_8663.png',
      layout: 'left',
    },
    {
      title: 'Modern Minimalism',
      subtitle: 'Understated luxury meets contemporary style',
      image: '/fashion_images/IMG_8668.png',
      layout: 'right',
    },
    {
      title: 'Heritage Revisited',
      subtitle: 'Traditional artistry for modern women',
      image: '/fashion_images/8669.png',
      layout: 'left',
    },
  ]

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-champagne">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                section.layout === 'right' ? 'lg:grid-cols-2 lg:auto-cols-auto' : ''
              }`}
            >
              {section.layout === 'left' ? (
                <>
                  <div className="relative h-96 lg:h-full min-h-96 rounded-xl overflow-hidden">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-2">
                      {`Story ${index + 1}`}
                    </p>
                    <h3 className="font-display text-4xl sm:text-5xl text-[#1A1A1A] mb-4">
                      {section.title}
                    </h3>
                    <p className="font-body text-lg text-[#6B6B6B] mb-8">
                      {section.subtitle}
                    </p>
                    <button className="w-fit px-6 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all">
                      View Story
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center order-2 lg:order-1">
                    <p className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-2">
                      {`Story ${index + 1}`}
                    </p>
                    <h3 className="font-display text-4xl sm:text-5xl text-[#1A1A1A] mb-4">
                      {section.title}
                    </h3>
                    <p className="font-body text-lg text-[#6B6B6B] mb-8">
                      {section.subtitle}
                    </p>
                    <button className="w-fit px-6 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all">
                      View Story
                    </button>
                  </div>
                  <div className="relative h-96 lg:h-full min-h-96 rounded-xl overflow-hidden order-1 lg:order-2">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
