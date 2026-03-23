'use client';

import { CAT_DATA, catLabels } from '@/lib/data';

function CubaFlag({ small = false }) {
  const w = small ? 42 : 72;
  const h = small ? 28 : 48;
  const sh = h / 5;
  const triW = h * 0.64;
  return (
    <div style={{ width: w, height: h, position: 'relative', borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
      {[['#002a8f','#002a8f','#fff','#002a8f','#002a8f']].flat().map((_, i) => {
        const colors = ['#002a8f','#fff','#002a8f','#fff','#002a8f'];
        return <div key={i} style={{ position:'absolute', top: sh * i, left: 0, right: 0, height: sh, background: colors[i] }} />;
      })}
      <div style={{ position:'absolute', top:0, left:0, borderStyle:'solid', borderColor:`transparent transparent transparent #d52b1e`, borderWidth:`${h/2}px 0 ${h/2}px ${triW}px` }} />
      <div style={{ position:'absolute', top:'50%', left: triW * 0.28, transform:'translateY(-50%)', color:'#fff', fontSize: small ? 9 : 14, fontWeight:700, lineHeight:1 }}>★</div>
    </div>
  );
}

export default function CategoryHero({ categoria, products, catData }) {
  const fallback = CAT_DATA[categoria] || {};
  const data = {
    eyebrow:  catData?.eyebrow      || fallback.eyebrow,
    title:    catData?.name         || fallback.title,
    desc:     catData?.description  || fallback.desc,
    country:  catData?.country      || fallback.country,
    flag:     fallback.flag,
  };
  const inStock = products.filter(p => p.stock !== 'out').length;
  const brandCount = new Set(products.map(p => p.brand)).size;

  return (
    <section className="cat-hero">
      <div className="cat-hero-inner">
        <div className="cat-hero-left">
          {data.flag === 'cuba' && <CubaFlag />}
          <div>
            <p className="cat-hero-eyebrow">{data.eyebrow || catLabels[categoria]}</p>
            <h1 className="cat-hero-title">{data.title || catLabels[categoria]}</h1>
            <p className="cat-hero-desc">{data.desc}</p>
          </div>
        </div>
        <div className="cat-hero-stats">
          <div className="cat-stat">
            <span className="cat-stat-n">{products.length}</span>
            <span className="cat-stat-l">Produtos</span>
          </div>
          <div className="cat-stat-sep" />
          <div className="cat-stat">
            <span className="cat-stat-n">{brandCount}</span>
            <span className="cat-stat-l">Marcas</span>
          </div>
          <div className="cat-stat-sep" />
          <div className="cat-stat">
            <span className="cat-stat-n">{inStock}</span>
            <span className="cat-stat-l">Em estoque</span>
          </div>
        </div>
      </div>
    </section>
  );
}
