'use client'

import { cn } from '@/lib/data'

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
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="font-display text-display-md md:text-display-lg mb-4 text-[#1A1A1A]">
        {main}
      </h2>
      {sub && (
        <p className="font-body text-lg text-[#6B6B6B] max-w-2xl mx-auto">
          {sub}
        </p>
      )}
    </div>
  )
}
