import type { Project, UserProfile } from '../types';

export const profileData: UserProfile = {
  name: "Sahid Romero",
  role: "Desarrollador de Software",
  bio: "Creo firmemente que la calidad del software nace en el pizarrón antes que en el código. Mi enfoque combina bases teóricas sólidas con liderazgo orgánico de equipos. Actualmente, estoy expandiendo esos fundamentos hacia la nube, capacitándome intensivamente en el ecosistema AWS.",
  skills: ["Java", "Spring Boot", "React", "AWS", "SQL", "Docker", "Tailwind CSS"],
  status: 'available', // 'available' | 'busy'
};

export const projectsData: Project[] = [
  {
    id: "el-buen-sabor",
    title: "El Buen Sabor",
    description: "Plataforma integral de gestión de restaurantes. Lideré al equipo en el desarrollo de una arquitectura desacoplada con gestión de roles, facturación y stock en tiempo real.",
    tags: ["Java", "Spring Boot", "React", "MySQL", "Team Lead"],
    repoUrl: "https://github.com/exeromer/ElBuenSabor",
    demoUrl: "#", // COLOCAR MODAL
    featured: true
  },
  {
    id: "ana-analytics",
    title: "ANA Analytics Landing",
    description: "Solución web de alto rendimiento para consultora de datos. Enfoque en SEO técnico, Core Web Vitals y Atomic Design.",
    tags: ["React", "Tailwind", "UX/UI", "Freelance"],
    repoUrl: "https://github.com/exeromer/ana-landing", 
    demoUrl: "#",
    featured: true
  }
];