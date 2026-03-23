'use client';

import { useState, useMemo, useCallback, useEffect, use } from 'react';
import Link from 'next/link';
import { catLabels, brandInitials, fmt } from '@/lib/data';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import CategoryHero from '@/components/CategoryHero';
import BrandStrip from '@/components/BrandStrip';
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';
import Pagination, { PER_PAGE } from '@/components/Pagination';
import Editorial from '@/components/Editorial';

const IcoX = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

export default function CategoriaPage({ params }) {
  const { categoria } = use(params);

  // ── Estado ──
  const [allProducts,  setAllProducts]  = useState([]);
  const [brandsInfo,   setBrandsInfo]   = useState({});
  const [loading,      setLoading]      = useState(true);
  const [activeBrand,  setActiveBrand]  = useState(null);
  const [flavorFilter, setFlavorFilter] = useState('todos');
  const [stockOnly,    setStockOnly]    = useState(false);
  const [priceMax,     setPriceMax]     = useState(99999);
  const [sortMode,     setSortMode]     = useState('default');
  const [compact,      setCompact]      = useState(true);
  const [page,         setPage]         = useState(1);
  const [cart,         setCart]         = useState([]);
  const [cartOpen,     setCartOpen]     = useState(false);
  const [cartId,       setCartId]       = useState(null);

  // Busca produtos desta categoria do Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [{ data: prods }, { data: brandsData }] = await Promise.all([
        supabase.from('products').select('*, variants(*)').eq('category', categoria).order('id'),
        supabase.from('brands').select('*'),
      ]);
      setAllProducts((prods || []).map(p => ({ ...p, smokeTime: p.smoke_time })));
      const map = {};
      (brandsData || []).forEach(b => { map[b.name] = b; });
      setBrandsInfo(map);
      setLoading(false);
    }
    fetchData();
  }, [categoria]);

  // Carrinho persistido no Supabase
  useEffect(() => {
    async function loadCart() {
      let id = sessionStorage.getItem('tabacco-cart-id');
      if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem('tabacco-cart-id', id);
      }
      setCartId(id);
      const { data } = await supabase
        .from('orders')
        .select('items')
        .eq('cart_id', id)
        .eq('status', 'draft')
        .maybeSingle();
      if (data?.items?.length > 0) setCart(data.items);
    }
    loadCart();
  }, []);

  // Sincroniza carrinho com o Supabase ao alterar
  useEffect(() => {
    if (!cartId) return;
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    supabase.from('orders')
      .upsert({ cart_id: cartId, items: cart, status: 'draft', total }, { onConflict: 'cart_id' })
      .then(({ error }) => { if (error) console.error('Erro ao salvar carrinho:', error); });
  }, [cart, cartId]);

  // Reset página ao mudar filtros
  useEffect(() => { setPage(1); }, [activeBrand, flavorFilter, stockOnly, priceMax, sortMode]);

  // ── Produtos filtrados ──
  const filtered = useMemo(() => {
    let list = allProducts.filter(p => {
      if (activeBrand && p.brand !== activeBrand) return false;
      if (flavorFilter !== 'todos' && p.flavor !== flavorFilter) return false;
      if (stockOnly && p.stock === 'out') return false;
      if (priceMax < 99999 && p.price > priceMax) return false;
      return true;
    });
    switch (sortMode) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'az':         return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:           return list;
    }
  }, [allProducts, activeBrand, flavorFilter, stockOnly, priceMax, sortMode]);

  // ── Paginação ──
  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  // ── Marcas disponíveis ──
  const brands = useMemo(() => {
    const map = {};
    allProducts.forEach(p => { map[p.brand] = (map[p.brand] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0])).map(([name, count]) => ({ name, count }));
  }, [allProducts]);

  // ── Agrupado por marca ──
  const brandGroups = useMemo(() => {
    const map = {};
    paginated.forEach(p => {
      if (!map[p.brand]) map[p.brand] = [];
      map[p.brand].push(p);
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [paginated]);

  // ── Carrinho ──
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
  const removeFromCart = useCallback(id => setCart(prev => prev.filter(i => i.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Pills ativas ──
  const pills = useMemo(() => {
    const p = [];
    if (activeBrand)              p.push({ label: activeBrand,              onRemove: () => setActiveBrand(null) });
    if (flavorFilter !== 'todos') p.push({ label: flavorFilter,             onRemove: () => setFlavorFilter('todos') });
    if (stockOnly)                p.push({ label: 'Em estoque',             onRemove: () => setStockOnly(false) });
    if (priceMax < 99999)         p.push({ label: `até R$ ${fmt(priceMax)}`, onRemove: () => setPriceMax(99999) });
    return p;
  }, [activeBrand, flavorFilter, stockOnly, priceMax]);

  return (
    <>
      <Header
        cartCount={cartCount}
        catFilter={categoria}
        onCatChange={() => {}}
        onCartToggle={() => setCartOpen(o => !o)}
        solid
      />

      {/* Breadcrumb */}
      <nav className="cat-breadcrumb">
        <Link href="/" className="cat-bc-link">Catálogo</Link>
        <span className="cat-bc-sep">›</span>
        <span className="cat-bc-current">{catLabels[categoria] || categoria}</span>
      </nav>

      {/* Hero */}
      <CategoryHero categoria={categoria} products={allProducts} />

      {/* Brand Strip */}
      <BrandStrip
        brands={brands}
        activeBrand={activeBrand}
        onSelect={setActiveBrand}
        allCount={allProducts.length}
      />

      {/* Main layout */}
      <div className="cat-main-layout">

        <Sidebar
          brands={brands}
          activeBrand={activeBrand}
          onBrand={setActiveBrand}
          flavorFilter={flavorFilter}
          onFlavor={setFlavorFilter}
          stockOnly={stockOnly}
          onStockOnly={setStockOnly}
          priceMax={priceMax}
          onPriceMax={setPriceMax}
          allCount={allProducts.length}
        />

        <div className="cat-main-content">

          <Toolbar
            count={filtered.length}
            sortMode={sortMode}
            onSort={setSortMode}
            compact={compact}
            onCompact={setCompact}
          />

          {/* Pills ativas */}
          {pills.length > 0 && (
            <div className="cat-active-pills">
              {pills.map((pill, i) => (
                <span key={i} className="cat-pill">
                  {pill.label}
                  <button onClick={pill.onRemove}><IcoX /></button>
                </span>
              ))}
              <button className="cat-pills-clear" onClick={() => { setActiveBrand(null); setFlavorFilter('todos'); setStockOnly(false); setPriceMax(99999); }}>
                Limpar filtros
              </button>
            </div>
          )}

          {/* Produtos agrupados por marca */}
          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', padding:'4rem 0' }}>
              <svg style={{ animation:'spin 0.8s linear infinite', opacity:0.3 }} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 0 20" strokeLinecap="round"/>
              </svg>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state"><p>Nenhum produto encontrado com estes filtros.</p></div>
          ) : (
            brandGroups.map(([brand, items]) => (
              <div key={brand} className="cat-brand-group">
                <div className="cat-brand-header">
                  <div className="cat-brand-monogram">{brandInitials(brand)}</div>
                  <div>
                    <div className="cat-brand-name">{brand}</div>
                    {brandsInfo[brand]?.bio && (
                      <div className="cat-brand-bio">{brandsInfo[brand].bio.split('.')[0]}.</div>
                    )}
                  </div>
                  <span className="cat-brand-count">{items.length} produto{items.length !== 1 ? 's' : ''}</span>
                </div>
                <div className={`cat-products-grid${compact ? ' two-col' : ''}`}>
                  {items.map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAddToCart={addToCart}
                      onOpenModal={() => {}}
                      compact={compact}
                    />
                  ))}
                </div>
              </div>
            ))
          )}

          <Pagination page={page} total={filtered.length} onChange={setPage} />

        </div>
      </div>

      {/* Editorial SEO/GEO */}
      <Editorial categoria={categoria} />

      <Footer />

      {/* WhatsApp float */}
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
        onClearCart={clearCart}
      />
    </>
  );
}
