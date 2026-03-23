'use client';

import { BRANDS, brandInitials } from '@/lib/data';

export default function BrandHeader({ brand, count }) {
  const info = BRANDS[brand] || { origin: '—', founded: '—', style: '—', bio: '' };
  return (
    <div className="brand-header">
      <div className="brand-monogram">{brandInitials(brand)}</div>
      <div>
        <div className="brand-name">{brand}</div>
        <div className="brand-meta">
          <span className="brand-meta-pill">{info.origin}</span>
          <span className="brand-meta-pill">Desde {info.founded}</span>
          <span className="brand-meta-pill">{info.style}</span>
        </div>
        {info.bio && <div className="brand-bio">{info.bio}</div>}
      </div>
      <div className="brand-stat">
        <span className="brand-stat-n">{count}</span>
        <span className="brand-stat-l">produto{count !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
