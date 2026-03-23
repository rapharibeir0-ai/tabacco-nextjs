'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import QtyButton from './QtyButton';
import { fmt } from '@/lib/data';

const WA_NUMBER = '5511939215700';
const STORE_NAME = 'Charutos Premium';

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}
function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}
function PixIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  );
}

function maskCep(v) {
  return v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
}

/* ── Tela de sucesso pós-envio ── */
function SentScreen({ order, onClose }) {
  const [draw, setDraw] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDraw(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="cart-sent">
      <div className="cart-sent-icon">
        <svg viewBox="0 0 52 52" fill="none">
          <circle
            cx="26" cy="26" r="24"
            stroke="#2a9a4a" strokeWidth="2.5"
            strokeDasharray="150.8"
            strokeDashoffset={draw ? 0 : 150.8}
            style={{ transition: 'stroke-dashoffset .5s ease-out' }}
          />
          <polyline
            points="14,27 22,35 38,19"
            stroke="#2a9a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="36"
            strokeDashoffset={draw ? 0 : 36}
            style={{ transition: 'stroke-dashoffset .4s ease-out .35s' }}
          />
        </svg>
      </div>

      <div className="cart-sent-title">Pedido enviado!</div>
      <p className="cart-sent-sub">
        Abrimos o WhatsApp para você finalizar com nossa equipe.
      </p>

      <div className="cart-sent-summary">
        {order.items.map((item, i) => (
          <div key={i} className="cart-sent-row">
            <span>{item.brand} {item.name} × {item.qty}</span>
            <span>R$ {fmt(item.price * item.qty)}</span>
          </div>
        ))}
        {order.discount > 0 && (
          <div className="cart-sent-row discount">
            <span>Desconto ({order.payment})</span>
            <span>−R$ {fmt(order.discount)}</span>
          </div>
        )}
        <div className="cart-sent-row total">
          <span>Total</span>
          <span>R$ {fmt(order.total)}</span>
        </div>
        <div className="cart-sent-row meta">
          <span>Pagamento</span><span>{order.payment}</span>
        </div>
        {order.name && (
          <div className="cart-sent-row meta">
            <span>Para</span><span>{order.name}</span>
          </div>
        )}
      </div>

      <button className="cart-sent-btn" onClick={onClose}>
        Continuar comprando
      </button>
    </div>
  );
}

