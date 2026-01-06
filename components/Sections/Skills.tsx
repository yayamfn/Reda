import React from 'react';
import SectionWrapper from '../UI/SectionWrapper';
import { SKILLS } from '../../constants';

const Skills: React.FC = () => {
  return (
    <SectionWrapper id="skills" className="border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Creative Toolkit</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Ideas are nothing without execution. These are the tools I use to turn concepts into reality.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {SKILLS.map((skill, index) => (
          <div 
            key={skill.name}
            className="group p-6 bg-surface/50 border border-white/5 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:bg-surface hover:-translate-y-1"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white/5 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-300 text-gray-300">
                <skill.icon className="w-8 h-8" />
              </div>
              <span className="text-gray-200 font-medium">{skill.name}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{skill.category}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;