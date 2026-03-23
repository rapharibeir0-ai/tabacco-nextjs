import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import {
  productQuery,
  productByCategoryQuery,
  categoryQuery,
  categoryByValueQuery,
  categoryTreeQuery,
  navPagesQuery,
  footerPagesQuery,
  pageBySlugQuery,
} from './sanity.queries';

export const sanityClient = createClient({
  projectId: 'vzg7ein3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// Converte documento de produto do Sanity para o shape usado pelo site
function mapProduct(p) {
  return {
    id: p._id,
    name: p.name || '',
    slug: p.slug || '',
    brand: p.brand?.name || '',
    brandData: p.brand || null,
    vitola: p.vitola || '',
    flavor: p.flavor || '',
    filler: p.filler || '',
    smokeTime: p.smokeTime || '',
    pairing: p.pairing || [],
    category: p.category || '',
    badges: p.badges || [],
    description: p.description || '',
    photo: p.photo || null,
    gallery: p.gallery || [],
    img: '',
    price: p.price || 0,
    stock: p.stock || 'in-stock',
    unit: p.unit || 'unidade',
    variants: p.variants || [],
    seo: p.seo || null,
  };
}

// Busca todos os produtos
export async function fetchProducts() {
  const data = await sanityClient.fetch(productQuery);
  return (data || []).map(mapProduct);
}

// Busca produtos de uma categoria específica
export async function fetchProductsByCategory(category) {
  const data = await sanityClient.fetch(productByCategoryQuery, { category });
  return (data || []).map(mapProduct);
}

// Constrói mapa de marcas a partir de uma lista de produtos
export function buildBrandsMap(products) {
  const map = {};
  products.forEach(p => {
    if (p.brandData && !map[p.brand]) {
      map[p.brand] = p.brandData;
    }
  });
  return map;
}

// Busca todas as categorias
export async function fetchCategories() {
  const data = await sanityClient.fetch(categoryQuery);
  const map = {};
  (data || []).forEach(c => { if (c.value) map[c.value] = c; });
  return map;
}

// Busca uma categoria pelo valor (ex: 'cubanos')
export async function fetchCategory(value) {
  return sanityClient.fetch(categoryByValueQuery, { value });
}

// Busca a árvore de categorias para o navbar (3 níveis)
export async function fetchCategoryTree() {
  return sanityClient.fetch(categoryTreeQuery) || [];
}

// Busca páginas que aparecem no navbar
export async function fetchNavPages() {
  return sanityClient.fetch(navPagesQuery) || [];
}

// Busca páginas que aparecem no footer, agrupadas
export async function fetchFooterPages() {
  const pages = await sanityClient.fetch(footerPagesQuery) || [];
  const groups = {};
  pages.forEach(p => {
    const g = p.footerGroup || 'Links';
    if (!groups[g]) groups[g] = [];
    groups[g].push(p);
  });
  return groups;
}

// Busca uma página de conteúdo pelo slug
export async function fetchPageBySlug(slug) {
  return sanityClient.fetch(pageBySlugQuery, { slug });
}
