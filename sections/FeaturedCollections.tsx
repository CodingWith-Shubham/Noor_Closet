'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { collections } from '@/lib/data'
import {
  staggerContainerVariants,
  staggerItemVariants,
  transitionConfig,
  viewportConfig,
  hoverScaleVariants,
} from '@/lib/animations'

export function FeaturedCollections() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-cream via-cream-light to-cream">
      <Container>
        <SectionTitle
          main="Featured Collections"
          sub="Discover our curated selection of premium ethnic wear"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainerVariants}
          initial="initial"
          whileInView="whileInView"
          exit="exit"
          viewport={viewportConfig}
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={staggerItemVariants}
              className="group cursor-pointer"
              {...hoverScaleVariants}
            >
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-[#1A1A1A] px-6 py-2 rounded-lg font-semibold text-sm">
                    Explore
                  </button>
                </div>
              </div>
              <h3 className="font-display text-2xl text-[#1A1A1A] mb-1 group-hover:text-[#C8A97E] transition-colors">
                {collection.name}
              </h3>
              <p className="font-body text-sm text-[#6B6B6B]">{collection.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
