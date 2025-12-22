import { useRef, useEffect } from 'react';
import { useGsap } from "../hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from "../data/portfolioData";
import { SplitText } from "../utils/splitText";


gsap.registerPlugin(ScrollTrigger);

function SkillBlock({ title, items, index }) {
  const blockRef = useRef(null);
  const itemsRef = useRef([]);
  
  useGsap(() => {
    // Block entrance animation
    gsap.from(blockRef.current, {
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top 85%",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      scale: 0.9,
      rotateX: -10,
      ease: "back.out(1.7)",
      delay: index * 0.1
    });
    
    // Skill items stagger animation
    gsap.from(itemsRef.current, {
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top 80%",
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.3 + index * 0.1
    });
    
    // Hover effects
    if (blockRef.current) {
      blockRef.current.addEventListener('mouseenter', () => {
        gsap.to(blockRef.current, {
          scale: 1.03,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Animate title
        gsap.to(blockRef.current.querySelector('.skill-title'), {
          color: '#ffffff',
          duration: 0.2
        });
        
        // Particle effect on hover
        items.forEach((_, i) => {
          const item = itemsRef.current[i];
          if (item) {
            gsap.to(item, {
              scale: 1.1,
              duration: 0.3,
              delay: i * 0.03,
              ease: "power2.out"
            });
          }
        });
      });
      
      blockRef.current.addEventListener('mouseleave', () => {
        gsap.to(blockRef.current, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        items.forEach((_, i) => {
          const item = itemsRef.current[i];
          if (item) {
            gsap.to(item, {
              scale: 1,
              duration: 0.3,
              delay: i * 0.03,
              ease: "power2.out"
            });
          }
        });
      });
    }
  }, []);
  
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-yellow-500 to-amber-500',
    'from-indigo-500 to-violet-500'
  ];
  
  const icons = ['⚡', '🚀', '💻', '🔧', '⚙️', '🎯'];
  const colorIndex = index % colors.length;
  
  return (
    <div 
      ref={blockRef}
      className="relative group cursor-pointer"
    >
      {/* Animated background glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors[colorIndex]} rounded-2xl opacity-20 blur transition-all duration-500 group-hover:opacity-40`} />
      
      {/* Glass morphic card */}
      <div className="relative p-8 rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-white/10 overflow-hidden">
        {/* Animated gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-1">
          <div className={`h-full w-full bg-gradient-to-r ${colors[colorIndex]} rounded-t-2xl`} />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30 animate-shine" />
        </div>
        
        {/* Icon decoration */}
        <div className="absolute -top-4 -right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          {icons[index]}
        </div>
        
        {/* Content */}
        <div className="relative">
          {/* Title with gradient */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-8 bg-gradient-to-b ${colors[colorIndex]} rounded-full`} />
            <h3 className="skill-title text-2xl font-bold">
              <span className={`bg-gradient-to-r ${colors[colorIndex]} bg-clip-text text-transparent`}>
                {title}
              </span>
            </h3>
          </div>
          
          {/* Skill items */}
          <div className="flex flex-wrap gap-3">
            {items.map((skill, i) => (
              <span
                key={skill}
                ref={el => itemsRef.current[i] = el}
                className="relative group/skill-item"
              >
                {/* Skill badge background */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-full blur opacity-0 group-hover/skill-item:opacity-100 transition-opacity duration-300" />
                
                {/* Skill badge */}
                <div className="relative px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-white/10 text-sm font-medium text-gray-300 group-hover/skill-item:text-white transition-all duration-300">
                  {skill}
                  
                  {/* Progress indicator */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-gray-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'][colorIndex]})`,
                        // eslint-disable-next-line react-hooks/purity
                        width: `${70 + Math.random() * 30}%`
                      }}
                    />
                  </div>
                </div>
              </span>
            ))}
          </div>
        </div>
        
        {/* Animated floating element */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 border border-primary/10 rounded-full animate-spin-slow opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const particlesRef = useRef([]);
  
  // Create floating skill particles
  useEffect(() => {
    const particles = [];
    const container = sectionRef.current;
    
    // Skill icons for particles
    const skillIcons = ['⚛️', '🔧', '⚡', '🚀', '💾', '🔗', '🎨', '📱'];
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      const icon = skillIcons[Math.floor(Math.random() * skillIcons.length)];
      particle.className = 'skill-particle';
      particle.textContent = icon;
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 16}px;
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
          const y = (Math.random() - 0.5) * 400;
          
          gsap.to(particle, {
            opacity: 0.3,
            x,
            y,
            rotation: Math.random() * 360,
            duration: 1.5,
            delay: i * 0.1,
            ease: "power3.out"
          });
          
          // Continuous float animation
          gsap.to(particle, {
            y: `+=${(Math.random() - 0.5) * 40}`,
            x: `+=${(Math.random() - 0.5) * 40}`,
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
    
    // Simple title animation without SplitText
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
    
    // Section background animation
    gsap.fromTo(sectionRef.current,
      {
        backgroundPosition: '0% 0%'
      },
      {
        backgroundPosition: '100% 100%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
    
    // Floating animation for section elements
    gsap.to('.floating-element', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      },
      y: (i) => (i % 2 === 0 ? -20 : 20),
      ease: "none"
    });
  }, []);
  
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(20, 20, 40, 0.8) 0%, rgba(10, 10, 20, 1) 100%)'
      }}
    >
      {/* Animated geometric background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-primary/20 rounded-lg floating-element"
            style={{
              width: `${100 + i * 40}px`,
              height: `${100 + i * 40}px`,
              top: `${10 + i * 10}%`,
              left: `${5 + i * 5}%`,
              animation: `float ${15 + i * 5}s ease-in-out infinite`,
              transform: `rotate(${i * 45}deg)`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 relative">
          {/* Decorative elements */}
          <div className="absolute -left-10 top-1/2 transform -translate-y-1/2">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </div>
          
          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-12 h-1 bg-gradient-to-r from-secondary to-primary rounded-full" />
          </div>
          
          <div className="inline-block relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-50" />
           
            <h2 
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold relative"
              style={{ opacity: 1, visibility: 'visible', display: 'block' }}
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Technical
              </span>
              <span className="ml-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            
            {/* Animated underline */}
            <div className="relative h-1.5 mt-6 overflow-hidden max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-marquee" />
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive arsenal of modern technologies and frameworks I wield to build 
            <span className="text-primary font-semibold"> cutting-edge solutions</span>
          </p>
        </div>
        
        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <SkillBlock title="Languages" items={skills.languages} index={0} />
          <SkillBlock title="Frontend" items={skills.frontend} index={1} />
          <SkillBlock title="Backend" items={skills.backend} index={2} />
          <SkillBlock title="Databases" items={skills.databases} index={3} />
          <SkillBlock title="Tools & Platforms" items={skills.tools} index={4} />
          <SkillBlock title="Core Concepts" items={skills.concepts} index={5} />
        </div>
        
        {/* Skill Level Legend */}
        {/* <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Proficiency Levels</h3>
            <div className="text-primary text-sm font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Legend
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { level: 'Expert', color: 'from-green-500 to-emerald-500', width: '90%' },
              { level: 'Advanced', color: 'from-blue-500 to-cyan-500', width: '75%' },
              { level: 'Intermediate', color: 'from-purple-500 to-pink-500', width: '60%' },
              { level: 'Familiar', color: 'from-gray-500 to-gray-700', width: '40%' }
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.level}</span>
                  <span className="text-primary font-semibold">{item.width}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </div> */}
        
        {/* Continuous Learning Section */}
        <div className="mt-16 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-8 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-6">
              <div className="text-5xl">📚</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Always Learning & Evolving
                </h3>
                <p className="text-gray-400">
                  Technology never stands still, and neither do I. Currently exploring 
                  <span className="text-primary font-semibold mx-2">AI/ML integration</span>
                  and
                  <span className="text-secondary font-semibold mx-2">Web3 technologies</span>
                  to stay at the forefront of innovation.
                </p>
              </div>
            </div>
            
            {/* Learning progress */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { tech: 'AI/ML', progress: 65 },
                { tech: 'Web3', progress: 50 },
                { tech: 'DevOps', progress: 40 },
                { tech: 'SEO', progress: 35 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.tech}</span>
                    <span className="text-primary font-semibold">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-400 mb-8">
            Interested in how these skills can bring value to your project?
          </p>
          
          <div className="inline-flex items-center gap-6 px-10 py-5 rounded-2xl bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 group cursor-pointer hover:border-primary/50 transition-all duration-300">
            <div className="relative">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Let's Build Something Amazing
              </span>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
            </div>
            
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl group-hover:rotate-180 transition-transform duration-500">
                →
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
          50% { transform: translateY(-20px) rotate(calc(var(--rotation) + 180deg)); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        .animate-marquee {
          animation: marquee 3s linear infinite;
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Title character animation */
        .title-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px);
        }
        
        /* Particle styling */
        .skill-particle {
          will-change: transform, opacity;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .floating-element {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}