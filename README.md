# Vanity Hair & Esthetics Website

A premium barbershop website built with Astro, Tailwind CSS, and real Instagram content. Now with **Decap CMS** integration for easy content management!

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

## 📝 Content Management (Decap CMS)

This site is configured with Decap CMS for easy content editing without touching code.

### Accessing the CMS

After deploying, go to: `https://your-site.com/admin`

### Setting up Decap CMS

1. **For Netlify:**
   - Enable Identity service in your Netlify dashboard
   - Add users to your Identity instance
   - Enable Git Gateway
   - The CMS will automatically commit changes to your Git repo

2. **For Local Development:**
   - Uncomment `local_backend: true` in `public/admin/config.yml`
   - Run `npx decap-server` (install with `npm install -g decap-server`)
   - Access the CMS at `http://localhost:4321/admin`

### Editable Content

All site content is managed through:
- **`src/content/site.json`** - Main site content (Hero, About, Services, Testimonials, Booking, Footer)
- **`src/content/faq/`** - FAQ items (add/edit via CMS)
- **`src/content/reviews/`** - Additional reviews (add/edit via CMS)
- **`public/images/uploads/`** - Uploaded images

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
│   ├── content/
│   │   ├── site.json     # 📝 Main site content (editable via CMS)
│   │   ├── faq/          # 📝 FAQ items (editable via CMS)
│   │   └── reviews/      # 📝 Review items (editable via CMS)
│   ├── layouts/
│   │   └── Layout.astro  # Base layout with SEO
│   ├── pages/
│   │   └── index.astro   # Homepage
│   └── styles/
│       └── global.css    # Tailwind + custom CSS
├── public/
│   ├── admin/            # 📝 Decap CMS files
│   │   ├── index.html
│   │   └── config.yml
│   └── images/           # Instagram photos
└── dist/                 # Build output
```

## 🎨 Design

- **Primary Color:** Gold (#d4af37)
- **Background:** Rich Black (#0a0a0a)
- **Typography:** Playfair Display (headings), Inter (body)

## 📞 Business Info

- **Name:** Vanity Hair & Esthetics
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
- ✅ **Decap CMS integration for easy content editing**

## 🔧 CMS Configuration

The CMS is configured in `public/admin/config.yml` with:
- **Site Content Collection** - Edit all main site content from one place
- **Reviews Collection** - Add/manage customer reviews
- **FAQ Collection** - Add/manage FAQ items
- **Media uploads** - Upload images to `public/images/uploads/`
