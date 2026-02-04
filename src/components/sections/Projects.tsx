import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/profile';
import type { Project } from '../../types';
import { Modal } from '../ui/Modal';
import buenSaborImg from '../../assets/projects/BuenSabor-Hero.png';
import anaAnalyticsImg from '../../assets/projects/Ana-Hero.png';
import anaPreview from '../../assets/projects/Ana-Preview.png';

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="py-24 bg-white">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Proyectos Destacados
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Soluciones reales que combinan ingeniería de backend sólida con experiencias de usuario modernas.
                    </p>
                </motion.div>

                {/* Grid de Proyectos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300"
                        >
                            {/* AGREGAR IMAGEN DEL PROYECTO */}
                            <div className="h-48 bg-slate-200 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                                    <img src={anaAnalyticsImg} alt="Arquitectura Ana Analytics" className="w-full rounded-lg shadow-md" />
                                </div>
                                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors" />
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.featured && (
                                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded uppercase tracking-wide">
                                                Star
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <motion.span
                                            key={tag}
                                            whileHover={{ scale: 1.05, backgroundColor: "#E0F2FE", color: "#0284C7" }}
                                            className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 font-medium cursor-default transition-colors"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Botón abre Modal*/}
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Ver Arquitectura
                                    </button>

                                    {/* Botón Secundario: GitHub */}
                                    {project.repoUrl && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                                            aria-label="Ver código en GitHub"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* INSTANCIA MODAL */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title || ''}
            >
                <div className="space-y-6">
                    {selectedProject?.id === 'el-buen-sabor' ? (
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-semibold text-blue-800 mb-2">Highlights de Arquitectura</h4>
                                <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                                    <li>Backend Java Spring Boot con Arquitectura en Capas (Controller, Service, Repository).</li>
                                    <li>Seguridad implementada con Auth0 y JWT.</li>
                                    <li>Base de datos relacional MySQL con integridad referencial estricta.</li>
                                    <li>Frontend React con consumo de API RESTful y manejo global de estados con Context API.</li>
                                </ul>
                            </div>

                            {/* AGREGAR IMAGENES DE LA CARPETA */}
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center bg-slate-50">
                                <p className="text-slate-500 italic">
                                    <br />
                                    <img src={buenSaborImg} alt="Arquitectura El Buen Sabor" className="w-full rounded-lg shadow-md" />
                                </p>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">Explicación Técnica</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Para este proyecto, diseñé una solución que soporta alta concurrencia en pedidos.
                                    La base de datos fue normalizada hasta la 3FN para evitar redundancia.
                                    En el frontend, React consume la API RESTful manejando estados de carga y errores globales.
                                </p>
                            </div>
                        </div>
                    ) : selectedProject?.id === 'ana-analytics' ? (
                        <div className="space-y-6">
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <h4 className="font-semibold text-purple-800 mb-2">Objetivos Logrados</h4>
                                <ul className="list-disc list-inside text-purple-700 space-y-1 text-sm">
                                    <li>Diseño 100% responsivo orientado a la conversión de leads.</li>
                                    <li>Implementación de metodología "Diseño Atómico" para componentes reutilizables.</li>
                                    <li>Optimización SEO técnico y Core Web Vitals (Lighthouse 100%).</li>
                                </ul>
                            </div>
                            {/* AGREGAR IMAGENES DE LA CARPETA */}
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center bg-slate-50">
                                <p className="text-slate-500 italic">
                                    <br />
                                    <img src={anaPreview} alt="Arquitectura Ana Analytics" className="w-full rounded-lg shadow-md" />
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                                    <h5 className="font-bold text-slate-700 mb-2 text-sm">Frontend Architecture</h5>
                                    <p className="text-xs text-slate-500">React + Vite + Tailwind CSS. Uso de server-side generation (SSG) concepts para máxima velocidad.</p>
                                </div>
                                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                                    <h5 className="font-bold text-slate-700 mb-2 text-sm">Performance</h5>
                                    <p className="text-xs text-slate-500">Carga diferida de imágenes, minificación de assets y despliegue en CDN.</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                    }
                </div>
            </Modal>

        </section>
    );
};