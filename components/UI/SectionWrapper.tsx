import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = "", delay = 0 }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section 
      id={id} 
      ref={elementRef}
      className={`relative py-20 px-4 md:px-8 max-w-7xl mx-auto transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;