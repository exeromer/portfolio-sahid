import type { Project, TimelineItem, UserProfile } from '../types';
import bsHero from '../assets/projects/BuenSabor-Hero.webp';
import bsPrev1 from '../assets/projects/BuenSabor-Preview1.webp';
import bsPrev2 from '../assets/projects/BuenSabor-Preview2.webp';
import bsPrev3 from '../assets/projects/BuenSabor-Preview3.webp';
import bsPrev4 from '../assets/projects/BuenSabor-Preview4.webp';
import asHero from '../assets/projects/Ascend-Hero.webp';
import asPrev from '../assets/projects/Ascend-Preview.webp';
import asPrev1 from '../assets/projects/Ascend-Preview1.webp';
import asPrev2 from '../assets/projects/Ascend-Preview2.webp';
import asPrev3 from '../assets/projects/Ascend-Preview3.webp';
import gtHero from '../assets/projects/Greenthumb-Hero.webp';
import gtPrev from '../assets/projects/Greenthumb-Preview.webp';
import gtPrev1 from '../assets/projects/Greenthumb-Preview1.webp';
import anaHero from '../assets/projects/Ana-Hero.webp';
import anaPrev from '../assets/projects/Ana-Preview.webp';
import anaPrev1 from '../assets/projects/Ana-Preview1.webp';


export const CV_URL = '/SahidRomeroATS.pdf';
export const CV_FILENAME = 'CV_Sahid_Romero.pdf';

export const profileData: UserProfile = {
  name: "Sahid Romero",
  role: "Full Stack Developer & Team Lead",
  bio: "Creo firmemente que la calidad del software nace en el pizarrón antes que en el código. Mi enfoque combina bases teóricas sólidas con liderazgo orgánico de equipos.",
  skills: ["Java", "Spring Boot", "React", "AWS", "SQL", "Docker", "Tailwind CSS"],
  status: 'available'
};

export const experienceData: TimelineItem[] = [
  {
    id: "ana-freelance",
    title: "Freelance Web Developer",
    organization: "ANA Data Analytics · Remoto",
    period: "Sept 2025 – Ene 2026",
    description: [
      "Diseñé y desarrollé desde cero una landing page responsiva para un servicio de análisis de datos.",
      "UI en React y Tailwind CSS con componentes reutilizables para una experiencia fluida en todos los dispositivos.",
      "Despliegue optimizado para performance y SEO."
    ],
    tags: ["React", "Tailwind CSS", "SEO"]
  },
  {
    id: "buen-sabor-lead",
    title: "Project Lead & Full Stack Developer",
    organization: "El Buen Sabor",
    period: "Ene 2025 – Sept 2025",
    description: [
      "Dirigí el ciclo de desarrollo completo de una aplicación web de gestión de restaurantes.",
      "API RESTful en Java y Spring Boot para usuarios, roles, pedidos y facturación.",
      "Diseño y administración de la base de datos relacional (MariaDB) garantizando la integridad de los datos.",
      "Integración del backend con un frontend moderno en React."
    ],
    tags: ["Java", "Spring Boot", "React", "MariaDB", "Team Lead"]
  }
];

export const educationData: TimelineItem[] = [
  {
    id: "utn",
    title: "Tecnicatura Universitaria en Programación",
    organization: "Universidad Tecnológica Nacional (UTN), Mendoza",
    period: "2023 – 2025",
    description: ["Ingeniería de Software, Algoritmos y Arquitectura de Sistemas."]
  },
  {
    id: "mindhub",
    title: "QA Testing",
    organization: "MindHub LAB",
    period: "2023",
    description: ["Metodologías de testing manual, diseño de casos de prueba y ciclo de vida de bugs."]
  },
  {
    id: "aws",
    title: "AWS Cloud Architecture",
    organization: "Technical Essentials · En curso",
    period: "Actualidad",
    description: ["Especialización en arquitectura cloud sobre AWS (EC2, S3, CloudFront)."]
  },
  {
    id: "argentina-programa",
    title: "Argentina Programa",
    organization: "Certificación",
    period: "2021 – 2022",
    description: ["Programa nacional de formación en desarrollo de software."]
  }
];

