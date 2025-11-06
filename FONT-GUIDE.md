# Font Configuration Guide

## Quick Access
To adjust any font size, edit the CSS variables in:
**`src/styles/globals.css`** (lines 61-103)

---

## Current Font Setup

### Pixel Font (Press Start 2P)
Used for headings, titles, and branding

| Element | Variable | Current Size | Where Used |
|---------|----------|--------------|------------|
| **Logo** | `--font-size-nav-logo` | `clamp(0.875rem, 1.5vw, 1.125rem)` | Navigation header, mobile menu |
| **Display 1** | `--font-size-display-1` | `clamp(2.5rem, 5vw, 5rem)` | Hero headlines, largest text |
| **Display 2** | `--font-size-display-2` | `clamp(2rem, 4vw, 4rem)` | Secondary headlines |
| **H1** | `--font-size-h1` | `clamp(1.75rem, 3vw, 3rem)` | Page titles |
| **H2** | `--font-size-h2` | `clamp(1.5rem, 2.5vw, 2.5rem)` | Section titles |
| **H3** | `--font-size-h3` | `clamp(1rem, 1.5vw, 1.25rem)` | Subsections (REDUCED) |
| **H4** | `--font-size-h4` | `clamp(0.875rem, 1.25vw, 1.125rem)` | Minor headings (REDUCED) |
| **H5** | `--font-size-h5` | `clamp(0.8rem, 1vw, 1rem)` | Small headings (REDUCED) |
| **H6** | `--font-size-h6` | `clamp(0.75rem, 0.9vw, 0.875rem)` | Tiny headings (REDUCED) |
| **Card Title** | `--font-size-card-title` | `clamp(1rem, 1.25vw, 1.125rem)` | Course cards (REDUCED) |
| **Sidebar Title** | `--font-size-sidebar-title` | `1rem` (16px) | Progress, badges sidebar (NEW) |
| **Chapter Title** | `--font-size-chapter-title` | `clamp(0.875rem, 1vw, 1rem)` | Course chapters (NEW) |

### Inter Font (Sans-serif)
Used for body text, navigation, and buttons

| Element | Variable | Current Size | Where Used |
|---------|----------|--------------|------------|
| **Nav Links** | `--font-size-nav-links` | `1rem` (16px) | Navigation menu items |
| **Button Small** | `--font-size-btn-sm` | `0.875rem` (14px) | Small buttons |
| **Button Medium** | `--font-size-btn-md` | `1rem` (16px) | Default buttons |
| **Button Large** | `--font-size-btn-lg` | `1.125rem` (18px) | CTA buttons |
| **Body** | `--font-size-body` | `1rem` (16px) | Paragraphs, descriptions |
| **Body Small** | `--font-size-body-sm` | `0.875rem` (14px) | Fine print, captions |
| **Body Large** | `--font-size-body-lg` | `1.125rem` (18px) | Intro text, leads |
| **Card Description** | `--font-size-card-description` | `0.875rem` (14px) | Card descriptions |
| **Badge** | `--font-size-badge` | `0.75rem` (12px) | Tags, labels |

---

## Pages Using Pixel Font Headlines

- ✅ **Homepage** (`/`) - Hero, feature sections
- ✅ **Courses** (`/courses`) - Page title, course card titles
- ✅ **Pricing** (`/pricing`) - Page title, tier names
- ✅ **About** (`/about`) - Page title, section headings
- ✅ **Community** (`/community`) - Page title
- ✅ **Labs** (`/labs`) - Page title
- ✅ **Course Detail** (`/courses/[slug]`) - Course title, chapter titles
- ✅ **Dashboard** (`/dashboard`) - Page title, section headings
- ✅ **Profile** (`/profile`) - Page title

---

## How to Adjust Font Sizes

### Format Explanation
```css
clamp(minimum, preferred, maximum)
```

- **minimum**: Smallest size (mobile phones)
- **preferred**: Scales with viewport width (tablets)
- **maximum**: Largest size (desktop)

### Example Adjustments

**Make the logo bigger:**
```css
/* Current */
--font-size-nav-logo: clamp(0.875rem, 1.5vw, 1.125rem);

/* Bigger */
--font-size-nav-logo: clamp(1rem, 2vw, 1.5rem);
```

**Make hero text smaller:**
```css
/* Current */
--font-size-display-1: clamp(2.5rem, 5vw, 5rem);

/* Smaller */
--font-size-display-1: clamp(2rem, 4vw, 4rem);
```

**Make buttons larger:**
```css
/* Current */
--font-size-btn-md: 1rem;

/* Larger */
--font-size-btn-md: 1.125rem;
```

---

## Testing Font Sizes

After making changes, check these pages:
1. **Homepage** - Hero sections, features
2. **Courses** - Card titles, descriptions
3. **Pricing** - Tier names, feature lists
4. **Navigation** - Logo, menu items, buttons
5. **Mobile** - Use browser dev tools to test responsive sizes

---

## Tips

1. **Pixel Font** works best at **14px or larger** (0.875rem+)
2. Keep logo between **14-18px** to maintain navbar height
3. Hero text should be **40-80px** for impact (2.5rem - 5rem)
4. Body text should stay at **16px** (1rem) for readability
5. Use `clamp()` for responsive sizing instead of media queries

---

## Need Help?

- CSS Variables location: `src/styles/globals.css` (line 61)
- Font Usage Guide: Bottom of `src/styles/globals.css` (line 572)
- Navigation Component: `src/components/layout/Navigation.tsx`
