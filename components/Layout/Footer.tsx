import React from 'react';
import { SOCIAL_LINKS } from '../../constants';
import { PenTool, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-background pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          <div className="flex items-center gap-2 text-white font-bold text-xl">
             <PenTool className="text-primary w-6 h-6" />
             <span>Robin<span className="text-primary">.dsn_</span></span>
          </div>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a 
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 border-t border-white/5 pt-8 flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Robin Alahyani. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Designed with love.</p>
            <span className="text-gray-800">|</span>
            <Link to="/admin" className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors">
              <Lock className="w-3 h-3" /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;