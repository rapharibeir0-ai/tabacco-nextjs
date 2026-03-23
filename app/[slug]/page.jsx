'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { fetchPageBySlug } from '@/lib/sanity';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ── Portable Text renderer simples ─────────────────────────── */
function renderBlock(block, i) {
  if (block._type !== 'block') return null;

  const text = (block.children || []).map((span, j) => {
    let content = span.text;
    if (span.marks?.includes('strong')) content = <strong key={j}>{content}</strong>;
    if (span.marks?.includes('em')) content = <em key={j}>{content}</em>;
    return content;
  });

  switch (block.style) {
    case 'h2': return <h2 key={i} className="page-h2">{text}</h2>;
    case 'h3': return <h3 key={i} className="page-h3">{text}</h3>;
    case 'blockquote': return <blockquote key={i} className="page-quote">{text}</blockquote>;
    default: return <p key={i} className="page-p">{text}</p>;
  }
}

export default function ContentPage({ params }) {
  const { slug } = use(params);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPageBySlug(slug).then(data => {
      if (!data) setNotFound(true);
      else setPage(data);
      setLoading(false);
    });
  }, [slug]);

  return (
    <>
      <Header cartCount={0} catFilter={null} onCatChange={() => {}} onCartToggle={() => {}} solid />

      <main className="content-page">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
            <svg style={{ animation: 'spin 0.8s linear infinite', opacity: 0.3 }} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 0 20" strokeLinecap="round" />
            </svg>
          </div>
        ) : notFound ? (
          <div className="content-page-inner" style={{ textAlign: 'center', padding: '5rem 0' }}>
            <h1>Página não encontrada</h1>
            <p>O conteúdo que você procura não existe ou foi removido.</p>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>← Voltar ao catálogo</Link>
          </div>
        ) : (
          <div className="content-page-inner">
            <nav className="cat-breadcrumb">
              <Link href="/" className="cat-bc-link">Início</Link>
              <span className="cat-bc-sep">›</span>
              <span className="cat-bc-current">{page.title}</span>
            </nav>

            <h1 className="content-page-title">{page.title}</h1>

            <div className="content-page-body">
              {(page.content || []).map((block, i) => renderBlock(block, i))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