export default function Cart({ cart, isOpen, onClose, onQtyChange, onRemove, onClearCart }) {
  const [step, setStep]               = useState(1);
  const [name, setName]               = useState('');
  const [cep, setCep]                 = useState('');
  const [endereco, setEndereco]       = useState('');
  const [cidade, setCidade]           = useState('');
  const [complemento, setComplemento] = useState('');
  const [payment, setPayment]         = useState('');
  const [obs, setObs]                 = useState('');
  const [errors, setErrors]           = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [cepLoading, setCepLoading]   = useState(false);
  const [sent, setSent]               = useState(false);
  const [lastOrder, setLastOrder]     = useState(null);
  const complementoRef                = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setStep(1); setErrors({}); setShowConfirm(false);
      setSent(false); setLastOrder(null);
      setName(''); setCep(''); setEndereco(''); setCidade('');
      setComplemento(''); setPayment(''); setObs('');
    }
  }, [isOpen]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount   = (payment === 'Pix' || payment === 'Boleto') ? subtotal * 0.1 : 0;
  const total      = subtotal - discount;

  /* ── ViaCEP ── */
  async function fetchViaCep(digits) {
    setCepLoading(true);
    setEndereco(''); setCidade('');
    try {
      const res  = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        setErrors(p => ({ ...p, cep: 'CEP não encontrado' }));
      } else {
        const rua = [data.logradouro, data.bairro].filter(Boolean).join(', ');
        setEndereco(rua);
        setCidade(`${data.localidade} – ${data.uf}`);
        setErrors(p => ({ ...p, cep: '', endereco: '' }));
        setTimeout(() => complementoRef.current?.focus(), 50);
      }
    } catch {
      setErrors(p => ({ ...p, cep: 'Erro ao buscar CEP' }));
    } finally {
      setCepLoading(false);
    }
  }

  function handleCepChange(e) {
    const masked = maskCep(e.target.value);
    setCep(masked);
    setErrors(p => ({ ...p, cep: '' }));
    const digits = masked.replace(/\D/g, '');
    if (digits.length === 8) fetchViaCep(digits);
  }

  function handleNext() {
    if (step === 2) {
      const errs = {};
      if (!name.trim())                        errs.name     = 'Informe seu nome';
      if (cep.replace(/\D/g,'').length < 8)    errs.cep      = 'CEP inválido';
      if (!endereco.trim())                    errs.endereco = 'Informe o endereço';
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    if (step === 3) {
      if (!payment) { setErrors({ payment: 'Selecione uma forma de pagamento' }); return; }
      setShowConfirm(true);
      return;
    }
    setErrors({});
    setStep(s => s + 1);
  }
  function handlePrev() {
    if (step > 1) { setErrors({}); setStep(s => s - 1); }
  }

  function sendWhatsApp() {
    // Salva snapshot antes de limpar
    setLastOrder({ items: [...cart], subtotal, discount, total, payment, name, endereco, complemento });

    let msg = `Olá! Quero fazer um pedido na *${STORE_NAME}*.\n\n`;
    if (name)        msg += `*Nome:* ${name}\n`;
    if (cep)         msg += `*CEP:* ${cep}\n`;
    if (cidade)      msg += `*Cidade:* ${cidade}\n`;
    if (endereco)    msg += `*Endereço:* ${endereco}`;
    if (complemento) msg += `, ${complemento}`;
    if (endereco)    msg += `\n`;
    msg += `\n*Itens:*\n`;
    cart.forEach(item => {
      msg += `• ${item.brand} ${item.name} (${item.vitola}) × ${item.qty} = R$ ${fmt(item.price * item.qty)}\n`;
    });
    msg += `\n*Subtotal:* R$ ${fmt(subtotal)}`;
    if (discount > 0) msg += `\n*Desconto (10%):* −R$ ${fmt(discount)}`;
    msg += `\n*Total:* R$ ${fmt(total)}`;
    if (payment) msg += `\n*Pagamento:* ${payment}`;
    if (obs)     msg += `\n*Obs:* ${obs}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    onClearCart();
    setSent(true);
  }

  const stepLabel = step === 1 ? 'Carrinho' : step === 2 ? 'Entrega' : 'Pagamento';

  return (
    <>
      {/* Backdrop */}
      <div id="cart-backdrop" className={isOpen ? 'open' : ''} onClick={onClose} />

      {/* Drawer */}
      <div id="cart-drawer" className={isOpen ? 'open' : ''}>

        {/* Header */}
        <div className="cart-header">
          {step > 1 && !sent && (
            <button className="cart-back-btn" onClick={handlePrev}>
              <ChevronLeft />
            </button>
          )}
          <div style={{ flex:1 }}>
            <h3>
              <CartIcon />
              {sent ? 'Pedido enviado' : stepLabel}
            </h3>
            {cart.length > 0 && !sent && (
              <div className="cart-steps">
                {[1, 2, 3].map((s, idx) => (
                  <Fragment key={s}>
                    <div className={`cs-step${step === s ? ' active' : step > s ? ' done' : ''}`}>
                      <span className="cs-num">
                        {step > s
                          ? <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          : s}
                      </span>
                      <span className="cs-lbl">{['Itens','Entrega','Pgto'][idx]}</span>
                    </div>
                    {idx < 2 && <div className="cs-line" />}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
          <button className="cart-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* ── Tela de sucesso ── */}
        {sent && lastOrder && (
          <SentScreen order={lastOrder} onClose={onClose} />
        )}

        {/* ── Fluxo normal ── */}
        {!sent && (
          <>
            {/* Empty state */}
            {cart.length === 0 && (
              <div className="cart-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p>Seu carrinho está vazio.</p>
              </div>
            )}

            {/* Step 1: Itens */}
            {cart.length > 0 && step === 1 && (
              <div style={{ display:'flex', flex:1, overflowY:'auto', flexDirection:'column' }}>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <div className="ci-brand">{item.brand}</div>
                        <div className="ci-name">{item.name}</div>
                        <div className="ci-vitola">{item.vitola}</div>
                        <div className="ci-price-line">R$ {fmt(item.price)} / {item.unit}</div>
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'.35rem' }}>
                        <QtyButton
                          qty={item.qty}
                          onMinus={() => onQtyChange(item.id, -1)}
                          onPlus={() => onQtyChange(item.id, 1)}
                        />
                        <div className="ci-subtotal">R$ {fmt(item.price * item.qty)}</div>
                        <button className="ci-remove" onClick={() => onRemove(item.id)} aria-label="Remover">
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-step-summary">
                  <span className="cart-step-summary-label">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                  <span className="cart-step-summary-total">R$ {fmt(subtotal)}</span>
                </div>
              </div>
            )}

            {/* Step 2: Entrega */}
            {cart.length > 0 && step === 2 && (
              <div style={{ display:'flex', flex:1, overflowY:'auto', padding:'1.5rem', flexDirection:'column', gap:'1.25rem' }}>
                <div className="cart-field-group">
                  <label className="cart-field-label" htmlFor="cart-name">Seu nome</label>
                  <input
                    id="cart-name"
                    className={`cart-field-input${errors.name ? ' error' : ''}`}
                    type="text"
                    placeholder="Como quer ser chamado?"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                  />
                  {errors.name && <span className="cart-field-error">{errors.name}</span>}
                </div>

                <div className="cart-field-group">
                  <label className="cart-field-label" htmlFor="cart-cep">CEP</label>
                  <div className="cart-cep-wrap">
                    <input
                      id="cart-cep"
                      className={`cart-field-input${errors.cep ? ' error' : ''}`}
                      type="text"
                      inputMode="numeric"
                      placeholder="00000-000"
                      value={cep}
                      onChange={handleCepChange}
                    />
                    {cepLoading && (
                      <span className="cep-spinner" aria-label="Buscando CEP…">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 2a10 10 0 0 1 10 10"/>
                        </svg>
                      </span>
                    )}
                  </div>
                  {errors.cep && <span className="cart-field-error">{errors.cep}</span>}
                </div>

                <div className="cart-field-group">
                  <label className="cart-field-label" htmlFor="cart-endereco">Endereço</label>
                  <input
                    id="cart-endereco"
                    className={`cart-field-input${errors.endereco ? ' error' : ''}`}
                    type="text"
                    placeholder="Rua, número"
                    value={endereco}
                    onChange={e => { setEndereco(e.target.value); setErrors(p => ({ ...p, endereco: '' })); }}
                  />
                  {errors.endereco && <span className="cart-field-error">{errors.endereco}</span>}
                </div>

                {cidade && (
                  <div className="cart-field-group">
                    <label className="cart-field-label">Cidade</label>
                    <input className="cart-field-input" type="text" value={cidade} readOnly />
                  </div>
                )}

                <div className="cart-field-group">
                  <label className="cart-field-label" htmlFor="cart-complemento">
                    Complemento <span style={{ fontWeight:400, textTransform:'none', letterSpacing:0 }}>(opcional)</span>
                  </label>
                  <input
                    id="cart-complemento"
                    ref={complementoRef}
                    className="cart-field-input"
                    type="text"
                    placeholder="Número, apto, bloco…"
                    value={complemento}
                    onChange={e => setComplemento(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Pagamento */}
            {cart.length > 0 && step === 3 && (
              <div style={{ display:'flex', flex:1, overflowY:'auto', padding:'1.5rem', flexDirection:'column', gap:'1.25rem' }}>
                <div className="cart-field-group">
                  <label className="cart-field-label">Forma de pagamento</label>
                  <div className="payment-opts">
                    {[
                      { key:'Cartão', icon:<CardIcon /> },
                      { key:'Pix',    icon:<PixIcon /> },
                      { key:'Boleto', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="8" x2="6" y2="16"/><line x1="9" y1="8" x2="9" y2="16"/><line x1="13" y1="8" x2="13" y2="16"/><line x1="15" y1="8" x2="15" y2="16"/><line x1="18" y1="8" x2="18" y2="16"/></svg> },
                    ].map(p => (
                      <button
                        key={p.key}
                        className={`payment-opt${payment === p.key ? ' selected' : ''}`}
                        onClick={() => { setPayment(p.key); setErrors({}); }}
                      >
                        {p.icon} {p.key}
                      </button>
                    ))}
                  </div>
                  {errors.payment && <span className="cart-field-error">{errors.payment}</span>}
                  {(payment === 'Pix' || payment === 'Boleto') && (
                    <div style={{ fontSize:'.72rem', color:'#2a7a4a', marginTop:'.4rem', display:'flex', alignItems:'center', gap:'.3rem' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      10% de desconto aplicado!
                    </div>
                  )}
                </div>

                <div className="cart-field-group">
                  <label className="cart-field-label">Observações (opcional)</label>
                  <textarea
                    className="cart-field-input"
                    placeholder="Ex: entregar no período da tarde…"
                    style={{ resize:'none', height:'72px' }}
                    value={obs}
                    onChange={e => setObs(e.target.value)}
                  />
                </div>

                <div className="cart-order-review">
                  {cart.map(item => (
                    <div key={item.id} className="cor-row">
                      <span>{item.brand} {item.name} × {item.qty}</span>
                      <span>R$ {fmt(item.price * item.qty)}</span>
                    </div>
                  ))}
                  {discount > 0 && (
                    <div className="cor-row cor-discount">
                      <span>Desconto ({payment})</span>
                      <span>−R$ {fmt(discount)}</span>
                    </div>
                  )}
                  <div className="cor-row total">
                    <span>Total</span>
                    <span>R$ {fmt(total)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer action */}
            {cart.length > 0 && (
              <div className="cart-action-footer">
                <button
                  className={`cart-next-btn${step === 3 ? ' wa' : ''}`}
                  onClick={handleNext}
                >
                  {step === 3
                    ? <><WhatsAppIcon /> Enviar pedido via WhatsApp</>
                    : <>Continuar <ChevronRight /></>
                  }
                </button>
              </div>
            )}

            {/* Confirmação antes do WhatsApp */}
            {showConfirm && (
              <div className="cart-confirm">
                <div className="cart-confirm-box">
                  <div className="cart-confirm-title">Confirmar pedido</div>
                  <div className="cart-confirm-rows">
                    {cart.map(item => (
                      <div key={item.id} className="cart-confirm-row">
                        <span>{item.brand} {item.name} × {item.qty}</span>
                        <span>R$ {fmt(item.price * item.qty)}</span>
                      </div>
                    ))}
                    {discount > 0 && (
                      <div className="cart-confirm-row discount">
                        <span>Desconto ({payment})</span>
                        <span>−R$ {fmt(discount)}</span>
                      </div>
                    )}
                    <div className="cart-confirm-row total">
                      <span>Total</span><span>R$ {fmt(total)}</span>
                    </div>
                    <div className="cart-confirm-row meta">
                      <span>Pagamento</span><span>{payment}</span>
                    </div>
                    {name && <div className="cart-confirm-row meta"><span>Para</span><span>{name}</span></div>}
                    {endereco && (
                      <div className="cart-confirm-row meta">
                        <span>Entrega</span>
                        <span>{endereco}{complemento ? `, ${complemento}` : ''}</span>
                      </div>
                    )}
                  </div>
                  <div className="cart-confirm-btns">
                    <button className="cart-confirm-cancel" onClick={() => setShowConfirm(false)}>Cancelar</button>
                    <button className="cart-confirm-send" onClick={() => { sendWhatsApp(); setShowConfirm(false); }}>
                      <WhatsAppIcon /> Confirmar e enviar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
