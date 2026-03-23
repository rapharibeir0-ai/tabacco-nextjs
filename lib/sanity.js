import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'vzg7ein3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// Retorna mapa: nome do produto -> { photo }
export async function fetchSanityProductPhotos() {
  const data = await sanityClient.fetch(
    `*[_type == "product"]{ name, photo{ asset->{ _id, url } } }`
  );
  const map = {};
  data.forEach(p => { if (p.name) map[p.name] = p; });
  return map;
}

// Retorna mapa: nome da marca -> { logo, bio, origin, foundedYear }
export async function fetchSanityBrands() {
  const data = await sanityClient.fetch(
    `*[_type == "brand"]{ name, bio, origin, foundedYear, logo{ asset->{ _id, url } } }`
  );
  const map = {};
  data.forEach(b => { if (b.name) map[b.name] = b; });
  return map;
}
