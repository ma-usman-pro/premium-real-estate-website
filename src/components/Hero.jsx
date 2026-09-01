import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { img, exteriors } from '../data/images';

const line = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: 0,
    transition: { delay: 0.5 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero({ onExplore, onBookViewing }) {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <SmartImage
          src={img(exteriors[1], 2400, 85)}
          alt="A contemporary London residence at dusk, with warm interior light and floor-to-ceiling glazing"
          eager
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/85 via-deep-forest/25 to-deep-forest/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/40 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 h-full container-vera flex flex-col justify-end pb-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-2 text-warm-white/85 text-xs tracking-[0.24em] uppercase mb-6"
        >
          <MapPin className="w-3.5 h-3.5 text-terracotta" />
          London &middot; United Kingdom
        </motion.div>

        <h1 className="font-display text-warm-white text-[13vw] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[7.2rem] font-medium tracking-[-0.02em] max-w-5xl">
          {['FIND A PLACE', 'THAT FEELS', 'LIKE YOURS.'].map((text, i) => (
            <span key={text} className="block overflow-hidden">
              <motion.span custom={i} variants={line} initial="hidden" animate="show" className="block">
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-md text-warm-white/85 text-lg leading-relaxed text-balance"
        >
          Exceptional homes, thoughtfully selected for the way you want to live.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onExplore}
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-terracotta text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-cream hover:text-deep-forest transition-colors duration-300"
          >
            Explore Properties
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onBookViewing}
            className="px-8 py-4 border border-warm-white/50 text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-warm-white/10 hover:border-warm-white transition-colors duration-300"
          >
            Book a Viewing
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-12 z-10 hidden sm:flex flex-col items-center gap-3 text-warm-white/70"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-warm-white/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
