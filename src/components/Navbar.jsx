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
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          setActiveSection(targetId);
          setIsOpen(false); // Close mobile menu
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
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
  }, []);

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
          className={`md:hidden fixed inset-0 z-40 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/95"
            onClick={toggleMenu}
          />
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-6">
            <div className="w-full max-w-sm space-y-4">
              {navItems.map((item, index) => {
                const active = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block w-full text-center py-4 px-6 rounded-xl text-xl font-bold transition-all duration-300 ${
                      active
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                    style={{
                      opacity: 1,
                      visibility: 'visible',
                      display: 'block',
                      color: active ? '#ffffff' : '#ffffff',
                      backgroundColor: active ? '#6366f1' : '#374151'
                    }}
                  >
                    {item.name}
                    {active && <span className="ml-2">●</span>}
                  </a>
                );
              })}
            </div>
            
            {/* Close hint */}
            <div className="absolute bottom-8 text-white text-sm font-medium">
              Tap anywhere to close
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}