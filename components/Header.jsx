'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/* ── Mega menu data ───────────────────────────────────────────── */
const MEGA_CATS = [
  { id: 'cubanos',   label: 'Cubanos',       flag: '🇨🇺' },
  { id: 'outros',    label: 'Outros Países', flag: '🌎' },
  { id: 'nacionais', label: 'Nacionais',     flag: '🇧🇷' },
];

const MEGA_BRANDS = {
  cubanos: [
    { initials:'CO', name:'Cohiba',          style:'Médio' },
    { initials:'MC', name:'Montecristo',      style:'Médio' },
    { initials:'PA', name:'Partagás',         style:'Forte' },
    { initials:'BO', name:'Bolívar',          style:'Forte' },
    { initials:'HU', name:'H. Upmann',        style:'Médio' },
    { initials:'RY', name:'Romeo y Julieta',  style:'Suave a Médio' },
  ],
  outros: [
    { initials:'AF', name:'Arturo Fuente', style:'Médio a Forte' },
    { initials:'DV', name:'Davidoff',      style:'Suave a Médio' },
    { initials:'MF', name:'My Father',     style:'Médio a Forte' },
    { initials:'RP', name:'Rocky Patel',   style:'Médio' },
    { initials:'OL', name:'Oliva',         style:'Médio a Forte' },
  ],
  nacionais: [
    { initials:'DN', name:'Dannemann',       style:'Suave' },
    { initials:'DF', name:'Dona Flor',       style:'Suave a Médio' },
    { initials:'DM', name:'Damatta',         style:'Médio' },
    { initials:'AM', name:'Alonso Menendez', style:'Forte' },
  ],
};

