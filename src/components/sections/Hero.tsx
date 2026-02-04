import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { cn } from '../../utils/cn';
import { techIcons } from '../../data/icons';

export const Hero = () => {

    const isAvailable = profileData.status === 'available';

    const badgeConfig = isAvailable
        ? {
            text: "Disponible para nuevos proyectos",
            colorClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
            dotClass: "bg-emerald-500",
            glowEffect: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
        }
        : {
            text: "Trabajando en nuevos proyectos",
            colorClass: "bg-amber-100 text-amber-800 border-amber-200",
            dotClass: "bg-amber-500",
            glowEffect: "shadow-none border"
        };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 bg-linear-to-br from-brand-bg to-slate-100 overflow-hidden relative">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-8 transition-all duration-300",
                            badgeConfig.colorClass,
                            badgeConfig.glowEffect
                        )}
                    >
                        <span className="relative flex h-3 w-3 mr-3">
                            {isAvailable && (
                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", badgeConfig.dotClass)}></span>
                            )}
                            <span className={cn("relative inline-flex rounded-full h-3 w-3", badgeConfig.dotClass)}></span>
                        </span>

                        {badgeConfig.text}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-brand-text-primary mb-6 tracking-tight"
                    >
                        Transformando ideas en <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                            Software Escalable
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-brand-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto"
                    >
                        {profileData.bio}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#projects"
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                        >
                            Ver Proyectos
                        </a>
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-brand-border rounded-lg font-semibold hover:bg-brand-bg transition-all transform hover:-translate-y-1"
                        >
                            Contactar
                        </a>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-16 pt-8 border-t border-brand-border "
                    >
                        <p className="text-sm text-slate-500 mb-4 font-medium">TECH STACK PRINCIPAL</p>
                        <div className="flex flex-wrap justify-center gap-18 opacity-70">
                            {profileData.skills.slice(0, 5).map((skill) => (
                                <motion.div
                                    key={skill}
                                    whileHover={{ scale: 1.1, opacity: 1, y: -5 }}
                                    className="flex flex-col items-center gap-2 cursor-pointer group"
                                >
                                    <div className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
                                        {techIcons[skill] || <span className="font-semibold">{skill}</span>}
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 group-hover:text-slate-800 transition-colors">
                                        {skill}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};