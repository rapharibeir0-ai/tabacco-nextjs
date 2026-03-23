'use client';

const IcoList = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="4" rx="1"/><rect x="1" y="8" width="14" height="4" rx="1"/></svg>
);
const IcoGrid = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="1" y="10" width="6" height="6" rx="1"/><rect x="9" y="10" width="6" height="6" rx="1"/></svg>
);

export default function Toolbar({ count, sortMode, onSort, compact, onCompact }) {
  return (
    <div className="cat-toolbar">
      <span className="cat-toolbar-count">
        <strong>{count}</strong> produto{count !== 1 ? 's' : ''}
      </span>
      <div className="cat-toolbar-right">
        <select
          className="cat-sort-select"
          value={sortMode}
          onChange={e => onSort(e.target.value)}
        >
          <option value="default">Ordenar: Relevância</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="az">A–Z</option>
        </select>
        <div className="cat-view-toggle">
          <button
            className={`cat-view-btn${!compact ? ' active' : ''}`}
            title="1 por linha"
            onClick={() => onCompact(false)}
          >
            <IcoList />
          </button>
          <button
            className={`cat-view-btn${compact ? ' active' : ''}`}
            title="2 por linha"
            onClick={() => onCompact(true)}
          >
            <IcoGrid />
          </button>
        </div>
      </div>
    </div>
  );
}
