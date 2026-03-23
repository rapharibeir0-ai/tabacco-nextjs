'use client';

import { BRANDS, brandInitials } from '@/lib/data';

const IcoGrid = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="1" y="10" width="6" height="6" rx="1"/><rect x="9" y="10" width="6" height="6" rx="1"/></svg>
);

export default function BrandStrip({ brands, activeBrand, onSelect, allCount }) {
  return (
    <div className="cat-brand-strip">
      <p className="cat-brand-strip-label">Filtrar por marca</p>
      <div className="cat-brand-strip-scroll">

        <button
          className={`cat-bcard cat-bcard-all${activeBrand === null ? ' active' : ''}`}
          onClick={() => onSelect(null)}
        >
          <div className="cat-bcard-icon">
            <IcoGrid />
          </div>
          <div className="cat-bcard-info">
            <span className="cat-bcard-name">Todos</span>
            <span className="cat-bcard-count">{allCount} produtos</span>
          </div>
        </button>

        {brands.map(({ name, count }) => (
          <button
            key={name}
            className={`cat-bcard${activeBrand === name ? ' active' : ''}`}
            onClick={() => onSelect(name)}
          >
            <div className="cat-bcard-mono">{brandInitials(name)}</div>
            <div className="cat-bcard-info">
              <span className="cat-bcard-name">{name}</span>
              <span className="cat-bcard-count">{count} produto{count !== 1 ? 's' : ''}</span>
              {BRANDS[name] && <span className="cat-bcard-origin">{BRANDS[name].origin} · Est. {BRANDS[name].founded}</span>}
            </div>
          </button>
        ))}

      </div>
    </div>
  );
}
