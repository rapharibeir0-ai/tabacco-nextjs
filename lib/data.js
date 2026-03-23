export const defaultProducts = [
  // ── Cubanos ──
  { id:1,  brand:'Cohiba',        name:'Siglo VI',           vitola:'Corona Grande · 52×150mm', category:'cubanos',   flavor:'Médio',  filler:'Long-filler',  price:280,  unit:'unidade',  stock:'in-stock',  qty:24, img:'', badges:['exclusivo'],         smokeTime:'90–120 min',  pairing:['Whisky','Rum Envelhecido','Conhaque'],
    variants:[{label:'Unitário',price:280,unit:'unidade'},{label:'Petaca (3)',price:798,unit:'petaca c/ 3'},{label:'Caixa (25)',price:6300,unit:'caixa c/ 25',stock:'out'}] },
  { id:2,  brand:'Cohiba',        name:'Behike 52',          vitola:'Campana · 52×160mm',       category:'cubanos',   flavor:'Médio',  filler:'Long-filler',  price:420,  unit:'unidade',  stock:'in-stock',  qty:12, img:'', badges:['novidade'],          smokeTime:'100–130 min', pairing:['Cognac','Whisky Turfado','Café'],
    variants:[{label:'Unitário',price:420,unit:'unidade'},{label:'Caixa (10)',price:3780,unit:'caixa c/ 10'}] },
  { id:3,  brand:'Cohiba',        name:'Robusto',            vitola:'Robusto · 50×124mm',       category:'cubanos',   flavor:'Médio',  filler:'Long-filler',  price:195,  unit:'unidade',  stock:'in-stock',  qty:30, img:'', badges:[],                    smokeTime:'60–75 min',   pairing:['Whisky','Rum','Cerveja Escura'],
    variants:[{label:'Unitário',price:195,unit:'unidade'},{label:'Petaca (3)',price:555,unit:'petaca c/ 3'},{label:'Caixa (25)',price:4390,unit:'caixa c/ 25'}] },
  { id:4,  brand:'Montecristo',   name:'No. 2',              vitola:'Torpedo · 52×156mm',       category:'cubanos',   flavor:'Médio',  filler:'Long-filler',  price:210,  unit:'unidade',  stock:'low-stock', qty:5,  img:'', badges:[],                    smokeTime:'75–90 min',   pairing:['Rum','Cognac','Café'],
    variants:[{label:'Unitário',price:210,unit:'unidade'},{label:'Petaca (3)',price:598,unit:'petaca c/ 3'},{label:'Caixa (25)',price:4725,unit:'caixa c/ 25'}] },
  { id:5,  brand:'Montecristo',   name:'No. 4',              vitola:'Petit Corona · 42×129mm',  category:'cubanos',   flavor:'Médio',  filler:'Long-filler',  price:140,  unit:'unidade',  stock:'in-stock',  qty:40, img:'', badges:['bestbuy'],           smokeTime:'45–60 min',   pairing:['Café','Vinho Tinto','Rum'],
    variants:[{label:'Unitário',price:140,unit:'unidade'},{label:'Petaca (3)',price:398,unit:'petaca c/ 3'},{label:'Caixa (25)',price:3150,unit:'caixa c/ 25'}] },
  { id:6,  brand:'Romeo y Julieta', name:'Churchill',        vitola:'Churchill · 47×178mm',     category:'cubanos',   flavor:'Suave',  filler:'Long-filler',  price:185,  unit:'unidade',  stock:'in-stock',  qty:20, img:'', badges:[],                    smokeTime:'90–120 min',  pairing:['Champagne','Vinho Branco','Rum Leve'],
    variants:[{label:'Unitário',price:185,unit:'unidade'},{label:'Caixa (25)',price:4165,unit:'caixa c/ 25'}] },
  { id:7,  brand:'Partagás',      name:'Serie D No. 4',      vitola:'Robusto · 50×124mm',       category:'cubanos',   flavor:'Forte',  filler:'Long-filler',  price:198,  unit:'unidade',  stock:'in-stock',  qty:18, img:'', badges:[],                    smokeTime:'60–80 min',   pairing:['Cognac','Espresso','Rum Añejo'],
    variants:[{label:'Unitário',price:198,unit:'unidade'},{label:'Petaca (3)',price:564,unit:'petaca c/ 3'},{label:'Caixa (25)',price:4455,unit:'caixa c/ 25'}] },

  // ── Outros Países ──
  { id:8,  brand:'Arturo Fuente', name:'Opus X',             vitola:'Fuente Fuente · 57×171mm', category:'outros',    flavor:'Forte',  filler:'Long-filler',  price:380,  unit:'unidade',  stock:'low-stock', qty:6,  img:'', badges:['exclusivo','limitado'], smokeTime:'90–120 min', pairing:['Cognac','Rum Añejo','Whisky'],
    variants:[{label:'Unitário',price:380,unit:'unidade'},{label:'Petaca (3)',price:1083,unit:'petaca c/ 3',stock:'out'}] },
  { id:9,  brand:'Davidoff',      name:'Grand Cru No. 2',    vitola:'Corona · 43×143mm',        category:'outros',    flavor:'Suave',  filler:'Long-filler',  price:245,  unit:'unidade',  stock:'in-stock',  qty:22, img:'', badges:[],                    smokeTime:'60–75 min',   pairing:['Champagne','Chá Preto','Vinho Branco'],
    variants:[{label:'Unitário',price:245,unit:'unidade'},{label:'Caixa (25)',price:5513,unit:'caixa c/ 25'}] },
  { id:10, brand:'My Father',     name:'Le Bijou 1922',      vitola:'Torpedo · 54×152mm',       category:'outros',    flavor:'Forte',  filler:'Long-filler',  price:165,  unit:'unidade',  stock:'in-stock',  qty:28, img:'', badges:['bestbuy'],           smokeTime:'60–80 min',   pairing:['Whisky','Rum Envelhecido','Café'],
    variants:[{label:'Unitário',price:165,unit:'unidade'},{label:'Petaca (3)',price:470,unit:'petaca c/ 3'},{label:'Caixa (24)',price:3564,unit:'caixa c/ 24'}] },
  { id:11, brand:'Oliva',         name:'Serie V Melanio',    vitola:'Figurado · 56×152mm',      category:'outros',    flavor:'Médio',  filler:'Long-filler',  price:145,  unit:'unidade',  stock:'in-stock',  qty:35, img:'', badges:[],                    smokeTime:'60–75 min',   pairing:['Whisky','Rum','Cerveja Artesanal'],
    variants:[{label:'Unitário',price:145,unit:'unidade'},{label:'Petaca (3)',price:413,unit:'petaca c/ 3'},{label:'Caixa (10)',price:1305,unit:'caixa c/ 10'}] },

  // ── Nacionais ──
  { id:12, brand:'Dannemann',     name:'Especial',           vitola:'Corona · 40×130mm',        category:'nacionais', flavor:'Suave',  filler:'Short-filler', price:45,   unit:'unidade',  stock:'in-stock',  qty:60, img:'', badges:[],                    smokeTime:'30–45 min',   pairing:['Café','Cerveja Leve','Vinho Rosé'],
    variants:[{label:'Unitário',price:45,unit:'unidade'},{label:'Maço (5)',price:210,unit:'maço c/ 5'},{label:'Caixa (50)',price:1980,unit:'caixa c/ 50'}] },
  { id:13, brand:'Dona Flor',     name:'Natural',            vitola:'Robusto · 50×127mm',       category:'nacionais', flavor:'Suave',  filler:'Long-filler',  price:85,   unit:'unidade',  stock:'in-stock',  qty:25, img:'', badges:['novidade'],          smokeTime:'45–60 min',   pairing:['Café','Cachaça','Vinho Tinto Leve'],
    variants:[{label:'Unitário',price:85,unit:'unidade'},{label:'Petaca (3)',price:242,unit:'petaca c/ 3'},{label:'Caixa (25)',price:1913,unit:'caixa c/ 25'}] },
  { id:14, brand:'Damatta',       name:'Maduro Robusto',     vitola:'Robusto · 50×127mm',       category:'nacionais', flavor:'Médio',  filler:'Long-filler',  price:110,  unit:'unidade',  stock:'in-stock',  qty:15, img:'', badges:[],                    smokeTime:'50–65 min',   pairing:['Rum Envelhecido','Café Especial','Cachaça'],
    variants:[{label:'Unitário',price:110,unit:'unidade'},{label:'Petaca (3)',price:313,unit:'petaca c/ 3'},{label:'Caixa (25)',price:2475,unit:'caixa c/ 25'}] },
];

