# Window Guys - Astro + Cloudflare Stack

A modern, fast, SEO-optimized website for Window Guys Winnipeg, built with Astro, TypeScript, Tailwind CSS, and deployed on Cloudflare Pages.

## 🚀 Tech Stack

- **Framework**: Astro (Static Site Generation)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **Edge Functions**: Cloudflare Workers
- **Forms**: Cloudflare Worker API endpoint
- **Analytics**: Cloudflare Web Analytics

## 📁 Project Structure

```
├── functions/           # Cloudflare Worker functions
│   └── api/
│       └── quote.ts     # Form submission handler
├── public/              # Static assets
│   ├── _headers         # HTTP headers config
│   ├── _routes.json     # Routing rules
│   └── favicon.svg
├── src/
│   ├── components/      # UI components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # Reusable UI components
│   ├── content/         # Content collections
│   │   ├── services/    # Service data
│   │   ├── reviews/     # Customer reviews
│   │   └── faq/         # FAQ entries
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── styles/          # Global styles
│   └── content.config.ts # Content schema
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── wrangler.toml        # Cloudflare config
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Option 1: Cloudflare Pages (Git Integration)

1. Push to GitHub/GitLab
2. Connect repo in Cloudflare Dashboard
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Option 2: Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist
```

## 📋 Features

- ✅ **SEO Optimized**: Meta tags, Open Graph, JSON-LD schema
- ✅ **Performance**: 100/100 Lighthouse score potential
- ✅ **Responsive**: Mobile-first design
- ✅ **Accessibility**: ARIA labels, semantic HTML
- ✅ **Form Handling**: Cloudflare Worker with validation
- ✅ **Content Collections**: Type-safe content management
- ✅ **Animations**: Scroll reveal, counter animations
- ✅ **Security Headers**: CSP, HSTS, XSS protection

## 🔧 Customization

### Adding/Editing Content

Services, reviews, and FAQ are stored as JSON files in `src/content/`. Edit these files to update content.

### Styling

Colors and fonts are configured in `tailwind.config.mjs`. Global styles are in `src/styles/global.css`.

### Forms

Form submissions are handled by `functions/api/quote.ts`. Connect to D1, email service, or webhook as needed.

## 📄 License

MIT
