'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { ProductCard } from '@/components/ProductCard'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { products } from '@/lib/data'

export function NewArrivals() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-cream">
      <Container>
        <SectionTitle
          main="New Arrivals"
          sub="Discover our latest premium designs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C8A97E] text-[#C8A97E] rounded-lg font-semibold hover:bg-[#C8A97E] hover:text-white transition-all duration-300">
            View All Products
          </button>
        </motion.div>
      </Container>
    </section>
  )
}
