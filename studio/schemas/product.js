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
    // Nota: preço e estoque ficam no Supabase
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'vitola',
      media: 'photo',
    },
  },
};
