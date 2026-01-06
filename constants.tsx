import { 
  Instagram, 
  Linkedin, 
  Mail, 
  PenTool, 
  Figma, 
  Layers, 
  Palette, 
  Monitor,
  Camera,
  Box,
  Wand2
} from 'lucide-react';
import { NavItem, Project, Skill, SocialLink, ExperienceItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { platform: 'Instagram', url: 'https://www.instagram.com/robin.dsn_/', icon: Instagram },
  { platform: 'Email', url: 'mailto:redabld6@gmail.com', icon: Mail },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Neon Zenith Branding',
    category: 'Branding',
    description: 'A futuristic brand identity for a cyber-security firm. The visual language combines sharp geometric shapes with a neon color palette to convey speed and security.',
    tools: ['Illustrator', 'Photoshop', 'After Effects'],
    behance: 'https://behance.net',
    youtube: 'https://youtube.com',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    likes: 124
  },
  {
    id: 2,
    title: 'Fintech Mobile App',
    category: 'thumbnails',
    description: 'End-to-end product design for a banking application. Focused on accessibility, dark mode implementation, and micro-interactions for transaction success states.',
    tools: ['Figma', 'Protopie', 'Maze'],
    behance: 'https://behance.net',
    youtube: '',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800',
    likes: 89
  },
  {
    id: 3,
    title: 'Abstract 3D Renders',
    category: '3D',
    description: 'A series of abstract 3D loops created for a music festival background visuals. Explored glass refraction and cloth simulation.',
    tools: ['Blender', 'Octane', 'Premier Pro'],
    behance: 'https://behance.net',
    youtube: 'https://youtube.com',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    likes: 256
  },
  {
    id: 4,
    title: 'EcoTravel Website',
    category: 'thumbnails',
    description: 'Responsive web design for a sustainable travel agency. The layout emphasizes large typography and immersive photography to inspire wanderlust.',
    tools: ['Figma', 'Webflow', 'Photoshop'],
    behance: 'https://behance.net',
    youtube: '',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
    likes: 67
  }
];

export const SKILLS: Skill[] = [
  { name: 'Figma', icon: Figma, category: 'design' },
  { name: 'Adobe XD', icon: Layers, category: 'design' },
  { name: 'Photoshop', icon: Camera, category: 'tools' },
  { name: 'Illustrator', icon: PenTool, category: 'tools' },
  { name: 'Blender', icon: Box, category: 'motion' },
  { name: 'After Effects', icon: Wand2, category: 'motion' },
  { name: 'Color Theory', icon: Palette, category: 'design' },
  { name: 'Webflow', icon: Monitor, category: 'tools' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    role: 'Senior Product Designer',
    company: 'TechFlow Solutions',
    period: '2021 - Present',
    description: [
      'Led the redesign of the core SaaS platform, resulting in a 30% increase in user engagement.',
      'Managed a team of 3 junior designers and established a comprehensive design system.',
      'Collaborated closely with engineering and product management to define product roadmap.'
    ]
  },
  {
    id: 2,
    role: 'UI/UX Designer',
    company: 'Creative Pulse Agency',
    period: '2019 - 2021',
    description: [
      'Designed responsive websites and mobile apps for diverse clients in fintech and healthcare.',
      'Conducted user research and usability testing to iterate on design concepts.',
      'Created high-fidelity prototypes for client presentations and developer handoff.'
    ]
  },
  {
    id: 3,
    role: 'Junior Graphic Designer',
    company: 'Neon Studio',
    period: '2018 - 2019',
    description: [
        'Assisted in the creation of brand identity assets, including logos and marketing materials.',
        'Collaborated with the marketing team to design social media graphics and email campaigns.',
    ]
  }
];