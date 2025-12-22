import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '../utils/splitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Simple fade in animation with visibility fix
  useEffect(() => {
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1, visibility: 'visible' });
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 1, visibility: 'visible' });
      gsap.fromTo(subtitleRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(20, 20, 40, 0.8) 40%, rgba(10, 10, 20, 1) 100%)'
      }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-8 sm:py-12 hero-content">
        {/* Animated badge */}
        <div className="inline-block mb-2 sm:mb-4 md:mb-6 lg:mb-8 relative group z-50 hero-badge" style={{ opacity: 1, visibility: 'visible', position: 'relative', zIndex: 9999 }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
          <div className="relative px-6 py-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10">
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🚀 AVAILABLE FOR WORK
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          </div>
        </div>

        {/* Main title with holographic effect */}
        <h1 
          ref={titleRef}
          className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mb-2 sm:mb-4 md:mb-6 relative"
          style={{
            '--glow-x': '0px',
            '--glow-y': '0px',
            opacity: 1,
            visibility: 'visible',
            display: 'block'
          }}
        >
          <div className="relative inline-block">
            {/* Back glow layer */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-3xl opacity-30"
              style={{
                transform: 'translate3d(var(--glow-x), var(--glow-y), 0)'
              }}
            />
            
            {/* Main text */}
            <span className="relative bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Full Stack
            </span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
          </div>
          
          <br />
          
          <div className="relative inline-block mt-4">
            <span className="relative bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              MERN Engineer
            </span>
            
            {/* Floating tags */}
            <div className="absolute -top-6 -right-6 flex space-x-2">
              {['⚛️', '🔥', '🚀'].map((emoji, i) => (
                <span
                  key={i}
                  className="text-2xl animate-bounce"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </h1>

        {/* Subtitle with advanced typography */}
        <p 
          ref={subtitleRef}
          className="hero-subtitle mt-2 sm:mt-4 md:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-3xl mx-auto px-4 relative"
          style={{
            opacity: 1,
            visibility: 'visible',
            display: 'block'
          }}
        >
          <span className="relative">
            I deliver 
            <span className="inline-block mx-2 px-3 py-1 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
                scalable
              </span>
            </span>
            software systems that handle  
            <span className="hero-highlight"> real-world traffic, </span>
           
            <span className="hero-highlight"> improve performance, and </span>
            drive measurable business outcomes.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center hero-buttons" style={{ opacity: 1, visibility: 'visible' }}>
          {/* Primary button with magnetic effect */}
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gray-900 border border-white/10 rounded-2xl" />
            <span className="relative text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
              View My Work →
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500" />
          </button>

          {/* Secondary button with glass morphism */}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-2xl backdrop-blur-sm border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-lg font-semibold text-white">
              Let's Connect
            </span>
            <div className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 group-hover:left-1/4 transition-all duration-500" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-2xl mx-auto hero-stats" style={{ opacity: 1, visibility: 'visible' }}>
          {[
            { value: '10+', label: 'Projects', emoji: '🚀' },
            { value: '1+', label: 'Years Exp', emoji: '💼' },
            { value: '100%', label: 'Satisfaction', emoji: '⭐' }
          ].map((stat, i) => (
            <div
              key={i}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-3 sm:p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">{stat.label}</div>
                <div className="absolute -top-2 -right-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.emoji}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating code snippets */}
      <div className="hidden lg:block absolute top-1/4 right-4 xl:right-10 opacity-10 group hover:opacity-30 transition-opacity duration-300" style={{ visibility: 'visible' }}>
        <div className="font-mono text-sm text-primary/50 bg-gray-900/50 p-4 rounded-lg border border-primary/30 backdrop-blur-sm">
          <div className="text-primary">const <span className="text-secondary">engineer</span> = <span className="text-accent">new</span> FullStackDev();</div>
        </div>
      </div>

    </section>
  );
}