# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start development server at http://localhost:3000
npm run build         # Build for production
npm run start         # Start production server
npm run type-check    # TypeScript type checking without build
npm run lint          # Run ESLint
```

## Critical: Tailwind CSS v4 Configuration

**This project uses Tailwind CSS v4, which has a completely different configuration approach than v3.**

### Key Differences from Tailwind v3:

1. **PostCSS Plugin**: Uses `@tailwindcss/postcss` (not `tailwindcss`)
   ```javascript
   // postcss.config.js
   module.exports = {
     plugins: {
       '@tailwindcss/postcss': {},  // v4 plugin
       autoprefixer: {},
     },
   };
   ```

2. **CSS Imports**: Uses `@import "tailwindcss"` (not `@tailwind` directives)
   ```css
   /* src/styles/globals.css */
   @import "tailwindcss";  /* NOT @tailwind base/components/utilities */
   ```

3. **Theme Configuration**: Uses `@theme {}` directive in CSS (not `tailwind.config.ts` extensions)
   ```css
   @theme {
     --color-cyber-dark: #0a0e27;
     --color-cyber-primary: #00ff41;
     /* All custom tokens defined here */
   }
   ```

4. **Minimal Config File**: `tailwind.config.ts` only contains content paths
   ```typescript
   // NO theme.extend, NO plugins array
   const config: Config = {
     content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   };
   ```

### Hybrid CSS Approach

This project uses a **hybrid approach** rather than pure utility-first Tailwind:

- **Custom CSS Classes**: Base component styles (`.card`, `.btn`, `.text-display-1`)
- **Tailwind Utilities**: Responsive modifiers, state variants, spacing
- **CSS Variables**: Fluid typography with clamp(), transitions

**Example Pattern:**
```typescript
// Instead of pure Tailwind utilities everywhere:
<div className="card">  {/* Base styles from globals.css */}
  <h3 className="text-2xl font-bold text-cyber-primary">  {/* Tailwind utilities */}
```

## Architecture Overview

### Project Structure

```
src/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout (wraps all pages with Nav + Footer)
│   ├── page.tsx             # Homepage with Hero + Features
│   └── [routes]/page.tsx    # Route pages (courses, labs, community, about)
├── components/
│   ├── ui/                  # Reusable UI components (Button, Card, Badge, Input, Modal, Grid)
│   ├── layout/              # Layout components (Navigation, Footer)
│   └── features/            # Feature components (Hero, Hero3D)
├── lib/
│   ├── config.ts            # App configuration, routes, categories, feature flags
│   └── utils/               # Utilities (cn, formatDate, slugify, etc.)
└── styles/
    └── globals.css          # Tailwind v4 @theme + custom CSS classes
```

### Component Patterns

#### 1. forwardRef Pattern (All UI Components)
```typescript
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return <button ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />;
  }
);
Button.displayName = "Button";  // Required for React DevTools
```

#### 2. Compound Components (Card)
```typescript
// Card.tsx exports related components as a family
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

// Usage:
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### 3. cn() Utility Pattern
```typescript
import { cn } from "@/lib/utils";

// Used for conditional className merging everywhere
className={cn(
  "base-classes",
  variant === "primary" && "variant-classes",
  isActive && "active:classes",
  className  // Allow props to override
)}
```

#### 4. Client Components (Interactive)
```typescript
"use client";  // Required for hooks, Framer Motion, Three.js

import { useState } from "react";
import { motion } from "framer-motion";
// Components with state, effects, or animations
```

### Three.js Integration Pattern

**File**: `src/components/features/Hero3D.tsx`

```typescript
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. Create animated sub-components
function NetworkNode({ position }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });

  return <Sphere ref={meshRef} position={position}>...</Sphere>;
}

// 2. Compose scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <NetworkNode position={[0, 0, 0]} />
      <OrbitControls enableZoom={false} autoRotate />
    </>
  );
}

// 3. Export Canvas wrapper
export function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <Scene />
    </Canvas>
  );
}
```

**Usage with Suspense** (required for client-side 3D):
```typescript
import { Suspense } from "react";

<Suspense fallback={<LoadingFallback />}>
  <Hero3D />
</Suspense>
```

### Framer Motion Patterns

**Stagger Children Animation:**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,  // Delay between children
      delayChildren: 0.3,     // Initial delay before starting
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Animates first</motion.div>
  <motion.div variants={itemVariants}>Animates second (staggered)</motion.div>
