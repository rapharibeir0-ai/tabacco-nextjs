export default {
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'value',
      title: 'Chave interna',
      type: 'string',
      description: 'Identificador usado nas URLs e filtros. Ex: cubanos, outros, nacionais',
      validation: Rule => Rule.required(),
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Texto pequeno acima do título. Ex: Charutos Cubanos',
    },
    {
      name: 'image',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Descrição / Copy',
      type: 'text',
      rows: 4,
      description: 'Texto descritivo exibido no hero da página de categoria',
    },
    {
      name: 'country',
      title: 'País(es) de Origem',
      type: 'string',
      description: 'Ex: Cuba · Nicarágua · Rep. Dominicana',
    },
    {
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'string',
      description: 'Max 60 caracteres. Ex: Charutos Cubanos Premium — Comprar Online | Tabacco.',
    },
    {
      name: 'seoDescription',
      title: 'Descrição Meta',
      type: 'text',
      rows: 2,
      description: 'Max 160 caracteres.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'image',
    },
  },
};
