export default {
  name: 'page',
  title: 'Página',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'A URL da página. Ex: /quem-somos, /faq',
      validation: Rule => Rule.required(),
    },
    {
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título H2', value: 'h2' },
            { title: 'Título H3', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texto alternativo' },
          ],
        },
      ],
    },
    {
      name: 'placement',
      title: 'Onde exibir o link',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Navbar (menu principal)', value: 'navbar' },
          { title: 'Footer (rodapé)', value: 'footer' },
        ],
        layout: 'grid',
      },
      description: 'Deixe em branco para página ativa mas sem link fixo no menu',
    },
    {
      name: 'navOrder',
      title: 'Ordem no navbar',
      type: 'number',
      description: 'Número para ordenar no menu. Menor = aparece primeiro.',
      initialValue: 10,
      hidden: ({ document }) => !document?.placement?.includes('navbar'),
    },
    {
      name: 'footerGroup',
      title: 'Grupo no footer',
      type: 'string',
      description: 'Nome da coluna onde este link aparecerá no rodapé. Ex: Empresa, Ajuda, Legal',
      hidden: ({ document }) => !document?.placement?.includes('footer'),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título SEO', type: 'string', description: 'Max 60 caracteres' },
        { name: 'description', title: 'Descrição Meta', type: 'text', rows: 2, description: 'Max 160 caracteres' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : '',
      };
    },
  },
};
