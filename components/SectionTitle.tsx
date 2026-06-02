'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/data'
import { transitionConfig, viewportConfig } from '@/lib/animations'

interface SectionTitleProps {
  main: string
  sub?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({
  main,
  sub,
  centered = true,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn('mb-12', centered && 'text-center', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={transitionConfig.smooth}
      viewport={viewportConfig}
    >
      <motion.h2
        className="font-display text-display-md md:text-display-lg mb-4 text-[#1A1A1A]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transitionConfig.smooth}
        viewport={viewportConfig}
      >
        {main}
      </motion.h2>
      {sub && (
        <motion.p
          className="font-body text-lg text-[#6B6B6B] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig.smooth, delay: 0.1 }}
          viewport={viewportConfig}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  )
}
