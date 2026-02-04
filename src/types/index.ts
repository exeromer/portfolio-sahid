export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  architectureDiagram?: string;
  featured: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  status: 'available' | 'busy';
}