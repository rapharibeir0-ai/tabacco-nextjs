// Queries GROQ para buscar dados do Sanity CMS

// Imagem básica — retorna asset com metadados para urlFor()
const imageFields = `
  asset->{_id, url}
`;

// Campos de produto completos (conteúdo + preço + estoque)
export const productQuery = `*[_type == "product"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  vitola,
  flavor,
  filler,
  smokeTime,
  pairing,
  category,
  badges,
  description,
  photo { ${imageFields} },
  "gallery": gallery[].{ ${imageFields} },
  price,
  stock,
  unit,
  variants[] { label, price, unit, stock },
  seo,
  brand->{ _id, name, "slug": slug.current, bio, origin, foundedYear, logo { ${imageFields} } }
}`;

export const productByCategoryQuery = `*[_type == "product" && category == $category] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  vitola,
  flavor,
  filler,
  smokeTime,
  pairing,
  category,
  badges,
  description,
  photo { ${imageFields} },
  "gallery": gallery[].{ ${imageFields} },
  price,
  stock,
  unit,
  variants[] { label, price, unit, stock },
  seo,
  brand->{ _id, name, "slug": slug.current, bio, origin, foundedYear, logo { ${imageFields} } }
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  vitola,
  flavor,
  filler,
  smokeTime,
  pairing,
  category,
  badges,
  description,
  photo { ${imageFields} },
  "gallery": gallery[].{ ${imageFields} },
  price,
  stock,
  unit,
  variants[] { label, price, unit, stock },
  seo,
  brand->{ _id, name, "slug": slug.current, bio, origin, foundedYear, logo { ${imageFields} } }
}`;

export const brandsQuery = `*[_type == "brand"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  bio,
  origin,
  foundedYear,
  website,
  logo { ${imageFields} }
}`;

export const categoryQuery = `*[_type == "category"] | order(name asc) {
  _id,
  name,
  value,
  eyebrow,
  image { ${imageFields} },
  description,
  country,
  seoTitle,
  seoDescription
}`;

export const categoryByValueQuery = `*[_type == "category" && value == $value][0] {
  _id,
  name,
  value,
  eyebrow,
  image { ${imageFields} },
  description,
  country,
  seoTitle,
  seoDescription
}`;

// Árvore de categorias com até 3 níveis (para o navbar)
export const categoryTreeQuery = `*[_type == "category" && !defined(parent)] | order(order asc) {
  _id,
  name,
  value,
  flag,
  megaMenu,
  order,
  "children": *[_type == "category" && parent._ref == ^._id] | order(order asc) {
    _id,
    name,
    value,
    flag,
    order,
    "children": *[_type == "category" && parent._ref == ^._id] | order(order asc) {
      _id,
      name,
      value
    }
  }
}`;

// Páginas para o navbar
export const navPagesQuery = `*[_type == "page" && "navbar" in placement] | order(navOrder asc) {
  _id,
  title,
  "slug": slug.current,
  navOrder
}`;

// Páginas para o footer, agrupadas por footerGroup
export const footerPagesQuery = `*[_type == "page" && "footer" in placement] | order(footerGroup asc, navOrder asc) {
  _id,
  title,
  "slug": slug.current,
  footerGroup
}`;

// Página por slug
export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  content,
  placement,
  seo
}`;

export const siteConfigQuery = `*[_type == "siteConfig"][0] {
  heroTitle,
  heroEyebrow,
  heroDescription,
  heroSearchHints,
  whatsapp,
  whatsappHours,
  footerTagline,
  "featuredProducts": featuredProducts[]->{
    _id,
    name,
    "slug": slug.current,
    vitola,
    photo { ${imageFields} }
  }
}`;
