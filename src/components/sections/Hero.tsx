import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { cn } from '../../utils/cn';
import { HeroBackground } from '../ui/Background';


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
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">

            <HeroBackground />
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
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            Transformando ideas en <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 filter drop-shadow-lg">
              Software Escalable
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
          >
            {profileData.bio}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transform hover:-translate-y-1">
              Ver Proyectos
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all transform hover:-translate-y-1">
              Contactar
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};