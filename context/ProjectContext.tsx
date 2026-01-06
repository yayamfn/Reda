import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '../types';
import { supabase } from '../lib/supabaseClient';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  addProject: (project: Omit<Project, 'id' | 'likes'>) => Promise<void>;
  updateProject: (id: number, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  likeProject: (id: number) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Only fallback if the fetch returned nothing AND we have no state,
        // but typically empty DB means empty portfolio. 
        // We check if it's the *first* load.
        if (projects.length === 0 && loading) {
           setProjects(INITIAL_PROJECTS);
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback for demo purposes if connection fails completely
      if (projects.length === 0) setProjects(INITIAL_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    // Setup realtime subscription
    const channel = supabase
      .channel('public:projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, (payload) => {
        // We can either refetch or merge. Refetching is safer for consistency.
        fetchProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addProject = async (projectData: Omit<Project, 'id' | 'likes'>) => {
    // 1. Send to Supabase and Request the created data back (.select())
    const { data, error } = await supabase
      .from('projects')
      .insert([{ 
        ...projectData, 
        likes: 0 
      }])
      .select();

    if (error) {
      console.error('Error adding project:', error);
      alert(`Failed to save project. Error: ${error.message}`);
      return;
    }

    // 2. Update Local State Immediately
    if (data && data.length > 0) {
      const newProject = data[0] as Project;
      setProjects((prev) => [newProject, ...prev]);
    }
  };

  const updateProject = async (id: number, updates: Partial<Project>) => {
    // 1. Optimistic Update (Update UI immediately)
    setProjects((prev) => 
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );

    // 2. Send to Supabase
    const { error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      alert(`Failed to update project. Error: ${error.message}`);
      // Revert changes by refetching
      fetchProjects(); 
    }
  };

  const deleteProject = async (id: number) => {
    // 1. Optimistic Update (Remove from UI immediately)
    setProjects((prev) => prev.filter((p) => p.id !== id));

    // 2. Send to Supabase
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project.');
      fetchProjects(); // Revert
    }
  };

  const likeProject = async (id: number) => {
    // Optimistic update
    setProjects((prev) => 
      prev.map((p) => (p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );
    
    // DB Update (Using a simple update, for production use an RPC function for atomic increment)
    const project = projects.find(p => p.id === id);
    if (project) {
        const { error } = await supabase
          .from('projects')
          .update({ likes: (project.likes || 0) + 1 })
          .eq('id', id);
        
        if (error) console.error("Error liking project", error);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, loading, addProject, updateProject, deleteProject, likeProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within ProjectProvider');
  return context;
};