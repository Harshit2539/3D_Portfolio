import { useRef, useEffect, useState } from 'react';
import { useGsap } from "../hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from "../data/portfolioData";
import { SplitText } from "../utils/splitText";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef([]);
  const particlesRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  // Create floating project particles
  useEffect(() => {
    const particles = [];
    const container = sectionRef.current;
    
    const projectIcons = ['🚀', '💻', '⚡', '✨', '🎯', '🔥', '💾', '🔧', '⚙️', '📱'];
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      const icon = projectIcons[Math.floor(Math.random() * projectIcons.length)];
      particle.className = 'project-particle';
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
          const x = (Math.random() - 0.5) * 800;
          const y = (Math.random() - 0.5) * 400;
          
          gsap.to(particle, {
            opacity: 0.4,
            x,
            y,
            rotation: Math.random() * 360,
            duration: 2,
            delay: i * 0.1,
            ease: "power3.out"
          });
          
          // Continuous float animation
          gsap.to(particle, {
            y: `+=${(Math.random() - 0.5) * 80}`,
            x: `+=${(Math.random() - 0.5) * 80}`,
            rotation: `+=${Math.random() * 40}`,
            duration: 6 + Math.random() * 4,
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

    // Projects grid animation
    gsap.from(projectsRef.current, {
      scrollTrigger: {
        trigger: projectsRef.current[0],
        start: "top 85%",
      },
      duration: 1,
      y: 80,
      opacity: 0,
      scale: 0.9,
      stagger: {
        amount: 0.6,
        grid: 'auto',
        from: 'random'
      },
      ease: "power3.out"
    });

    // Interactive particle effect on hover
    projectsRef.current.forEach((project, index) => {
      if (!project) return;
      
      project.addEventListener('mouseenter', () => {
        setHoveredProject(index);
        
        // Project lift and glow effect
        gsap.to(project, {
          y: -15,
          scale: 1.03,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Background glow
        const glow = project.querySelector('.project-glow');
        if (glow) {
          gsap.to(glow, {
            opacity: 0.6,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Title glow
        const title = project.querySelector('.project-title');
        if (title) {
          gsap.to(title, {
            '--gradient-x': '100%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        // Tech stack animation
        const techItems = project.querySelectorAll('.tech-item');
        techItems.forEach((tech, i) => {
          gsap.to(tech, {
            y: -5,
            scale: 1.1,
            duration: 0.3,
            delay: i * 0.05,
            ease: "power2.out"
          });
        });
        
        // Highlight points animation
        const highlights = project.querySelectorAll('.highlight-item');
        highlights.forEach((highlight, i) => {
          gsap.to(highlight, {
            x: 15,
            opacity: 1,
            duration: 0.3,
            delay: i * 0.08,
            ease: "power2.out"
          });
        });
        
        // Preview image/icon animation
        const preview = project.querySelector('.project-preview');
        if (preview) {
          gsap.to(preview, {
            scale: 1.1,
            rotation: 5,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
      
      project.addEventListener('mouseleave', () => {
        setHoveredProject(null);
        
        // Reset project position
        gsap.to(project, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Reset background glow
        const glow = project.querySelector('.project-glow');
        if (glow) {
          gsap.to(glow, {
            opacity: 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Reset title
        const title = project.querySelector('.project-title');
        if (title) {
          gsap.to(title, {
            '--gradient-x': '0%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        // Reset tech items
        const techItems = project.querySelectorAll('.tech-item');
        techItems.forEach((tech, i) => {
          gsap.to(tech, {
            y: 0,
            scale: 1,
            duration: 0.3,
            delay: i * 0.02,
            ease: "power2.out"
          });
        });
        
        // Reset highlights
        const highlights = project.querySelectorAll('.highlight-item');
        highlights.forEach((highlight, i) => {
          gsap.to(highlight, {
            x: 0,
            duration: 0.3,
            delay: i * 0.03,
            ease: "power2.out"
          });
        });
        
        // Reset preview
        const preview = project.querySelector('.project-preview');
        if (preview) {
          gsap.to(preview, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    });

    // Background animation
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

    // Filter tabs animation
    const filters = document.querySelectorAll('.filter-tab');
    filters.forEach((filter, index) => {
      filter.addEventListener('click', () => {
        // Animate active tab
        gsap.to(filter, {
          scale: 0.95,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      });
    });

  }, []);

  // Filter categories (you can customize based on your projects)
  const categories = ['all', 'full-stack', 'frontend', 'backend', 'ai/ml', 'mobile'];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)'
      }}
    >
      {/* Animated binary code background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(99, 102, 241, 0.1) 2px,
            rgba(99, 102, 241, 0.1) 4px
          )`,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Animated floating orb */}
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-3xl">🚀</span>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin-slow" />
            </div>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ opacity: 1, visibility: 'visible', display: 'block' }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Featured
            </span>
            <span className="ml-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          
          {/* Animated subtitle */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-400">
              A showcase of my most impactful work, from
              <span className="text-primary font-semibold mx-2">innovative solutions</span>
              to
              <span className="text-secondary font-semibold mx-2">complex systems</span>
            </p>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`filter-tab relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeFilter === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10" />
              )}
              <span className="relative capitalize">
                {category.replace('-', ' ')}
                {activeFilter === category && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                )}
              </span>
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => projectsRef.current[index] = el}
              className="relative group cursor-pointer"
            >
              {/* Background glow effect */}
              <div className="project-glow absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-xl opacity-30 transition-opacity duration-500" />
              
              {/* Main project card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm border border-white/10 overflow-hidden">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Project header */}
                <div className="relative mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 
                        className="project-title text-2xl md:text-3xl font-bold mb-2"
                        style={{
                          '--gradient-x': '0%',
                          background: 'linear-gradient(90deg, #ffffff 0%, var(--gradient-color, #9ca3af) var(--gradient-x), #ffffff 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          backgroundSize: '200% 100%'
                        } }
                      >
                        {project.title}
                      </h3>
                      
                      {/* Project status badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-primary">Live Project</span>
                      </div>
                    </div>
                    
                    {/* Preview icon/image */}
                    <div className="project-preview w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-3xl">
                      {project.title.charAt(0)}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* Tech stack */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    <span className="text-sm font-semibold text-gray-400">Tech Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.split(',').map((tech, idx) => (
                      <span
                        key={idx}
                        className="tech-item px-3 py-1.5 text-xs rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 text-gray-300"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Project highlights */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    <span className="text-sm font-semibold text-gray-400">Key Highlights</span>
                  </div>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, idx) => (
                      <li 
                        key={idx}
                        className="highlight-item text-gray-300 leading-relaxed flex items-start gap-3"
                      >
                        {/* Animated bullet */}
                        <div className="relative flex-shrink-0 mt-1.5">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        {/* Highlight text */}
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Project footer with links */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  {/* Impact metrics */}
                  <div className="flex items-center gap-4">
                    {[
                      { icon: '👥', value: '10K+', label: 'Users' },
                      { icon: '⚡', value: '99%', label: 'Uptime' },
                      { icon: '🏆', value: '4.9', label: 'Rating' }
                    ].map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="flex items-center gap-1">
                          <span className="text-lg">{metric.icon}</span>
                          <span className="text-sm font-bold text-white">{metric.value}</span>
                        </div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button className="relative group/btn">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300" />
                      <div className="relative px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 text-xs font-medium text-white group-hover/btn:border-primary/50 transition-all duration-300">
                        View Demo
                      </div>
                    </button>
                    
                    <button className="relative group/btn">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300" />
                      <div className="relative px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 text-xs font-medium text-primary group-hover/btn:from-primary/30 group-hover/btn:to-secondary/30 transition-all duration-300">
                        <span className="flex items-center gap-1">
                          <span>Code</span>
                          <span className="text-lg">→</span>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-primary/10 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-secondary/10 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Projects Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: projects.length, label: 'Total Projects', icon: '📊', color: 'from-blue-500 to-cyan-500' },
            { value: '100K+', label: 'Lines of Code', icon: '💻', color: 'from-purple-500 to-pink-500' },
            { value: '50+', label: 'Technologies Used', icon: '🔧', color: 'from-green-500 to-emerald-500' },
            { value: '∞', label: 'Passion Level', icon: '🔥', color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 blur transition-all duration-500 group-hover:opacity-40`} />
              
              <div className="relative p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center relative">
          {/* Floating elements */}
          <div className="absolute -top-20 left-1/4 text-6xl opacity-10 animate-bounce">
            💡
          </div>
          <div className="absolute -top-20 right-1/4 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
            🚀
          </div>
          
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 rounded-3xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Have an Exciting Project Idea?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Let's collaborate and turn your vision into a cutting-edge digital solution
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="relative group/cta">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover/cta:opacity-50 transition-opacity duration-300" />
                  <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg group-hover/cta:scale-105 transition-transform duration-300">
                    Start a Project
                  </div>
                </button>
                
                <button className="relative group/cta">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover/cta:opacity-30 transition-opacity duration-300" />
                  <div className="relative px-8 py-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg group-hover/cta:border-primary/50 transition-all duration-300">
                    View All Projects
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Title character animation */
        .project-title-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px) rotateX(-20deg);
        }
        
        /* Particle styling */
        .project-particle {
          will-change: transform, opacity;
        }
        
        /* Smooth hover transitions */
        .tech-item, .highlight-item {
          transition: all 0.3s ease;
        }
        
        /* Project card depth effect */
        .project-glow {
          transition: opacity 0.5s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .filter-tab {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
          
          .project-preview {
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}