export const BRANDS = {
  'Cohiba':           { origin:'Cuba',                      founded:'1966', style:'Premium · Suave a Médio',    bio:'Criada originalmente para Fidel Castro, a Cohiba é o símbolo máximo do charuto cubano. Suas folhas passam por uma terceira fermentação exclusiva, resultando em sabores excepcionalmente refinados e equilibrados.' },
  'Montecristo':      { origin:'Cuba',                      founded:'1935', style:'Premium · Médio',            bio:'Uma das marcas mais reconhecidas do mundo, a Montecristo conquistou gerações com seu blend médio, elegante e consistente. O No. 2 em formato pirâmide é considerado um dos charutos mais perfeitos já fabricados.' },
  'Bolívar':          { origin:'Cuba',                      founded:'1902', style:'Robusto · Forte',            bio:'Para os apreciadores de charutos encorpados, a Bolívar entrega intensidade e complexidade ímpares. Seus blends são marcados por notas de couro, terra e especiarias, com fumaça densa e persistente.' },
  'Partagás':         { origin:'Cuba',                      founded:'1845', style:'Premium · Forte',            bio:'Uma das mais antigas marcas cubanas, a Partagás é sinônimo de charutos robustos e aromáticos. A fábrica original em Havana é ponto de referência para os amantes da cultura do charuto.' },
  'H. Upmann':        { origin:'Cuba',                      founded:'1844', style:'Premium · Médio',            bio:'Fundada por um banqueiro alemão em Havana, H. Upmann combina tradição europeia com excelência cubana. Seus charutos são elegantes, com sabor médio e acabamento impecável.' },
  'Arturo Fuente':    { origin:'Rep. Dominicana',           founded:'1912', style:'Super Premium · Médio a Forte', bio:'Família Fuente produz charutos por quatro gerações. O lendário Opus X foi o primeiro charuto premium totalmente dominicano, usando tabaco cultivado nas próprias fazendas da família em Château de la Fuente.' },
  'Davidoff':         { origin:'Rep. Dominicana',           founded:'1968', style:'Ultra Premium · Suave a Médio', bio:'Zino Davidoff transformou o charuto em símbolo de luxo global. A marca é referência em acabamento impecável e blends sofisticados, com foco em apreciadores que valorizam elegância acima de tudo.' },
  'My Father':        { origin:'Nicarágua',                 founded:'2008', style:'Premium · Médio a Forte',   bio:'José "Pepin" García e seu filho Jaime criaram uma das marcas mais celebradas da Nicarágua. O Le Bijou 1922 é unanimidade entre especialistas — encorpado, complexo e de construção perfeita.' },
  'Rocky Patel':      { origin:'Honduras / Nicarágua',      founded:'1995', style:'Premium · Médio',            bio:'Advogado que virou mestre do charuto, Rocky Patel construiu um império sobre blends consistentes e acessíveis. A linha Vintage é o melhor exemplo: folhas envelhecidas por anos resultando em complexidade rara.' },
  'Oliva':            { origin:'Nicarágua',                 founded:'1886', style:'Premium · Médio a Forte',   bio:'Família cubana que reconstruiu sua tradição na Nicarágua. O Serie V Melanio é considerado o charuto mais premiado de todos os tempos, conquistando pontuações máximas nas principais publicações especializadas.' },
  'Dannemann':        { origin:'Brasil',                    founded:'1873', style:'Nacional · Suave',           bio:'A marca brasileira de charutos mais reconhecida internacionalmente. Fundada em São Félix da Bahia por um imigrante alemão, a Dannemann popularizou a cultura do charuto no Brasil com qualidade e tradição.' },
  'Dona Flor':        { origin:'Brasil',                    founded:'1996', style:'Nacional · Suave a Médio',  bio:'Produzida no Recôncavo Baiano, Dona Flor representa o renascimento do charuto artesanal brasileiro. Suas folhas cultivadas na Bahia entregam um perfil único: suave, adocicado e de longa queima.' },
  'Damatta':          { origin:'Brasil',                    founded:'2005', style:'Nacional Premium · Médio',  bio:'Referência em charutos brasileiros premium, a Damatta trabalha com tabaco do Vale do Rio Pardo e do Recôncavo Baiano. Seus Maduro são a joia da linha — complexidade e doçura em perfeito equilíbrio.' },
  'Alonso Menendez':  { origin:'Brasil',                    founded:'1990', style:'Nacional · Forte',          bio:'Com tradição cubana transplantada para o Brasil, a Alonso Menendez produz charutos de grande porte e blend encorpado. O Gran Churchill é o carro-chefe: imponente, intenso e para apreciadores experientes.' },
};

