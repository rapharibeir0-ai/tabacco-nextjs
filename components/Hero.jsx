'use client';

export default function Hero({ products, searchQ, onSearch }) {
  const inStock = products.filter(p => p.stock !== 'out').length;
  const brands  = new Set(products.map(p => p.brand)).size;

  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">Catálogo 2025</p>
        <h1>O prazer de um<br />bom <em>charuto.</em></h1>
        <p className="hero-desc">Seleção curada das melhores marcas — cubanos, dominicanos, nicaraguenses e nacionais. Entrega para todo o Brasil.</p>
      </div>

      <div className="hero-right" id="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-n">{products.length}</span>
          <span className="hero-stat-l">Produtos</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-n">{brands}</span>
          <span className="hero-stat-l">Marcas</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-n">{inStock}</span>
          <span className="hero-stat-l">Em estoque</span>
        </div>
      </div>

      <div className="hero-search-wrap">
        <div className="hero-search-box">
          <span className="hero-search-ico">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            type="text"
            id="hero-search-input"
            placeholder="Buscar por marca, nome ou vitola…"
            value={searchQ}
            onChange={e => onSearch(e.target.value)}
            autoComplete="off"
          />
          {searchQ && (
            <button className="hero-search-clear" onClick={() => onSearch('')}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        <div className="hero-search-hints">
          {['Cohiba', 'Davidoff', 'Robusto', 'Suave'].map(hint => (
            <button key={hint} onClick={() => onSearch(hint)}>{hint}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
