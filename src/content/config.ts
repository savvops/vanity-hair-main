import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    features: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const reviewsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    initials: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    featured: z.boolean().default(false),
  }),
});

const faqCollection = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = {
  services: servicesCollection,
  reviews: reviewsCollection,
  faq: faqCollection,
};
