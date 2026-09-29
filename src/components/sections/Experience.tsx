import { motion } from 'framer-motion';
import { educationData, experienceData } from '../../data/profile';
import type { TimelineItem } from '../../types';

interface TimelineProps {
  title: string;
  items: TimelineItem[];
  accentClass: string;
}

const Timeline = ({ title, items, accentClass }: TimelineProps) => (
  <div>
    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8">{title}</h3>
    <ol className="relative border-l-2 border-slate-200 space-y-10 ml-2">
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="pl-6 relative"
        >
          <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow ${accentClass}`} />
          <p className="text-sm font-semibold text-blue-600 mb-1">{item.period}</p>
          <h4 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h4>
          <p className="text-slate-500 font-medium mb-3">{item.organization}</p>
          <ul className="space-y-1.5 text-slate-600 leading-relaxed">
            {item.description.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {item.tags ? (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-50 border border-brand-border rounded-full text-xs text-brand-text-secondary font-medium">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </motion.li>
      ))}
    </ol>
  </div>
);

export const Experience = () => (
  <section id="experience" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Experiencia y Formación</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Liderazgo de proyectos, desarrollo Full Stack y una base académica sólida.
        </p>
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-2 max-w-6xl mx-auto">
        <Timeline title="Experiencia" items={experienceData} accentClass="bg-blue-600" />
        <Timeline title="Educación" items={educationData} accentClass="bg-emerald-500" />
      </div>
    </div>
  </section>
);
