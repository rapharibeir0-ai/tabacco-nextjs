'use client';

import { useState } from 'react';
import BrandHeader from './BrandHeader';
import ProductCard from './ProductCard';
import { catLabels, catOrigins, BRANDS, brandInitials } from '@/lib/data';

export default function Catalog({ products, catFilter, onAddToCart, onOpenModal }) {
  const [twoCol, setTwoCol] = useState(true);

  const layoutToolbar = (
    <div className="layout-toolbar">
      <span className="layout-toolbar-label">{twoCol ? '2 por linha' : '1 por linha'}</span>
      <div className="layout-toggle">
        <button
          className={`layout-btn${!twoCol ? ' active' : ''}`}
          title="1 por linha"
          onClick={() => setTwoCol(false)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="2" width="14" height="4" rx="1"/>
            <rect x="1" y="8" width="14" height="4" rx="1"/>
          </svg>
        </button>
        <button
          className={`layout-btn${twoCol ? ' active' : ''}`}
          title="2 por linha"
          onClick={() => setTwoCol(true)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="2" width="6" height="12" rx="1"/>
            <rect x="9" y="2" width="6" height="12" rx="1"/>
          </svg>
        </button>
      </div>
    </div>
  );

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
        {layoutToolbar}
        {brandNames.map(brand => (
          <div key={brand} className="brand-section">
            <BrandHeader brand={brand} count={brandMap[brand].length} />
            <div className={`brand-grid${twoCol ? ' two-col' : ''}`}>
              {brandMap[brand].map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onOpenModal={onOpenModal} compact={twoCol} />
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
      {layoutToolbar}
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
              const info = BRANDS[brand] || {};
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
                  <div className={`cards-grid${twoCol ? ' two-col' : ''}`}>
                    {items.map(p => (
                      <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onOpenModal={onOpenModal} compact={twoCol} />
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
