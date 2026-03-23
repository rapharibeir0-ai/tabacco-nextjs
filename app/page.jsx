'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { catLabels, catOrigins, brandInitials, fmt } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import BrandHeader from '@/components/BrandHeader';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';

// ── PRODUCT MODAL ─────────────────────────────────────────────
import { intensityLevel, stockText } from '@/lib/data';

function ProductModal({ product, brandsInfo, onClose, onAddToCart }) {
  useEffect(() => {
    if (!product) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;
  const level = intensityLevel[product.flavor] ?? 1;
  const brandInfo = brandsInfo[product.brand] || {};
  const isOut = product.stock === 'out';

  return (
    <div id="product-modal" className="open" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes do produto"
        className="pmodal"
        onClick={e => e.stopPropagation()}
      >
        <div className="pmodal-left">
          {product.img
            ? <Image src={product.img} alt={product.name} fill style={{ objectFit: 'cover' }} />
            : <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', opacity:.1 }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
          }
          <button className="pmodal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="pmodal-body">
          <div className="pmodal-brand">{product.brand}</div>
          <div className="pmodal-name">{product.name}</div>
          <div className="pmodal-vitola">{product.vitola}</div>
          <div className="pmodal-hr" />

          <div className="pmodal-row">
            <span className="pmodal-row-lbl">Intensidade</span>
            <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
              <span>{product.flavor}</span>
              <div style={{ display:'flex', gap:'4px' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ width:'7px', height:'7px', borderRadius:'50%', background: i <= level ? 'var(--ink)' : 'var(--border)' }} />
                ))}
              </div>
            </div>
          </div>

          {product.filler && (
            <div className="pmodal-row">
              <span className="pmodal-row-lbl">Miolo</span>
              <span>{product.filler}</span>
            </div>
          )}

          {product.smokeTime && (
            <div className="pmodal-row">
              <span className="pmodal-row-lbl">Tempo</span>
              <span>⏱ {product.smokeTime}</span>
            </div>
          )}

          {product.pairing && product.pairing.length > 0 && (
            <div className="pmodal-row">
              <span className="pmodal-row-lbl">Maridagem</span>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.3rem' }}>
                {product.pairing.map((p, i) => (
                  <span key={i} className="pairing-tag">{p}</span>
                ))}
              </div>
            </div>
          )}

          <div className="pmodal-hr" />

          <div className="pmodal-price">R$ {fmt(product.price)}</div>
          <div className="pmodal-unit">{product.unit}</div>

          <div style={{ display:'flex', alignItems:'center', gap:'.4rem', color: product.stock === 'in-stock' ? '#2a7a4a' : product.stock === 'low-stock' ? '#b07020' : 'var(--muted)', fontSize:'.78rem' }}>
            {product.stock !== 'out' && '✓'} {stockText[product.stock]}
          </div>

          {brandInfo.bio && (
            <div className="pmodal-bio">{brandInfo.bio}</div>
          )}

          <button
            className={`pmodal-add${isOut ? ' disabled' : ''}`}
            onClick={() => { if (!isOut) { onAddToCart(product); onClose(); } }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {isOut ? 'Esgotado' : '+ Adicionar ao carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────
function Hero({ products, searchQ, onSearch }) {
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

// ── CATALOG ───────────────────────────────────────────────────
function Catalog({ products, catFilter, brandsInfo, onAddToCart, onOpenModal }) {
  if (products.length === 0) {
    return (
      <div className="catalog-wrap">
        <div className="empty-state">
          <p>Nenhum produto encontrado.</p>
        </div>
      </div>
    );
  }

  // Brand view
  if (catFilter === 'marcas') {
    const brandMap = {};
    products.forEach(p => {
      if (!brandMap[p.brand]) brandMap[p.brand] = [];
      brandMap[p.brand].push(p);
    });
    const brandNames = Object.keys(brandMap).sort();
    return (
      <div className="catalog-wrap" id="catalog-main">
        {brandNames.map(brand => (
          <div key={brand} className="brand-section">
            <BrandHeader brand={brand} count={brandMap[brand].length} />
            <div className="brand-grid">
              {brandMap[brand].map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Category + brand grouping
  const cats = catFilter === 'todos' ? ['cubanos', 'outros', 'nacionais'] : [catFilter];

  return (
    <div className="catalog-wrap" id="catalog-main">
      {cats.map(cat => {
        const catItems = products.filter(p => p.category === cat);
        if (catItems.length === 0) return null;

        const brandMap = {};
        catItems.forEach(p => {
          if (!brandMap[p.brand]) brandMap[p.brand] = [];
          brandMap[p.brand].push(p);
        });
        const brandNames = Object.keys(brandMap).sort();

        return (
          <section key={cat} className="category-section">
            <div className="category-header">
              <h2 className="cat-title">{catLabels[cat]}</h2>
              <span className="cat-origin">{catOrigins[cat]}</span>
              <span className="cat-count">{catItems.length} produto{catItems.length !== 1 ? 's' : ''}</span>
            </div>

            {brandNames.map(brand => {
              const info = brandsInfo[brand] || {};
              const items = brandMap[brand];
              return (
                <div key={brand} className="cat-brand-group">
                  <div className="cat-brand-header">
                    <div className="cat-brand-monogram">{brandInitials(brand)}</div>
                    <div>
                      <div className="cat-brand-name">{brand}</div>
                      {info.bio && (
                        <div className="cat-brand-bio">{info.bio.split('.')[0]}.</div>
                      )}
                    </div>
                    <span className="cat-brand-count">{items.length} produto{items.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="products-grid">
                    {items.map(p => (
                      <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onOpenModal={onOpenModal} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-main-inner" style={{ gridTemplateColumns:'1.4fr 1.3fr 1fr' }}>
          <div className="footer-col">
            <div className="footer-brand">Charutos <span>Premium</span></div>
            <p className="footer-tagline">Seleção curada das melhores marcas do mundo. Entrega discreta para todo o Brasil.</p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Formas de pagamento</div>
            <div className="pay-icons">
              {['Visa','Master','Elo','Amex','Pix','Boleto'].map(p => (
                <span key={p} className="pay-icon">{p}</span>
              ))}
            </div>
            <p className="footer-discount-note">✓ 10% de desconto no Pix e Boleto · Parcele em até 6× sem juros</p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Atendimento</div>
            <a className="footer-wa-link" href="https://wa.me/5511939215700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              WhatsApp (11) 93921-5700
            </a>
            <p className="footer-hours">Seg–Sex 9h–18h | Sáb 9h–14h</p>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        O TABACO É PREJUDICIAL À SAÚDE. PROIBIDA A VENDA PARA MENORES DE 18 ANOS.
      </div>
    </footer>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
const PRICE_ABS_MIN = 0;
const PRICE_ABS_MAX = 1000;

export default function CatalogPage() {
  const [products,     setProducts]     = useState([]);
  const [brandsInfo,   setBrandsInfo]   = useState({});
  const [loading,      setLoading]      = useState(true);
  const [catFilter,    setCatFilter]    = useState('todos');
  const [flavorFilter, setFlavorFilter] = useState('todos');
  const [stockFilter,  setStockFilter]  = useState('todos');
  const [sortMode,     setSortMode]     = useState('default');
  const [searchQ,      setSearchQ]      = useState('');
  const [priceMin,     setPriceMin]     = useState(PRICE_ABS_MIN);
  const [priceMax,     setPriceMax]     = useState(99999);
  const [cart,         setCart]         = useState([]);
  const [cartOpen,     setCartOpen]     = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // Busca produtos e marcas do Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [{ data: prods }, { data: brandsData }] = await Promise.all([
        supabase.from('products').select('*, variants(*)').order('id'),
        supabase.from('brands').select('*'),
      ]);
      setProducts((prods || []).map(p => ({ ...p, smokeTime: p.smoke_time })));
      const map = {};
      (brandsData || []).forEach(b => { map[b.name] = b; });
      setBrandsInfo(map);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (catFilter !== 'todos' && catFilter !== 'marcas' && p.category !== catFilter) return false;
      if (flavorFilter === 'em-estoque') { if (p.stock === 'out') return false; }
      else if (flavorFilter !== 'todos') { if (p.flavor !== flavorFilter) return false; }
      if (stockFilter === 'em-estoque' && p.stock === 'out') return false;
      const q = searchQ.toLowerCase();
      if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !p.vitola.toLowerCase().includes(q)) return false;
      if (p.price < priceMin) return false;
      if (priceMax < 99999 && p.price > priceMax) return false;
      return true;
    });

    switch (sortMode) {
      case 'price-asc':  return [...list].sort((a,b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a,b) => b.price - a.price);
      case 'az':         return [...list].sort((a,b) => a.name.localeCompare(b.name));
      case 'novidade':   return [...list].filter(p => p.badges?.includes('novidade')).concat(list.filter(p => !p.badges?.includes('novidade')));
      default:           return list;
    }
  }, [products, catFilter, flavorFilter, stockFilter, sortMode, searchQ, priceMin, priceMax]);

  // ── Cart operations ──
  const addToCart = useCallback(product => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, brand: product.brand, name: product.name, vitola: product.vitola, price: product.price, unit: product.unit, qty: 1 }];
    });
  }, []);

  const changeQty = useCallback((id, delta) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (item.qty + delta <= 0) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i);
    });
  }, []);

  const removeFromCart = useCallback(id => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  // ── Active pills ──
  const activePills = useMemo(() => {
    const pills = [];
    if (flavorFilter !== 'todos') pills.push({ label: flavorFilter, onRemove: () => setFlavorFilter('todos') });
    if (stockFilter === 'em-estoque') pills.push({ label: 'Em estoque', onRemove: () => setStockFilter('todos') });
    if (sortMode !== 'default') pills.push({ label: { 'price-asc':'Menor preço','price-desc':'Maior preço','az':'A–Z','novidade':'Novidades' }[sortMode], onRemove: () => setSortMode('default') });
    if (priceMax < 99999) pills.push({ label: `até R$ ${priceMax}`, onRemove: () => setPriceMax(99999) });
    if (searchQ) pills.push({ label: `"${searchQ}"`, onRemove: () => setSearchQ('') });
    return pills;
  }, [flavorFilter, stockFilter, sortMode, priceMax, searchQ]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const clearAllFilters = useCallback(() => {
    setFlavorFilter('todos');
    setStockFilter('todos');
    setSortMode('default');
    setPriceMin(PRICE_ABS_MIN);
    setPriceMax(99999);
    setSearchQ('');
  }, []);

  const handlePriceChange = useCallback((min, max) => {
    if (min <= max) { setPriceMin(min); setPriceMax(max); }
  }, []);

  return (
    <>
      <Header
        cartCount={cartCount}
        catFilter={catFilter}
        onCatChange={cat => { setCatFilter(cat); }}
        onCartToggle={() => setCartOpen(o => !o)}
      />

      <Hero
        products={products}
        searchQ={searchQ}
        onSearch={setSearchQ}
      />

      {catFilter !== 'marcas' && (
        <Filters
          searchQ={searchQ}
          flavorFilter={flavorFilter}
          stockFilter={stockFilter}
          sortMode={sortMode}
          priceMin={priceMin}
          priceMax={priceMax}
          priceAbsMin={PRICE_ABS_MIN}
          priceAbsMax={PRICE_ABS_MAX}
          activePills={activePills}
          onSearch={setSearchQ}
          onFlavor={setFlavorFilter}
          onStock={setStockFilter}
          onSort={setSortMode}
          onPriceChange={handlePriceChange}
          onClearAll={clearAllFilters}
        />
      )}

      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'5rem 0' }}>
          <svg style={{ animation:'spin 0.8s linear infinite', opacity:0.3 }} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 1 0 0 20" strokeLinecap="round"/>
          </svg>
        </div>
      ) : (
        <Catalog
          products={filtered}
          catFilter={catFilter}
          brandsInfo={brandsInfo}
          onAddToCart={addToCart}
          onOpenModal={setModalProduct}
        />
      )}

      <Footer />

      {/* Floating WhatsApp */}
      <div id="wa-float">
        <a href="https://wa.me/5511939215700" target="_blank" rel="noopener noreferrer" className="wa-float-btn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          <div className="wa-float-label">
            <span className="wa-float-title">WhatsApp</span>
            <span className="wa-float-sub">(11) 93921-5700</span>
          </div>
        </a>
      </div>

      <Cart
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onQtyChange={changeQty}
        onRemove={removeFromCart}
      />

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          brandsInfo={brandsInfo}
          onClose={() => setModalProduct(null)}
          onAddToCart={product => { addToCart(product); setModalProduct(null); }}
        />
      )}
    </>
  );
}
