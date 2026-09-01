import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home as HomeIcon, BedDouble, Wallet } from 'lucide-react';
import { propertyTypes } from '../data/properties';

const areas = ['Any Location', 'Kensington', 'Chelsea', 'Mayfair', 'Hampstead', 'Notting Hill', 'Canary Wharf', 'Richmond', 'Islington', 'Battersea', 'Shoreditch', 'Primrose Hill', 'Nine Elms'];
const priceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Up to £1,000,000', min: 0, max: 1000000 },
  { label: '£1,000,000 – £2,000,000', min: 1000000, max: 2000000 },
  { label: '£2,000,000 – £3,500,000', min: 2000000, max: 3500000 },
  { label: '£3,500,000+', min: 3500000, max: Infinity },
];

function Field({ icon: Icon, label, children }) {
  return (
    <label className="flex-1 min-w-0 group">
      <span className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-muted-brown mb-2">
        <Icon className="w-3.5 h-3.5 text-terracotta" />
        {label}
      </span>
      {children}
    </label>
  );
}

const selectCls =
  'w-full bg-transparent text-dark-brown text-[15px] font-medium pb-1 border-b border-dark-brown/15 focus:border-terracotta outline-none transition-colors appearance-none cursor-pointer';

export default function PropertySearch({ onSearch }) {
  const [location, setLocation] = useState('Any Location');
  const [type, setType] = useState('Any Type');
  const [status, setStatus] = useState('Buy');
  const [beds, setBeds] = useState('Any');
  const [priceIdx, setPriceIdx] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    onSearch({
      location: location === 'Any Location' ? '' : location,
      type: type === 'Any Type' ? '' : type,
      status,
      beds: beds === 'Any' ? 0 : Number(beds),
      price: priceRanges[priceIdx],
    });
  };

  return (
    <section className="relative z-20 -mt-20 md:-mt-16 px-4">
      <div className="container-vera !px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-warm-white shadow-[0_20px_60px_-15px_rgba(24,53,47,0.25)] px-6 py-8 md:px-10 md:py-9"
        >
          <div className="flex items-center justify-between mb-7 flex-wrap gap-4">
            <h2 className="font-display text-2xl md:text-3xl text-deep-forest">Find Your Next Home</h2>
            <div className="inline-flex border border-deep-forest/15">
              {['Buy', 'Rent'].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-5 py-2 text-xs tracking-[0.1em] uppercase font-medium transition-colors ${
                    status === s ? 'bg-deep-forest text-warm-white' : 'text-muted-brown hover:text-deep-forest'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-5">
            <Field icon={MapPin} label="Location">
              <select className={selectCls} value={location} onChange={(e) => setLocation(e.target.value)}>
                {areas.map((a) => <option key={a}>{a}</option>)}
              </select>
            </Field>
            <Field icon={HomeIcon} label="Property Type">
              <select className={selectCls} value={type} onChange={(e) => setType(e.target.value)}>
                <option>Any Type</option>
                {propertyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field icon={BedDouble} label="Bedrooms">
              <select className={selectCls} value={beds} onChange={(e) => setBeds(e.target.value)}>
                <option>Any</option>
                {[1, 2, 3, 4, 5].map((b) => <option key={b} value={b}>{b}+</option>)}
              </select>
            </Field>
            <Field icon={Wallet} label="Price Range">
              <select className={selectCls} value={priceIdx} onChange={(e) => setPriceIdx(Number(e.target.value))}>
                {priceRanges.map((p, i) => <option key={p.label} value={i}>{p.label}</option>)}
              </select>
            </Field>

            <button
              type="submit"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-warm-white text-sm tracking-[0.06em] uppercase font-medium hover:bg-deep-forest transition-colors duration-300"
            >
              <Search className="w-4 h-4" />
              Search Properties
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