export const catLabels  = { cubanos:'Cubanos', outros:'Outros Países', nacionais:'Nacionais' };
export const catOrigins = { cubanos:'Cuba', outros:'Nicarágua · Rep. Dominicana · Honduras', nacionais:'Brasil' };

export const CAT_DATA = {
  cubanos: {
    eyebrow: 'Charutos Cubanos',
    title: 'Cubanos',
    desc: 'A ilha de Cuba é o berço do charuto premium. Colheitas lendárias, torcedores de gerações e o inconfundível terroir de Vuelta Abajo fazem dos cubanos o padrão de excelência mundial.',
    flag: 'cuba',
    country: 'Cuba',
    metaTitle: 'Charutos Cubanos Premium — Comprar Online | Tabacco.',
    metaDesc: 'Seleção curada de charutos cubanos: Cohiba, Montecristo, Romeo y Julieta e Partagás. Entrega para todo o Brasil.',
  },
  outros: {
    eyebrow: 'Outros Países',
    title: 'Outros Países',
    desc: 'Nicarágua, República Dominicana e Honduras produziram um novo cânone do charuto premium. Solos vulcânicos, clima tropical e décadas de expertise constroem charutos de personalidade única.',
    flag: null,
    country: 'Nicarágua · R. Dominicana · Honduras',
    metaTitle: 'Charutos Importados Premium — Outros Países | Tabacco.',
    metaDesc: 'Arturo Fuente, Davidoff, My Father, Oliva e mais. Os melhores charutos de Nicarágua, Rep. Dominicana e Honduras.',
  },
  nacionais: {
    eyebrow: 'Charutos Nacionais',
    title: 'Nacionais',
    desc: 'O tabaco do Recôncavo Baiano e do Vale do Rio Pardo produz charutos de perfil único: suaves, adocicados e de longa queima. A tradição brasileira do charuto tem mais de 150 anos.',
    flag: null,
    country: 'Brasil',
    metaTitle: 'Charutos Nacionais Brasileiros — Comprar Online | Tabacco.',
    metaDesc: 'Dannemann, Dona Flor, Damatta e mais. Os melhores charutos brasileiros direto para você.',
  },
};

