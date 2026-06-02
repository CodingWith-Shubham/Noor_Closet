'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { whyNoor } from '@/lib/data'

export function WhyNoor() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-gradient-to-b from-champagne via-cream-light to-cream">
      <Container>
        <SectionTitle
          main="Why Choose NOOR"
          sub="The essence of luxury ethnic fashion"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyNoor.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-luxury-sm hover:shadow-luxury-md transition-shadow duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl text-[#1A1A1A] mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[#6B6B6B]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
