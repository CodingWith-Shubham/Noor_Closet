'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/lib/data'
import {
  staggerContainerVariants,
  staggerItemVariants,
  transitionConfig,
  viewportConfig,
} from '@/lib/animations'

export function NewArrivals() {
  return (
    <section className="py-20 sm:py-32 bg-cream">
      <Container>
        <SectionTitle
          main="New Arrivals"
          sub="Discover our latest premium designs"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainerVariants}
          initial="initial"
          whileInView="whileInView"
          exit="exit"
          viewport={viewportConfig}
        >
          {products.slice(0, 3).map((product) => (
            <motion.div key={product.id} variants={staggerItemVariants}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionConfig.smooth}
          viewport={viewportConfig}
        >
          <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all duration-300">
            View All Products
          </button>
        </motion.div>
      </Container>
    </section>
  )
}
