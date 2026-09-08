import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Site Settings Schema
const siteSettingsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/siteSettings', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    siteName: z.string(),
    description: z.string(),
    logo: z.string().optional(),
    favicon: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
  }),
});

// Navigation Schema
const navigationCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/navigation', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    brandName: z.string(),
    ctaButton: z.string().default('Book Now'),
    navLinks: z.array(z.object({
      href: z.string(),
      label: z.string(),
      order: z.number().default(0),
      enabled: z.boolean().default(true),
    })),
  }),
});

// Info Banner Schema
const infoBannerCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/infoBanner', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    items: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      content: z.string(),
    })),
  }),
});

// Hero Schema
const heroCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hero', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    badge: z.string().optional(),
    headlineLine1: z.string(),
    headlineAccent: z.string(),
    subheadline: z.string(),
    ctaPrimary: z.string().default('Book Appointment'),
    ctaSecondary: z.string().default('View Services'),
    backgroundImage: z.string(),
  }),
});

// About Schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/about', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    subtitle: z.string().default('Our Story'),
    headlinePart1: z.string(),
    headlineAccent: z.string(),
    paragraphs: z.array(z.object({
      text: z.string(),
    })),
    features: z.array(z.object({
      feature: z.string(),
    })),
    signature: z.string(),
    image: z.string(),
  }),
});

// Services Schema
const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    price: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

// Services Settings Schema
const servicesSettingsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/servicesSettings', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    heading: z.string(),
    icon: z.string().optional(),
    note: z.string().optional(),
    ctaButton: z.string().optional(),
  }),
});

// Testimonials Schema
const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    author: z.string(),
    rating: z.number(),
    time: z.string().optional(),
    text: z.string(),
    order: z.number().default(0),
  }),
});

// Testimonials Settings Schema
const testimonialsSettingsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonialsSettings', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    heading: z.string(),
    ratingScore: z.string(),
    ratingLabel: z.string(),
    reviewsButton: z.string(),
    reviewsButtonLink: z.string(),
    backgroundImage: z.string(),
  }),
});

// Gallery Schema
const galleryCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    subtitle: z.string(),
    heading: z.string(),
    instagramButton: z.string(),
    instagramLink: z.string(),
    instagramVideos: z.array(z.object({
      url: z.url(),
      video: z.string(),
      poster: z.string().optional(),
      title: z.string().optional(),
      views: z.string().optional(),
    })).default([]),
    videos: z.array(z.object({
      video: z.string(),
      poster: z.string().optional(),
      title: z.string().optional(),
    })).default([]),
    images: z.array(z.object({
      image: z.string(),
      alt: z.string().optional(),
      featured: z.boolean().default(false),
    })),
  }),
});

// Booking uses direct phone/email contact; there is no online booking form.
const bookingCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/booking', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({ id: z.string().optional(), formTitle: z.string(), formSubtitle: z.string() }),
});

// Contact Info Schema
const contactInfoCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/contactInfo', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    findUsTitle: z.string(),
    businessName: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    directionsLink: z.string(),
    directionsLabel: z.string(),
    hoursTitle: z.string(),
    hours: z.array(z.object({
      day: z.string(),
      hours: z.string(),
      highlight: z.boolean().default(false),
    })),
    hoursNote: z.string(),
    contactTitle: z.string(),
    phoneLabel: z.string().optional(),
    phone: z.string(),
    phoneHref: z.string(),
    phone2Label: z.string().optional(),
    phone2: z.string().optional(),
    phone2Href: z.string().optional(),
    emailLabel: z.string().optional(),
    email: z.string().optional(),
    followUsTitle: z.string().optional(),
    instagramHandle: z.string(),
    instagramLink: z.string(),
    tiktokHandle: z.string().optional(),
    tiktokLink: z.string().optional(),
    facebookLink: z.string().optional(),
  }),
});

// Footer Schema
const footerCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/footer', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    brandName: z.string(),
    address: z.string(),
    copyright: z.string(),
    socialLinks: z.array(z.object({
      platform: z.string(),
      url: z.string(),
      label: z.string(),
    })),
    quickLinks: z.array(z.object({
      href: z.string(),
      label: z.string(),
    })),
  }),
});

// SEO Schema
const seoCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/seo', generateId: ({ entry }) => entry.replace(/\.json$/, '') }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = {
  siteSettings: siteSettingsCollection,
  navigation: navigationCollection,
  infoBanner: infoBannerCollection,
  hero: heroCollection,
  about: aboutCollection,
  services: servicesCollection,
  servicesSettings: servicesSettingsCollection,
  testimonials: testimonialsCollection,
  testimonialsSettings: testimonialsSettingsCollection,
  gallery: galleryCollection,
  booking: bookingCollection,
  contactInfo: contactInfoCollection,
  footer: footerCollection,
  seo: seoCollection,
};
