import React, { useState } from 'react';
import SectionWrapper from '../UI/SectionWrapper';
import { Mail, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const response = await fetch("https://formsubmit.co/ajax/redabld6@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset to idle after 5 seconds
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 5000);
      }
    } catch (error) {
      console.error('Form Error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <SectionWrapper id="contact" className="mb-20">
      <div className="relative bg-gradient-to-br from-surface to-background border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Let's Create Together
            </h2>
            <p className="text-gray-400 text-lg">
              Have a project in mind? Whether it's a complete brand overhaul or a slick new app design, let's make it happen.
            </p>
            
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 text-gray-300">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 uppercase tracking-wider">Email Me</p>
                   <a href="mailto:redabld6@gmail.com" className="text-white hover:text-primary transition-colors">redabld6@gmail.com</a>
                 </div>
               </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            
            {/* Success State Overlay */}
            {formState === 'success' && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/95 z-20 animate-fade-in-up">
                 <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                 <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                 <p className="text-gray-400 mt-2 text-center">Thanks for reaching out.<br/>I'll check my inbox and get back to you.</p>
               </div>
            )}

            {/* Error State Overlay */}
            {formState === 'error' && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/95 z-20 animate-fade-in-up">
                 <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                 <h3 className="text-2xl font-bold text-white">Oops!</h3>
                 <p className="text-gray-400 mt-2 text-center">Something went wrong.<br/>Please try emailing me directly.</p>
               </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Project Details</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-white/10 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-600 resize-none"
                  placeholder="Tell me about your vision..."
                />
              </div>
              
              {/* HoneyPot to prevent spam */}
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <button 
                type="submit"
                disabled={formState === 'loading'}
                className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-red-600 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;