</motion.div>
```

**Modal/Menu Transitions:**
```typescript
import { AnimatePresence } from "framer-motion";

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}  // Animates out when unmounting
    >
      {/* Content */}
    </motion.div>
  )}
</AnimatePresence>
```

## Design System

### Color System (Cyber Theme)

Colors are defined in `src/styles/globals.css` using the `@theme` directive:

```css
@theme {
  --color-cyber-dark: #0a0e27;               /* Primary background */
  --color-cyber-dark-secondary: #151a2f;     /* Cards, secondary surfaces */
  --color-cyber-border: #1f2937;
  --color-cyber-primary: #00ff41;            /* Matrix green (brand) */
  --color-cyber-secondary: #00d9ff;          /* Cyber blue (accent) */
  --color-cyber-danger: #ff0033;
  --color-cyber-warning: #ffd700;
  --color-cyber-text-primary: #e0e7ff;
  --color-cyber-text-secondary: #94a3b8;
  --color-cyber-text-muted: #64748b;
}
```

**Usage in components:**
```typescript
// Tailwind classes (reference @theme colors)
className="bg-cyber-dark text-cyber-primary border-cyber-border"
className="hover:border-cyber-primary hover:text-cyber-secondary"
```

### Custom CSS Classes (globals.css)

**Layout:**
- `.container-custom` - Max-width container with responsive padding (clamp)
- `.grid-12` - 12-column CSS grid

**Typography:**
- `.text-display-1`, `.text-display-2` - Fluid hero text (clamp)
- `.gradient-text` - Gradient text effect (primary → secondary)

**Effects:**
- `.glow-primary`, `.glow-secondary` - Glowing box shadows
- `.card` - Base card with hover effects (border glow, translateY)
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger` - Button variants

**Utilities:**
- `.scrollbar-cyber` - Custom styled scrollbar
- `.scrollbar-hide` - Hide scrollbar but keep functionality

**Animations:**
- `fade-in`, `slide-up`, `slide-down` - Entry animations
- `glow`, `float` - Continuous effects
- `matrix-rain`, `cyber-pulse`, `scan-line` - Themed effects

## Configuration & Constants

**File**: `src/lib/config.ts`

Centralized app configuration:

```typescript
export const config = {
  app: { name, url, description },
  routes: { home: "/", courses: "/courses", labs: "/labs", ... },
  navigation: { main: [{ label: "Courses", href: "/courses" }, ...] },
  features: {
    auth: false,      // Feature flags for planned features
    comments: false,
    labs: false,
  },
  content: { coursesPerPage: 12, ... },
  social: { github, twitter, discord },
} as const;

export const courseCategories = [...] as const;  // Course taxonomy
export const difficultyLevels = {...} as const;  // Beginner/Intermediate/Advanced
export const labEnvironments = {...} as const;   // Web/Terminal/Network/Binary

// Export types from constants
export type CourseCategory = typeof courseCategories[number]["id"];
export type DifficultyLevel = keyof typeof difficultyLevels;
```

**Usage:**
```typescript
import { config, courseCategories } from "@/lib/config";

{config.navigation.main.map((item) => (
  <Link href={item.href}>{item.label}</Link>
))}
```

## TypeScript Patterns

### Import Aliases
```typescript
import { Button, Card } from "@/components/ui";          // @/ maps to ./src/*
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
```

### Props Interface Pattern
```typescript
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}
```

### Component Export Pattern
```typescript
// Component file: Named export
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...);

// Index file: Barrel export
export { Button, type ButtonProps } from "./Button";

// Usage: Named import
import { Button } from "@/components/ui";
```

## State Management

**Current**: Local state only (useState, useEffect)
**Installed but not implemented**: Zustand

**Common patterns:**
```typescript
// Scroll detection
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Prevent body scroll (mobile menu, modals)
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
}, [isOpen]);
```

## Common Workflows

### Adding a New UI Component

1. Create `src/components/ui/NewComponent.tsx`:
   ```typescript
   import { forwardRef } from "react";
   import { cn } from "@/lib/utils";

   export interface NewComponentProps extends HTMLAttributes<HTMLDivElement> {
     variant?: "default" | "primary";
   }

   export const NewComponent = forwardRef<HTMLDivElement, NewComponentProps>(
     ({ className, variant = "default", ...props }, ref) => {
       return (
         <div
           ref={ref}
           className={cn("base-classes", variants[variant], className)}
           {...props}
         />
       );
     }
   );
   NewComponent.displayName = "NewComponent";
   ```

