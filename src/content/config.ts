import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Actualités', 'Portraits', 'Conseils', 'Outils', 'Événements']),
    image: z.string(),
    imageAlt: z.string(),
    author: z.string().default('La Cabine Podcasts'),
  }),
});

export const collections = { blog };
