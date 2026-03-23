'use client';

import { useState, useEffect, useRef } from 'react';
import { BADGES, fillerInfo, fmt, stockText } from '@/lib/data';
import IntensityBar from './IntensityBar';

/* ── Discount calculator ─────────────────────────────────────── */
function getDiscount(variants, idx) {
  if (!variants || idx === 0) return null;
  const unitPrice = variants[0].price;
  const v = variants[idx];
  const m = v.label.match(/\((\d+)\)/);
  if (!m) return null;
  const qty = parseInt(m[1]);
  const expected = unitPrice * qty;
  if (v.price >= expected) return null;
  const pct = Math.round((1 - v.price / expected) * 100);
  return pct > 0 ? `-${pct}%` : null;
}

/* ── SVG icons ────────────────────────────────────────────────── */
const IcoRuler = ({ s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4z"/>
    <path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/>
  </svg>
);
const IcoClock = ({ s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IcoLeaf = ({ s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
  </svg>
);
const IcoWine = ({ s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8"/><path d="M12 11v11"/><path d="M5 3l1 9a6 6 0 0 0 12 0l1-9H5z"/>
  </svg>
);
const IcoTruck = ({ s = 11 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IcoPlus = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── Image placeholder ────────────────────────────────────────── */
function Placeholder() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', opacity:.12 }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    </div>
  );
}

/* ── Info rows with icons ─────────────────────────────────────── */
function InfoRows({ product, size = 'lg' }) {
  const [tipOpen, setTipOpen] = useState(false);
  const s = size === 'lg' ? 13 : 11;

  return (
    <div className="info-rows">
      <div className={`info-row ${size}`}>
        <IntensityBar flavor={product.flavor} size={size} />
      </div>
      {product.vitola && (
        <div className={`info-row ${size}`}>
          <IcoRuler s={s} />
          <span>{product.vitola}</span>
        </div>
      )}
      {product.smokeTime && (
        <div className={`info-row ${size}`}>
          <IcoClock s={s} />
          <span>{product.smokeTime} de degustação</span>
        </div>
      )}
      {product.filler && (
        <div className={`info-row ${size}`} style={{ position: 'relative' }}>
          <IcoLeaf s={s} />
          <span>{product.filler}</span>
          <button
            className={`tip-btn${tipOpen ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); setTipOpen(o => !o); }}
          >i</button>
          {tipOpen && (
            <div className="tooltip-box visible">
              {fillerInfo[product.filler] || product.filler}
            </div>
          )}
        </div>
      )}
      {product.pairing && product.pairing.length > 0 && (
        <div className={`info-row ${size}`}>
          <IcoWine s={s} />
          <span>{product.pairing.join(' · ')}</span>
        </div>
      )}
    </div>
  );
}

const IcoBell = ({ s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

/* ── Variant chips ────────────────────────────────────────────── */
function VariantChips({ variants, selectedIdx, onSelect, stock, nowrap = false }) {
  if (!variants || variants.length === 0) return null;
  const stockCls = stock === 'low-stock' ? 'low' : stock === 'out' ? 'out' : 'in';
  const stockLabel = stockText[stock] || '';

  // Sort: in-stock first, out-of-stock last (preserve relative order within each group)
  const sorted = [...variants.map((v, origIdx) => ({ v, origIdx }))].sort((a, b) => {
    const aOut = a.v.stock === 'out' ? 1 : 0;
    const bOut = b.v.stock === 'out' ? 1 : 0;
    return aOut - bOut;
  });

  return (
    <div className="var-section">
      <div className="var-label">Quantidade</div>
      <div className="chips-row" style={nowrap ? { flexWrap: 'nowrap' } : {}}>
        {sorted.map(({ v, origIdx }) => {
          const varOut = v.stock === 'out';
          const disc = getDiscount(variants, origIdx);
          const chipStockCls = varOut ? 'out' : stockCls;
          const chipStockLabel = varOut ? 'Esgotado' : stockLabel;
          return (
            <div
              key={origIdx}
              className={`chip${selectedIdx === origIdx ? ' active' : ''}${varOut ? ' var-out' : ''}`}
              onClick={e => { e.stopPropagation(); if (!varOut) onSelect(origIdx); }}
            >
              <div className="chip-top">
                <span className="chip-name">{v.label}</span>
                {disc && <span className="chip-disc">{disc}</span>}
              </div>
              <span className={`chip-price${varOut ? ' chip-price-out' : ''}`}>R$ {fmt(v.price)}</span>
              <span className={`chip-stock ${chipStockCls}`}>{chipStockLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function ProductCard({ product, onAddToCart, onOpenModal, compact = false }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [notified, setNotified] = useState(false);
  const [revealed, setReveal] = useState(false);
  const cardRef = useRef(null);
  const addedTimerRef = useRef(null);
  const notifiedTimerRef = useRef(null);

  const hasVariants = product.variants && product.variants.length > 0;
  const variant = hasVariants ? product.variants[selectedVariantIdx] : null;
  const displayPrice = variant ? variant.price : product.price;
  const displayUnit = variant ? variant.unit : product.unit;
  const isOut = product.stock === 'out';
  const isVariantOut = variant ? variant.stock === 'out' : false;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setReveal(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => { clearTimeout(addedTimerRef.current); clearTimeout(notifiedTimerRef.current); }, []);

  function handleAdd(e) {
    e.stopPropagation();
    if (isOut || isVariantOut) return;
    onAddToCart({ ...product, price: displayPrice, unit: displayUnit });
    setAdded(true);
    clearTimeout(addedTimerRef.current);
    addedTimerRef.current = setTimeout(() => setAdded(false), 1400);
  }

  function handleNotify(e) {
    e.stopPropagation();
    setNotified(true);
    clearTimeout(notifiedTimerRef.current);
    notifiedTimerRef.current = setTimeout(() => setNotified(false), 2500);
  }

  const badges = product.badges
    ? product.badges.map(key => {
        const b = BADGES[key];
        return b ? <span key={key} className={`badge ${b.cls}`}>{b.label}</span> : null;
      }).filter(Boolean)
    : [];

  const revCls = revealed ? ' revealed' : '';
  const outCls = isOut ? ' out-of-stock' : '';

  /* ── COMPACT card (2-col grid) ── */
  if (compact) {
    return (
      <div ref={cardRef} className={`card-compact${revCls}${outCls}`} onClick={() => onOpenModal(product)}>

        <div className="cc-top">
          <div className="cc-img">
            {badges.length > 0 && <div className="cc-badge">{badges}</div>}
            {product.img
              ? <img src={product.img} alt={product.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain' }} />
              : <Placeholder />
            }
          </div>

          <div className="cc-body">
            <span className="brand-label">{product.brand}</span>
            <span className="product-name md">{product.name}</span>
            <InfoRows product={product} size="sm" />
            <div className="ship sm" style={{ marginTop: '.35rem' }}>
              <IcoTruck s={9} /> Receba ainda hoje
            </div>
          </div>
        </div>

        {hasVariants && (
          <div className="cc-chips">
            <VariantChips
              variants={product.variants}
              selectedIdx={selectedVariantIdx}
              onSelect={setSelectedVariantIdx}
              stock={product.stock}
              nowrap
            />
          </div>
        )}

        <div className="cc-footer">
          <div style={{ flex: 1 }}>
            <div className="cc-price-val">R$ {fmt(displayPrice)}</div>
            <div className="cc-price-unit">{displayUnit}</div>
          </div>
          {isVariantOut
            ? <button className={`notify-btn${notified ? ' notified' : ''}`} onClick={handleNotify}>
                {notified ? <IcoCheck /> : <IcoBell s={11} />}
                {notified ? 'Avisaremos você!' : 'Avise-me quando chegar'}
              </button>
            : <button className={`add-btn inline${added ? ' added' : ''}`} onClick={handleAdd} disabled={isOut}>
                {added ? <IcoCheck /> : <IcoPlus />}
                {added ? 'Adicionado!' : 'Adicionar'}
              </button>
          }
        </div>

      </div>
    );
  }

  /* ── FULL card (1-col layout, 3-col grid) ── */
  return (
    <div ref={cardRef} className={`card-full${revCls}${outCls}`} onClick={() => onOpenModal(product)}>

      {/* Col 1: Image */}
      <div className="col-img">
        {badges.length > 0 && <div className="badge-wrap">{badges}</div>}
        {product.img
          ? <img src={product.img} alt={product.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain' }} />
          : <Placeholder />
        }
      </div>

      {/* Col 2: Info */}
      <div className="col-info">
        <span className="brand-label">{product.brand}</span>
        <span className="product-name lg">{product.name}</span>
        <InfoRows product={product} size="lg" />
        <div className="ship lg" style={{ marginTop: '.2rem' }}>
          <IcoTruck s={11} /> Receba ainda hoje
        </div>
      </div>

      {/* Col 3: Variants + Price + Button */}
      <div className="col-variants">
        {hasVariants && (
          <VariantChips
            variants={product.variants}
            selectedIdx={selectedVariantIdx}
            onSelect={setSelectedVariantIdx}
            stock={product.stock}
          />
        )}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '.75rem' }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:'.5rem', marginBottom:'.5rem' }}>
            <span className="sprice-val lg">R$ {fmt(displayPrice)}</span>
            <span className="sprice-unit">{displayUnit}</span>
          </div>
          <div className="ship lg">
            <IcoTruck s={11} /> Receba ainda hoje
          </div>
        </div>
        {isVariantOut
          ? <button className={`notify-btn${notified ? ' notified' : ''}`} onClick={handleNotify}>
              {notified ? <IcoCheck /> : <IcoBell s={13} />}
              {notified ? 'Avisaremos você!' : 'Avise-me quando chegar'}
            </button>
          : <button className={`add-btn full${added ? ' added' : ''}`} onClick={handleAdd} disabled={isOut}>
              {added ? <IcoCheck /> : <IcoPlus />}
              {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
            </button>
        }
      </div>

    </div>
  );
}
