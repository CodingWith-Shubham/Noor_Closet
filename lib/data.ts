export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const products = [
  {
    id: 1,
    name: 'Crushed Chinon Rust Anarkali',
    price: 3750,
    image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421709/IMG_8660_vhzk9x.png',
    category: 'Anarkalis',
    details: {
      fabric: 'Georgette Dupatta',
      detailing: 'Cutwork Lace',
      sizes: ['36', '38', '40', '42', '46'],
    },
  },
  {
    id: 2,
    name: 'Yellow Satin Co-Ord Set',
    price: 3150,
    image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421712/IMG_8661_qrgohu.png',
    category: 'Co-ord Sets',
    details: {
      pieces: '2 pc',
      stitched: true,
      detailing: 'Lace detailing on sleeves & bottom',
      neckline: 'Pearl work neckline',
      sizes: ['40'],
    },
  },
  {
    id: 3,
    name: 'Organza Mirror Work Co-Ord Set',
    price: 3800,
    image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421713/IMG_8663_fswymi.png',
    category: 'Co-ord Sets',
    details: {
      fabric: 'Organza',
      pieces: '3 pc',
      stitched: true,
      detailing: 'Mirror work',
      sizes: ['36', '38', '40', '42', '46'],
    },
  },
]

export const collections = [
  {
    id: 1,
    name: 'Anarkalis',
    description: 'Timeless elegance in traditional silhouette',
    image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421717/IMG_8650_ibevyu.png',
  },
  {
    id: 2,
    name: 'Co-ord Sets',
    description: 'Contemporary fusion of style and comfort',
    image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421784/IMG_8665_ktopz6.png',
  },
  {
    id: 3,
    name: 'Festive Wear',
    description: 'Celebrate every occasion in grandeur',
    image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421710/IMG_8667_ndjfej.png',
  },
  {
    id: 4,
    name: 'Everyday Elegance',
    description: 'Premium comfort for modern women',
    image: 'https://res.cloudinary.com/ddjxsqetl/image/upload/v1780421707/IMG_8665_ts2rod.png',
  },
]

export const whyNoor = [
  {
    title: 'Premium Fabrics',
    description: 'Carefully sourced from the finest mills across India',
    icon: '✨',
  },
  {
    title: 'Handpicked Designs',
    description: 'Curated collections that celebrate individuality',
    icon: '👑',
  },
  {
    title: 'Perfect Fit',
    description: 'Available in multiple sizes for all body types',
    icon: '💫',
  },
  {
    title: 'Elegant Craftsmanship',
    description: 'Detailed work by skilled artisans',
    icon: '🎨',
  },
]

export const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'The quality and elegance of NOOR pieces are unmatched. I feel confident and beautiful in every outfit.',
    rating: 5,
  },
  {
    name: 'Anjali Patel',
    text: 'Finally found a brand that understands luxury ethnic fashion. The attention to detail is incredible.',
    rating: 5,
  },
  {
    name: 'Meera Singh',
    text: 'NOOR has become my go-to for special occasions. Their collections are always on trend yet timeless.',
    rating: 5,
  },
  {
    name: 'Ritika Kapoor',
    text: 'The craftsmanship and quality justify every penny. Absolutely worth the investment!',
    rating: 5,
  },
]
