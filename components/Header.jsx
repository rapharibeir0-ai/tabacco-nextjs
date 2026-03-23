'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategoryTree, fetchNavPages } from '@/lib/sanity';

// Fallback enquanto o Sanity não tem categorias cadastradas
const FALLBACK_CATS = [
  { _id: 'f1', value: 'cubanos',   name: 'Cubanos',       flag: '🇨🇺', megaMenu: false, children: [] },
  { _id: 'f2', value: 'outros',    name: 'Outros Países', flag: '🌎',  megaMenu: false, children: [] },
  { _id: 'f3', value: 'nacionais', name: 'Nacionais',     flag: '🇧🇷', megaMenu: false, children: [] },
];

/* ── SVG icons ───────────────────────────────────────────────── */
const IcoPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcoCaret = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IcoOrders = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IcoCart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IcoGps = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="9"/>
  </svg>
);
const IcoChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IcoClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcoWa = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

function brandInitials(name) {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── Main component ──────────────────────────────────────────── */
export default function Header({ cartCount, catFilter, onCatChange, onCartToggle, solid }) {
  const router = useRouter();
  const [scrolled,    setScrolled]    = useState(false);
  const [openMenu,    setOpenMenu]    = useState(null);
  const [megaCat,     setMegaCat]     = useState(null);
  const [locOpen,     setLocOpen]     = useState(false);
  const [location,    setLocation]    = useState(null);
  const [cep,         setCep]         = useState('');
  const [gpsLoading,  setGpsLoading]  = useState(false);
  const [mobOpen,     setMobOpen]     = useState(false);
  const [mobSub,      setMobSub]      = useState(null);
  const [categories,  setCategories]  = useState([]);
  const [navPages,    setNavPages]    = useState([]);

  const navRef = useRef(null);

  // Carrega navegação do Sanity
  useEffect(() => {
    Promise.all([fetchCategoryTree(), fetchNavPages()]).then(([cats, pages]) => {
      const tree = cats?.length > 0 ? cats : FALLBACK_CATS;
      setCategories(tree);
      setMegaCat(tree[0]?.value || null);
      setNavPages(pages || []);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handler(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null); setLocOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') { setOpenMenu(null); setLocOpen(false); setMobOpen(false); }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobOpen]);

  function toggleMenu(id) { setOpenMenu(prev => prev === id ? null : id); setLocOpen(false); }

  function navigate(path) { setOpenMenu(null); setMobOpen(false); router.push(path); }

  function handleCatClick(cat) {
    navigate(cat.children?.length > 0 ? `/catalogo/${cat.value}` : `/catalogo/${cat.value}`);
  }

  function maskCep(val) {
    const d = val.replace(/\D/g, '').slice(0, 8);
    return d.length > 5 ? d.slice(0,5) + '-' + d.slice(5) : d;
  }
  function submitCep() {
    const digits = cep.replace(/\D/g, '');
    if (digits.length < 8) return;
    const city = digits.startsWith('0') ? 'São Paulo, SP' : digits.startsWith('2') ? 'Rio de Janeiro, RJ' : 'Sua cidade';
    const ship = digits.startsWith('0') ? '🚚 Receba ainda hoje' : '📦 2–3 dias úteis';
    setLocation({ city, ship }); setLocOpen(false);
  }
  function submitGps() {
    setGpsLoading(true);
    setTimeout(() => { setLocation({ city: 'São Paulo, SP', ship: '🚚 Receba ainda hoje' }); setGpsLoading(false); setLocOpen(false); }, 1200);
  }

  // Categoria mega menu ativa
  const megaCatData = categories.find(c => c.value === megaCat);
  const megaChildren = megaCatData?.children || [];

  // Categorias que abrem mega menu vs dropdown
  const megaCats = categories.filter(c => c.megaMenu || c.children?.length > 0);
  const simpleCats = categories.filter(c => !c.megaMenu && (!c.children || c.children.length === 0));

  return (
    <>
      {(openMenu || locOpen) && (
        <div className="nb-backdrop" onClick={() => { setOpenMenu(null); setLocOpen(false); }} />
      )}
      <div className={`nb-mob-backdrop${mobOpen ? ' open' : ''}`} onClick={() => setMobOpen(false)} />

      {/* ── Mobile drawer ── */}
      <div className={`nb-mob-drawer${mobOpen ? ' open' : ''}`}>
        <div className="nb-mob-dheader">
          <span className="nb-mob-dlogo">Tabacco</span>
          <button className="nb-mob-dclose" onClick={() => setMobOpen(false)}><IcoClose /></button>
        </div>

        <div className="nb-mob-dbody">
          <div className="nb-mob-dloc">
            <div className="nb-mob-dloc-ico"><IcoPin /></div>
            <div className="nb-mob-dloc-text">
              <div className="nb-mob-dloc-label">Entrega em</div>
              <div className="nb-mob-dloc-val">{location ? location.city : 'Informe seu CEP'}</div>
            </div>
            <div className="nb-mob-dloc-caret"><IcoChevronRight /></div>
          </div>

          {/* Categorias com filhos — card grid */}
          {megaCats.map(cat => (
            <div key={cat._id}>
              <div className="nb-mob-sec-header">
                <span className="nb-mob-sec-label">{cat.name}</span>
                <button className="nb-mob-see-all" onClick={() => navigate(`/catalogo/${cat.value}`)}>Ver todos →</button>
              </div>
              <div className="nb-mob-cat-grid">
                {(cat.children || []).map(child => (
                  <button key={child._id} className="nb-mob-cat-card" onClick={() => navigate(`/catalogo/${child.value}`)}>
                    <div className="nb-mob-cat-img" style={{ background: 'linear-gradient(140deg,#c4883a 0%,#a06028 100%)' }}>{child.flag || child.name[0]}</div>
                    <span className="nb-mob-cat-label">{child.name}</span>
                  </button>
                ))}
              </div>
              <div className="nb-mob-divider" />
            </div>
          ))}

          {/* Categorias simples */}
          {simpleCats.map(cat => (
            <button key={cat._id} className="nb-mob-nav-item" onClick={() => navigate(`/catalogo/${cat.value}`)}>
              <div className="nb-mob-nav-left">
                <div className="nb-mob-nav-ico">{cat.flag || '📦'}</div>
                {cat.name}
              </div>
            </button>
          ))}

          {/* Páginas no navbar */}
          {navPages.map(p => (
            <button key={p._id} className="nb-mob-nav-item" onClick={() => navigate(`/${p.slug}`)}>
              <div className="nb-mob-nav-left">{p.title}</div>
            </button>
          ))}
        </div>

        <div className="nb-mob-footer">
          <button className="nb-mob-wa-btn"><IcoWa /> Falar no WhatsApp</button>
          <div className="nb-mob-legal">Proibida a venda para menores de 18 anos · O tabaco é prejudicial à saúde</div>
        </div>
      </div>

      {/* ── Navbar ── */}
      <header className={`nb-navbar${(scrolled || solid) ? ' scrolled' : ''}`} ref={navRef}>

        <div className="nb-left-group">
          <button className="nb-ham-btn" onClick={() => setMobOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <a className="nb-logo" href="/" onClick={e => { e.preventDefault(); navigate('/'); }}>Tabacco</a>

          {/* Location */}
          <div className="nb-loc-wrap">
            <button className={`nb-loc-btn${location ? ' set' : ''}`} onClick={() => { setLocOpen(o => !o); setOpenMenu(null); }}>
              <IcoPin />
              <span>{location ? location.city : 'Informe seu CEP'}</span>
              {!location && <span className="nb-loc-plus">+</span>}
            </button>
            {locOpen && (
              <div className="nb-loc-dropdown">
                {location ? (
                  <>
                    <div className="nb-loc-set-card">
                      <div className="nb-loc-city">{location.city}</div>
                      <div className="nb-loc-ship">{location.ship}</div>
                    </div>
                    <button className="nb-loc-change" onClick={() => { setLocation(null); setCep(''); }}>Alterar localização</button>
                  </>
                ) : (
                  <>
                    <div className="nb-loc-title">Onde você está?</div>
                    <div className="nb-loc-sub">Informe seu CEP para ver o prazo de entrega exato.</div>
                    <div className="nb-cep-row">
                      <input className="nb-cep-input" placeholder="00000-000" value={cep} onChange={e => setCep(maskCep(e.target.value))} onKeyDown={e => e.key === 'Enter' && submitCep()} autoFocus />
                      <button className="nb-cep-btn" onClick={submitCep}>OK</button>
                    </div>
                    <div className="nb-loc-divider">
                      <span className="nb-loc-divider-line" /><span className="nb-loc-divider-text">ou</span><span className="nb-loc-divider-line" />
                    </div>
                    <button className="nb-gps-btn" onClick={submitGps} disabled={gpsLoading}>
                      <IcoGps />{gpsLoading ? 'Detectando…' : 'Usar minha localização'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button className="nb-mob-cep" onClick={() => setMobOpen(true)}>
          <IcoPin />
          <div className="nb-mob-cep-text">
            <span className="nb-mob-cep-label">Entrega</span>
            <span className="nb-mob-cep-val">{location ? location.city : 'Informe o CEP'}</span>
          </div>
        </button>

        {/* ── Desktop nav ── */}
        <ul className="nb-nav">

          {/* Categorias com mega menu */}
          {megaCats.map(cat => (
            <li key={cat._id} className={`nb-item${openMenu === cat._id ? ' open' : ''}`}>
              <button className="nb-link" onClick={() => toggleMenu(cat._id)}>
                {cat.name} <IcoCaret />
              </button>
              {openMenu === cat._id && (
                <div className="nb-mega">
                  <div className="nb-mega-tabs">
                    {(cat.children || []).map(child => (
                      <button
                        key={child._id}
                        className={`nb-cat-tab${megaCat === child.value ? ' active' : ''}`}
                        onClick={() => setMegaCat(child.value)}
                      >
                        {child.flag && <span>{child.flag}</span>} {child.name}
                      </button>
                    ))}
                    <div style={{ flex: 1 }} />
                    <button className="nb-see-all" onClick={() => navigate(`/catalogo/${cat.value}`)}>
                      Ver catálogo completo
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>

                  {/* Nível 3: filhos da subcategoria ativa */}
                  {megaChildren.length > 0 && (() => {
                    const activeSub = (cat.children || []).find(c => c.value === megaCat);
                    const level3 = activeSub?.children || [];
                    if (level3.length === 0) return null;
                    return (
                      <div className="nb-brands-grid">
                        {level3.map(item => (
                          <button key={item._id} className="nb-brand-item" onClick={() => navigate(`/catalogo/${item.value}`)}>
                            <div className="nb-brand-avatar">{brandInitials(item.name)}</div>
                            <div className="nb-brand-info">
                              <div className="nb-brand-name">{item.name}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </li>
          ))}

          {/* Categorias simples (sem filhos) */}
          {simpleCats.map(cat => (
            <li key={cat._id} className="nb-item">
              <button className="nb-link" onClick={() => navigate(`/catalogo/${cat.value}`)}>
                {cat.name}
              </button>
            </li>
          ))}

          {/* Páginas do navbar */}
          {navPages.map(p => (
            <li key={p._id} className="nb-item">
              <button className="nb-link" onClick={() => navigate(`/${p.slug}`)}>
                {p.title}
              </button>
            </li>
          ))}

        </ul>

        <div className="nb-actions">
          <button className="nb-orders-btn"><IcoOrders /> Meus Pedidos</button>
          <button className="nb-cart-btn" onClick={onCartToggle} title="Carrinho">
            <IcoCart />
            {cartCount > 0 && <span className="nb-cart-count">{cartCount}</span>}
          </button>
        </div>

      </header>
    </>
  );
}
