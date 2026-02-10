import { motion } from 'framer-motion';
import { techIcons } from '../../data/icons'; 

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Links de redes sociales
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/exeromer', icon: techIcons.GitHub },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/sahidr', icon: techIcons.Linkedin }, 
    { name: 'WhatsApp', url: 'https://wa.me/5492616686349', icon: techIcons.WhatsApp },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900 relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          {/* 1. Redes Sociales */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-6 h-6 text-slate-400 hover:text-white transition-colors duration-300"
                title={social.name}
              >
                {/* Renderizamos el componente SVG */}
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* 2. Copyright y Nombre */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-slate-200">
              Sahid Romero
            </h3>
            <p className="text-sm opacity-80">
              © {currentYear} Todos los derechos reservados.
            </p>
          </div>

          {/* 3. Stack Tecnológico (La línea que pediste) */}
          <div className="pt-4 border-t border-slate-800/50 w-full max-w-xs mx-auto text-center">
            <p className="text-xs font-medium text-slate-500 flex flex-wrap justify-center gap-1">
              Realizado con 
              <span className="text-blue-400 hover:underline cursor-pointer">React.js</span>,
              <span className="text-cyan-400 hover:underline cursor-pointer">Tailwind</span>,
              <span className="text-orange-400 hover:underline cursor-pointer">Java</span> y
              <span className="text-yellow-500 hover:underline cursor-pointer">AWS</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};