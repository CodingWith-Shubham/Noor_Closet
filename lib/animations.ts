export const animationVariants = {
  // Fade animations
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
  },

  // Scale animations
  fadeScale: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },

  // Stagger container
  staggerContainer: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // Stagger children
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
}

export const transitionConfig = {
  smooth: { duration: 0.6, ease: 'easeOut' },
  smoothLonger: { duration: 0.8, ease: 'easeOut' },
  elegant: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  gentle: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] },
}

export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -100px 0px',
}

export const staggerContainerVariants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const staggerItemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
}

export const hoverScaleVariants = {
  scale: 1,
  whileHover: { scale: 1.03 },
  transition: { type: 'spring', stiffness: 300, damping: 10 },
}

export const imageHoverVariants = {
  scale: 1,
  whileHover: { scale: 1.08 },
  transition: { duration: 0.5 },
}

export const buttonHoverVariants = {
  scale: 1,
  whileHover: { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(200, 169, 126, 0.3)' },
  whilePress: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 300, damping: 10 },
}
