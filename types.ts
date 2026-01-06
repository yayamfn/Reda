import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'thumbnails' | 'Branding' | '3D';
  description: string;
  tools: string[];
  behance: string;
  youtube: string;
  image: string;
  likes: number;
}

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: 'design' | 'motion' | 'tools';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}