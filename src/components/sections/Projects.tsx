import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/profile';
import type { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { ProjectGallery } from '../ui/ProjectGallery';
import MagnetLines from '../ui/MagnetLines';
import VariableProximity from '../ui/VariableProximity';
import { MobileNebula } from '../ui/MobileNebula';

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const themeStyles = {
        blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800', bullet: 'text-blue-700' },
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-800', bullet: 'text-emerald-700' },
        indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-800', bullet: 'text-indigo-700' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-800', bullet: 'text-purple-700' },
        slate: { bg: 'bg-brand-bg', border: 'border-slate-100', text: 'text-slate-800', bullet: 'text-slate-700' },
    };

    return (
        <section id="projects" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 ">
                <div className="lg:hidden absolute inset-0">
                    <MobileNebula />
                </div>
                <div className="hidden lg:block absolute inset-0 z-0 opacity-20 pointer-events-auto">
                    <MagnetLines
                        rows={20}
                        columns={20}
                        containerSize="150%"
                        lineColor="#060010"
                        lineWidth="1.2px"
                        lineHeight="35px"
                        baseAngle={2}
                        className="w-full h-full -mt-20 -ml-20"
                        style={{ width: '120%', height: '120%' }}
                    />
                </div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="relative text-3xl md:text-5xl text-amber-50 lg:text-slate-900 mb-6 cursor-default">
                        <VariableProximity
                            label="Proyectos Destacados"
                            className={'variable-proximity-demo tracking-tight'}
                            fromFontVariationSettings="'wght' 400, 'opsz' 9"
                            toFontVariationSettings="'wght' 1000, 'opsz' 40"
                            containerRef={containerRef}
                            radius={150}
                            falloff='linear'
                        />
                    </h2>
                    <p className="text-xl text-amber-50 lg:text-brand-text-secondary max-w-2xl mx-auto">
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
                            className="group bg-brand-bg rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="w-full aspect-video bg-brand-border relative overflow-hidden">
                                {project.images.length > 0 ? (
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">Sin imagen</div>
                                )}
                                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors" />
                            </div>

                            <div className="p-8 flex flex-col grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-brand-text-primary group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    {project.featured && (
                                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded uppercase tracking-wide">
                                            Star
                                        </span>
                                    )}
                                </div>

                                <div className="grow">
                                    <p className="text-brand-text-secondary mb-6 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white border border-brand-border rounded-full text-sm text-brand-text-secondary font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="flex-1 bg-brand-text-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer min-w-fit"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Explorar
                                    </button>

                                    <div className="flex flex-wrap gap-2">
                                        {project.repos.map((repo) => (
                                            <a
                                                key={repo.label}
                                                href={repo.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors text-sm font-medium flex items-center gap-2 grow justify-center sm:grow-0"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                                {repo.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* MODAL DINÁMICO */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title || ''}
            >
                <div className="space-y-8">
                    <ProjectGallery
                        images={selectedProject?.images || []}
                        title={selectedProject?.title}
                    />
                    {selectedProject?.details && (
                        <div className="space-y-6 animate-fade-in">

                            <motion.div
                                whileHover={{ scale: 1.01, boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)" }}
                                transition={{ duration: 0.2 }}
                                className={`p-5 rounded-xl border ${themeStyles[selectedProject.details.theme].bg} ${themeStyles[selectedProject.details.theme].border}`}
                            >
                                <h4 className={`font-bold mb-3 flex items-center gap-2 ${themeStyles[selectedProject.details.theme].text}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    {selectedProject.details.highlights.title}
                                </h4>
                                <ul className={`list-disc list-inside space-y-2 text-sm font-medium ${themeStyles[selectedProject.details.theme].bullet}`}>
                                    {selectedProject.details.highlights.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                            {selectedProject.demoUrl && (
                                <div className="flex justify-center py-2">
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={selectedProject.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-slate-800 hover:text-blue-600 font-bold border-b-2 border-slate-200 hover:border-blue-600 transition-colors text-sm uppercase tracking-wide px-2 py-1"
                                    >
                                        Ver Proyecto en Vivo
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </motion.a>
                                </div>
                            )}

                            {selectedProject.details.statsGrid && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedProject.details.statsGrid.map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="border border-slate-200 rounded-lg p-4 bg-slate-50 cursor-default"
                                        >
                                            <h5 className="font-bold text-slate-700 mb-1 text-sm uppercase">{stat.title}</h5>
                                            <p className="text-xs text-slate-500 font-medium">{stat.value}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {selectedProject.details.technicalExplanation && (
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-slate-300 pl-3">
                                        {selectedProject.details.technicalExplanation.title}
                                    </h4>
                                    <p className="text-slate-600 text-sm leading-relaxed pl-4">
                                        {selectedProject.details.technicalExplanation.text}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </section>
    );
};