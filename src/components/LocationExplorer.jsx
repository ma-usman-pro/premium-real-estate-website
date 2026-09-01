import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { mapLocations } from '../data/developments';
import { properties } from '../data/properties';

export default function LocationExplorer({ onView }) {
  const [active, setActive] = useState('kensington');
  const activeLocation = mapLocations.find((l) => l.id === active);
  const property = properties.find((p) => p.area.toLowerCase().replace(/\s+/g, '-') === active) || properties[0];

  return (
    <section className="py-24 md:py-32 bg-deep-forest text-warm-white overflow-hidden">
      <div className="container-vera">
        <div className="mb-14 max-w-xl">
          <span className="eyebrow eyebrow-light mb-5">Where We Work</span>
          <h2 className="font-display text-4xl md:text-5xl text-balance">Explore By Location</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          {/* Stylized map */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-forest/60 border border-warm-white/10">
            <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
              <path d="M0 40 Q 25 30 50 42 T 100 38" stroke="#8FA89A" strokeWidth="0.6" fill="none" />
              <path d="M10 0 L 8 75" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
              <path d="M45 0 L 48 75" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
              <path d="M75 0 L 72 75" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
              <path d="M0 20 L 100 24" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
              <path d="M0 55 L 100 58" stroke="#8FA89A" strokeWidth="0.2" fill="none" />
            </svg>

            {mapLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActive(loc.id)}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                aria-label={`Show properties in ${loc.name}`}
              >
                <motion.span
                  animate={active === loc.id ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ repeat: active === loc.id ? Infinity : 0, duration: 2 }}
                  className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
                    active === loc.id ? 'bg-terracotta border-terracotta' : 'bg-deep-forest border-sage/60 group-hover:border-terracotta'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-warm-white" />
                </motion.span>
                <span className={`mt-1.5 text-[11px] tracking-[0.06em] whitespace-nowrap px-1.5 ${active === loc.id ? 'text-terracotta' : 'text-warm-white/70'}`}>
                  {loc.name}
                </span>
              </button>
            ))}
          </div>

          {/* Selected location card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-forest/50 border border-warm-white/10 p-2"
            >
              <div className="aspect-[16/10] overflow-hidden mb-5">
                <SmartImage src={property.images[0]} alt={`${activeLocation?.name} property preview`} className="w-full h-full object-cover" />
              </div>
              <div className="px-4 pb-4">
                <p className="eyebrow eyebrow-light mb-3">{activeLocation?.name} &middot; {activeLocation?.properties} properties</p>
                <h3 className="font-display text-2xl mb-2">{property.title}</h3>
                <p className="text-warm-white/70 mb-5">
                  {property.status === 'Rent' ? `£${property.rentPrice.toLocaleString()} pcm` : `£${property.price.toLocaleString()}`}
                </p>
                <button
                  onClick={() => onView(property.id)}
                  className="inline-flex items-center gap-2 text-sm tracking-[0.06em] uppercase text-terracotta hover:text-warm-white transition-colors"
                >
                  View Property <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
