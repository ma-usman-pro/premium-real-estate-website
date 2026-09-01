import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, BedDouble, Bath, Maximize, MapPin, Calendar, ChevronLeft, ChevronRight,
  Phone, Mail, Check, LayoutGrid, Expand,
} from 'lucide-react';
import SmartImage from './SmartImage';
import { formatPrice } from '../data/properties';
import { getAgentById } from '../data/agents';

export default function PropertyDetailsModal({ property, onClose, onBookViewing }) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const agent = property ? getAgentById(property.agentId) : null;

  const next = useCallback(() => {
    if (!property) return;
    setActiveImg((i) => (i + 1) % property.images.length);
  }, [property]);

  const prev = useCallback(() => {
    if (!property) return;
    setActiveImg((i) => (i - 1 + property.images.length) % property.images.length);
  }, [property]);

  useEffect(() => {
    setActiveImg(0);
    setLightbox(false);
  }, [property]);

  useEffect(() => {
    document.body.style.overflow = property ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [property]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { lightbox ? setLightbox(false) : onClose(); }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose, next, prev]);

  if (!property) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] bg-dark-brown/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-modal-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 sm:inset-4 lg:inset-x-16 lg:inset-y-6 z-[61] bg-warm-white overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close property details"
          className="fixed sm:absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-dark-brown/60 hover:bg-dark-brown text-warm-white flex items-center justify-center backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="relative">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-cream overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={property.images[activeImg]}
                  alt={`${property.title} — image ${activeImg + 1} of ${property.images.length}`}
                  eager
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/50 via-transparent to-transparent pointer-events-none" />

            <button onClick={prev} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-warm-white/85 hover:bg-warm-white flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-deep-forest" />
            </button>
            <button onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-warm-white/85 hover:bg-warm-white flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-deep-forest" />
            </button>
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-warm-white/90 hover:bg-warm-white text-deep-forest text-xs tracking-[0.08em] uppercase font-medium"
            >
              <Expand className="w-3.5 h-3.5" /> View Fullscreen
            </button>
            <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-deep-forest/80 text-warm-white text-xs tracking-[0.05em]">
              {activeImg + 1} / {property.images.length}
            </span>
          </div>

          <div className="flex gap-3 px-4 sm:px-8 py-4 overflow-x-auto bg-cream">
            {property.images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setActiveImg(i)}
                className={`shrink-0 w-24 h-16 overflow-hidden transition-opacity ${i === activeImg ? 'ring-2 ring-terracotta' : 'opacity-60 hover:opacity-100'}`}
              >
                <SmartImage src={src} alt={`${property.title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="container-vera py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
              <h2 id="property-modal-title" className="font-display text-3xl md:text-4xl text-deep-forest">{property.title}</h2>
              <span className="font-display text-3xl text-terracotta">{formatPrice(property)}</span>
            </div>
            <p className="flex items-center gap-1.5 text-muted-brown mb-8">
              <MapPin className="w-4 h-4 text-sage" /> {property.fullAddress}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-dark-brown/10 mb-10">
              <Stat icon={BedDouble} label="Bedrooms" value={property.beds} />
              <Stat icon={Bath} label="Bathrooms" value={property.baths} />
              <Stat icon={Maximize} label="Area" value={`${property.sqft.toLocaleString()} sq ft`} />
              <Stat icon={Calendar} label="Built" value={property.yearBuilt} />
            </div>

            <section className="mb-10">
              <h3 className="font-display text-2xl text-deep-forest mb-4">Description</h3>
              <p className="text-muted-brown leading-relaxed">{property.description}</p>
            </section>

            <section className="mb-10">
              <h3 className="font-display text-2xl text-deep-forest mb-5">Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-dark-brown text-sm">
                    <Check className="w-4 h-4 text-terracotta shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10">
              <h3 className="font-display text-2xl text-deep-forest mb-5">Amenities</h3>
              <div className="flex flex-wrap gap-2.5">
                {property.amenities.map((a) => (
                  <span key={a} className="px-4 py-2 bg-cream text-dark-brown text-sm">{a}</span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-display text-2xl text-deep-forest mb-5">Floor Plan</h3>
              <div className="aspect-[16/9] bg-cream border border-dashed border-sage flex flex-col items-center justify-center text-muted-brown gap-3">
                <LayoutGrid className="w-8 h-8 text-sage" strokeWidth={1.2} />
                <p className="text-sm">Detailed floor plan available on request</p>
              </div>
            </section>
          </div>

          {/* Agent + CTA sidebar */}
          <aside className="lg:sticky lg:top-6 self-start space-y-6">
            <div className="bg-cream p-7">
              <h3 className="eyebrow mb-5">Your Advisor</h3>
              {agent && (
                <div className="flex items-center gap-4 mb-6">
                  <SmartImage src={agent.photo} alt={agent.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <p className="font-display text-lg text-deep-forest leading-tight">{agent.name}</p>
                    <p className="text-xs text-muted-brown">{agent.role}</p>
                  </div>
                </div>
              )}
              {agent && (
                <div className="space-y-3 mb-6 text-sm">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-2.5 text-dark-brown hover:text-terracotta transition-colors">
                    <Phone className="w-4 h-4 text-terracotta" /> {agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 text-dark-brown hover:text-terracotta transition-colors break-all">
                    <Mail className="w-4 h-4 text-terracotta" /> {agent.email}
                  </a>
                </div>
              )}
              <button
                onClick={() => onBookViewing(property)}
                className="w-full py-3.5 bg-terracotta text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-deep-forest transition-colors mb-3"
              >
                Book Viewing
              </button>
              <a
                href={agent ? `mailto:${agent.email}?subject=${encodeURIComponent('Enquiry: ' + property.title)}` : '#'}
                className="block text-center w-full py-3.5 border border-deep-forest text-deep-forest text-sm tracking-[0.06em] uppercase font-medium hover:bg-deep-forest hover:text-warm-white transition-colors"
              >
                Contact Agent
              </a>
            </div>
          </aside>
        </div>
      </motion.div>

      {/* Fullscreen lightbox */}
      {lightbox && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-dark-brown flex items-center justify-center"
        >
          <button onClick={() => setLightbox(false)} aria-label="Close fullscreen view" className="absolute top-5 right-5 text-warm-white/80 hover:text-warm-white">
            <X className="w-7 h-7" />
          </button>
          <button onClick={prev} aria-label="Previous image" className="absolute left-4 sm:left-8 text-warm-white/70 hover:text-warm-white">
            <ChevronLeft className="w-9 h-9" />
          </button>
          <SmartImage
            src={property.images[activeImg]}
            alt={`${property.title} fullscreen image ${activeImg + 1}`}
            eager
            className="max-h-[85vh] max-w-[88vw] object-contain"
          />
          <button onClick={next} aria-label="Next image" className="absolute right-4 sm:right-8 text-warm-white/70 hover:text-warm-white">
            <ChevronRight className="w-9 h-9" />
          </button>
          <span className="absolute bottom-6 text-warm-white/60 text-sm tracking-[0.1em]">
            {activeImg + 1} / {property.images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div>
      <Icon className="w-5 h-5 text-terracotta mb-2" strokeWidth={1.4} />
      <p className="font-display text-xl text-deep-forest">{value}</p>
      <p className="text-[11px] tracking-[0.1em] uppercase text-muted-brown">{label}</p>
    </div>
  );
}
