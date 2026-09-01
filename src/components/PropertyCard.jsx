import { motion } from 'framer-motion';
import { Heart, BedDouble, Bath, Maximize, ArrowUpRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { formatPrice } from '../data/properties';

export default function PropertyCard({ property, onView, isFavorite, onToggleFavorite, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group corner-frame bg-warm-white flex flex-col"
    >
      <button
        onClick={() => onView(property.id)}
        className="relative block w-full aspect-[4/3] overflow-hidden bg-cream text-left"
        aria-label={`View details for ${property.title}`}
      >
        <SmartImage
          src={property.images[0]}
          alt={`${property.title} in ${property.area}, London — exterior view`}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="absolute top-4 left-4 px-3 py-1.5 bg-warm-white/90 backdrop-blur-sm text-deep-forest text-[10px] tracking-[0.14em] uppercase font-semibold">
          {property.type}
        </span>
        <span className="absolute top-4 left-4 mt-9 px-3 py-1.5 bg-terracotta/90 backdrop-blur-sm text-warm-white text-[10px] tracking-[0.14em] uppercase font-semibold">
          For {property.status}
        </span>

        <span
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onToggleFavorite(property.id); } }}
          aria-label={isFavorite ? 'Remove from favourites' : 'Save to favourites'}
          aria-pressed={isFavorite}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-warm-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
        >
          <motion.span
            key={isFavorite ? 'on' : 'off'}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-terracotta text-terracotta' : 'text-deep-forest'}`} />
          </motion.span>
        </span>

        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 px-4 py-2 bg-deep-forest text-warm-white text-xs tracking-[0.08em] uppercase font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          View Property <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </button>

      <div className="pt-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-deep-forest leading-snug">
            <button onClick={() => onView(property.id)} className="hover:text-terracotta transition-colors text-left">
              {property.title}
            </button>
          </h3>
          <span className="shrink-0 font-display text-xl text-terracotta">{formatPrice(property)}</span>
        </div>
        <p className="text-sm text-muted-brown mt-1">{property.area}, London</p>

        <div className="mt-4 pt-4 border-t border-dark-brown/10 flex items-center gap-5 text-sm text-muted-brown">
          <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-sage" /> {property.beds}</span>
          <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-sage" /> {property.baths}</span>
          <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-sage" /> {property.sqft.toLocaleString()} sq ft</span>
        </div>
      </div>
    </motion.article>
  );
}
