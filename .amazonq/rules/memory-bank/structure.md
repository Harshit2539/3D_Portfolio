# Project Structure

## Directory Organization

### Root Level
- **package.json**: Project dependencies and scripts configuration
- **vite.config.js**: Vite build tool configuration
- **tailwind.config.cjs**: Tailwind CSS framework setup
- **eslint.config.js**: Code linting rules and standards
- **index.html**: Main HTML entry point
- **README.md**: Project documentation and setup instructions

### Source Code (`/src`)
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar component
│   └── SectionWrapper.jsx # Layout wrapper for sections
├── sections/           # Main page sections
│   ├── Hero.jsx        # Landing/intro section
│   ├── About.jsx       # Personal background and stats
│   ├── Projects.jsx    # Portfolio showcase
│   ├── Skills.jsx      # Technical competencies
│   ├── Experience.jsx  # Work history timeline
│   ├── Certificates.jsx # Educational credentials
│   └── Contact.jsx     # Contact information
├── data/               # Static content and configuration
│   └── portfolioData.js # Centralized data store
├── hooks/              # Custom React hooks
│   └── useGsap.js      # GSAP animation utilities
├── assets/             # Static resources
│   └── react.svg       # React logo asset
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
├── App.css             # Global application styles
└── index.css           # Base CSS and Tailwind imports
```

## Architectural Patterns

### Component Architecture
- **Section-Based Layout**: Each major portfolio section is a separate component
- **Reusable Components**: Common UI elements abstracted into shared components
- **Data Separation**: Content stored in centralized data files for easy maintenance

### State Management
- **Local State**: Component-level state using React hooks
- **Props Flow**: Data passed down from parent components
- **Custom Hooks**: Animation and utility logic encapsulated in custom hooks

### Styling Strategy
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Component Scoping**: Styles defined at component level
- **Responsive Design**: Mobile-first approach with breakpoint utilities

### Animation System
- **GSAP Integration**: Professional animations using GreenSock Animation Platform
- **Framer Motion**: React-specific animation library for component transitions
- **Custom Hooks**: Animation logic abstracted into reusable hooks

## Core Relationships
- **App.jsx** orchestrates all section components
- **SectionWrapper.jsx** provides consistent layout for all sections
- **portfolioData.js** feeds content to multiple components
- **useGsap.js** provides animation utilities across components