# Technology Stack

## Core Technologies

### Frontend Framework
- **React 19.2.0**: Latest React version with modern hooks and features
- **React DOM 19.2.0**: DOM rendering library for React applications

### Build System
- **Vite 7.2.4**: Fast build tool and development server
- **@vitejs/plugin-react 5.1.1**: Vite plugin for React support
- **ES Modules**: Modern JavaScript module system

### Styling & UI
- **Tailwind CSS 3.4.19**: Utility-first CSS framework
- **PostCSS 8.5.6**: CSS processing tool
- **Autoprefixer 10.4.23**: Automatic vendor prefix addition
- **React Icons 5.5.0**: Icon library for React components

### Animation Libraries
- **GSAP 3.14.2**: Professional animation library
- **@gsap/react 2.1.2**: React-specific GSAP integration
- **Framer Motion 12.23.26**: React animation and gesture library
- **@studio-freight/lenis 1.0.42**: Smooth scrolling library

### Development Tools
- **ESLint 9.39.1**: JavaScript/React linting
- **@eslint/js 9.39.1**: ESLint JavaScript configuration
- **eslint-plugin-react-hooks 7.0.1**: React hooks linting rules
- **eslint-plugin-react-refresh 0.4.24**: React refresh linting

### Type Support
- **@types/react 19.2.5**: TypeScript definitions for React
- **@types/react-dom 19.2.3**: TypeScript definitions for React DOM
- **@types/gsap 1.20.2**: TypeScript definitions for GSAP

## Development Commands

### Local Development
```bash
npm run dev          # Start development server with hot reload
```

### Production Build
```bash
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint for code quality checks
```

## Configuration Files

### Build Configuration
- **vite.config.js**: Vite build settings and React plugin setup
- **package.json**: Dependencies, scripts, and project metadata

### Styling Configuration
- **tailwind.config.cjs**: Tailwind CSS customization and content paths
- **postcss.config.cjs**: PostCSS processing configuration

### Code Quality
- **eslint.config.js**: ESLint rules and React-specific configurations
- **.gitignore**: Version control exclusions

## Browser Support
- Modern browsers supporting ES6+ features
- Responsive design for mobile, tablet, and desktop
- Optimized performance across different screen sizes

## Performance Features
- **Vite HMR**: Hot module replacement for fast development
- **Tree Shaking**: Automatic removal of unused code
- **Code Splitting**: Optimized bundle loading
- **Asset Optimization**: Automatic image and resource optimization