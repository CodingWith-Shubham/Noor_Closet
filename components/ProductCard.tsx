'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from './Button'
import { cn } from '@/lib/data'
import { hoverScaleVariants } from '@/lib/animations'

interface ProductCardProps {
  name: string
  price: number
  image: string
  category: string
  className?: string
}

export function ProductCard({
  name,
  price,
  image,
  category,
  className,
}: ProductCardProps) {
  return (
    <motion.div
      className={cn('group', className)}
      {...hoverScaleVariants}
      whileHover={{ y: -8 }}
    >
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-[#6B6B6B] uppercase tracking-widest">{category}</p>
        <h3 className="font-display text-lg text-[#1A1A1A]">{name}</h3>
        <p className="font-body text-base font-semibold text-[#C8A97E]">₹{price}</p>
      </div>
      <Button variant="outline" size="sm" className="w-full mt-4">
        Quick View
      </Button>
    </motion.div>
  )
}
