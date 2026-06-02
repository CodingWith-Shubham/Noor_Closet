'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/data'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-body font-semibold transition-all duration-300 rounded-lg',
        variant === 'primary' && 'bg-[#C8A97E] text-white hover:bg-[#A88350] hover:shadow-luxury-md active:scale-95',
        variant === 'secondary' && 'bg-transparent text-[#1A1A1A] border-2 border-[#C8A97E] hover:bg-[#C8A97E] hover:text-white',
        variant === 'outline' && 'bg-transparent text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
