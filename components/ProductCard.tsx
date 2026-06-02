'use client'

import Image from 'next/image'
import { Button } from './Button'
import { cn } from '@/lib/data'

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
    <div className={cn('group', className)}>
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
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
    </div>
  )
}
