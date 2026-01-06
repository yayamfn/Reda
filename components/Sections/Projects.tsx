import React, { useState } from 'react';
import SectionWrapper from '../UI/SectionWrapper';
import { useProjects } from '../../context/ProjectContext';
import { ExternalLink, Heart, Loader2, Youtube } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects, loading, likeProject } = useProjects();
  const [filter, setFilter] = useState<'All' | 'thumbnails' | 'Branding' | '3D'>('All');
  const [localLiked, setLocalLiked] = useState<Record<number, boolean>>({});

  const handleLike = async (id: number) => {
    if (localLiked[id]) return; 

    setLocalLiked(prev => ({ ...prev, [id]: true }));
    await likeProject(id);
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading && projects.length === 0) {
    return (
      <SectionWrapper id="projects" className="bg-surface/30">
         <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
         </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="projects" className="bg-surface/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Selected Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          A collection of projects exploring brand identity, user interface, and visual storytelling.
        </p>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['All', 'thumbnails', 'Branding', '3D'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-background border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-60"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.youtube && (
                  <a 
                    href={project.youtube}
                    className="p-2 bg-red-600/90 backdrop-blur-sm rounded-full text-white hover:bg-red-700 transition-colors shadow-lg"
                    target="_blank"
                    rel="noreferrer"
                    title="Watch on YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
                {project.behance && (
                  <a 
                    href={project.behance}
                    className="p-2 bg-blue-600/90 backdrop-blur-sm rounded-full text-white hover:bg-blue-700 transition-colors shadow-lg"
                    target="_blank"
                    rel="noreferrer"
                    title="View on Behance"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              <div className="absolute top-4 left-4 z-20">
                 <span className="px-3 py-1 text-xs font-bold bg-primary/90 text-white rounded-full backdrop-blur-sm capitalize">
                   {project.category}
                 </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <button 
                  onClick={() => handleLike(project.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${localLiked[project.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 ${localLiked[project.id] ? 'fill-current' : ''}`} />
                  <span>{project.likes}</span>
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tools.map((t) => (
                  <span 
                    key={t} 
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;