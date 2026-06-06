'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { AnimatedText } from '@/components/AnimatedText'
import Image from 'next/image'
import { transitionConfig, viewportConfig } from '@/lib/animations'
import { scrollToSection } from '@/lib/scrollToSection'

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-cream">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={transitionConfig.smoothLonger}
        viewport={viewportConfig}
      >
        <Image
          src="https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421696/IMG_8644_jqaxfu.png"
          alt="Hero"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/70 via-cream/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionConfig.smooth}
          viewport={viewportConfig}
        >
          <p className="font-body text-sm uppercase tracking-widest text-[#C8A97E] mb-4">
            Embrace Your Elegance
          </p>
        </motion.div>

        <AnimatedText
          text="Where Elegance Meets Tradition"
          className="font-display text-5xl sm:text-6xl md:text-7xl mb-6 text-[#1A1A1A] leading-tight"
          delay={0.3}
          stagger={0.03}
        />

        <motion.p
          className="font-body text-lg sm:text-xl text-[#6B6B6B] mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionConfig.smooth}
          viewport={viewportConfig}
        >
          Curated ethnic wear crafted for timeless beauty and modern sophistication.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transitionConfig.smooth}
          viewport={viewportConfig}
        >
          <Button
            size="lg"
            className="shadow-luxury-lg"
            onClick={() => scrollToSection('featured-collections')}
          >
            Explore Collection
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('lookbook-stories')}
          >
            View Lookbook
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#1A1A1A] rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-[#1A1A1A] rounded-full mt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
