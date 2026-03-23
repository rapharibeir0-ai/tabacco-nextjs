'use client';

import { intensityLevel, fmt } from '@/lib/data';

export default function Sidebar({ brands, activeBrand, onBrand, flavorFilter, onFlavor, stockOnly, onStockOnly, priceMax, onPriceMax, allCount }) {
  const flavors = ['Suave', 'Médio', 'Forte'];

  return (
    <aside className="cat-sidebar">

      <div className="cat-sidebar-section">
        <div className="cat-sidebar-title">Marcas</div>
        <div className="cat-sidebar-brands">
          <label className="cat-check">
            <input type="checkbox" checked={activeBrand === null} onChange={() => onBrand(null)} />
            <span>Todas as marcas</span>
            <span className="cat-check-count">{allCount}</span>
          </label>
          {brands.map(({ name, count }) => (
            <label key={name} className="cat-check">
              <input type="checkbox" checked={activeBrand === name} onChange={() => onBrand(activeBrand === name ? null : name)} />
              <span>{name}</span>
              <span className="cat-check-count">{count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="cat-sidebar-section">
        <div className="cat-sidebar-title">Intensidade</div>
        <div className="cat-int-chips">
          {flavors.map(f => {
            const lvl = intensityLevel[f];
            const cls = f === 'Suave' ? 'suave' : f === 'Médio' ? 'medio' : 'forte';
            return (
              <button
                key={f}
                className={`cat-int-chip${flavorFilter === f ? ' active' : ''}`}
                onClick={() => onFlavor(flavorFilter === f ? 'todos' : f)}
              >
                <span className="cat-int-bars">
                  {[1,2,3].map(i => (
                    <span key={i} className={`cat-ibar cat-ibar-${i}${i <= lvl ? ` on ${cls}` : ''}`} />
                  ))}
                </span>
                <span className="cat-int-label">{f}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="cat-sidebar-section">
        <div className="cat-sidebar-title">
          Preço máximo
          {priceMax < 99999 && <span className="cat-sidebar-val"> — R$ {fmt(priceMax)}</span>}
        </div>
        <input
          className="cat-range"
          type="range"
          min={0}
          max={500}
          step={10}
          value={priceMax < 99999 ? priceMax : 500}
          onChange={e => {
            const v = parseInt(e.target.value);
            onPriceMax(v >= 500 ? 99999 : v);
          }}
        />
        <div className="cat-range-labels"><span>R$ 0</span><span>R$ 500+</span></div>
      </div>

      <div className="cat-sidebar-section">
        <label className="cat-toggle">
          <span>Somente em estoque</span>
          <div
            className={`cat-toggle-track${stockOnly ? ' on' : ''}`}
            onClick={() => onStockOnly(s => !s)}
          >
            <div className="cat-toggle-thumb" />
          </div>
        </label>
      </div>

    </aside>
  );
}
