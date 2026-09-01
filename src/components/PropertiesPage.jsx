import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, SearchX } from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { properties } from '../data/properties';

const DEFAULT_FILTERS = { status: 'Any', location: '', type: '', beds: 0, minPrice: 0, maxPrice: Infinity };
const SORTS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function PropertiesPage({ initialFilters, onView, isFavorite, onToggleFavorite }) {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });
  const [sort, setSort] = useState('Featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (initialFilters) setFilters((f) => ({ ...f, ...initialFilters }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilters]);

  const results = useMemo(() => {
    let list = properties.filter((p) => {
      if (filters.status !== 'Any' && p.status !== filters.status) return false;
      if (filters.location && p.area !== filters.location) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.beds && p.beds < filters.beds) return false;
      const price = p.status === 'Rent' ? p.rentPrice : p.price;
      if (price < filters.minPrice) return false;
      if (price > filters.maxPrice) return false;
      return true;
    });

    switch (sort) {
      case 'Price: Low to High':
        list = [...list].sort((a, b) => (a.status === 'Rent' ? a.rentPrice : a.price) - (b.status === 'Rent' ? b.rentPrice : b.price));
        break;
      case 'Price: High to Low':
        list = [...list].sort((a, b) => (b.status === 'Rent' ? b.rentPrice : b.price) - (a.status === 'Rent' ? a.rentPrice : a.price));
        break;
      case 'Newest':
        list = [...list].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default:
        list = [...list].sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    }
    return list;
  }, [filters, sort]);

  const clear = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="pt-32 md:pt-40 pb-24 bg-cream min-h-screen">
      <div className="container-vera">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow mb-5">The Full Collection</span>
          <h1 className="font-display text-4xl md:text-5xl text-deep-forest text-balance">
            Properties For {filters.status === 'Rent' ? 'Rent' : filters.status === 'Buy' ? 'Sale' : 'Sale &amp; Rent'} in London
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-32 bg-warm-white p-7 border border-dark-brown/10">
              <h2 className="font-display text-xl text-deep-forest mb-6">Refine Your Search</h2>
              <PropertyFilters filters={filters} setFilters={setFilters} onClear={clear} />
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
              <p className="text-sm text-muted-brown">
                <span className="text-deep-forest font-semibold">{results.length}</span> propert{results.length === 1 ? 'y' : 'ies'} found
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 border border-dark-brown/15 text-sm text-dark-brown"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <label className="flex items-center gap-2 text-sm text-muted-brown">
                  Sort:
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-transparent border-b border-dark-brown/20 py-1 text-dark-brown font-medium focus:border-terracotta outline-none"
                  >
                    {SORTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="py-24 flex flex-col items-center text-center bg-warm-white border border-dark-brown/10">
                <SearchX className="w-10 h-10 text-sage mb-5" strokeWidth={1.2} />
                <p className="font-display text-2xl text-deep-forest mb-2">No properties match your search.</p>
                <p className="text-muted-brown mb-7 max-w-sm">Try widening your price range or removing a filter to see more homes.</p>
                <button
                  onClick={clear}
                  className="px-7 py-3 bg-terracotta text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-deep-forest transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
                {results.map((property, i) => (
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
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-dark-brown/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[86%] max-w-sm bg-warm-white z-50 p-7 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-7">
                <h2 className="font-display text-xl text-deep-forest">Refine Your Search</h2>
                <button onClick={() => setDrawerOpen(false)} aria-label="Close filters"><X className="w-5 h-5" /></button>
              </div>
              <PropertyFilters filters={filters} setFilters={setFilters} onClear={clear} />
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full mt-6 py-3.5 bg-deep-forest text-warm-white text-sm tracking-[0.08em] uppercase font-medium"
              >
                Show {results.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
