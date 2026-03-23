'use client';

export default function QtyButton({ qty, onMinus, onPlus, disabled }) {
  return (
    <div className="ci-controls">
      <button className="ci-qty-btn" onClick={onMinus} disabled={disabled}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="ci-qty">{qty}</span>
      <button className="ci-qty-btn" onClick={onPlus} disabled={disabled}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
