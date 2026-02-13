import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Loader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (tl.current) return;

    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto'; 
          onLoadingComplete(); 
        }
      });

      // PASO 1: Crece la línea central
      tl.to(lineRef.current, {
        height: '100%',
        duration: 1.5,
        ease: 'power4.inOut',
      })
      // PASO 2: La línea se desvanece un poco
      .to(lineRef.current, {
        opacity: 0,
        duration: 0.1,
      })
      // PASO 3: Apertura de paneles (Split)
      .to([leftPanelRef.current, rightPanelRef.current], {
        width: '0%', // Se encogen hacia los bordes
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.1, // Pequeño delay entre uno y otro para efecto orgánico
      }, "-=0.1") // Empieza un poquito antes de que termine lo anterior
      // PASO 4: Desaparecer el contenedor del DOM visualmente
      .to(containerRef.current, {
        display: 'none'
      });

    }, containerRef);

    return () => ctx.revert(); // Limpieza automática
  }, [onLoadingComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Panel Izquierdo */}
      <div 
        ref={leftPanelRef} 
        className="absolute left-0 w-1/2 h-full bg-slate-950 z-20" 
      />

      {/* Panel Derecho */}
      <div 
        ref={rightPanelRef} 
        className="absolute right-0 w-1/2 h-full bg-slate-950 z-20" 
      />

      {/* Línea Central Neón */}
      <div 
        ref={lineRef} 
        className="relative z-30 w-0.5 h-0 bg-linear-to-b from-blue-500 via-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]" 
      />
    </div>
  );
};