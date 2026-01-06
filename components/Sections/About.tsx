import React from 'react';
import SectionWrapper from '../UI/SectionWrapper';

const About: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 relative">
           {/* Abstract Image Composition */}
           <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
             <img 
               src="profile.png" 
               alt="Robin Profile" 
               onError={(e) => {
                 // Fallback if local image is missing
                 e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
               }}
               className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
             />
           </div>
           {/* Decorative elements behind image */}
           <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-2xl z-0"></div>
           <div className="absolute -bottom-4 -right-4 w-full h-full bg-surface rounded-2xl -z-10"></div>
        </div>

        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Behind the Pixels
          </h2>
          <h3 className="text-xl text-primary font-medium">
            Blending aesthetics with functionality.
          </h3>
          <p className="text-gray-400 leading-relaxed">
            I believe that great design is invisible—it just works. My creative process is rooted in understanding human behavior and translating complex requirements into intuitive, visually stunning interfaces.
          </p>
          <p className="text-gray-400 leading-relaxed">
            From sketching initial wireframes on napkins to polishing the final pixel in Figma, I obsess over details. Whether it's a bold brand identity or a complex mobile application, I bring a unique perspective that combines artistic flair with strategic thinking.
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <h4 className="text-2xl font-bold text-white">5+</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Years Exp.</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white">40+</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Projects</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white">100%</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;