import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { cn } from '../../utils/cn';
import { HeroBackground } from '../ui/HeroBackground';
import GradientText from '../ui/GradientText';
import GlitchText from '../ui/GlitchText';

export const Hero = () => {

  const isAvailable = profileData.status === 'available';

  const badgeConfig = isAvailable
    ? {
      text: "Disponible para nuevos proyectos",
      colorClass: "bg-emerald-500/10 border-emerald-400/30",
      dotClass: "bg-emerald-500",
    }
    : {
      text: "Trabajando en nuevos proyectos",
      colorClass: "bg-amber-500/10 border-amber-400/30",
      dotClass: "bg-amber-500",
    };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">

      <HeroBackground />
      {/* Degradado para legibilidad del texto sobre el fondo animado */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_55%,transparent_80%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <div className={cn("inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold mb-8 border backdrop-blur-sm", badgeConfig.colorClass)}>
            <span className="relative flex h-3 w-3">
              {isAvailable ? (
                <>
                  <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", badgeConfig.dotClass)}></span>
                  <span className={cn("relative inline-flex rounded-full h-3 w-3", badgeConfig.dotClass)}></span>
                </>
              ) : (
                <span className={cn("relative inline-flex rounded-full h-3 w-3", badgeConfig.dotClass)}></span>
              )}
            </span>
            <GradientText
              colors={["#047857", "#14b8a6", "#22d3ee"]}
              animationSpeed={2}
              showBorder={false}
              className="text-sm font-semibold"
            >
              {badgeConfig.text}
            </GradientText>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-2xl font-semibold text-slate-200 mb-4 tracking-wide"
          >
            {profileData.name} <span className="text-blue-400">·</span> {profileData.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            Transformando ideas en <br />
            <GlitchText
              speed={1.5} 
              enableShadows={true}
              enableOnHover={true}
              introDuration={3200}
              className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 font-extrabold"
            >
              Software Escalable
            </GlitchText>
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
    </section >
  );
};