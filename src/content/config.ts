import { defineCollection, z } from 'astro:content';

// Site Settings Schema
const siteSettingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
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
  type: 'data',
  schema: z.object({
    id: z.string(),
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
  type: 'data',
  schema: z.object({
    id: z.string(),
    items: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      content: z.string(),
    })),
  }),
});

// Hero Schema
const heroCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
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
  type: 'data',
  schema: z.object({
    id: z.string(),
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
  type: 'data',
  schema: z.object({
    id: z.string(),
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
  type: 'data',
  schema: z.object({
    id: z.string(),
    heading: z.string(),
    icon: z.string().optional(),
    note: z.string().optional(),
    ctaButton: z.string().optional(),
  }),
});

// Testimonials Schema
const testimonialsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    author: z.string(),
    rating: z.number(),
    time: z.string().optional(),
    text: z.string(),
    order: z.number().default(0),
  }),
});

// Testimonials Settings Schema
const testimonialsSettingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
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
  type: 'data',
  schema: z.object({
    id: z.string(),
    subtitle: z.string(),
    heading: z.string(),
    instagramButton: z.string(),
    instagramLink: z.string(),
    images: z.array(z.object({
      image: z.string(),
      alt: z.string().optional(),
      featured: z.boolean().default(false),
    })),
  }),
});

// Booking Schema
const bookingCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    formTitle: z.string(),
    formSubtitle: z.string(),
    formspreeId: z.string(),
    nameLabel: z.string(),
    namePlaceholder: z.string(),
    phoneLabel: z.string(),
    phonePlaceholder: z.string(),
    serviceLabel: z.string(),
    serviceOptions: z.array(z.object({
      option: z.string(),
    })),
    dateLabel: z.string(),
    timeLabel: z.string(),
    timeOptions: z.array(z.object({
      time: z.string(),
    })),
    submitButton: z.string(),
  }),
});

// Contact Info Schema
const contactInfoCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
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
    phone: z.string(),
    phoneHref: z.string(),
    instagramHandle: z.string(),
    instagramLink: z.string(),
  }),
});

// Footer Schema
const footerCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
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
  type: 'data',
  schema: z.object({
    id: z.string(),
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
