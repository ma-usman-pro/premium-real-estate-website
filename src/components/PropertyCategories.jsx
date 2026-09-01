import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SmartImage from './SmartImage';
import { categories } from '../data/developments';

// Asymmetric spans: first item large & tall, rest vary in size.
const spans = [
  'sm:col-span-4 sm:row-span-2',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-3 sm:row-span-1',
  'sm:col-span-3 sm:row-span-1',
];

export default function PropertyCategories({ onSelect }) {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container-vera">
        <div className="mb-14 max-w-xl">
          <span className="eyebrow mb-5">By Category</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-forest text-balance">Explore Our Collection</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 auto-rows-[220px] sm:auto-rows-[180px] gap-5">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => onSelect(cat)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group overflow-hidden text-left ${spans[i] || 'sm:col-span-2'}`}
            >
              <SmartImage
                src={cat.image}
                alt={`${cat.name} — VERA ESTATES collection`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/85 via-deep-forest/10 to-transparent group-hover:from-deep-forest/90 transition-colors duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[11px] tracking-[0.14em] uppercase text-sage mb-1">{cat.count} Listings</span>
                <span className="font-display text-2xl text-warm-white flex items-center gap-2">
                  {cat.name}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
