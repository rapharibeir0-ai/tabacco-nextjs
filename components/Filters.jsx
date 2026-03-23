'use client';

import { useState } from 'react';

const FLAVOR_OPTS = ['todos', 'Suave', 'Médio', 'Forte'];
const STOCK_OPTS  = ['todos', 'em-estoque'];
const SORT_OPTS   = [
  { value:'default',    label:'Relevância' },
  { value:'price-asc',  label:'Menor preço' },
  { value:'price-desc', label:'Maior preço' },
  { value:'az',         label:'A–Z' },
  { value:'novidade',   label:'Novidades' },
];

function FlavorIcon({ flavor }) {
  if (flavor === 'Suave') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
    </svg>
  );
  if (flavor === 'Médio') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
  if (flavor === 'Forte') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
  return null;
}

export default function Filters({ searchQ, flavorFilter, stockFilter, sortMode, priceMin, priceMax, priceAbsMin, priceAbsMax, activePills, onSearch, onFlavor, onStock, onSort, onPriceChange, onClearAll }) {
  const [panelOpen, setPanelOpen] = useState(false);

  const activeCount = activePills.length;

  return (
    <>
      <div className="filters-wrap" id="filters-bar-wrap">
        <div className="filters-inner">
          {/* Active pills */}
          <div id="active-pills" style={{ display:'flex', gap:'.4rem', flexWrap:'wrap', alignItems:'center' }}>
            {activePills.map((pill) => (
              <span key={pill.label} className="pill">
                {pill.label}
                <button onClick={() => pill.onRemove()} aria-label="Remover filtro">×</button>
              </span>
            ))}
          </div>

          {/* Search */}
          <div className="search-wrap">
            <span className="search-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              id="search-input"
              type="text"
              placeholder="Buscar…"
              value={searchQ}
              onChange={e => onSearch(e.target.value)}
            />
          </div>

          {/* Filters toggle */}
          <button
            className={`more-filters-btn${panelOpen ? ' active' : ''}`}
            onClick={() => setPanelOpen(o => !o)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filtros
            <span className={`filter-badge-count${activeCount === 0 ? ' hidden' : ''}`}>
              {activeCount}
            </span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className={`filter-panel${panelOpen ? '' : ' hidden'}`}>
        <div className="filter-panel-inner">
          {/* Intensidade */}
          <div className="fp-section">
            <div className="fp-label">Intensidade</div>
            <div className="fp-chips">
              {FLAVOR_OPTS.map(f => (
                <button
                  key={f}
                  className={`fp-chip${flavorFilter === f ? ' active' : ''}`}
                  onClick={() => onFlavor(f)}
                >
                  {f !== 'todos' && <FlavorIcon flavor={f} />}
                  {f === 'todos' ? 'Todos' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="fp-divider" />

          {/* Disponibilidade */}
          <div className="fp-section">
            <div className="fp-label">Disponibilidade</div>
            <div className="fp-chips">
              <button
                className={`fp-chip${stockFilter === 'todos' ? ' active' : ''}`}
                onClick={() => onStock('todos')}
              >Todos</button>
              <button
                className={`fp-chip${stockFilter === 'em-estoque' ? ' active' : ''}`}
                onClick={() => onStock('em-estoque')}
              >Em estoque</button>
            </div>
          </div>

          <div className="fp-divider" />

          {/* Preço */}
          <div className="fp-section">
            <div className="fp-label">Preço</div>
            <div className="fp-price-vals" style={{ marginBottom:'.5rem' }}>
              R$ {priceMin} – R$ {priceMax === 99999 ? '∞' : priceMax}
            </div>
            <div className="dual-range">
              <div className="dual-range-track" />
              <div
                className="dual-range-fill"
                style={{
                  left: `${((priceMin - priceAbsMin) / (priceAbsMax - priceAbsMin)) * 100}%`,
                  right: `${100 - ((Math.min(priceMax, priceAbsMax) - priceAbsMin) / (priceAbsMax - priceAbsMin)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={priceAbsMin}
                max={priceAbsMax}
                value={priceMin}
                onChange={e => onPriceChange(Number(e.target.value), priceMax)}
              />
              <input
                type="range"
                min={priceAbsMin}
                max={priceAbsMax}
                value={priceMax === 99999 ? priceAbsMax : priceMax}
                onChange={e => onPriceChange(priceMin, Number(e.target.value))}
              />
            </div>
          </div>

          <div className="fp-divider" />

          {/* Ordenar */}
          <div className="fp-section">
            <div className="fp-label">Ordenar</div>
            <div className="fp-chips">
              {SORT_OPTS.map(s => (
                <button
                  key={s.value}
                  className={`fp-chip${sortMode === s.value ? ' active' : ''}`}
                  onClick={() => onSort(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="fp-actions">
            <button className="fp-clear" onClick={onClearAll}>Limpar tudo</button>
            <button className="fp-apply" onClick={() => setPanelOpen(false)}>Aplicar</button>
          </div>
        </div>
      </div>
    </>
  );
}
