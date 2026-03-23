export default {
  name: 'siteConfig',
  title: 'Configurações do Site',
  type: 'document',
  // Singleton — deve existir apenas um documento deste tipo
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heroTitle',
      title: 'Título do Hero',
      type: 'string',
      description: 'Ex: O prazer de um bom charuto.',
    },
    {
      name: 'heroEyebrow',
      title: 'Eyebrow do Hero',
      type: 'string',
      description: 'Texto pequeno acima do título. Ex: Catálogo 2025',
    },
    {
      name: 'heroDescription',
      title: 'Descrição do Hero',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroSearchHints',
      title: 'Sugestões de Busca',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Palavras-chave exibidas como atalho na busca. Ex: Cohiba, Davidoff',
    },
    {
      name: 'featuredProducts',
      title: 'Produtos em Destaque',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Produtos exibidos com badge "destaque" na home',
    },
    {
      name: 'whatsapp',
      title: 'Número WhatsApp',
      type: 'string',
      description: 'Formato internacional sem espaços. Ex: 5511939215700',
    },
    {
      name: 'whatsappHours',
      title: 'Horário de Atendimento',
      type: 'string',
      description: 'Ex: Seg–Sex 9h–18h | Sáb 9h–14h',
    },
    {
      name: 'footerTagline',
      title: 'Tagline do Rodapé',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: { title: 'heroTitle' },
    prepare({ title }) {
      return { title: title || 'Configurações do Site' };
    },
  },
};
