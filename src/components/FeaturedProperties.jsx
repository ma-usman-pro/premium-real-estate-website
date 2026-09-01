import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { properties } from '../data/properties';

export default function FeaturedProperties({ onView, isFavorite, onToggleFavorite, onViewAll }) {
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="container-vera">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow mb-5">Curated Selection</span>
            <h2 className="font-display text-4xl md:text-5xl text-deep-forest text-balance max-w-xl">
              Exceptional Properties
            </h2>
          </div>
          <p className="max-w-sm text-muted-brown leading-relaxed">
            A rotating edit of the homes we're proudest to represent — each one visited,
            verified and photographed by our own team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {featured.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={i}
              onView={onView}
              isFavorite={isFavorite(property.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-2.5 px-8 py-4 border border-deep-forest text-deep-forest text-sm tracking-[0.06em] uppercase font-medium hover:bg-deep-forest hover:text-warm-white transition-colors duration-300"
          >
            View All Properties
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
