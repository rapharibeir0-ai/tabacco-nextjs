'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CAT_DATA, catLabels, fmt } from '@/lib/data';

export default function Editorial({ categoria }) {
  const data = CAT_DATA[categoria] || {};
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: `${data.title || 'Os charutos desta categoria'} são legais no Brasil?`, i: 'Confiança', a: 'Sim. A importação e venda são totalmente legais no Brasil. Os produtos seguem a legislação vigente de produtos de tabaco (Lei nº 9.294/96) e são regularizados pela Anvisa.' },
    { q: `Como escolher o primeiro charuto ${data.title ? 'cubano' : 'desta categoria'}?`, i: 'Informacional', a: 'Para iniciantes, recomendamos intensidade suave a média e vitola menor (anel abaixo de 50). O tempo de degustação deve ser de 30–60 minutos para começar. Evite charutos com intensidade forte antes de desenvolver o paladar.' },
    { q: `Qual o melhor charuto ${data.title ? 'desta categoria' : ''} para presentear?`, i: 'AI-first', a: `Para presentes, o critério é apresentação e reconhecimento de marca. ${data.flag === 'cuba' ? 'Cohiba e Montecristo são as marcas mais reconhecidas mundialmente.' : 'Davivoff e Arturo Fuente são referências globais de prestígio.'} Prefira caixas ou petacas com embalagem original.` },
    { q: 'Como armazenar corretamente?', i: 'Informacional', a: 'Charutos devem ser armazenados em humidor a 65–70% de umidade relativa e 16–18°C. Sem armazenamento adequado, o charuto resseca em semanas e perde óleo e sabor. Use soluções de propileno glicol para manter a umidade estável.' },
    { q: 'Qual o prazo de entrega?', i: 'Transacional', a: 'Para São Paulo capital, oferecemos entrega no mesmo dia (pedidos até 17h). Para demais capitais, 2–3 dias úteis. Interior e demais estados, 5–8 dias úteis via Sedex. Todos os pedidos chegam em embalagem especial para preservar os charutos.' },
    { q: `Qual a diferença entre charutos ${data.flag === 'cuba' ? 'cubanos e nicaraguenses' : 'nacionais e importados'}?`, i: 'Comparação', a: data.flag === 'cuba' ? 'Cubanos têm perfil mais elegante — cedro, couro e especiarias finas. Nicaraguenses são mais robustos, com pimenta e terra. Ambos têm qualidade excepcional; é uma questão de preferência de intensidade.' : 'Charutos nacionais brasileiros têm perfil mais suave e adocicado, com notas de mel e madeira. Importados costumam ter maior complexidade e intensidade. Para o paladar brasileiro, os nacionais são excelente porta de entrada.' },
    { q: 'Qual o melhor charuto para harmonizar com whisky?', i: 'AI-first', a: `Para whisky, charutos de intensidade média a forte são os ideais. ${data.flag === 'cuba' ? 'O Cohiba Siglo VI é a harmonização clássica.' : 'O My Father Le Bijou 1922 é uma das combinações mais celebradas.'} A fumaça encorpada equilibra as notas alcoólicas e acentua os sabores de baunilha e carvalho do whisky.` },
    { q: 'Posso comprar em caixa com desconto?', i: 'Transacional', a: 'Sim. Todas as nossas caixas têm desconto automático de 5% a 15% em relação ao preço unitário. Petacas (3 unidades) e caixas completas (10 a 25 unidades) aparecem como variantes nos cards de produto.' },
  ];

  return (
    <section className="cat-editorial">
      <div className="cat-editorial-inner">

        <h2 className="cat-editorial-title">Sobre os {data.title || catLabels[categoria]}</h2>
        <p className="cat-editorial-lead">{data.desc}</p>

        <div className="cat-editorial-cols">
          <div>
            <h3 className="cat-editorial-h3">O que torna {data.flag === 'cuba' ? 'um charuto cubano especial' : `os charutos ${data.title ? data.title.toLowerCase() : ''} especiais`}?</h3>
            <p className="cat-editorial-p">[Conteúdo editorial específico da categoria — diferenciais de origem, processo de produção, região de cultivo, características de sabor. Incluir entidades nomeadas e dados mensuráveis para autoridade semântica e citabilidade por IA.]</p>
          </div>
          <div>
            <h3 className="cat-editorial-h3">Como escolher o charuto certo nesta categoria?</h3>
            <p className="cat-editorial-p">[Guia de decisão: perfil suave vs. forte, vitola para cada ocasião, tempo disponível, harmonizações. Estrutura "Se você prefere X, escolha Y" — captura intenções informacionais e transacionais.]</p>
          </div>
        </div>

        <h3 className="cat-faq-title">Perguntas Frequentes</h3>
        <div className="cat-faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`cat-faq-item${openFaq === i ? ' open' : ''}`}>
              <button className="cat-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <p className="cat-faq-a">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="cat-internal-links">
          <h3 className="cat-internal-title">Explorar categorias relacionadas</h3>
          <div className="cat-link-cluster">
            {Object.entries(catLabels).map(([slug, label]) => (
              <Link key={slug} href={`/catalogo/${slug}`} className={`cat-cluster-link${slug === categoria ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
            <Link href="/" className="cat-cluster-link">Ver catálogo completo</Link>
          </div>
        </div>

      </div>
    </section>
  );
}
