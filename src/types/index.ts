export type ProjectTheme = 'blue' | 'emerald' | 'indigo' | 'purple' | 'slate';

export interface ProjectDetails {
  theme: ProjectTheme;
  highlights: {
    title: string;
    items: string[];
  };
  statsGrid?: {
    title: string;
    value: string;
  }[];
  technicalExplanation?: {
    title: string;
    text: string;
  };
}

export interface RepoLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  repos: RepoLink[];
  demoUrl?: string;
  featured: boolean;
  details?: ProjectDetails; 
}

export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  status: 'available' | 'busy';
}