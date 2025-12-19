import { forwardRef } from 'react';

const SectionWrapper = forwardRef(({ 
  id, 
  className = '', 
  children, 
  background = 'default',
  ...props 
}, ref) => {
  const backgroundStyles = {
    default: 'bg-gradient-to-br from-gray-900 to-black',
    primary: 'bg-gradient-to-br from-primary/10 to-transparent',
    secondary: 'bg-gradient-to-br from-secondary/10 to-transparent',
    dark: 'bg-black',
    transparent: 'bg-transparent'
  };

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-20 overflow-hidden ${backgroundStyles[background]} ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;