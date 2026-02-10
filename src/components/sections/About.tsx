import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profileImg from '../../assets/profile-photo.png';
import RotatingText from '../ui/RotatingText';
import VariableProximity from '../ui/VariableProximity';

export const About = () => {

    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="about" ref={containerRef} className="py-24 relative overflow-hidden bg-slate-50/50 perspective-1000">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Columna Izquierda */}
                    <div className="flex justify-center md:justify-start pl-0 md:pl-10 relative z-20">

                        <motion.div
                            ref={ref}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-64 h-64 md:w-100 md:h-100 cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 bg-blue-200/30 rounded-full blur-3xl transform scale-150 translate-x-10 translate-y-10 -z-10"
                                style={{ transform: "translateZ(-50px)" }}
                            />
                            <div className="absolute inset-0 border-2 border-dashed border-slate-400/40 rounded-full animate-[spin_25s_linear_infinite]" />

                            {/* --- CAPA 1 --- */}
                            <div
                                className="absolute inset-2 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-slate-200 flex items-center justify-center"
                                style={{ transform: "translateZ(20px)" }}
                            >
                                <img src={profileImg} className="w-full h-full object-cover" />

                            </div>
                            {/* --- CAPA 2 --- */}
                            <motion.div
                                style={{ transform: "translateZ(60px)" }}
                                className="absolute top-6 -left-4 bg-white py-3 px-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                            >
                                <div className="p-1.5 bg-green-100 rounded-full">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Rol Actual</p>
                                    <p className="text-sm font-bold text-slate-800 leading-tight">Developer</p>
                                </div>
                            </motion.div>

                            <motion.div
                                style={{ transform: "translateZ(80px)" }}
                                className="absolute bottom-8 -right-8 bg-white py-3 px-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                            >
                                <div className="p-1.5 bg-orange-100 rounded-full text-orange-600">
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M6 19h12v-2H6v2zm0-4h12v-2H6v2zm7-13a5 5 0 00-4.9 4A4.5 4.5 0 006.5 15H18a3.5 3.5 0 00.5-6.96A5 5 0 0013 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Explorando</p>
                                    <p className="text-sm font-bold text-slate-800 leading-tight">AWS Cloud</p>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>

                    {/* Columna Derecha */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left md:pl-12"
                    >
                        {/* VARIABLE PROXIMITY TITLE */}
                        <h2 className="relative text-3xl md:text-5xl font-bold text-slate-900 mb-6 cursor-default">
                            <VariableProximity
                                label="Ingeniería de Software"
                                className={'variable-proximity-demo'}
                                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                containerRef={containerRef}
                                radius={150}
                                falloff='linear'
                            />
                            <br />
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                <span className="text-slate-500 text-2xl md:text-3xl font-medium">Enfocado en</span>

                                {/* ROTATING TEXT */}
                                <div className="bg-blue-600/10 px-3 py-1 rounded-lg border border-blue-200">
                                    <RotatingText
                                        texts={['sistemas reales.', 'alta escalabilidad.', 'arquitectura limpia.', 'resultados de negocio.']}
                                        mainClassName="text-2xl md:text-3xl font-bold text-blue-600 overflow-hidden py-0.5"
                                        staggerFrom="last"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "-120%" }}
                                        staggerDuration={0.025}
                                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                        rotationInterval={3000}
                                    />
                                </div>
                            </div>
                        </h2>

                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p className="border-l-4 border-blue-500 pl-6 italic text-slate-700 font-medium text-left">
                                Diseño y desarrollo software con foco en arquitectura, mantenibilidad y rendimiento.
                                Mi formación en la <strong>UTN</strong> me dio una base sólida en fundamentos, y mi experiencia
                                en proyectos reales me enseñó a tomar decisiones técnicas con impacto en producción.
                            </p>

                            <p>
                                Trabajo como desarrollador <strong>Full Stack</strong> con una visión integral del sistema:
                                desde el diseño de la base de datos y la API hasta cómo esas decisiones afectan la
                                experiencia en el frontend.
                            </p>

                            <p>
                                Entiendo una query SQL mal optimizada, un contrato de API deficiente o un modelo
                                de datos incorrecto terminan afectando directamente el rendimiento, la complejidad
                                del código y la UI.
                            </p>

                            <p>
                                Me diferencio por pensar el software como un sistema completo, no como capas aisladas,
                                priorizando soluciones simples, escalables y bien justificadas técnicamente.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};