'use client';

export const PER_PAGE = 20;

export default function Pagination({ page, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (pages <= 1) return null;
  const from = (page - 1) * PER_PAGE + 1;
  const to   = Math.min(page * PER_PAGE, total);
  return (
    <div className="cat-pagination-wrap">
      <span className="cat-pag-info">Exibindo <strong>{from}–{to}</strong> de <strong>{total}</strong></span>
      <div className="cat-pagination">
        <button className="cat-pag-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
          <button key={p} className={`cat-pag-btn${p === page ? ' active' : ''}`} onClick={() => onChange(p)}>{p}</button>
        ))}
        <button className="cat-pag-btn" disabled={page === pages} onClick={() => onChange(page + 1)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}
