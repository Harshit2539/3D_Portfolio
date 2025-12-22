import { useRef, useEffect } from 'react';
import { useGsap } from "../hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const particlesRef = useRef([]);
  const cardsRef = useRef([]);

  // Create floating particles
  useEffect(() => {
    const particles = [];
    const container = aboutRef.current;
    
    // Create tech icon particles
    const techIcons = ['</>', '{ }', '=>', '()', '[]', '⚡', '🚀', '💾', '🔧', '⚙️'];
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      const icon = techIcons[Math.floor(Math.random() * techIcons.length)];
      particle.className = 'about-particle';
      particle.textContent = icon;
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 14}px;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        color: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
        will-change: transform;
        transform: translateZ(0);
      `;
      container.appendChild(particle);
      particles.push(particle);
    }
    
    particlesRef.current = particles;
    
    // Animate particles on scroll
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top center",
      onEnter: () => {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            opacity: 0.4,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 300,
            rotation: Math.random() * 360,
            duration: 2,
            delay: i * 0.1,
            ease: "power3.out"
          });
          
          // Continuous float animation
          gsap.to(particle, {
            y: `+=${(Math.random() - 0.5) * 50}`,
            rotation: `+=${Math.random() * 20}`,
            duration: 3 + Math.random() * 2,
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

  // Main animations
  useGsap(() => {
    // Title animation with holographic effect
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
      },
      duration: 1.5,
      y: 100,
      rotationX: -15,
      opacity: 0,
      ease: "power4.out"
    });

    // Split text effect for summary
    const summaryText = personalInfo.summary;
    const summaryElement = document.querySelector('#about-summary');
    
    if (summaryElement) {
      summaryElement.innerHTML = summaryText.split('').map(char => 
        `<span class="summary-char">${char}</span>`
      ).join('');
      
      gsap.from('.summary-char', {
        scrollTrigger: {
          trigger: summaryElement,
          start: "top 85%",
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.02,
        ease: "back.out(1.7)"
      });
    }

    // Animated cards for key points
    gsap.from('.about-card', {
      scrollTrigger: {
        trigger: '.about-cards-container',
        start: "top 75%",
      },
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Animated border on hover for cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Animate border gradient
        const border = card.querySelector('.card-border');
        if (border) {
          gsap.to(border, {
            backgroundPosition: '100% 50%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        const border = card.querySelector('.card-border');
        if (border) {
          gsap.to(border, {
            backgroundPosition: '0% 50%',
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    });

    // Floating animation for tech stack
    gsap.to('.tech-stack-item', {
      scrollTrigger: {
        trigger: '.tech-stack',
        start: "top 80%",
      },
      y: (i) => (i % 2 === 0 ? -10 : 10),
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title with gradient and badge */}
        <div className="relative mb-16">
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
            <div className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full" />
          </div>
          
          <div className="flex items-center gap-6 mb-8">
            <div ref={titleRef} className="relative">
              <h2 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  About
                </span>
                <span className="ml-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              
              {/* Animated underline */}
              <div className="relative h-1 mt-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-marquee" />
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative px-6 py-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10">
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Full Stack Dev
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Summary */}
          <div className="space-y-8">
            {/* Summary with animated text */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-2xl" />
                
                <p 
                  id="about-summary"
                  className="text-xl leading-relaxed text-gray-300"
                >
                  {personalInfo.summary}
                </p>
                
                {/* Interactive cursor effect */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                  <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow" />
                </div>
              </div>
            </div>

            {/* Current Role Card */}
            <div 
              ref={el => cardsRef.current[0] = el}
              className="about-card relative group cursor-pointer"
            >
              <div className="card-border absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-70 blur transition-all duration-500" />
              
              <div className="relative p-8 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-white/10 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                </div>
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-2xl">💼</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Current Role</h3>
                      <div className="text-sm text-primary font-semibold mt-1">
                        Software Development Engineer
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">
                    At <span className="text-primary font-semibold">Redian Software Global</span>, 
                    I specialize in building full-stack SaaS products, AI-powered platforms, 
                    and performance-driven backend systems that scale to thousands of users.
                  </p>
                  
                  {/* Tech stack indicators */}
                  <div className="flex gap-2 mt-6">
                    {[ 'PHP', 'MERN', 'Python', 'AI', 'SQL'].map((tech, i) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Tech Stack */}
          <div className="space-y-8">
            {/* Key Stats Cards */}
            <div className="about-cards-container grid grid-cols-2 gap-6">
              {[
                { value: '1+', label: 'Years Experience', icon: '⏳', color: 'from-blue-500 to-cyan-500' },
                { value: '10+', label: 'Projects Delivered', icon: '🚀', color: 'from-purple-500 to-pink-500' },
                { value: '100%', label: 'Client Satisfaction', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
                { value: '∞', label: 'Passion for Code', icon: '❤️', color: 'from-red-500 to-pink-500' }
              ].map((stat, index) => (
                <div
                  key={index}
                  ref={el => cardsRef.current[index + 1] = el}
                  className="about-card relative group"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-xl opacity-50 blur transition-all duration-500`} />
                  
                  <div className="relative p-6 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-white/10 text-center">
                    <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                    
                    {/* Animated dots */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-primary animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="tech-stack relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Tech Arsenal
                </span>
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </h3>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  'C', 'Java', 'JavaScript', 'SQL',
                  'Python', 'PHP', 'Laravel', 'Prompt AI',
                  'React', 'Node.js', 'MongoDB', 'Express', 
                  'LLM', 'Model Integration', 'Model Training', 'APIs'
                ].map((tech, index) => (
                  <div
                    key={tech}
                    className="tech-stack-item relative group"
                  >
                    <div className="relative p-4 rounded-xl bg-gray-900/50 border border-white/10 text-center transition-all duration-300 group-hover:border-primary/50">
                      <div className="text-lg font-medium text-gray-300 group-hover:text-white">
                        {tech}
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Level indicator */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gray-700 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${80 + (index % 5) * 4}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Animated background element */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 border-2 border-primary/10 rounded-full animate-spin-slow" />
            </div>

            {/* Philosophy Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="text-4xl mt-1">💡</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Development Philosophy</h4>
                    <p className="text-gray-300">
                      I believe in writing <span className="text-primary">clean, maintainable code</span> 
                      that not only solves problems but also creates delightful user experiences. 
                      Every line of code is an opportunity to build something amazing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 group cursor-pointer hover:border-primary/50 transition-all duration-300">
            <span className="text-lg font-semibold text-white">
              Want to build something incredible together?
            </span>
            <div className="relative">
              <span className="text-primary font-bold">Let's Do it</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
            </div>
            <div className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
              →
              {/* 💡 */}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}