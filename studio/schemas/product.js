export default {
  name: 'product',
  title: 'Produto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    },
    {
      name: 'brand',
      title: 'Marca',
      type: 'reference',
      to: [{ type: 'brand' }],
    },
    {
      name: 'photo',
      title: 'Foto Principal',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
    },
    {
      name: 'vitola',
      title: 'Vitola',
      type: 'string',
    },
    {
      name: 'flavor',
      title: 'Intensidade',
      type: 'string',
      options: {
        list: [
          { title: 'Suave', value: 'Suave' },
          { title: 'Médio', value: 'Médio' },
          { title: 'Forte', value: 'Forte' },
        ],
      },
    },
    {
      name: 'filler',
      title: 'Miolo',
      type: 'string',
    },
    {
      name: 'smokeTime',
      title: 'Tempo de Fumo',
      type: 'string',
      description: 'Ex: 45–60 min',
    },
    {
      name: 'pairing',
      title: 'Maridagem',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Whisky', 'Rum', 'Conhaque', 'Café', 'Vinho tinto', 'Cerveja escura',
          'Bourbon', 'Cachaça', 'Agua', 'Espresso',
        ],
      },
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Cubanos', value: 'cubanos' },
          { title: 'Outros Importados', value: 'outros' },
          { title: 'Nacionais', value: 'nacionais' },
        ],
      },
    },
    {
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['novidade', 'destaque', 'limitado'],
      },
    },
    {
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'stock',
      title: 'Estoque',
      type: 'string',
      initialValue: 'in-stock',
      options: {
        list: [
          { title: 'Em estoque', value: 'in-stock' },
          { title: 'Pouco estoque', value: 'low-stock' },
          { title: 'Esgotado', value: 'out' },
        ],
      },
    },
    {
      name: 'unit',
      title: 'Unidade',
      type: 'string',
      initialValue: 'unidade',
      description: 'Ex: unidade, maço com 5, caixa com 25',
    },
    {
      name: 'variants',
      title: 'Variantes de quantidade',
      type: 'array',
      description: 'Opções de compra em quantidade diferente (petaca, caixa etc.)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', description: 'Ex: Unitário, Petaca (3), Caixa (25)' },
            { name: 'price', title: 'Preço (R$)', type: 'number' },
            { name: 'unit', title: 'Unidade', type: 'string', description: 'Ex: unidade, petaca c/ 3' },
            {
              name: 'stock',
              title: 'Estoque',
              type: 'string',
              initialValue: 'in-stock',
              options: {
                list: [
                  { title: 'Em estoque', value: 'in-stock' },
                  { title: 'Pouco estoque', value: 'low-stock' },
                  { title: 'Esgotado', value: 'out' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'price' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `R$ ${subtitle}` : '' };
            },
          },
        },
      ],
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
      title: 'name',
      subtitle: 'vitola',
      media: 'photo',
    },
  },
};
