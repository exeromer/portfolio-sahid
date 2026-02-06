import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypeWriter';
import { techIcons } from '../../data/icons';

const skillCategories = [
  {
    title: "Frontend Core",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite"]
  },
  {
    title: "Backend & Data",
    skills: ["Java", "Spring Boot", "SQL", "MySQL"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Git", "GitHub"]
  }
];

// Variantes para animación en cascada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const Skills = () => {
  const { text } = useTypewriter(
    ["Full Stack Developer", "Backend Specialist", "React Enthusiast", "Team Lead"], 
    150, 
    50,  
    2000 
  );

  return (
    <section id="skills" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20 min-h-30">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-300">
            Competencias Técnicas
          </h2>
          <div className="text-4xl md:text-6xl font-bold h-20 flex justify-center items-center">
             <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
               {text}
             </span>
             <span className="animate-blink text-blue-400 ml-1">|</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              variants={containerVariants}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors group"
            >
              <h3 className="text-xl font-bold mb-8 text-slate-200 group-hover:text-blue-400 transition-colors border-b border-slate-700 pb-4">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <motion.div 
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-3 cursor-default"
                  >
                    {/* Ícono animado */}
                    <div className="w-10 h-10 p-1 bg-slate-700/50 rounded-lg text-slate-400 group-hover:text-white group-hover:bg-blue-600/30 transition-all duration-300 shadow-sm group-hover:shadow-blue-500/50">
                      {techIcons[skill] || <div className="w-full h-full bg-slate-500 rounded-full" />}
                    </div>
                    
                    {/* Texto */}
                    <span className="text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};