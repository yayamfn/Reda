import React, { useState } from 'react';
import { Project } from '../../types';
import { X, Save, Upload, Link as LinkIcon, Image as ImageIcon, Loader2, Youtube } from 'lucide-react';
import { supabase, checkSupabaseConfig } from '../../lib/supabaseClient';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Omit<Project, 'id' | 'likes'>) => void;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'thumbnails',
    description: initialData?.description || '',
    tools: initialData?.tools.join(', ') || '',
    behance: initialData?.behance || '',
    youtube: initialData?.youtube || '',
    image: initialData?.image || ''
  });

  const [imageMode, setImageMode] = useState<'url' | 'upload'>(
    initialData?.image?.startsWith('http') && !initialData.image.includes('supabase') ? 'url' : 'upload'
  );
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        // Validate configuration first
        checkSupabaseConfig();

        const fileExt = file.name.split('.').pop();
        // Create a unique filename to prevent collisions and caching issues
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('portfolio-images')
          .upload(filePath, file, {
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio-images')
          .getPublicUrl(filePath);

        setFormData(prev => ({ ...prev, image: publicUrl }));
      } catch (error: any) {
        console.error('Error uploading image:', error);
        alert('Upload failed: ' + error.message);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      category: formData.category as 'thumbnails' | 'Branding' | '3D',
      description: formData.description,
      tools: formData.tools.split(',').map(t => t.trim()).filter(Boolean),
      behance: formData.behance,
      youtube: formData.youtube,
      image: formData.image
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface/95 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-white">
            {initialData ? 'Edit Project' : 'New Project'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Project Title</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as 'thumbnails' | 'Branding' | '3D'})}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="thumbnails">Thumbnails</option>
                <option value="Branding">Branding</option>
                <option value="3D">3D</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 block mb-2">Project Image</label>
            
            <div className="flex gap-2 mb-3 bg-background p-1 rounded-lg border border-white/10 w-fit">
              <button
                type="button"
                onClick={() => setImageMode('url')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  imageMode === 'url' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-4 h-4" /> Link URL
              </button>
              <button
                type="button"
                onClick={() => setImageMode('upload')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  imageMode === 'upload' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" /> Upload Local
              </button>
            </div>

            {imageMode === 'url' ? (
              <input
                required={!formData.image}
                type="url"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="https://example.com/image.jpg"
              />
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors text-center relative bg-background">
                {uploading ? (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                    <span className="text-sm text-gray-400">Uploading to Cloud...</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm font-medium">Click to upload image</span>
                      <span className="text-xs text-gray-600">Supports JPG, PNG, WEBP</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Image Preview */}
            {formData.image && (
              <div className="mt-4 p-2 bg-background border border-white/10 rounded-lg inline-block">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Preview
                </p>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="h-32 w-auto object-cover rounded" 
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Tools (comma separated)</label>
            <input
              type="text"
              value={formData.tools}
              onChange={e => setFormData({...formData, tools: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none"
              placeholder="Figma, React, Blender"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                 Behance URL
              </label>
              <input
                type="url"
                value={formData.behance}
                onChange={e => setFormData({...formData, behance: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="https://behance.net/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                 <Youtube className="w-4 h-4 text-red-500" /> YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtube}
                onChange={e => setFormData({...formData, youtube: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 rounded-lg bg-primary hover:bg-red-600 text-white font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;