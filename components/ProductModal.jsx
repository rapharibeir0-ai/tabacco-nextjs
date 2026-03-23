'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { intensityLevel, stockText, fmt, BRANDS } from '@/lib/data';

export default function ProductModal({ product, onClose, onAddToCart }) {
  // Fechar com ESC
  useEffect(() => {
    if (!product) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;
  const level = intensityLevel[product.flavor] ?? 1;
  const brandInfo = BRANDS[product.brand] || {};
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
            ? <Image src={product.img} alt={product.name} fill style={{ objectFit: 'contain', padding: '1rem' }} />
            : <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', gap:'.6rem', opacity:.22 }}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span style={{ fontFamily:'var(--sans)', fontSize:'.65rem', letterSpacing:'.1em', textTransform:'uppercase' }}>Sem imagem</span>
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
