import { propertyTypes, bedroomOptions } from '../data/properties';

const areas = ['Kensington', 'Chelsea', 'Mayfair', 'Hampstead', 'Notting Hill', 'Canary Wharf', 'Richmond', 'Islington', 'Battersea', 'Shoreditch', 'Primrose Hill', 'Nine Elms'];

const fieldLabel = 'block text-[11px] tracking-[0.14em] uppercase text-muted-brown mb-2';
const selectCls = 'w-full bg-warm-white border border-dark-brown/15 px-3 py-2.5 text-sm text-dark-brown focus:border-terracotta outline-none transition-colors';

export default function PropertyFilters({ filters, setFilters, onClear }) {
  const update = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <div className="space-y-7">
      <div>
        <span className={fieldLabel}>Buy / Rent</span>
        <div className="inline-flex border border-dark-brown/15 w-full">
          {['Any', 'Buy', 'Rent'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update({ status: s })}
              className={`flex-1 py-2.5 text-xs tracking-[0.08em] uppercase font-medium transition-colors ${
                filters.status === s ? 'bg-deep-forest text-warm-white' : 'text-muted-brown hover:text-deep-forest'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className={fieldLabel}>Location</span>
        <select className={selectCls} value={filters.location} onChange={(e) => update({ location: e.target.value })}>
          <option value="">All Locations</option>
          {areas.map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>

      <div>
        <span className={fieldLabel}>Property Type</span>
        <select className={selectCls} value={filters.type} onChange={(e) => update({ type: e.target.value })}>
          <option value="">All Types</option>
          {propertyTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <span className={fieldLabel}>Bedrooms</span>
        <select className={selectCls} value={filters.beds} onChange={(e) => update({ beds: Number(e.target.value) })}>
          <option value={0}>Any</option>
          {bedroomOptions.map((b) => <option key={b} value={b}>{b}+</option>)}
        </select>
      </div>

      <div>
        <span className={fieldLabel}>Price Range (£)</span>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => update({ minPrice: Number(e.target.value) || 0 })}
            className={selectCls}
          />
          <span className="text-muted-brown">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={Number.isFinite(filters.maxPrice) ? filters.maxPrice : ''}
            onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : Infinity })}
            className={selectCls}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="w-full py-3 border border-deep-forest text-deep-forest text-xs tracking-[0.1em] uppercase font-medium hover:bg-deep-forest hover:text-warm-white transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
