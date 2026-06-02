'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { whyNoor } from '@/lib/data'
import {
  staggerContainerVariants,
  staggerItemVariants,
  transitionConfig,
  viewportConfig,
} from '@/lib/animations'

export function WhyNoor() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-champagne via-cream-light to-cream">
      <Container>
        <SectionTitle
          main="Why Choose NOOR"
          sub="The essence of luxury ethnic fashion"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainerVariants}
          initial="initial"
          whileInView="whileInView"
          exit="exit"
          viewport={viewportConfig}
        >
          {whyNoor.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItemVariants}
              className="group"
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-luxury-sm hover:shadow-luxury-md transition-shadow duration-300">
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={transitionConfig.smooth}
                  viewport={viewportConfig}
                  className="font-display text-xl text-[#1A1A1A] mb-3"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transitionConfig.smooth, delay: 0.1 }}
                  viewport={viewportConfig}
                  className="font-body text-sm text-[#6B6B6B]"
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
