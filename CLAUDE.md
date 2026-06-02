# NOOR - The Closet

Premium luxury ethnic fashion brand website built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion.

## Project Overview

**Brand Name:** NOOR - The Closet  
**Tagline:** Embrace Your Noor ✨  
**Type:** Frontend-only luxury fashion e-commerce website  
**Status:** Development Ready

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS with custom luxury design system
- **Animations:** Framer Motion
- **Type Safety:** Strict TypeScript with full type coverage

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Server runs at `http://localhost:3000`

## Project Structure

```
app/
  ├── layout.tsx       # Root layout with metadata
  ├── page.tsx         # Homepage with all sections
  └── globals.css      # Global styles and typography

components/
  ├── Button.tsx       # Reusable button component
  ├── Container.tsx    # Max-width container wrapper
  ├── SectionTitle.tsx # Section heading component
  ├── ProductCard.tsx  # Product card component
  └── AnimatedText.tsx # Staggered text animation

sections/
  ├── HeroSection.tsx          # Full-height hero with parallax
  ├── FeaturedCollections.tsx  # Collection cards grid
  ├── NewArrivals.tsx          # Product showcase
  ├── EditorialLookbook.tsx    # Magazine-style layouts
  ├── WhyNoor.tsx              # Value proposition cards
  ├── Gallery.tsx              # Masonry gallery grid
  ├── Testimonials.tsx         # Customer testimonials carousel
  ├── BrandStory.tsx           # Split layout brand story
  ├── CTASection.tsx           # Call-to-action section
  └── Footer.tsx               # Footer with navigation

hooks/
  └── useScrollAnimation.ts    # Intersection Observer hook for scroll animations

lib/
  └── data.ts                  # Static data, products, testimonials, collections

public/
  └── fashion_images/          # All product and lifestyle images
```

## Design System

### Colors
- **Background (Cream):** #FFF8F2
- **Cream Light:** #FAF3EC
- **Champagne:** #F3E5D8
- **Gold Accent:** #C8A97E
- **Text Primary:** #1A1A1A
- **Text Muted:** #6B6B6B

### Typography
- **Display Font:** Cormorant Garamond (serif) - for headings and editorial
- **Body Font:** Inter (sans-serif) - for body text

### Sizes
- **Display Large:** 4.5rem (h1)
- **Display Medium:** 3.5rem (h2)
- **Display Small:** 2.5rem (h3)
- **Section Padding:** 6rem (large), 3rem (mobile)

## Key Features

### 1. Premium Animations
- Scroll reveal animations on sections
- Image hover zoom effects (scale 1.1)
- Text stagger animations with configurable delays
- Smooth page transitions
- Parallax background effects
- Animated scroll indicator in hero

### 2. Responsive Design
- Mobile-first approach
- Tailored layouts for mobile, tablet, desktop
- Touch-friendly interactions
- Optimized image loading

### 3. Performance
- Next.js Image optimization
- Lazy loading sections
- Intersection Observer for scroll animations
- CSS in JS with Tailwind
- Font optimization with Google Fonts

### 4. Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Focus states on interactive elements
- Color contrast compliance

## Sections

### Hero Section
- Full-viewport cinematic hero
- Parallax background image
- Animated headline with text stagger
- Two CTA buttons (Explore Collection, View Lookbook)
- Animated scroll indicator

### Featured Collections
- 4 collection cards in responsive grid
- Hover effects: scale image, reveal explore button
- Editorial card design

### New Arrivals
- Product showcase with 3-column grid
- Individual product cards with quick view
- View all products button

### Editorial Lookbook
- Magazine-style alternating layouts
- 3 editorial stories
- Story titles and descriptions
- Responsive image placement

### Why NOOR
- 4 value proposition cards
- Icon + title + description
- Hover effects with icon scale
- White cards with subtle shadows

### Gallery
- Masonry grid layout
- 6 images with varied sizes
- Hover zoom and overlay
- Lightbox preview ready

### Testimonials
- Customer testimonial carousel
- Star ratings
- Navigation arrows and dots
- Smooth transitions between testimonials

### Brand Story
- Split layout: image + text
- Editorial story about NOOR
- Premium typography
- Call-to-action button

### CTA Section
- Full-width section with gradient background
- Large headline
- Primary CTA button
- Decorative background elements

### Footer
- Multi-column layout
- Collections, support, and connect sections
- Email newsletter signup
- Links and social media
- Copyright information

## Image Management

All images are in `/public/fashion_images/` and referenced using Next.js Image component for optimization.

Current images:
- IMG_8635.png - Brand story image
- IMG_8638.png - Gallery image
- IMG_8644.png - Hero background
- IMG_8650.png - Collection image
- IMG_8660.png - Product image
- IMG_8661.png - Product image
- IMG_8663.png - Lookbook image
- IMG_8665.png - Collection image
- IMG_8667.png - Gallery image
- IMG_8668.png - Lookbook image
- 8669.png - Heritage lookbook image

## Data Structure

### Products
```typescript
{
  id: number
  name: string
  price: number
  image: string
  category: string
  details: {
    fabric?: string
    detailing?: string
    sizes: string[]
    // ... other details
  }
}
```

### Collections
```typescript
{
  id: number
  name: string
  description: string
  image: string
}
```

### Testimonials
```typescript
{
  name: string
  text: string
  rating: number
}
```

## Customization Guide

### Adding New Products
Edit `lib/data.ts` - products array:
```typescript
{
  id: 4,
  name: 'New Product Name',
  price: 4500,
  image: '/fashion_images/IMG_XXXX.png',
  category: 'Category',
  details: { /* ... */ }
}
```

### Changing Colors
Edit `tailwind.config.ts` - extend colors:
```typescript
colors: {
  cream: '#FFF8F2',
  'gold-accent': '#C8A97E',
  // ... update as needed
}
```

### Adjusting Animations
Edit individual section files - modify `transition` and `initial`/`animate` props in motion components.

### Adding Sections
1. Create new section file in `sections/`
2. Use Container and SectionTitle components
3. Add useScrollAnimation hook for scroll reveal
4. Import and add to `app/page.tsx`

## Build & Deployment

```bash
# Build for production
npm run build

# Test production build
npm start

# Deploy (e.g., to Vercel)
# Just push to main branch if using Vercel
```

## Notes

- No backend required - all data is static
- No payment integration - frontend only
- Images must be optimized PNGs/JPGs (ideally compressed)
- Tailwind CSS is compiled at build time
- TypeScript ensures type safety throughout

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Product detail pages
- [ ] Size and color variants
- [ ] Wishlist feature
- [ ] Customer reviews section
- [ ] Blog/lifestyle content
- [ ] Search functionality
- [ ] Filter and sort options
- [ ] Instagram integration for feeds
- [ ] Email signup integration

## Performance Targets

- Lighthouse Performance: > 90
- Cumulative Layout Shift (CLS): < 0.1
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms

---

**Last Updated:** June 1, 2026