2. Add to `src/components/ui/index.ts`:
   ```typescript
   export { NewComponent, type NewComponentProps } from "./NewComponent";
   ```

3. Use Tailwind classes referencing `@theme` colors:
   ```typescript
   className="bg-cyber-dark border-cyber-border text-cyber-primary"
   ```

### Adding a New Page

1. Create `src/app/new-route/page.tsx`:
   ```typescript
   import { Container } from "@/components/ui";

   export default function NewPage() {
     return (
       <main className="min-h-screen pt-32 pb-20">
         <Container>
           <h1 className="text-display-2 gradient-text">Page Title</h1>
           {/* Content */}
         </Container>
       </main>
     );
   }
   ```

2. Add route to `src/lib/config.ts`:
   ```typescript
   routes: {
     newRoute: "/new-route",
   }
   ```

3. Optionally add to navigation array in config.ts

### Adding Custom Animations

1. Define keyframes in `src/styles/globals.css`:
   ```css
   @keyframes custom-animation {
     0% { transform: scale(1); }
     50% { transform: scale(1.1); }
     100% { transform: scale(1); }
   }
   ```

2. Add to `@theme` directive:
   ```css
   @theme {
     --animate-custom: custom-animation 2s ease-in-out infinite;
   }
   ```

3. Use in components:
   ```typescript
   className="animate-[custom-animation]"
   ```

## Feature Flags & Future Development

**Implemented:**
- ✅ Next.js 14 App Router with TypeScript
- ✅ Tailwind CSS v4 with @theme directive
- ✅ Component library (Button, Card, Badge, Input, Modal, Grid)
- ✅ Navigation (mobile menu with Framer Motion)
- ✅ Footer with social links
- ✅ Hero with Three.js 3D network visualization
- ✅ Responsive design, dark theme

**Planned (dependencies installed, not implemented):**
- ⏳ MDX content structure (`next-mdx-remote`, `gray-matter` installed)
- ⏳ Lenis smooth scroll (`lenis` installed)
- ⏳ Zustand state management (`zustand` installed)
- ⏳ Code syntax highlighting (`rehype-highlight`, `rehype-prism-plus` installed)

**Future (commented in .env.example):**
- ⏳ NextAuth.js authentication
- ⏳ Prisma database
- ⏳ Course/lab content system
- ⏳ User progress tracking
- ⏳ Community features

**Check feature flags** in `src/lib/config.ts`:
```typescript
features: {
  auth: false,
  comments: false,
  labs: false,
}
```

## Important Gotchas

1. **Tailwind v4**: Don't use v3 patterns (no `@tailwind` directives, no `theme()` function, no config extensions)
2. **Client Components**: Three.js and Framer Motion require `"use client"` directive
3. **forwardRef displayName**: Always set for React DevTools debugging
4. **Body Overflow**: Multiple components manipulate `document.body.style.overflow` - potential conflicts if not careful
5. **Grid Responsive Classes**: Grid component uses template literals for responsive classes - ensure Tailwind JIT can detect
6. **Import Paths**: Always use `@/` alias, not relative paths `../`
7. **Next.js 16**: Project uses Next.js 16 (not 14 as originally planned)
8. **React 19**: Uses React 19 with new JSX transform (`jsx: "react-jsx"`)

## Dependencies

**Key Production:**
- `next@^16.0.1` - Next.js framework
- `react@^19.2.0`, `react-dom@^19.2.0`
- `@react-three/fiber@^9.4.0`, `@react-three/drei@^10.7.6`, `three@^0.180.0` - 3D graphics
- `framer-motion@^12.23.24` - Animations
- `clsx@^2.1.1` - className utility

**Key Dev:**
- `tailwindcss@^4.1.16`, `@tailwindcss/postcss@^4.1.16` - Tailwind v4
- `typescript@^5.9.3`

## File Paths Reference

**Critical Files:**
- `src/styles/globals.css` - Tailwind v4 @theme directive, custom CSS classes
- `src/lib/config.ts` - App configuration, routes, categories
- `src/lib/utils/cn.ts` - className merging utility
- `src/app/layout.tsx` - Root layout (Nav + Footer wrapper)
- `src/components/ui/` - Reusable UI component library
- `src/components/features/Hero3D.tsx` - Three.js 3D visualization

**Config Files:**
- `postcss.config.js` - PostCSS with @tailwindcss/postcss plugin
- `tailwind.config.ts` - Minimal config (content paths only)
- `tsconfig.json` - TypeScript config with path aliases
- `next.config.js` - Next.js config with optimizePackageImports
