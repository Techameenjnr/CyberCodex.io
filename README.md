# CyberCodex.io

A modern, comprehensive cybersecurity learning platform built with Next.js 14, featuring interactive tutorials, hands-on labs, and educational resources for ethical hacking and penetration testing.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, React 19, TypeScript, and Tailwind CSS
- **3D Visualizations**: Interactive Three.js network visualization in the hero section
- **Smooth Animations**: Framer Motion for fluid, engaging animations
- **Responsive Design**: Mobile-first design with full mobile menu support
- **Dark Theme**: Cybersecurity-themed design with matrix green and cyber blue accents
- **Component Library**: Reusable UI components (Button, Card, Badge, Input, Modal, Grid)
- **MDX Support**: Ready for markdown-based course content
- **Type-Safe**: Full TypeScript coverage for reliability and developer experience

## 🎨 Design System

### Color Palette

```css
--cyber-dark: #0a0e27              /* Primary background */
--cyber-dark-secondary: #151a2f     /* Secondary background */
--cyber-primary: #00ff41            /* Matrix green */
--cyber-secondary: #00d9ff          /* Cyber blue */
--cyber-danger: #ff0033             /* Alert red */
--cyber-warning: #ffd700            /* Gold */
```

### Typography

- **Headings**: Fluid responsive sizing with `clamp()`
- **Body**: Inter font family for readability
- **Code**: Monospace font with syntax highlighting support

## 📁 Project Structure

```
CyberCodex.io/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with Nav/Footer
│   │   ├── page.tsx           # Homepage
│   │   ├── courses/           # Courses page
│   │   ├── labs/              # Labs page
│   │   ├── community/         # Community page
│   │   └── about/             # About page
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Grid.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   └── features/          # Feature components
│   │       ├── Hero.tsx
│   │       └── Hero3D.tsx
│   ├── lib/
│   │   ├── config.ts          # App configuration & constants
│   │   ├── utils/             # Utility functions
│   │   └── hooks/             # Custom React hooks (planned)
│   ├── styles/
│   │   └── globals.css        # Global styles & Tailwind
│   └── types/                 # TypeScript type definitions
├── public/                     # Static assets
├── content/                    # Course & lab content (planned)
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## Important 
After creating the first steps to the page! lets now create a github repo and make a directory to store all the files we have created! 

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Getting Started

1. **Clone the repository** (if using git):

```bash
git clone <repository-url>
cd CyberCodex.io
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

4. **Run the development server**:

```bash
npm run dev
```

5. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

## 🎯 Core Components

### UI Components

- **Button**: Multiple variants (primary, secondary, danger, ghost) with loading states
- **Card**: Flexible card component with hover effects
- **Badge**: Status badges with multiple color variants
- **Input**: Form input with label and error message support
- **Modal**: Accessible modal dialog with backdrop
- **Grid**: Responsive 12-column grid system with flexible layouts

### Layout Components

- **Navigation**: Fixed navigation bar with mobile menu overlay
- **Footer**: Footer with links, newsletter signup, and social media

### Feature Components

- **Hero**: Hero section with 3D visualization integration
- **Hero3D**: Three.js network visualization with animated nodes

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.ts` and `src/styles/globals.css` to customize the color scheme.

### Adding New Pages

Create a new folder in `src/app/` with a `page.tsx` file:

```bash
src/app/your-page/page.tsx
```

## 🔜 Planned Features

- [ ] Lenis smooth scroll implementation
- [ ] MDX content structure for courses
- [ ] Course browsing and filtering
- [ ] Code syntax highlighting
- [ ] Interactive lab environments
- [ ] User authentication (NextAuth.js)
- [ ] Database integration (Prisma)
- [ ] User progress tracking
- [ ] Community forums and comments
- [ ] Starter course content
- [ ] Performance optimization
- [ ] Vercel deployment

## 📝 Configuration

### Environment Variables

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="CyberCodex.io"
```

### Site Configuration

Edit `src/lib/config.ts` to customize:

- Navigation menu items
- Course categories
- Difficulty levels
- Lab environments
- Social media links

## 🤝 Contributing

This is an educational project focused on cybersecurity learning. All content and features are intended for:

- ✅ Educational purposes
- ✅ Authorized security testing
- ✅ CTF challenges
- ✅ Legal penetration testing
- ❌ Unauthorized hacking or illegal activities

## 📄 License

This project is for educational purposes only. All cybersecurity techniques taught are for ethical and legal use only.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Three.js](https://threejs.org)
- [Framer Motion](https://www.framer.com/motion/)
- [OWASP](https://owasp.org)

---

**Built with ❤️ for the cybersecurity community**
