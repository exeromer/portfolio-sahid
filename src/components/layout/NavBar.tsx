import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '../../hooks/useScroll';
import { cn } from '../../utils/cn';
import { useScramble } from 'use-scramble';

export const Navbar = () => {
    const { isScrolled } = useScroll(20);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { ref: refName, replay: replayName } = useScramble({
        text: "Sahid",
        speed: 0.12,
        tick: 2,
        step: 1,
        scramble: 12,
        seed: 0,
        chance: 1,
        overdrive: false,
    });
    const { ref: refDomain, replay: replayDomain } = useScramble({
        text: ".dev",
        speed: 0.12,
        tick: 2,
        step: 1,
        scramble: 12,
        seed: 0,
        chance: 1,
        overdrive: false,
    });
    const handleHover = () => {
        replayName();
        replayDomain();
    };


    const navLinks = [
        { name: 'Inicio', href: '#hero' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Sobre mí', href: '#about' },
        { name: 'Contacto', href: '#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a
                        href="#"
                        className="text-2xl font-bold text-slate-800 tracking-tighter hover:text-blue-600 transition-colors"
                        onMouseEnter={handleHover}
                    >
                        <span ref={refName} className="text-slate-800" />
                        <span ref={refDomain} className="text-blue-600" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-brand-text-secondary hover:text-blue-600 font-medium transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Button */}
                    <button
                        className="md:hidden text-slate-800 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu con AnimatePresence (Entrada/Salida suave) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed top-15 left-0 right-0 bg-white shadow-lg border-t border-slate-100 z-40 overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-brand-text-secondary hover:text-blue-600 font-medium block"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};