import React from 'react';
import SectionWrapper from '../UI/SectionWrapper';
import { EXPERIENCE } from '../../constants';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
           <div className="sticky top-24">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Work Experience</h2>
             <p className="text-gray-400 mb-8">
               My professional journey in the tech industry. I've had the privilege of working with some amazing teams.
             </p>
             <a href="/resume.pdf" className="inline-flex items-center text-primary hover:text-blue-400 font-medium transition-colors">
               Download Resume <Briefcase className="ml-2 w-4 h-4" />
             </a>
           </div>
        </div>

        <div className="md:w-2/3 space-y-8">
          {EXPERIENCE.map((job, index) => (
             <div 
               key={job.id} 
               className="relative pl-8 md:pl-0"
             >
                {/* Timeline Line for Mobile */}
                <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/10"></div>
                <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary"></div>

                <div className="bg-surface/30 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                    <span className="text-sm text-primary font-mono mt-1 sm:mt-0 bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {job.period}
                    </span>
                  </div>
                  <h4 className="text-lg text-gray-300 mb-4 font-medium">{job.company}</h4>
                  <ul className="space-y-2">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;