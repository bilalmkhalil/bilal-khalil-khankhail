// Global types for the entire project
import type { IconSvgElement } from "@hugeicons/react";

// Contact form related types
export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Project related types
export interface Project {
  title: string;
  description: string;
  stack: string[];
  image: string;
  url?: string;
}

// Navigation related types
export interface NavItem {
  id: string;
  label: string;
  icon: IconSvgElement;
}

// Experience related types
export interface Experience {
  period: string;
  title: string;
  company: string;
  icon: any;
  description: string[];
}

// Skills related types
export interface Skill {
  name: string;
  icon: string;
  alt: string;
  size: number;
  color: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Map related types
export interface DarkMapProps {
  center: [number, number];
  zoom: number;
  className?: string;
}

// Hook related types
export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}
