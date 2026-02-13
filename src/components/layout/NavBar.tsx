import { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useScroll } from '../../hooks/useScroll';
import { cn } from '../../utils/cn';
import { useScramble } from 'use-scramble';

const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Contacto', href: '#contact' },
];

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

    const navContainerRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLAnchorElement[]>([]);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true });

            tl.current.to(mobileMenuRef.current, {
                height: 'auto', 
                duration: 0.5,
                ease: 'power3.inOut',
                transformOrigin: 'top center'
            })
            .to(mobileMenuRef.current, {
                opacity: 1,
                duration: 0.3
            }, "<") 
            
            .fromTo(linksRef.current, 
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(1.7)' },
                "-=0.2" 
            );

        }, navContainerRef);

        return () => ctx.revert();
    }, []);

    // ANIMACIÓN AL ABRIR/CERRAR
    useLayoutEffect(() => {
        if (tl.current) {
            if (isMobileMenuOpen) {
                tl.current.play();
                gsap.to(line1Ref.current, { rotate: 45, y: 6, duration: 0.3 });
                gsap.to(line2Ref.current, { rotate: -45, y: -6, duration: 0.3 });
            } else {
                tl.current.reverse();
                gsap.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.3 });
                gsap.to(line2Ref.current, { rotate: 0, y: 0, duration: 0.3 });
            }
        }
    }, [isMobileMenuOpen]);

    const addToLinksRef = (el: HTMLAnchorElement | null) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    return (
        <div ref={navContainerRef}>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                )}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    
                    {/* LOGO */}
                    <a
                        href="#"
                        className="text-2xl font-bold text-slate-800 tracking-tighter hover:text-blue-600 transition-colors flex gap-0.5"
                        onMouseEnter={handleHover}
                    >
                        <span ref={refName} className="text-slate-800" />
                        <span ref={refDomain} className="text-blue-600" />
                    </a>

                    {/* DESKTOP MENU  */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-slate-600 hover:text-blue-600 font-medium transition-colors relative group text-sm"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* MOBILE HAMBURGER BUTTON */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 focus:outline-none z-50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span ref={line1Ref} className="block w-6 h-0.5 bg-slate-800 rounded-full origin-center"></span>
                        <span ref={line2Ref} className="block w-6 h-0.5 bg-slate-800 rounded-full origin-center"></span>
                    </button>
                </div>

                {/* MOBILE MENU */}
                <div className="container mx-auto px-6 md:hidden">
                    <div
                        ref={mobileMenuRef}
                        className="overflow-hidden h-0 opacity-0 bg-white shadow-xl rounded-2xl border border-slate-100 mt-2"
                        style={{ willChange: 'height, opacity' }}
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    ref={addToLinksRef} 
                                    className="text-lg font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-4 py-3 rounded-xl transition-colors block"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.nav>
        </div>
    );
};