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

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const itemsRef = useRef([]);


  // Removed custom cursor for better performance

  /* =========================
     Initial Animations
  ========================== */
  useEffect(() => {
    if (!navRef.current) return;

    // Simple initial animations without complex GSAP context
    gsap.fromTo(logoRef.current, 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(itemsRef.current.filter(Boolean), 
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
    );

    // Simple scroll listener instead of ScrollTrigger
    const handleScroll = () => {
      if (navRef.current) {
        const scrolled = window.scrollY > 50;
        navRef.current.style.backgroundColor = scrolled 
          ? 'rgba(10,10,20,0.95)' 
          : 'rgba(10,10,20,0.7)';
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Improved intersection observer for active sections
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let maxRatio = 0;
        let activeEntry = null;
        
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeEntry = entry;
          }
        });
        
        // Update active section if we have a valid entry
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
          // Immediately update active section
          setActiveSection(targetId);
          
          // Smooth scroll to target
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
      
      // Clean up nav click listeners
      const navLinks = document.querySelectorAll('nav a[href^="#"]');
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  /* =========================
     Mobile Menu
  ========================== */
  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    const overlay = document.querySelector(".mobile-menu-overlay");
    if (overlay) {
      gsap.to(overlay, {
        clipPath: newState
          ? "circle(150% at 90% 40px)"
          : "circle(0% at 90% 40px)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <>


      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10"
        style={{
          background: "rgba(10,10,20,0.9)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          minHeight: "80px",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between relative z-10">
            {/* Logo */}
            <div ref={logoRef} className="relative">
              <h1 className="text-3xl font-bold">
                <span className="animate-gradient-x bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
                  Harsh Tyagi
                </span>
              </h1>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex gap-2">
              {navItems.map((item, i) => {
                const active = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    ref={(el) => {
                      if (el) itemsRef.current[i] = el;
                    }}
                    href={item.href}
                    className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-primary/20 text-white border border-primary/50"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }
                    `}
                    style={{
                      minWidth: '80px',
                      textAlign: 'center',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      zIndex: 100
                    }}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Mobile Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative h-12 w-12"
            >
              <span
                className={`absolute h-0.5 w-6 bg-white transition ${
                  isOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-white transition ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-white transition ${
                  isOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 lg:hidden"
          style={{
            clipPath: "circle(0% at 90% 40px)",
            background:
              "radial-gradient(circle at top right, rgba(20,20,40,.98), rgba(10,10,20,.95))",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className="text-4xl font-bold text-white/80 hover:text-white transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
