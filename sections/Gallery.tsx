'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const galleryImages = [
  { id: 1, src: '/fashion_images/IMG_8638.png', size: 'large' },
  { id: 2, src: '/fashion_images/IMG_8650.png', size: 'small' },
  { id: 3, src: '/fashion_images/IMG_8660.png', size: 'small' },
  { id: 4, src: '/fashion_images/IMG_8661.png', size: 'large' },
  { id: 5, src: '/fashion_images/IMG_8665.png', size: 'medium' },
  { id: 6, src: '/fashion_images/IMG_8667.png', size: 'medium' },
]

export function Gallery() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-cream-light">
      <Container>
        <SectionTitle
          main="Instagram Gallery"
          sub="Explore our latest looks and styling inspiration"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                image.size === 'large' ? 'col-span-2 row-span-2' :
                image.size === 'medium' ? 'col-span-1 row-span-1' :
                'col-span-1 row-span-1'
              }`}
            >
              <Image
                src={image.src}
                alt="Gallery"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="bg-white/90 w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <span className="text-lg">+</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
