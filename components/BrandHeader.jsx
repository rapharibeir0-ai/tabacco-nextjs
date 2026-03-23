'use client';

import { BRANDS, brandInitials } from '@/lib/data';
import { urlFor } from '@/lib/sanity';

function getLogoUrl(logo) {
  if (!logo?.asset) return null;
  try {
    return urlFor(logo).width(80).height(80).fit('crop').url();
  } catch {
    return logo.asset.url || null;
  }
}

export default function BrandHeader({ brand, count, sanityData }) {
  const info = BRANDS[brand] || { origin: '—', founded: '—', style: '—', bio: '' };
  const logoUrl = getLogoUrl(sanityData?.logo);
  const bio = sanityData?.bio || info.bio;
  const origin = sanityData?.origin || info.origin;
  const founded = sanityData?.foundedYear || info.founded;

  return (
    <div className="brand-header">
      {logoUrl
        ? <img
            src={logoUrl}
            alt={brand}
            style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 4, background: 'var(--surface)' }}
          />
        : <div className="brand-monogram">{brandInitials(brand)}</div>
      }
      <div>
        <div className="brand-name">{brand}</div>
        <div className="brand-meta">
          <span className="brand-meta-pill">{origin}</span>
          {founded && <span className="brand-meta-pill">Desde {founded}</span>}
          <span className="brand-meta-pill">{info.style}</span>
        </div>
        {bio && <div className="brand-bio">{bio}</div>}
      </div>
      <div className="brand-stat">
        <span className="brand-stat-n">{count}</span>
        <span className="brand-stat-l">produto{count !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
