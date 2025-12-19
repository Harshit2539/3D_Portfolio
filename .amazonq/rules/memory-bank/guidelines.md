# Development Guidelines

## Code Quality Standards

### File Structure and Naming
- **Component Files**: Use PascalCase for React components (e.g., `Contact.jsx`, `Navbar.jsx`)
- **Data Files**: Use camelCase for data modules (e.g., `portfolioData.js`)
- **Hook Files**: Prefix custom hooks with "use" (e.g., `useGsap.js`)
- **Section Organization**: Group related components in dedicated folders (`/sections`, `/components`, `/hooks`)

### Import Organization
- **React Imports First**: Always import React hooks first
- **Third-party Libraries**: Import external libraries after React
- **Local Imports**: Import local components, hooks, and data last
- **GSAP Plugin Registration**: Register GSAP plugins immediately after imports

Example pattern:
```javascript
import { useRef, useEffect, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, projects } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);
```

### Component Structure Standards
- **Functional Components**: Use function declarations with default export
- **Ref Management**: Group all useRef declarations at component top
- **State Management**: Initialize state with useState after refs
- **Effect Hooks**: Place useEffect hooks after state declarations
- **Custom Hooks**: Call custom hooks (like useGsap) after built-in hooks

## Animation Implementation Patterns

### GSAP Integration Standards
- **Plugin Registration**: Always register GSAP plugins at module level
- **ScrollTrigger Usage**: Use ScrollTrigger for scroll-based animations
- **Animation Cleanup**: Implement proper cleanup in useEffect return functions
- **Context Management**: Use gsap.context() for better performance and cleanup

### Animation Timing Patterns
- **Staggered Animations**: Use consistent stagger values (0.03s, 0.08s, 0.1s)
- **Duration Standards**: Short animations (0.3s), medium (0.6s-1.2s), long (1.5s+)
- **Easing Preferences**: Use "power3.out", "back.out(1.7)", "elastic.out(1, 0.5)"

### Scroll Animation Implementation
```javascript
ScrollTrigger.create({
  trigger: elementRef.current,
  start: "top 80%",
  onEnter: () => {
    // Animation logic
  }
});
```

## Styling Conventions

### Tailwind CSS Usage
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Color System**: Use consistent color variables (primary, secondary, accent)
- **Spacing**: Prefer Tailwind spacing utilities over custom CSS
- **Component Scoping**: Use className for component-specific styles

### Gradient Patterns
- **Text Gradients**: `bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`
- **Background Gradients**: `bg-gradient-to-br from-gray-900/70 to-black/70`
- **Border Gradients**: Use absolute positioned divs for gradient borders

### Interactive States
- **Hover Effects**: Implement scale, translate, and opacity transitions
- **Focus States**: Use border color changes and scale transforms
- **Loading States**: Implement spinner animations and disabled states

## Data Management Patterns

### Centralized Data Structure
- **Single Source**: Store all static content in `portfolioData.js`
- **Named Exports**: Use named exports for different data categories
- **Object Structure**: Organize data in logical objects (personalInfo, experience, projects, skills)

### Data Access Patterns
```javascript
// Import specific data objects
import { personalInfo, projects } from "../data/portfolioData";

// Use data for dynamic content generation
const totalProjects = projects.length;
const completedProjects = projects.filter(p => p.status === 'completed').length;
```

## Event Handling Standards

### Form Management
- **Controlled Components**: Use state for all form inputs
- **Event Handlers**: Implement consistent naming (handleInputChange, handleSubmit)
- **Validation**: Implement client-side validation with visual feedback
- **Animation Integration**: Animate form interactions (focus, blur, submit)

### User Interaction Patterns
- **Click Handlers**: Use descriptive function names (handleCopyToClipboard, toggleMenu)
- **Async Operations**: Implement loading states and error handling
- **Accessibility**: Include keyboard navigation and screen reader support

## Performance Optimization

### Animation Performance
- **Will-Change Property**: Use CSS will-change for animated elements
- **Passive Event Listeners**: Use { passive: true } for scroll/mouse events
- **Animation Cleanup**: Always clean up animations in useEffect cleanup

### Component Optimization
- **Ref Arrays**: Use ref arrays for multiple similar elements
- **Conditional Rendering**: Implement efficient conditional rendering patterns
- **State Updates**: Batch state updates when possible

## Accessibility Standards

### Semantic HTML
- **Proper Headings**: Use hierarchical heading structure (h1, h2, h3)
- **ARIA Labels**: Include aria-labels for interactive elements
- **Focus Management**: Implement proper focus states and keyboard navigation

### Visual Accessibility
- **Color Contrast**: Ensure sufficient contrast ratios
- **Animation Preferences**: Respect user motion preferences
- **Screen Reader Support**: Include descriptive text for visual elements

## Error Handling Patterns

### Async Operations
- **Try-Catch Blocks**: Wrap async operations in try-catch
- **User Feedback**: Provide visual feedback for success/error states
- **Graceful Degradation**: Implement fallbacks for failed operations

### Form Validation
- **Client-Side Validation**: Implement immediate feedback
- **Error Messages**: Display clear, actionable error messages
- **Recovery Paths**: Provide ways to correct errors

## Code Documentation

### Comment Standards
- **Section Headers**: Use comment blocks to separate major sections
- **Complex Logic**: Document complex animation or calculation logic
- **TODO Items**: Mark incomplete features with TODO comments

### Function Documentation
- **Purpose Description**: Document function purpose and parameters
- **Return Values**: Document what functions return
- **Side Effects**: Document any side effects or state changes