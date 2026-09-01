import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { img, exteriors, livingRooms, kitchens, bedrooms, bathrooms, cityViews, gardens } from '../data/images';

const items = [
  { src: img(exteriors[0], 1600), label: 'Architecture', span: 'sm:col-span-3 sm:row-span-2' },
  { src: img(livingRooms[1], 1400), label: 'Living Rooms', span: 'sm:col-span-3 sm:row-span-1' },
  { src: img(kitchens[1], 1400), label: 'Kitchens', span: 'sm:col-span-3 sm:row-span-1' },
  { src: img(bedrooms[0], 1400), label: 'Bedrooms', span: 'sm:col-span-2 sm:row-span-2' },
  { src: img(exteriors[3], 1400), label: 'Exteriors', span: 'sm:col-span-2 sm:row-span-1' },
  { src: img(cityViews[0], 1400), label: 'City Views', span: 'sm:col-span-2 sm:row-span-1' },
  { src: img(bathrooms[0], 1400), label: 'Interiors', span: 'sm:col-span-3 sm:row-span-1' },
  { src: img(gardens[1], 1400), label: 'Gardens', span: 'sm:col-span-3 sm:row-span-1' },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  const next = useCallback(() => setActive((i) => (i === null ? null : (i + 1) % items.length)), []);
  const prev = useCallback(() => setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length)), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, next, prev]);

  return (
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="container-vera">
        <div className="mb-14 max-w-xl">
          <span className="eyebrow mb-5">Architectural Photography</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest text-balance">The Gallery</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 auto-rows-[240px] sm:auto-rows-[180px] gap-4">
          {items.map((it, i) => (
            <motion.button
              key={it.label + i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`relative group overflow-hidden ${it.span}`}
              aria-label={`Open ${it.label} photo in fullscreen`}
            >
              <SmartImage
                src={it.src}
                alt={`${it.label} — VERA ESTATES architectural photography`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-deep-forest/0 group-hover:bg-deep-forest/30 transition-colors duration-400" />
              <span className="absolute bottom-3 left-3 text-[11px] tracking-[0.12em] uppercase text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {it.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-dark-brown flex items-center justify-center"
          >
            <button onClick={() => setActive(null)} aria-label="Close gallery" className="absolute top-5 right-5 text-warm-white/80 hover:text-warm-white">
              <X className="w-7 h-7" />
            </button>
            <button onClick={prev} aria-label="Previous image" className="absolute left-4 sm:left-8 text-warm-white/70 hover:text-warm-white">
              <ChevronLeft className="w-9 h-9" />
            </button>
            <div className="flex flex-col items-center gap-4 max-w-[88vw]">
              <SmartImage src={items[active].src} alt={items[active].label} eager className="max-h-[78vh] max-w-[88vw] object-contain" />
              <p className="text-warm-white/70 text-sm tracking-[0.14em] uppercase">{items[active].label}</p>
            </div>
            <button onClick={next} aria-label="Next image" className="absolute right-4 sm:right-8 text-warm-white/70 hover:text-warm-white">
              <ChevronRight className="w-9 h-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
