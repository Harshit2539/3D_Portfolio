import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!navRef.current) return;

    // Initial animations
    gsap.fromTo(logoRef.current, 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(itemsRef.current.filter(Boolean), 
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
    );

    // Enhanced scroll listener
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection observer for active sections
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let activeEntry = null;
        
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeEntry = entry;
          }
        });
        
        if (activeEntry && activeEntry.intersectionRatio > 0.1) {
          setActiveSection(activeEntry.target.id);
        }
      },
      { 
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );
    
    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.href.substring(1));
      if (element) observer.observe(element);
    });
    
    // Handle smooth scroll clicks
    const handleNavClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          setActiveSection(targetId);
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Auto-close mobile menu after 2 seconds
          setTimeout(() => {
            setIsOpen(false);
          }, 2000);
        }
      }
    };
    
    // Add click listeners to nav items
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      
      const navLinks = document.querySelectorAll('nav a[href^="#"]');
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-primary/30 shadow-2xl shadow-primary/10' 
            : 'bg-black/70 backdrop-blur-lg border-b border-white/10'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
            
            {/* Logo */}
            <div ref={logoRef} className="relative flex-shrink-0 z-50">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h1 className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 py-1">
                  <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent animate-gradient-x">
                    Harsh Tyagi
                  </span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item, i) => {
                const active = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    ref={(el) => {
                      if (el) itemsRef.current[i] = el;
                    }}
                    href={item.href}
                    className={`relative group px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-medium transition-all duration-300 ${
                      active
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {/* Active background */}
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl border border-primary/50" />
                    )}
                    
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Text */}
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-50 p-2 rounded-xl bg-gray-800/80 border border-white/20 backdrop-blur-sm"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-0" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-16 right-0 z-40 transition-all duration-500 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Mobile Menu Dropdown with 3D Effects */}
          <div className={`relative bg-black border-l border-b border-gray-800 shadow-2xl transition-all duration-500 transform origin-top-right perspective-1000 ${
            isOpen ? "scale-100 translate-y-0 rotateX-0" : "scale-95 -translate-y-4 rotateX-12"
          }`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}>
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-lg blur-sm opacity-30 animate-pulse" />
            
            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-lg" />
            
            <ul className="relative py-3 min-w-[220px] z-10">
              {navItems.map((item, index) => {
                const active = activeSection === item.href.substring(1);
                return (
                  <li key={item.name} className="relative overflow-hidden">
                    {/* Floating particle effect for active item */}
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full animate-pulse" />
                    )}
                    
                    <a
                      href={item.href}
                      className={`relative block px-6 py-4 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                        active
                          ? "bg-gradient-to-r from-primary/20 to-secondary/10 text-white shadow-lg shadow-primary/20"
                          : "text-white hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-900/50 hover:text-white"
                      }`}
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        animation: isOpen ? 'slideInRight3D 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' : 'none',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded" />
                      
                      <span className="relative flex items-center justify-between z-10"
                        style={{ color: '#ffffff', opacity: 1, visibility: 'visible' }}>
                        <span className="flex items-center gap-3">
                          {/* 3D Icon effect */}
                          <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            active 
                              ? "bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50 animate-bounce" 
                              : "bg-gray-600 group-hover:bg-primary"
                          }`} />
                          
                          <span className="relative" style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 'bold' }}>
                            {item.name}
                          </span>
                        </span>
                        
                        {active && (
                          <div className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-primary rounded-full animate-ping" />
                            <span className="w-1 h-1 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                            <span className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
                          </div>
                        )}
                      </span>
                      
                      {/* Ripple effect on hover */}
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-primary/20 rounded-full hover:w-full hover:h-full transition-all duration-500" />
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* Bottom glow accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isOpen && (
          <div 
            className="md:hidden fixed inset-0 z-30 bg-black/20"
            onClick={toggleMenu}
          />
        )}
      </nav>
    </>
  );
}