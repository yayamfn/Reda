import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Edit2, Trash2, Home } from 'lucide-react';
import ProjectForm from './ProjectForm';
import { Project } from '../../types';

const Dashboard: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleAddNew = () => {
    setEditingProject(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const handleFormSubmit = (data: Omit<Project, 'id' | 'likes'>) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Top Bar */}
      <div className="bg-surface border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
          >
            <Home className="w-4 h-4" /> View Site
          </button>
          <div className="h-4 w-px bg-white/10"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Projects</h2>
            <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-surface border border-white/10 rounded-xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold uppercase">
                  {project.category}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-500">{project.tools.length} Tools</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(project)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 bg-surface/30 rounded-2xl border border-dashed border-white/10">
            <p className="text-gray-500">No projects found. Add your first project!</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;