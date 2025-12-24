import { useRef, useEffect, useState } from 'react';
import { useGsap } from "../hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates } from "../data/portfolioData";
import { SplitText } from "../utils/splitText";

gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const certsRef = useRef([]);
  const particlesRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCert, setHoveredCert] = useState(null);

  // Extract unique categories from certificates
  const categories = ['all', ...new Set(certificates.map(cert => cert.category || 'professional'))];

  // Create floating certificate particles
  useEffect(() => {
    const particles = [];
    const container = sectionRef.current;
    
    const certIcons = ['🏆', '🎓', '⭐', '📜', '✨', '🚀', '💡', '🔑', '⚡', '🌟'];
    
    for (let i = 0; i < 4; i++) {
      const particle = document.createElement('div');
      const icon = certIcons[Math.floor(Math.random() * certIcons.length)];
      particle.className = 'cert-particle';
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
          const x = (Math.random() - 0.5) * 600;
          const y = (Math.random() - 0.5) * 300;
          
          gsap.to(particle, {
            opacity: 0.4,
            x,
            y,
            rotation: Math.random() * 360,
            duration: 1.8,
            delay: i * 0.12,
            ease: "power3.out"
          });
          
          // Continuous float animation
          gsap.to(particle, {
            y: `+=${(Math.random() - 0.5) * 50}`,
            rotation: `+=${Math.random() * 20}`,
            duration: 4 + Math.random() * 3,
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

    // Certificate cards animation
    gsap.from(certsRef.current.filter(Boolean), {
      scrollTrigger: {
        trigger: certsRef.current[0],
        start: "top 85%",
      },
      duration: 1,
      y: 60,
      opacity: 0,
      scale: 0.9,
      stagger: {
        amount: 0.8,
        grid: 'auto',
        from: 'random'
      },
      ease: "power3.out"
    });

    // Interactive hover effects for all certificates
    certificates.forEach((_, index) => {
      const cert = certsRef.current[index];
      if (!cert) return;
      
      cert.addEventListener('mouseenter', () => {
        setHoveredCert(index);
        
        // Certificate lift and glow effect
        gsap.to(cert, {
          y: -12,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Background glow
        const glow = cert.querySelector('.cert-glow');
        if (glow) {
          gsap.to(glow, {
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Title animation
        const title = cert.querySelector('.cert-title');
        if (title) {
          gsap.to(title, {
            '--gradient-x': '100%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        // Badge animation
        const badge = cert.querySelector('.cert-badge');
        if (badge) {
          gsap.to(badge, {
            scale: 1.2,
            rotation: 360,
            duration: 0.6,
            ease: "back.out(1.7)"
          });
        }
        
        // Date animation
        const date = cert.querySelector('.cert-date');
        if (date) {
          gsap.to(date, {
            color: '#ffffff',
            textShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            duration: 0.3
          });
        }
        
        // Verify button animation
        const verifyBtn = cert.querySelector('.verify-btn');
        if (verifyBtn) {
          gsap.to(verifyBtn, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
      
      cert.addEventListener('mouseleave', () => {
        setHoveredCert(null);
        
        // Reset certificate position
        gsap.to(cert, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Reset background glow
        const glow = cert.querySelector('.cert-glow');
        if (glow) {
          gsap.to(glow, {
            opacity: 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Reset title
        const title = cert.querySelector('.cert-title');
        if (title) {
          gsap.to(title, {
            '--gradient-x': '0%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        // Reset badge
        const badge = cert.querySelector('.cert-badge');
        if (badge) {
          gsap.to(badge, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        }
        
        // Reset date
        const date = cert.querySelector('.cert-date');
        if (date) {
          gsap.to(date, {
            color: '#9ca3af',
            textShadow: 'none',
            duration: 0.3
          });
        }
        
        // Reset verify button
        const verifyBtn = cert.querySelector('.verify-btn');
        if (verifyBtn) {
          gsap.to(verifyBtn, {
            x: 20,
            opacity: 0,
            duration: 0.3,
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
      backgroundPosition: '100% 0%',
      ease: "none"
    });

    // Filter tabs animation
    const filters = document.querySelectorAll('.cert-filter-tab');
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
        
        // Animate certificate cards based on filter
        certsRef.current.forEach((cert, i) => {
          if (cert) {
            const category = certificates[i]?.category || 'professional';
            const shouldShow = activeFilter === 'all' || category === activeFilter;
            
            gsap.to(cert, {
              opacity: shouldShow ? 1 : 0.3,
              scale: shouldShow ? 1 : 0.9,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        });
      });
    });

  }, [activeFilter]);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'
      }}
    >
      {/* Animated diploma pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(99, 102, 241, 0.1) 20px,
            rgba(99, 102, 241, 0.1) 40px
          )`,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Animated floating medal */}
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-6 bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-orange-500/30 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
              <span className="text-3xl">🏆</span>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin-slow" />
            </div>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-4xl md:text-7xl font-bold mb-6"
            style={{ opacity: 1, visibility: 'visible', display: 'block' }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Professional
            </span>
            <br className="block md:hidden" />
            <span className="ml-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          
          {/* Animated subtitle */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-400">
              Validating expertise through
              <span className="text-primary font-semibold mx-2">recognized credentials</span>
              and
              <span className="text-secondary font-semibold mx-2">continuous learning</span>
            </p>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`cert-filter-tab relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeFilter === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full -z-10" />
              )}
              <span className="relative capitalize flex items-center gap-2">
                {category === 'all' ? 'All' : category}
                {activeFilter === category && (
                  <span className="text-xs">✓</span>
                )}
              </span>
            </button>
          ))}
        </div>
        
        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              ref={el => certsRef.current[index] = el}
              className="relative group cursor-pointer"
            >
              {/* Background glow effect */}
              <div className="cert-glow absolute -inset-0.5 bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-orange-500/30 rounded-3xl blur-xl opacity-30 transition-opacity duration-500" />
              
              {/* Main certificate card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm border border-white/10 overflow-hidden">
                {/* Animated ribbon effect */}
                <div className="absolute -top-2 -right-8 w-32 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 transform rotate-45 flex items-center justify-center">
                  <span className="text-xs font-bold text-black">CERTIFIED</span>
                </div>
                
                {/* Certificate header */}
                <div className="relative mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 
                        className="cert-title text-2xl md:text-3xl font-bold mb-2"
                        style={{
                          '--gradient-x': '0%',
                          background: 'linear-gradient(90deg, #ffffff 0%, #fbbf24 var(--gradient-x), #ffffff 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          backgroundSize: '200% 100%'
                        } }
                      >
                        {cert.title}
                      </h3>
                      
                      {/* Issuer with icon */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-xs">🏢</span>
                        </div>
                        <p className="text-lg font-semibold text-primary">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    
                    {/* Certificate badge */}
                    <div className="cert-badge w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/30 to-amber-500/30 border border-yellow-500/30 flex items-center justify-center text-3xl">
                      📜
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
                
                {/* Certificate details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full" />
                      <span className="text-sm font-semibold text-gray-400">Category</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 text-yellow-500 text-sm font-medium">
                      {cert.category || 'Professional'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full" />
                      <span className="text-sm font-semibold text-gray-400">Date Earned</span>
                    </div>
                    <div className="cert-date text-sm font-medium text-gray-400 flex items-center gap-2">
                      <span className="text-yellow-500">📅</span>
                      {cert.date || 'Completed'}
                    </div>
                  </div>
                </div>
                
                {/* Skills acquired */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full" />
                    <span className="text-sm font-semibold text-gray-400">Skills Validated</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* Add skills from certificate data or use default */}
                    {['Expertise', 'Best Practices', 'Industry Standards'].map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                    <span className="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 text-yellow-500">
                      + more
                    </span>
                  </div>
                </div>
                
                {/* Certificate footer */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  {/* Verification status */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-green-500 font-medium">Verified</span>
                    </div>
                    
                    {/* Credential ID */}
                    <div className="text-xs text-gray-500 font-mono">
                      ID: {cert.credentialId || `CERT-${String(index + 1).padStart(4, '0')}`}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button className="verify-btn relative opacity-0 translate-x-5">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                      <div className="relative px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm border border-yellow-500/30 text-xs font-medium text-yellow-500 hover:from-yellow-500/30 hover:to-amber-500/30 transition-all duration-300">
                        Verify Credential
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => window.open('https://linkedin.com/in/harshtyagi25', '_blank')}
                      className="relative group/btn"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300" />
                      <div className="relative px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 text-xs font-medium text-white group-hover/btn:border-primary/50 transition-all duration-300">
                        View Certificate
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-yellow-500/10 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="absolute -top-8 -right-8 w-20 h-20 border-2 border-amber-500/10 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Certification Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: certificates.length, label: 'Total Certifications', icon: '📜', color: 'from-yellow-500 to-amber-500' },
            { value: '100%', label: 'Verified Credentials', icon: '✅', color: 'from-green-500 to-emerald-500' },
            { value: '∞', label: 'Learning Commitment', icon: '🎯', color: 'from-blue-500 to-cyan-500' },
            { value: '50+', label: 'Skills Mastered', icon: '💡', color: 'from-purple-500 to-pink-500' }
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
        
        {/* Continuous Learning Section */}
        <div className="mt-20 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-8 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-6">
              <div className="text-5xl">🚀</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Continuous Learning Journey
                </h3>
                <p className="text-gray-400">
                  Currently pursuing advanced certifications in
                  <span className="text-primary font-semibold mx-2">Cloud Architecture</span>
                  and
                  <span className="text-secondary font-semibold mx-2">AI/ML Engineering</span>
                  to stay at the forefront of technology innovation.
                </p>
              </div>
            </div>
            
            {/* Learning progress */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { cert: 'AWS Solutions Architect', progress: 75 },
                { cert: 'LLM Models', progress: 60 },
                { cert: 'Database Administrator', progress: 45 },
                { cert: 'React Expert', progress: 55 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate">{item.cert}</span>
                    <span className="text-yellow-500 font-semibold">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center relative">
          {/* Floating elements */}
          <div className="absolute -top-20 left-1/4 text-6xl opacity-10 animate-bounce">
            🎓
          </div>
          <div className="absolute -top-20 right-1/4 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '0.3s' }}>
            ⭐
          </div>
          
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 rounded-3xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Verified Expertise
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                These certifications validate my commitment to excellence and continuous learning in software engineering
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={() => window.open('https://linkedin.com/in/harshtyagi25', '_blank')}
                  className="relative group/cta"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl blur opacity-0 group-hover/cta:opacity-50 transition-opacity duration-300" />
                  <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold text-lg group-hover/cta:scale-105 transition-transform duration-300">
                    Download All Credentials
                  </div>
                </button>
                
                <button 
                  onClick={() => window.open('https://linkedin.com/in/harshtyagi25', '_blank')}
                  className="relative group/cta"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover/cta:opacity-30 transition-opacity duration-300" />
                  <div className="relative px-8 py-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg group-hover/cta:border-primary/50 transition-all duration-300">
                    View LinkedIn Certifications
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
        .cert-title-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px) rotateX(-15deg);
        }
        
        /* Particle styling */
        .cert-particle {
          will-change: transform, opacity;
        }
        
        /* Certificate ribbon effect */
        .cert-glow {
          transition: opacity 0.5s ease;
        }
        
        /* Verify button animation */
        .verify-btn {
          transition: all 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .cert-filter-tab {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
          
          .cert-badge {
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}