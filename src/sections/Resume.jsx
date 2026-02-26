import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const resumePath = '/resume.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = `${personalInfo.name}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="relative min-h-screen py-20 px-6 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
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
           
            <h2 className="text-5xl md:text-7xl font-bold relative">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                My
              </span>
              <span className="ml-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Resume
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
            View or download my complete professional resume showcasing
            <span className="text-primary font-semibold"> experience & achievements</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            {/* Animated background glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur transition-all duration-500 group-hover:opacity-40" />
            
            {/* Button */}
            <div className="relative px-8 py-4 rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* Animated gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-1">
                <div className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30 animate-shine" />
              </div>
              
              <div className="flex items-center gap-3 text-white font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Resume
              </div>
            </div>
          </a>

          <button
            onClick={handleDownload}
            className="group relative"
          >
            {/* Animated background glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur transition-all duration-500 group-hover:opacity-40" />
            
            {/* Button */}
            <div className="relative px-8 py-4 rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* Animated gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-1">
                <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30 animate-shine" />
              </div>
              
              <div className="flex items-center gap-3 text-white font-semibold">
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </div>
            </div>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-sm">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading resume...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={resumePath}
            className="w-full h-[500px] sm:h-[600px] md:h-[800px] lg:h-[1000px]"
            title="Resume PDF Viewer"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { label: 'Experience', value: '1+ Years', color: 'from-blue-500 to-cyan-500', icon: '💼' },
            { label: 'Projects', value: '10+', color: 'from-purple-500 to-pink-500', icon: '🚀' },
            { label: 'Technologies', value: '15+', color: 'from-green-500 to-emerald-500', icon: '⚡' },
            { label: 'Certifications', value: '4+', color: 'from-orange-500 to-red-500', icon: '🏆' }
          ].map((stat, index) => (
            <div key={index} className="relative group cursor-pointer">
              {/* Animated background glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 blur transition-all duration-500 group-hover:opacity-40`} />
              
              {/* Glass morphic card */}
              <div className="relative p-6 rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-white/10 overflow-hidden">
                {/* Animated gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-1">
                  <div className={`h-full w-full bg-gradient-to-r ${stat.color} rounded-t-2xl`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30 animate-shine" />
                </div>
                
                {/* Icon decoration */}
                <div className="absolute -top-2 -right-2 text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  {stat.icon}
                </div>
                
                {/* Content */}
                <div className="relative text-center">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
      `}</style>
    </section>
  );
}