export const BADGES = {
  sameday:   { label:'Receba Hoje',  cls:'badge-sameday'   },
  novidade:  { label:'Novidade',     cls:'badge-novidade'  },
  bestbuy:   { label:'Best Buy',     cls:'badge-bestbuy'   },
  limitado:  { label:'Estoque Lim.', cls:'badge-limitado'  },
  exclusivo: { label:'Exclusivo',    cls:'badge-exclusivo' },
  promocao:  { label:'Promoção',     cls:'badge-promocao'  },
};

export const stockText  = { 'in-stock':'Em estoque', 'low-stock':'Pouco estoque', out:'Esgotado' };
export const stockColor = { 'in-stock':'#2a7a4a',    'low-stock':'#b07020',       out:'var(--muted)' };

export const intensityLevel = { Suave:1, Médio:2, Forte:3 };

export const fillerInfo = {
  'Long-filler':  'Folhas inteiras que percorrem todo o charuto. Queima lenta, uniforme e sabor mais complexo — padrão dos charutos premium.',
  'Short-filler': 'Retalhos de folha picados. Queima mais rápida e preço acessível — comum em charutos de entrada.',
  'Mixed-filler': 'Combinação de folhas inteiras e picadas. Bom equilíbrio entre custo e qualidade de queima.',
};

export const UF_REGION = {
  SP:'fast',
  RJ:'mid', MG:'mid', ES:'mid', PR:'mid', SC:'mid', RS:'mid', GO:'mid', DF:'mid', MT:'mid', MS:'mid',
  BA:'slow', PE:'slow', CE:'slow', PA:'slow', AM:'slow', MA:'slow', PI:'slow', RN:'slow', PB:'slow',
  AL:'slow', SE:'slow', TO:'slow', AP:'slow', RR:'slow', AC:'slow', RO:'slow',
};

export const SHIPPING_INFO = {
  fast: { label:'Receba ainda hoje', cls:'fast', days:'mesmo dia', ico:'🚚' },
  mid:  { label:'2–3 dias úteis',    cls:'mid',  days:'2–3 dias',  ico:'📦' },
  slow: { label:'5–8 dias úteis',    cls:'slow', days:'5–8 dias',  ico:'📦' },
};

export const fmt = n => Number(n).toLocaleString('pt-BR', { minimumFractionDigits:2 });

export function brandInitials(name) {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function shippingFor(uf) {
  return UF_REGION[uf] || 'slow';
}