/* ── Mobile drawer country cards ─────────────────────────────── */
const MOB_CATS = [
  { id: 'cubanos',   flag: '🇨🇺', label: 'Cubanos',       bg: 'linear-gradient(140deg,#c4883a 0%,#a06028 100%)' },
  { id: 'outros',    flag: '🌎',  label: 'Outros Países', bg: 'linear-gradient(140deg,#5a7a9a 0%,#3d5e7a 100%)' },
  { id: 'nacionais', flag: '🇧🇷', label: 'Nacionais',     bg: 'linear-gradient(140deg,#4e7a52 0%,#365438 100%)' },
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
const IcoBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IcoFileText = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IcoWa = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

/* ── Chip component ──────────────────────────────────────────── */
function FilterChips({ label, chips }) {
  const [active, setActive] = useState(null);
  return (
    <div className="nb-filter-row">
      <span className="nb-filter-label">{label}</span>
      {chips.map(c => (
        <button
          key={c}
          className={`nb-chip${active === c ? ' active' : ''}`}
          onClick={() => setActive(active === c ? null : c)}
        >{c}</button>
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function Header({ cartCount, catFilter, onCatChange, onCartToggle, solid }) {
  const router = useRouter();
  const [scrolled,      setScrolled]      = useState(false);
  const [openMenu,      setOpenMenu]      = useState(null);
  const [megaCat,       setMegaCat]       = useState('cubanos');
  const [locOpen,       setLocOpen]       = useState(false);
  const [location,      setLocation]      = useState(null);
  const [cep,           setCep]           = useState('');
  const [gpsLoading,    setGpsLoading]    = useState(false);
  const [mobOpen,       setMobOpen]       = useState(false);
  const [mobSub,        setMobSub]        = useState(null);

  const navRef = useRef(null);
  const locRef = useRef(null);

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close desktop menus on click outside */
  useEffect(() => {
    function handler(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setLocOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ESC closes everything */
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setLocOpen(false);
        setMobOpen(false);
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  /* body scroll lock when mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobOpen]);

  function toggleMenu(id) {
    setOpenMenu(prev => prev === id ? null : id);
    setLocOpen(false);
  }

  function handleCatClick(catId) {
    setOpenMenu(null);
    if (catId === 'todos') {
      router.push('/');
    } else {
      router.push(`/catalogo/${catId}`);
    }
  }

  function handleMobCatClick(catId) {
    setMobOpen(false);
    if (catId === 'todos') {
      router.push('/');
    } else {
      router.push(`/catalogo/${catId}`);
    }
  }

  function toggleMobSub(key) {
    setMobSub(prev => prev === key ? null : key);
  }

  /* CEP mask */
  function maskCep(val) {
    const d = val.replace(/\D/g, '').slice(0, 8);
    return d.length > 5 ? d.slice(0,5) + '-' + d.slice(5) : d;
  }

  function submitCep() {
    const digits = cep.replace(/\D/g, '');
    if (digits.length < 8) return;
    const city = digits.startsWith('0') ? 'São Paulo, SP'
               : digits.startsWith('2') ? 'Rio de Janeiro, RJ'
               : 'Sua cidade';
    const ship = digits.startsWith('0') ? '🚚 Receba ainda hoje' : '📦 2–3 dias úteis';
    setLocation({ city, ship });
    setLocOpen(false);
  }

  function submitGps() {
    setGpsLoading(true);
    setTimeout(() => {
      setLocation({ city: 'São Paulo, SP', ship: '🚚 Receba ainda hoje' });
      setGpsLoading(false);
      setLocOpen(false);
    }, 1200);
  }

  const brands = MEGA_BRANDS[megaCat] || [];

  return (
    <>
      {/* ── Desktop backdrop ── */}
      {(openMenu || locOpen) && (
        <div className="nb-backdrop" onClick={() => { setOpenMenu(null); setLocOpen(false); }} />
      )}

      {/* ── Mobile backdrop ── */}
      <div className={`nb-mob-backdrop${mobOpen ? ' open' : ''}`} onClick={() => setMobOpen(false)} />

      {/* ── Mobile drawer ── */}
      <div className={`nb-mob-drawer${mobOpen ? ' open' : ''}`}>

        <div className="nb-mob-dheader">
          <span className="nb-mob-dlogo">Tabacco</span>
          <button className="nb-mob-dclose" onClick={() => setMobOpen(false)}>
            <IcoClose />
          </button>
        </div>

        <div className="nb-mob-dbody">

          {/* Location */}
          <div className="nb-mob-dloc">
            <div className="nb-mob-dloc-ico"><IcoPin /></div>
            <div className="nb-mob-dloc-text">
              <div className="nb-mob-dloc-label">Entrega em</div>
              <div className="nb-mob-dloc-val">{location ? location.city : 'Informe seu CEP'}</div>
            </div>
            <div className="nb-mob-dloc-caret"><IcoChevronRight /></div>
          </div>

          {/* Charutos — card grid */}
          <div className="nb-mob-sec-header">
            <span className="nb-mob-sec-label">Charutos por país</span>
            <button className="nb-mob-see-all" onClick={() => handleMobCatClick('todos')}>
              Ver todos →
            </button>
          </div>

          <div className="nb-mob-cat-grid">
            {MOB_CATS.map(c => (
              <button key={c.id} className="nb-mob-cat-card" onClick={() => handleMobCatClick(c.id)}>
                <div className="nb-mob-cat-img" style={{ background: c.bg }}>{c.flag}</div>
                <span className="nb-mob-cat-label">{c.label}</span>
              </button>
            ))}
          </div>

          <div className="nb-mob-divider" />

          {/* Acessórios */}
          <button className="nb-mob-nav-item" onClick={() => toggleMobSub('acessorios')}>
            <div className="nb-mob-nav-left">
              <div className="nb-mob-nav-ico">✂️</div>
              Acessórios
            </div>
            <div className={`nb-mob-nav-caret${mobSub === 'acessorios' ? ' open' : ''}`}>
              <IcoChevronRight />
            </div>
          </button>
          <div className={`nb-mob-submenu${mobSub === 'acessorios' ? ' open' : ''}`}>
            <button className="nb-mob-sub-item">Cortadores</button>
            <button className="nb-mob-sub-item">Isqueiros</button>
            <button className="nb-mob-sub-item">Umidores</button>
          </div>

          {/* Kits */}
          <button className="nb-mob-nav-item" onClick={() => toggleMobSub('kits')}>
            <div className="nb-mob-nav-left">
              <div className="nb-mob-nav-ico">🎁</div>
              Kits & Presentes
            </div>
            <div className={`nb-mob-nav-caret${mobSub === 'kits' ? ' open' : ''}`}>
              <IcoChevronRight />
            </div>
          </button>
          <div className={`nb-mob-submenu${mobSub === 'kits' ? ' open' : ''}`}>
            <button className="nb-mob-sub-item">Kits para Presente</button>
            <button className="nb-mob-sub-item">Vale-Presentes</button>
          </div>

          <div className="nb-mob-divider" />

          <button className="nb-mob-link"><IcoBook /> Guia do Charuto</button>
          <button className="nb-mob-link"><IcoFileText /> Meus Pedidos</button>

        </div>

        <div className="nb-mob-footer">
          <button className="nb-mob-wa-btn">
            <IcoWa /> Falar no WhatsApp
          </button>
          <div className="nb-mob-legal">Proibida a venda para menores de 18 anos · O tabaco é prejudicial à saúde</div>
        </div>

      </div>

      {/* ── Navbar ── */}
      <header className={`nb-navbar${(scrolled || solid) ? ' scrolled' : ''}`} ref={navRef}>

        {/* ── Left group: hamburger + logo + loc ── */}
        <div className="nb-left-group">
          {/* Hamburger — visible only on mobile */}
          <button className="nb-ham-btn" onClick={() => setMobOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <a className="nb-logo" href="/" onClick={e => { e.preventDefault(); router.push('/'); }}>
            Tabacco
          </a>

          {/* Desktop location */}
          <div className="nb-loc-wrap" ref={locRef}>
            <button
              className={`nb-loc-btn${location ? ' set' : ''}`}
              onClick={() => { setLocOpen(o => !o); setOpenMenu(null); }}
            >
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
                    <button className="nb-loc-change" onClick={() => { setLocation(null); setCep(''); }}>
                      Alterar localização
                    </button>
                  </>
                ) : (
                  <>
                    <div className="nb-loc-title">Onde você está?</div>
                    <div className="nb-loc-sub">Informe seu CEP ou ative a localização para ver o prazo de entrega exato.</div>
                    <div className="nb-cep-row">
                      <input
                        className="nb-cep-input"
                        placeholder="00000-000"
                        value={cep}
                        onChange={e => setCep(maskCep(e.target.value))}
                        onKeyDown={e => e.key === 'Enter' && submitCep()}
                        autoFocus
                      />
                      <button className="nb-cep-btn" onClick={submitCep}>OK</button>
                    </div>
                    <div className="nb-loc-divider">
                      <span className="nb-loc-divider-line" />
                      <span className="nb-loc-divider-text">ou</span>
                      <span className="nb-loc-divider-line" />
                    </div>
                    <button className="nb-gps-btn" onClick={submitGps} disabled={gpsLoading}>
                      <IcoGps />
                      {gpsLoading ? 'Detectando…' : 'Usar minha localização'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile CEP pill — visible only on mobile, opens drawer */}
        <button className="nb-mob-cep" onClick={() => setMobOpen(true)}>
          <IcoPin />
          <div className="nb-mob-cep-text">
            <span className="nb-mob-cep-label">Entrega</span>
            <span className="nb-mob-cep-val">{location ? location.city : 'Informe o CEP'}</span>
          </div>
        </button>

        {/* ── Desktop nav items ── */}
        <ul className="nb-nav">

          <li className={`nb-item${openMenu === 'charutos' ? ' open' : ''}`}>
            <button className="nb-link" onClick={() => toggleMenu('charutos')}>
              Charutos <IcoCaret />
            </button>

            {openMenu === 'charutos' && (
              <div className="nb-mega">
                <div className="nb-mega-tabs">
                  {MEGA_CATS.map(c => (
                    <button
                      key={c.id}
                      className={`nb-cat-tab${megaCat === c.id ? ' active' : ''}`}
                      onClick={() => setMegaCat(c.id)}
                    >
                      <span>{c.flag}</span> {c.label}
                    </button>
                  ))}
                  <div style={{ flex: 1 }} />
                  <button className="nb-see-all" onClick={() => handleCatClick('todos')}>
                    Ver catálogo completo
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>

                <div className="nb-brands-grid">
                  {brands.map(b => (
                    <button key={b.name} className="nb-brand-item" onClick={() => handleCatClick(megaCat)}>
                      <div className="nb-brand-avatar">{b.initials}</div>
                      <div className="nb-brand-info">
                        <div className="nb-brand-name">{b.name}</div>
                        <div className="nb-brand-style">{b.style}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="nb-filters-area">
                  <FilterChips label="Intensidade" chips={['Suave', 'Médio', 'Forte']} />
                  <FilterChips label="Experiência" chips={['Iniciante', 'Apreciador', 'Aficionado']} />
                </div>
              </div>
            )}
          </li>

          <li className={`nb-item${openMenu === 'acessorios' ? ' open' : ''}`}>
            <button className="nb-link" onClick={() => toggleMenu('acessorios')}>
              Acessórios <IcoCaret />
            </button>
            {openMenu === 'acessorios' && (
              <div className="nb-dropdown">
                {['Cortadores', 'Isqueiros', 'Umidores'].map(item => (
                  <button key={item} className="nb-dd-item">{item}</button>
                ))}
                <div className="nb-dd-gap" />
                <button className="nb-dd-item emphasis">Ver todos →</button>
              </div>
            )}
          </li>

          <li className={`nb-item${openMenu === 'kits' ? ' open' : ''}`}>
            <button className="nb-link" onClick={() => toggleMenu('kits')}>
              Kits & Presentes <IcoCaret />
            </button>
            {openMenu === 'kits' && (
              <div className="nb-dropdown">
                {['Kits para Presente', 'Vale-Presentes'].map(item => (
                  <button key={item} className="nb-dd-item">{item}</button>
                ))}
              </div>
            )}
          </li>

          <li className="nb-item">
            <button className="nb-link">Guia do Charuto</button>
          </li>
        </ul>

        {/* ── Right actions ── */}
        <div className="nb-actions">
          <button className="nb-orders-btn">
            <IcoOrders /> Meus Pedidos
          </button>
          <button className="nb-cart-btn" onClick={onCartToggle} title="Carrinho">
            <IcoCart />
            {cartCount > 0 && <span className="nb-cart-count">{cartCount}</span>}
          </button>
        </div>

      </header>
    </>
  );
}
