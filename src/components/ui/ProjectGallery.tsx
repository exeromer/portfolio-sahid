import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProjectGalleryProps {
  images: string[];
  title?: string; // Prop nueva para el ALT
}

export const ProjectGallery = ({ images, title = "Proyecto" }: ProjectGalleryProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const sideImages = images.slice(1, 5);
  const sideCount = sideImages.length;
  const hasSideImages = sideCount > 0;

  const getSideGridClass = (count: number) => {
    if (count === 1) return "grid-cols-1 grid-rows-1";
    if (count === 2) return "grid-cols-1 grid-rows-2";
    return "grid-cols-2 grid-rows-2";
  };

  const getItemSpanClass = (index: number, totalSide: number) => {
    if (totalSide === 3 && index === 2) return "col-span-2";
    return "";
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, nextImage, prevImage]);

  return (
    <>
      <div className="w-full rounded-xl overflow-hidden shadow-sm border border-brand-border bg-brand-bg">
        <div className={cn(
          "grid gap-1",
          hasSideImages ? "grid-cols-1 md:grid-cols-4 h-64 md:h-96" : "h-64 md:h-96"
        )}>
          
          {/* IMAGEN PRINCIPAL */}
          <div 
            className={cn(
              "relative overflow-hidden cursor-pointer group",
              hasSideImages ? "md:col-span-2 h-full" : "w-full h-full"
            )}
            onClick={() => openLightbox(0)}
          >
            <img
              src={mainImage}
              alt={`${title} - Vista Principal`} // ALT corregido
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* GRID LATERAL */}
          {hasSideImages && (
            <div className={cn(
              "hidden md:grid md:col-span-2 h-full gap-1", 
              getSideGridClass(sideCount)
            )}>
              {sideImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "relative overflow-hidden cursor-pointer group",
                    getItemSpanClass(idx, sideCount)
                  )}
                  onClick={() => openLightbox(idx + 1)}
                >
                  <img
                    src={img}
                    alt={`${title} - Detalle ${idx + 1}`} // ALT corregido usando idx del map
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {idx === sideImages.length - 1 && images.length > 5 && (
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl backdrop-blur-[2px] transition-all group-hover:bg-black/70">
                        +{images.length - 5}
                     </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Botón Móvil */}
        <button
          onClick={() => openLightbox(0)}
          className="md:hidden w-full py-3 bg-slate-50 text-brand-text-secondary text-sm font-semibold border-t border-brand-border hover:bg-slate100transition-colors flex items-center justify-center gap-2"
        >
          Ver todas ({images.length})
        </button>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-110" onClick={closeLightbox}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <button className="absolute left-4 text-white p-4 hover:bg-white/10 rounded-full z-110 hidden md:block" onClick={prevImage}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[currentImageIndex]}
              className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded"
              onClick={(e) => e.stopPropagation()}
            />

            <button className="absolute right-4 text-white p-4 hover:bg-white/10 rounded-full z-110 hidden md:block" onClick={nextImage}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            
            <div className="absolute bottom-6 text-white/80 font-medium bg-white/10 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};