export const projectsData: Project[] = [
  {
    id: "el-buen-sabor",
    title: "El Buen Sabor",
    description: "Plataforma integral de gestión de restaurantes. Lideré al equipo en el desarrollo de una arquitectura desacoplada con gestión de roles, facturación y stock en tiempo real.",
    tags: ["Java", "Spring Boot", "React", "MySQL", "Team Lead"],
    images: [bsHero, bsPrev1, bsPrev2, bsPrev3, bsPrev4],
    repos: [
      { label: "Frontend", url: "https://github.com/exeromer/ElBuenSabor-Frontend" },
      { label: "Backend", url: "https://github.com/exeromer/ElBuenSabor-Backend" }
    ],
    featured: true,
    details: {
      theme: 'blue',
      highlights: {
        title: "Highlights de Arquitectura",
        items: [
          "Backend Java Spring Boot con Arquitectura en Capas.",
          "Seguridad implementada con Auth0 y JWT.",
          "Base de datos MySQL con integridad referencial estricta.",
          "Frontend React con consumo de API RESTful y Context API."
        ]
      },
      technicalExplanation: {
        title: "Explicación Técnica",
        text: "Para este proyecto, diseñé una solución que soporta alta concurrencia en pedidos. La base de datos fue normalizada hasta la 3FN para evitar redundancia. Lideré los Code Reviews asegurando la calidad del código del equipo."
      }
    }
  },
  {
    id: "ana-analytics",
    title: "ANA Analytics Landing",
    description: "Solución web de alto rendimiento para consultora de datos. Enfoque en SEO técnico, Core Web Vitals y Atomic Design.",
    tags: ["React", "Tailwind", "UX/UI", "Freelance"],
    images: [anaHero, anaPrev, anaPrev1],
    repos: [
      { label: "Código", url: "https://github.com/exeromer/ana-landing" }
    ],
    featured: true,
    details: {
      theme: 'purple',
      highlights: {
        title: "Objetivos Logrados",
        items: [
          "Diseño 100% responsivo y Atomic Design.",
          "Lighthouse 100% en Performance y SEO.",
          "Generación estática para máxima velocidad."
        ]
      },
      statsGrid: [
        { title: "Frontend Arch", value: "React + Vite + Componentes Reutilizables." },
        { title: "Performance", value: "Carga diferida y minificación de assets." }
      ]
    }
  },
  {
    id: "ascend-spa",
    title: "Ascend Mza",
    description: "Single Page Application (SPA) optimizada para máxima velocidad y conversión. Enfocada en la experiencia de usuario instantánea.",
    tags: ["React", "Performance", "UX/UI", "Netlify"],
    images: [asHero, asPrev, asPrev1, asPrev2, asPrev3],
    repos: [
      { label: "Frontend", url: "https://github.com/exeromer/AscendMza" }
    ],
    demoUrl: "https://ascend-mza.netlify.app/",
    featured: true,
    details: {
      theme: 'emerald',
      highlights: {
        title: "Performance First",
        items: [
          "Tiempo de carga optimizado (FCP < 0.8s).",
          "Implementación de Lazy Loading para rutas.",
          "Despliegue continuo (CI/CD) automatizado en Netlify."
        ]
      },
      statsGrid: [
        { title: "UX Strategy", value: "Diseño minimalista SPA enfocado en retención." },
        { title: "Tech Stack", value: "React + Vite + Tailwind CSS." }
      ]
    }
  },
  {
    id: "greenthumb-db",
    title: "GreenThumb DB",
    description: "Diseño de base de datos relacional de alta integridad. Modelado estricto para garantizar consistencia y escalabilidad sin deuda técnica.",
    tags: ["SQL", "Database Design", "3FN", "Data Integrity"],
    images: [gtHero, gtPrev, gtPrev1],
    repos: [
      { label: "Database", url: "https://github.com/exeromer/GreenThumb" }
    ],
    featured: false,
    details: {
      theme: 'indigo',
      highlights: {
        title: "Ingeniería de Datos",
        items: [
          "Normalización estricta (3FN) eliminando redundancias.",
          "Restricciones NOT NULL para integridad de datos.",
          "Borrado lógico (is_deleted) para auditoría."
        ]
      },
      technicalExplanation: {
        title: "Filosofía del Diseño",
        text: "El foco total de este proyecto fue crear una estructura de datos inmaculada. Se priorizó la consistencia sobre la flexibilidad, diseñando tablas que previenen errores de aplicación a nivel de base de datos."
      }
    }
  }
];