# Hero Banners

This directory contains hero banner images/GIFs for page headers.

## Required Banner Files

### `courses-hero.gif`
**Location:** `/public/images/banners/courses-hero.gif`

**Purpose:** Background banner for the "Cybersecurity Courses" page header

**Specifications:**
- **Dimensions:** 1920x400px minimum (or 1920x600px for more dramatic effect)
- **File size:** < 2MB for optimal performance
- **Animation:** Subtle, ambient animation (2-4 second loop)
- **Colors:** Match cyber theme (dark background, green/blue accents)
- **Style:** Abstract tech/cyber aesthetic (network nodes, code streams, circuit boards, matrix effects)

**Visual Recommendations:**
- Dark/black background with glowing accents
- Animated elements: flowing code, network connections, data streams
- Low-key animation (don't distract from text)
- High contrast areas work well with the gradient overlay

## Banner Layout

The banner is displayed with:
- **Opacity:** 30% (so it doesn't overpower the text)
- **Gradient Overlays:**
  - Top-to-bottom: Dark fade (cyber-dark/80 → cyber-dark/90 → solid cyber-dark)
  - Left-to-right: Subtle color accent (primary/5 → transparent → secondary/5)
- **Text:** "Cybersecurity Courses" title appears over the banner

## Finding/Creating Banners

### Free Resources:

1. **Unsplash** (https://unsplash.com/)
   - Search: "cyber", "technology", "code", "network"
   - Free for commercial use

2. **Pexels** (https://www.pexels.com/)
   - Search: "technology background", "digital", "matrix"
   - Free videos that can be converted to GIF

3. **Giphy** (https://giphy.com/)
   - Search: "cyber", "code", "technology", "matrix"
   - Download and resize for web use

### Creating Custom Banners:

**Using Lottie Files:**
1. Browse cyber/tech animations at https://lottiefiles.com/
2. Download JSON
3. Convert to GIF using https://lottiefiles.com/tools/lottie-to-gif
4. Customize colors to match theme (#00ff41, #00d9ff)
5. Export at 1920x400px

**Using Canva:**
1. Create 1920x400px design
2. Add animated elements from Canva library
3. Use dark background with neon accents
4. Export as GIF

**Using After Effects/Motion Graphics:**
1. Create 1920x400px composition
2. Design cyber-themed animation
3. Export as GIF or MP4 (convert to GIF)

## Optimization

After obtaining your banner, optimize for web:

```bash
# Using ImageMagick
convert input.gif -coalesce -resize 1920x400 -layers optimize output.gif

# Using gifsicle (best for GIFs)
gifsicle --optimize=3 --resize 1920x400 input.gif -o courses-hero.gif
```

## Placeholder Options

Until you add the final GIF, the page will:
1. Attempt to load `/images/banners/courses-hero.gif`
2. If it fails, hide the image and show gradient background only
3. Text remains fully visible with gradient overlay

**Quick Gradient Placeholder:**
The current implementation automatically falls back to a beautiful gradient if the GIF is missing, so the page looks great even without the banner!

## Banner Variants (Future)

You can add different banners for different pages:
- `labs-hero.gif` - For /labs page
- `community-hero.gif` - For /community page
- `about-hero.gif` - For /about page

Just update the respective page components with the new banner path!
