# NOOR - The Closet | Premium Ethnic Fashion Brand

A luxury ethnic fashion brand website built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion.

**Tagline:** Embrace Your Noor ✨

## Project Structure

```
noor-closet/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── SectionTitle.tsx
│   ├── ProductCard.tsx
│   └── AnimatedText.tsx
├── sections/
│   ├── HeroSection.tsx
│   ├── FeaturedCollections.tsx
│   ├── NewArrivals.tsx
│   ├── EditorialLookbook.tsx
│   ├── WhyNoor.tsx
│   ├── Gallery.tsx
│   ├── Testimonials.tsx
│   ├── BrandStory.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── hooks/
│   └── useScrollAnimation.ts
├── lib/
│   └── data.ts
├── public/
│   └── fashion_images/
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Features

✨ **Premium Design System**
- Luxury color palette with gold accents
- Cormorant Garamond typography for headlines
- Inter for body text
- Generous whitespace and premium spacing

🎬 **Advanced Animations**
- Framer Motion scroll reveal animations
- Image hover zoom effects
- Text stagger animations
- Parallax effects
- Smooth page transitions

📱 **Fully Responsive**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

🖼️ **Rich Sections**
1. **Hero Section** - Cinematic full-viewport hero with parallax
2. **Featured Collections** - Luxury collection cards
3. **New Arrivals** - Premium product showcase
4. **Editorial Lookbook** - Magazine-style layouts
5. **Why NOOR** - Animated value proposition cards
6. **Gallery** - Masonry grid with hover effects
7. **Testimonials** - Carousel with customer reviews
8. **Brand Story** - Split layout story section
9. **CTA Section** - Premium call-to-action
10. **Footer** - Comprehensive footer with newsletter signup

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Advanced animations
- **shadcn/ui** - Accessible component library
- **Google Fonts** - Cormorant Garamond & Inter

## Color Palette

- **Background:** #FFF8F2 (Cream)
- **Cream Light:** #FAF3EC
- **Champagne:** #F3E5D8
- **Gold Accent:** #C8A97E
- **Text Primary:** #1A1A1A
- **Text Muted:** #6B6B6B

## Images

All product and collection images should be placed in `/public/fashion_images/` directory.

Required images:
- `hero-main.jpg` - Hero section background
- `anarkali-1.jpg` - Product image
- `coord-1.jpg`, `coord-2.jpg` - Product images
- `collection-anarkali.jpg`, `collection-coord.jpg`, `collection-festive.jpg`, `collection-everyday.jpg` - Collection images
- `brand-story.jpg` - Brand story image
- `lookbook-1.jpg`, `lookbook-2.jpg`, `lookbook-3.jpg` - Editorial lookbook images
- `gallery-*.jpg` - Gallery images (6 minimum)

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for sections
- Intersection Observer for scroll animations
- CSS-in-JS with Tailwind for minimal CSS
- Font optimization with Google Fonts

## License

© 2024 NOOR - The Closet. All rights reserved.
