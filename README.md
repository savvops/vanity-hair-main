# Vanity Hair & Aesthetics Website

A premium barbershop website built with Astro, Tailwind CSS, and real Instagram content.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
```

Build output is in `dist/` folder.

## 🌐 Deploy to Cloudflare Pages

### Option 1: Drag & Drop (Easiest)
1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Select "Upload assets"
4. Drag and drop the `dist/` folder
5. Your site will be live at `https://vanityhair.pages.dev`

### Option 2: Git Integration
1. Push this repo to GitHub
2. Connect GitHub repo to Cloudflare Pages
3. Auto-deploy on every push

### Option 3: Wrangler CLI
```bash
npx wrangler pages deploy dist --project-name=vanityhair
```

## 📁 Project Structure

```
vanity-hair-astro/
├── src/
│   ├── components/
│   │   └── sections/     # Page sections (Hero, About, Services, etc.)
│   ├── layouts/
│   │   └── Layout.astro  # Base layout with SEO
│   ├── pages/
│   │   └── index.astro   # Homepage
│   └── styles/
│       └── global.css    # Tailwind + custom CSS
├── public/
│   └── images/           # Instagram photos
└── dist/                 # Build output
```

## 🎨 Design

- **Primary Color:** Gold (#d4af37)
- **Background:** Rich Black (#0a0a0a)
- **Typography:** Playfair Display (headings), Inter (body)

## 📞 Business Info

- **Name:** Vanity Hair & Aesthetics
- **Address:** 432 Graham Ave, Winnipeg, MB
- **Phone:** (204) 998-1115, (204) 956-5797
- **Instagram:** [@vanity.hair.204](https://www.instagram.com/vanity.hair.204/)
- **Facebook:** [vanityhairwpg](https://www.facebook.com/vanityhairwpg/)

## 📝 Features

- ✅ Responsive design
- ✅ Real Instagram photos
- ✅ Booking form
- ✅ Service menu with pricing
- ✅ Gallery section
- ✅ Testimonials
- ✅ SEO optimized
- ✅ Fast performance (Astro static build)
