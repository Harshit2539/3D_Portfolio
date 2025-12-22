import { useRef, useEffect, useState } from 'react';
import { useGsap } from "../hooks/useGsap";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, projects } from "../data/portfolioData";
import { SplitText } from "../utils/splitText";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const particlesRef = useRef([]);
  const inputRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Get project count for stats
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const liveProjects = projects.filter(p => p.status === 'live').length;

  // Create floating contact particles
  useEffect(() => {
    const particles = [];
    const container = sectionRef.current;
    
    const contactIcons = ['📧', '💬', '📱', '💻', '🚀', '✨', '🔗', '⚡', '🌟', '💡'];
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      const icon = contactIcons[Math.floor(Math.random() * contactIcons.length)];
      particle.className = 'contact-particle';
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
          const x = (Math.random() - 0.5) * 700;
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
            rotation: `+=${Math.random() * 30}`,
            duration: 5 + Math.random() * 3,
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

    // Form animation
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 85%",
      },
      duration: 1.5,
      y: 80,
      opacity: 0,
      scale: 0.95,
      ease: "power3.out"
    });

    // Input field animations on focus
    inputRefs.current.forEach((input, index) => {
      if (!input) return;
      
      input.addEventListener('focus', () => {
        const container = input.parentElement;
        gsap.to(container, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Label animation
        const label = container.querySelector('.input-label');
        if (label) {
          gsap.to(label, {
            color: '#6366f1',
            y: -25,
            fontSize: '14px',
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Border animation
        const border = container.querySelector('.input-border');
        if (border) {
          gsap.to(border, {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
      
      input.addEventListener('blur', () => {
        const container = input.parentElement;
        gsap.to(container, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Label reset if empty
        const label = container.querySelector('.input-label');
        if (label && !input.value) {
          gsap.to(label, {
            color: '#9ca3af',
            y: 0,
            fontSize: '16px',
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Border reset
        const border = container.querySelector('.input-border');
        if (border && !input.value) {
          gsap.to(border, {
            scaleX: 0,
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
      backgroundPosition: '100% 100%',
      ease: "none"
    });

    // Floating social icons animation
    const socialIcons = document.querySelectorAll('.social-icon');
    gsap.from(socialIcons, {
      scrollTrigger: {
        trigger: '.social-icons-container',
        start: "top 85%",
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Animate label on input
    const input = e.target;
    const label = input.parentElement.querySelector('.input-label');
    if (label && value) {
      gsap.to(label, {
        color: '#6366f1',
        y: -25,
        fontSize: '14px',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Submit button animation
    const submitBtn = document.querySelector('.submit-btn');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    // Simulate API call (replace with actual email service)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Success animation
      gsap.fromTo('.success-message',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset all input labels
        inputRefs.current.forEach((input, index) => {
          if (input) {
            const label = input.parentElement.querySelector('.input-label');
            if (label) {
              gsap.to(label, {
                color: '#9ca3af',
                y: 0,
                fontSize: '16px',
                duration: 0.3,
                ease: "power2.out"
              });
            }
            
            const border = input.parentElement.querySelector('.input-border');
            if (border) {
              gsap.to(border, {
                scaleX: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }
        });
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    { 
      icon: '📧', 
      label: 'Email', 
      value: personalInfo.email, 
      color: 'from-blue-500 to-cyan-500',
      action: () => window.open(`mailto:${personalInfo.email}`, '_blank')
    },
    { 
      icon: '📱', 
      label: 'Phone', 
      value: personalInfo.phone, 
      color: 'from-purple-500 to-pink-500',
      action: () => window.open(`tel:${personalInfo.phone}`, '_blank')
    },
    { 
      icon: '📍', 
      label: 'Location', 
      value: personalInfo.location, 
      color: 'from-green-500 to-emerald-500',
      action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`, '_blank')
    },
    { 
      icon: '💼', 
      label: 'Role', 
      value: personalInfo.role.split('(')[0].trim(), 
      color: 'from-yellow-500 to-amber-500',
      action: null
    }
  ];

  const socialLinks = [
    { platform: 'LinkedIn', icon: '💼', url: personalInfo.linkedin, color: 'from-blue-600 to-blue-700' },
    { platform: 'GitHub', icon: '💻', url: personalInfo.github, color: 'from-gray-700 to-gray-900' },
    { platform: 'Email', icon: '📧', url: `mailto:${personalInfo.email}`, color: 'from-red-500 to-pink-500' },
    { platform: 'Portfolio', icon: '🚀', url: '#hero', color: 'from-purple-500 to-indigo-500' }
  ];

  const handleCopyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      
      // Show temporary success indicator
      const event = new CustomEvent('showToast', {
        detail: { message: `${type} copied to clipboard!` }
      });
      window.dispatchEvent(event);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)'
      }}
    >
      {/* Animated network pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.1) 2px, transparent 2px),
                           radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.1) 2px, transparent 2px)`,
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0, 50px 50px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Animated floating message icon */}
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-3xl">📬</span>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin-slow" />
            </div>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ opacity: 1, visibility: 'visible', display: 'block' }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Let's
            </span>
            <span className="ml-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          
          {/* Animated subtitle */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-400">
              Ready to bring your next big idea to life? I've successfully delivered
              <span className="text-primary font-semibold mx-2">10+ projects</span>
              and I'm excited to collaborate on your next venture
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Personal Intro Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur opacity-30 transition-all duration-500 group-hover:opacity-50" />
              
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                    {personalInfo.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{personalInfo.name}</div>
                    <div className="text-sm text-primary font-semibold mt-1">
                      {personalInfo.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {personalInfo.summary}
                </p>
              </div>
            </div>
            
            {/* Contact info cards */}
            {contactInfo.map((info, index) => (
              <div key={index} className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${info.color} rounded-2xl opacity-20 blur transition-all duration-500 group-hover:opacity-40`} />
                
                <div className="relative p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center text-2xl`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                      <div className="text-lg font-semibold text-white truncate">{info.value}</div>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  {info.action ? (
                    <button 
                      onClick={info.action}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
                    >
                      ↗
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleCopyToClipboard(info.value, info.label)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
                    >
                      ⎘
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {/* Social Links */}
            <div className="social-icons-container pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="social-icon relative group"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${social.color} rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                    <div className="relative w-14 h-14 rounded-full bg-gray-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {social.platform}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Project Stats */}
            <div className="relative group mt-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Project Portfolio</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {/* {totalProjects} */}
                      50+
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                      {/* {completedProjects} */}
                      40+
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                      {/* {liveProjects} */}
                      30+
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Live</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div ref={formRef} className="relative">
            {/* Form glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Main form */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm border border-white/10">
              {/* Success message */}
              {submitStatus === 'success' && (
                <div className="success-message absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl z-10">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">✨</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300">I'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  <h3 className="text-xl font-bold text-white">Send me a message</h3>
                </div>
                
                {/* Name field */}
                <div className="relative">
                  <label className="input-label absolute left-4 top-4 text-gray-400 pointer-events-none transition-all duration-300">
                    Your Name
                  </label>
                  <input
                    ref={el => inputRefs.current[0] = el}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-transparent border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-primary/50 transition-all duration-300"
                    required
                  />
                  <div className="input-border absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 transition-transform duration-300" />
                </div>
                
                {/* Email field */}
                <div className="relative">
                  <label className="input-label absolute left-4 top-4 text-gray-400 pointer-events-none transition-all duration-300">
                    Email Address
                  </label>
                  <input
                    ref={el => inputRefs.current[1] = el}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-transparent border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-primary/50 transition-all duration-300"
                    required
                  />
                  <div className="input-border absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 transition-transform duration-300" />
                </div>
                
                {/* Subject field */}
                <div className="relative">
                  <label className="input-label absolute left-4 top-4 text-gray-400 pointer-events-none transition-all duration-300">
                    Subject
                  </label>
                  <input
                    ref={el => inputRefs.current[2] = el}
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-transparent border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-primary/50 transition-all duration-300"
                    required
                  />
                  <div className="input-border absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 transition-transform duration-300" />
                </div>
                
                {/* Message field */}
                <div className="relative">
                  <label className="input-label absolute left-4 top-4 text-gray-400 pointer-events-none transition-all duration-300">
                    Your Message
                  </label>
                  <textarea
                    ref={el => inputRefs.current[3] = el}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-4 bg-transparent border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-primary/50 transition-all duration-300 resize-none"
                    required
                  />
                  <div className="input-border absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 transition-transform duration-300" />
                  
                  {/* Character counter */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {formData.message.length}/500
                  </div>
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn relative w-full py-4 rounded-xl text-lg font-semibold group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Button glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <div className="text-xl group-hover/btn:translate-x-2 transition-transform duration-300">
                          →
                        </div>
                      </>
                    )}
                  </div>
                </button>
                
                {/* Privacy note */}
                <p className="text-center text-sm text-gray-500">
                  Your information is secure. I'll never share your details.
                </p>
              </form>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-primary/10 rounded-full animate-spin-slow opacity-30" />
            <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-secondary/10 rounded-full animate-spin-slow opacity-30" />
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center relative">
          {/* Floating elements */}
          <div className="absolute -top-20 left-1/4 text-6xl opacity-10 animate-bounce">
            ✨
          </div>
          <div className="absolute -top-20 right-1/4 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '0.2s' }}>
            🚀
          </div>
          
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 rounded-3xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Let's Build Something Extraordinary Together
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Whether it's a complex web application, a sleek mobile app, or a cutting-edge AI solution,
                I'm ready to bring your vision to life with technical excellence and creative flair.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={() => alert('Please fill out the contact form above to get in touch with me!')}
                  className="relative group/cta"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover/cta:opacity-50 transition-opacity duration-300" />
                  <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg group-hover/cta:scale-105 transition-transform duration-300">
                    Schedule a Call
                  </div>
                </button>
                
                <a 
                  href="#projects"
                  className="relative group/cta"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover/cta:opacity-30 transition-opacity duration-300" />
                  <div className="relative px-8 py-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg group-hover/cta:border-primary/50 transition-all duration-300">
                    View My Projects
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification Component (Add to your main layout) */}
      <div id="toast" className="fixed bottom-4 right-4 p-4 bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm opacity-0 transition-opacity duration-300 z-50" />
      

      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        /* Title character animation */
        .contact-title-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px) rotateX(-15deg);
        }
        
        /* Particle styling */
        .contact-particle {
          will-change: transform, opacity;
        }
        
        /* Form input animations */
        .input-label {
          transition: all 0.3s ease;
        }
        
        .input-border {
          transform-origin: left center;
        }
        
        /* Submit button hover effect */
        .submit-btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }
        
        /* Success message animation */
        .success-message {
          animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .social-icon {
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
          }
          
          .input-label {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}