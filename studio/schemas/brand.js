export default {
  name: 'brand',
  title: 'Marca',
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
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Biografia',
      type: 'text',
      rows: 5,
      description: 'Breve descrição da marca exibida no catálogo',
    },
    {
      name: 'origin',
      title: 'Origem',
      type: 'string',
      description: 'Ex: Cuba, República Dominicana, Nicarágua, Brasil',
    },
    {
      name: 'foundedYear',
      title: 'Ano de Fundação',
      type: 'number',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'origin',
      media: 'logo',
    },
  },
};
