import { useRef, useEffect } from 'react';
import { useGsap } from "../hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from "../data/portfolioData";
import { SplitText } from "../utils/splitText";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);

  // Create floating timeline particles
  useEffect(() => {
    const particles = [];
    const container = sectionRef.current;
    
    const jobIcons = ['💼', '🚀', '⚡', '🎯', '✨', '🌟', '🔥', '💻'];
    
    for (let i = 0; i < 4; i++) {
      const particle = document.createElement('div');
      const icon = jobIcons[Math.floor(Math.random() * jobIcons.length)];
      particle.className = 'experience-particle';
      particle.textContent = icon;
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 24 + 20}px;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        will-change: transform;
        transform: translateZ(0);
      `;
      container.appendChild(particle);
      particles.push(particle);
    }
    
    particlesRef.current = particles;
    
    // Animate particles on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => {
        particles.forEach((particle, i) => {
          const x = (Math.random() - 0.5) * 500;
          const y = (Math.random() - 0.5) * 300;
          
          gsap.to(particle, {
            opacity: 0.4,
            x,
            y,
            rotation: Math.random() * 360,
            duration: 1.8,
            delay: i * 0.15,
            ease: "power3.out"
          });
          
          // Continuous float animation
          gsap.to(particle, {
            y: `+=${(Math.random() - 0.5) * 60}`,
            rotation: `+=${Math.random() * 30}`,
            duration: 5 + Math.random() * 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    });
    
    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  useGsap(() => {
    // Ensure title is visible first
    gsap.set(titleRef.current, { opacity: 1, visibility: 'visible' });
    
    // Simple title animation
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Timeline animation
    gsap.from(timelineRef.current, {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 85%",
      },
      duration: 1.5,
      scaleX: 0,
      transformOrigin: "left center",
      ease: "power3.out"
    });

    // Experience cards staggered entrance
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: "top 80%",
      },
      duration: 1,
      x: -100,
      opacity: 0,
      stagger: 0.3,
      ease: "power3.out"
    });

    // Animated background effect
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      },
      backgroundPosition: '0% 100%',
      ease: "none"
    });

    // Interactive hover effects for cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const durationElement = card.querySelector('.duration-indicator');
      const roleElement = card.querySelector('.role-text');
      
      card.addEventListener('mouseenter', () => {
        // Card lift effect
        gsap.to(card, {
          y: -15,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Timeline node glow
        const node = card.querySelector('.timeline-node');
        if (node) {
          gsap.to(node, {
            scale: 1.5,
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.8)',
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Duration indicator animation
        if (durationElement) {
          gsap.to(durationElement, {
            color: '#ffffff',
            textShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            duration: 0.3
          });
        }
        
        // Role text glow
        if (roleElement) {
          gsap.to(roleElement, {
            '--gradient-x': '100%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        // Animate bullet points
        const bullets = card.querySelectorAll('.experience-point');
        bullets.forEach((bullet, i) => {
          gsap.to(bullet, {
            x: 20,
            opacity: 1,
            duration: 0.3,
            delay: i * 0.05,
            ease: "power2.out"
          });
        });
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset card position
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Reset timeline node
        const node = card.querySelector('.timeline-node');
        if (node) {
          gsap.to(node, {
            scale: 1,
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Reset duration indicator
        if (durationElement) {
          gsap.to(durationElement, {
            color: '#9ca3af',
            textShadow: 'none',
            duration: 0.3
          });
        }
        
        // Reset role text
        if (roleElement) {
          gsap.to(roleElement, {
            '--gradient-x': '0%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        // Reset bullet points
        const bullets = card.querySelectorAll('.experience-point');
        bullets.forEach((bullet, i) => {
          gsap.to(bullet, {
            x: 0,
            duration: 0.3,
            delay: i * 0.02,
            ease: "power2.out"
          });
        });
      });
    });
    
    // Year markers animation
    const years = experience.map(exp => {
      const year = exp.duration.split(' ')[0].split('-')[0];
      return year;
    });
    
    const uniqueYears = [...new Set(years)];
    
    uniqueYears.forEach((year, index) => {
      const marker = document.createElement('div');
      marker.className = 'year-marker';
      marker.textContent = year;
      marker.style.cssText = `
        position: absolute;
        left: ${(index / (uniqueYears.length - 1)) * 100}%;
        bottom: -40px;
        transform: translateX(-50%);
        color: #9ca3af;
        font-size: 12px;
        font-weight: 600;
        opacity: 0;
      `;
      timelineRef.current?.parentElement?.appendChild(marker);
      
      gsap.to(marker, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        },
        duration: 0.8,
        opacity: 1,
        y: -10,
        delay: 0.5 + index * 0.2,
        ease: "power2.out"
      });
    });

  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'
      }}
    >
      {/* Animated circuit board background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, transparent 95%, rgba(99, 102, 241, 0.3) 100%),
                           linear-gradient(0deg, transparent 95%, rgba(99, 102, 241, 0.3) 100%)`,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center'
        }} />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 relative">
          {/* Decorative orb */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-2xl">💼</span>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin-slow" />
              </div>
            </div>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-4xl md:text-7xl font-bold relative inline-block"
            style={{ opacity: 1, visibility: 'visible', display: 'block' }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Professional
            </span>
            <span className="ml-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          
          {/* Animated subtitle */}
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-xl text-gray-400">
              A timeline of my career progression, showcasing 
              <span className="text-primary font-semibold mx-2">growth</span>
              and
              <span className="text-secondary font-semibold mx-2">achievements</span>
            </p>
          </div>
        </div>
        
        {/* Main Timeline Container */}
        <div className="relative">
          {/* Animated timeline */}
          <div 
            ref={timelineRef}
            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full shadow-2xl shadow-primary/30"
            style={{ transformOrigin: 'left center' }}
          />
          
          {/* Experience Cards */}
          <div className="space-y-24 pl-8 md:pl-12">
            {experience.map((exp, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="relative group"
              >
                {/* Timeline Node */}
                <div className="absolute -left-12 top-0">
                  <div className="relative">
                    <div className="timeline-node w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/50 border-2 border-white" />
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Connection line */}
                    <div className="absolute -left-6 top-3 w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                  </div>
                </div>
                
                {/* Experience Card */}
                <div className="relative">
                  {/* Card glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Main card */}
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-white/10 overflow-hidden">
                    {/* Animated top border */}
                    <div className="absolute top-0 left-0 right-0 h-1">
                      <div className="h-full w-full bg-gradient-to-r from-primary to-secondary rounded-t-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30 animate-shine" />
                    </div>
                    
                    {/* Company logo placeholder */}
                    <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <div className="text-8xl">🏢</div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      {/* Role & Company */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 
                            className="role-text text-2xl md:text-3xl font-bold"
                            style={{
                              '--gradient-x': '0%',
                              background: 'linear-gradient(90deg, #ffffff 0%, #9ca3af var(--gradient-x), #ffffff 100%)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              color: 'transparent',
                              backgroundSize: '200% 100%'
                            }}
                          >
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-4 h-0.5 bg-primary rounded-full" />
                            <p className="text-lg text-secondary font-semibold">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                        
                        {/* Duration & Location */}
                        <div className="mt-4 md:mt-0 md:text-right">
                          <p className="duration-indicator text-sm text-gray-400 font-medium bg-gray-800/50 px-4 py-2 rounded-full inline-block">
                            📅 {exp.duration}
                          </p>
                          <p className="text-sm text-gray-500 mt-2 flex items-center justify-end gap-2">
                            <span>📍</span>
                            {exp.location}
                          </p>
                        </div>
                      </div>
                      
                      {/* Responsibilities */}
                      <div className="mt-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                          <h4 className="text-lg font-semibold text-white">
                            Key Responsibilities & Achievements
                          </h4>
                        </div>
                        
                        <ul className="space-y-4">
                          {exp.points.map((point, idx) => (
                            <li 
                              key={idx}
                              className="experience-point text-gray-300 leading-relaxed flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
                            >
                              {/* Animated bullet */}
                              <div className="relative flex-shrink-0 mt-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              
                              {/* Point text */}
                              <span className="flex-1">
                                {point}
                                
                                {/* Highlight effect on hover */}
                                <span className="block h-0.5 w-0 bg-gradient-to-r from-primary to-secondary mt-2 group-hover:w-full transition-all duration-500" />
                              </span>
                              
                              {/* Achievement indicator */}
                              {point.toLowerCase().includes('lead') || 
                               point.toLowerCase().includes('achieve') ||
                               point.toLowerCase().includes('success') ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary flex-shrink-0">
                                  🎯
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Tech Stack Used */}
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {/* Sample tech stack - you can replace with actual data */}
                          {['React', 'Node.js', 'MongoDB', 'SQL', 'PHP', 'AI-Integration'].map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                          <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-gray-800 to-black border border-white/10 text-gray-400">
                            + more
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative corner */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-primary/10 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                  </div>
                </div>
                
                {/* Year indicator */}
                <div className="absolute -left-24 top-8 hidden md:block">
                  <div className="relative">
                    <div className="text-sm font-bold text-primary bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30">
                      {exp.duration.split(' ')[0].split('-')[0]}
                    </div>
                    <div className="absolute -right-2 top-1/2 w-4 h-0.5 bg-gradient-to-l from-primary to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Career Summary */}
        <div className="mt-24 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-8 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {experience.length}+
                </div>
                <div className="text-gray-400 mt-2">Professional Roles</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">💡</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  10+
                </div>
                <div className="text-gray-400 mt-2">Projects Delivered</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">⭐</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-gray-400 mt-2">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Step CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-xl text-gray-400">
              Ready to add another successful project to this timeline?
            </p>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <button className="relative px-12 py-5 rounded-2xl bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 group-hover:border-primary/50 transition-all duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Let's Work Together ..
                </span>
                
                {/* Animated arrow */}
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl group-hover:rotate-180 transition-transform duration-500">
                      →
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Title character animation */
        .exp-title-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px) rotateX(-15deg);
        }
        
        /* Particle styling */
        .experience-particle {
          will-change: transform, opacity;
        }
        
        /* Timeline node animation */
        .timeline-node {
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }
        
        /* Experience point animation */
        .experience-point {
          transform: translateX(0);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .year-marker {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}