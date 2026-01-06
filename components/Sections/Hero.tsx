import React from 'react';
import { ArrowRight, ChevronDown, Palette } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-red-600/20 rounded-full blur-[128px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left md:flex md:items-center md:justify-between w-full">
        
        {/* Text Content */}
        <div className="md:w-1/2 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in-up">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Open for commissions
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Designing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Digital Dreams</span>
            <br /> For Humans.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto md:mx-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Hi, I'm Robin. A multidisciplinary Designer & Developer. I craft immersive digital experiences and memorable brand identities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <a href="#projects" className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-primary rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900 shadow-lg shadow-primary/25">
              View Portfolio
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 font-semibold text-gray-300 transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white focus:outline-none">
              Get in Touch
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {SOCIAL_LINKS.map((link) => (
              <a 
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <link.icon className="w-6 h-6" />
                <span className="sr-only">{link.platform}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Visual Element (Abstract Design Layers) */}
        <div className="hidden md:block md:w-1/2 relative h-[500px] animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-full max-w-md aspect-square">
               {/* Decorative Gradient Blob */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-30 blur-3xl rounded-full animate-pulse"></div>
                
                {/* Floating "Glass" Cards simulating Layers */}
                <div className="absolute top-1/4 right-0 w-48 h-64 bg-surface/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 transform rotate-6 shadow-2xl animate-[blob_8s_infinite]">
                  <div className="w-full h-32 bg-gradient-to-br from-primary/50 to-purple-600/50 rounded-lg mb-4"></div>
                  <div className="w-3/4 h-3 bg-white/20 rounded-full mb-2"></div>
                  <div className="w-1/2 h-3 bg-white/20 rounded-full"></div>
                </div>

                <div className="absolute bottom-1/4 left-10 w-48 h-56 bg-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 transform -rotate-12 shadow-2xl z-20 animate-[blob_10s_infinite_reverse]">
                   <div className="flex items-center gap-2 mb-4">
                      <Palette className="text-primary w-5 h-5"/>
                      <span className="text-xs font-bold text-white uppercase">Palette</span>
                   </div>
                   <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary ring-2 ring-white/20"></div>
                      <div className="w-8 h-8 rounded-full bg-secondary"></div>
                      <div className="w-8 h-8 rounded-full bg-red-500"></div>
                      <div className="w-8 h-8 rounded-full bg-white"></div>
                   </div>
                   <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-xs text-gray-400"><span>Opacity</span><span>100%</span></div>
                      <div className="w-full bg-white/10 rounded-full h-1"><div className="w-full bg-primary h-1 rounded-full"></div></div>
                      <div className="flex justify-between text-xs text-gray-400"><span>Blur</span><span>24px</span></div>
                      <div className="w-full bg-white/10 rounded-full h-1"><div className="w-1/4 bg-secondary h-1 rounded-full"></div></div>
                   </div>
                </div>

                {/* Central Focus */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)] z-10 hover:scale-110 transition-transform duration-500 cursor-pointer">
                   <div className="text-background font-bold text-xl tracking-tighter">R.D</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-500 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;