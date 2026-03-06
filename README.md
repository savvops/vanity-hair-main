# Vanity Hair & Esthetics

A stunning, editable website for Vanity Hair & Esthetics barbershop in Winnipeg. Built with Astro, Tailwind CSS, and PagesCMS for easy content management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 Content Management with PagesCMS

This website is fully editable through **PagesCMS** - a Git-based CMS that allows you to manage all content through a visual interface.

### Access the Content Editor

1. **Admin Page**: Visit `/edit` on your live site for quick links
2. **PagesCMS**: Go to [app.pagescms.org](https://app.pagescms.org) and connect your GitHub repository

### Editable Content Sections

| Section | Description | File Location |
|---------|-------------|---------------|
| **Site Settings** | Site name, description, logo, contact info | `src/content/siteSettings/settings.json` |
| **Navigation** | Menu items, brand name, CTA button | `src/content/navigation/main.json` |
| **Hero Section** | Homepage headline, subtitle, background | `src/content/homepage/hero.json` |
| **About Section** | About page content, features, image | `src/content/homepage/about.json` |
| **Services** | Service menu items, prices, descriptions | `src/content/services/*.json` |
| **Testimonials** | Customer reviews and ratings | `src/content/testimonials/*.json` |
| **Gallery** | Photo gallery images | `src/content/gallery/settings.json` |
| **Booking Form** | Form fields and options | `src/content/booking/settings.json` |
| **Contact Info** | Address, hours, phone, social links | `src/content/contactInfo/info.json` |
| **Footer** | Footer content and social links | `src/content/footer/settings.json` |
| **SEO Settings** | Page titles, meta descriptions | `src/content/seo/settings.json` |

## 🛠️ Setup Instructions

### For Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/savvops/vanity-hair-main.git
   cd vanity-hair-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run locally**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:4321`

### For Content Editors (PagesCMS Setup)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to PagesCMS**
   - Go to [app.pagescms.org](https://app.pagescms.org)
   - Sign in with GitHub
   - Select the `vanity-hair-main` repository
   - PagesCMS will automatically read the `.pages.yml` configuration

3. **Start Editing**
   - All content sections will appear in the sidebar
   - Make changes and click "Save" - changes are committed to GitHub
   - The site will automatically rebuild and deploy

## 📁 Project Structure

```
vanity-hair-astro/
├── .pages.yml                 # PagesCMS configuration
├── astro.config.mjs           # Astro configuration
├── src/
│   ├── components/
│   │   ├── sections/         # Page sections (Hero, About, etc.)
│   │   └── ui/               # UI components (Button, Icon, etc.)
│   ├── content/              # Editable content (JSON files)
│   │   ├── siteSettings/
│   │   ├── navigation/
│   │   ├── homepage/
│   │   ├── services/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   ├── booking/
│   │   ├── contactInfo/
│   │   ├── footer/
│   │   └── seo/
│   ├── layouts/
│   │   └── Layout.astro      # Base HTML layout
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   └── edit.astro        # Admin/edit page
│   └── styles/
│       └── global.css        # Global styles & Tailwind
├── public/
│   └── images/               # Static images
└── dist/                     # Build output (auto-generated)
```

## 🎨 Tech Stack

- **[Astro](https://astro.build/)** v5+ - Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PagesCMS](https://pagescms.org/)** - Git-based content management
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Hosting & deployment
- **[Lucide Icons](https://lucide.dev/)** - Icon library

## 📝 Making Content Changes

### Method 1: PagesCMS (Recommended for non-developers)

1. Visit [app.pagescms.org](https://app.pagescms.org)
2. Select your repository
3. Click on any content section in the sidebar
4. Edit the fields
5. Click "Save" to commit changes

Changes will be live in 1-2 minutes.

### Method 2: Direct GitHub Editing

1. Navigate to the content file in GitHub (e.g., `src/content/homepage/hero.json`)
2. Click the pencil icon to edit
3. Make your changes
4. Commit with a descriptive message

### Method 3: Local Development

1. Edit files in `src/content/` directory
2. Test changes with `npm run dev`
3. Commit and push: `git add . && git commit -m "Update content" && git push`

## 🔧 Configuration Files

### `.pages.yml`
Defines all content collections for PagesCMS. Each collection specifies:
- Fields and their types
- File locations
- Media upload settings

### `src/content/config.ts`
Astro content collection schemas with Zod validation.

## 🚀 Deployment

This site is configured for **Cloudflare Pages**:

1. Connect your GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Build output: `dist`
4. Automatic deployments on every push to main

## 🖼️ Adding Images

1. Upload images to `public/images/` directory
2. Reference them in content files as `/images/filename.jpg`
3. Supported formats: JPG, PNG, WebP

## 📱 Features

- ✅ Fully responsive design
- ✅ Editable content via PagesCMS
- ✅ SEO optimized with meta tags
- ✅ Schema.org structured data
- ✅ Fast static generation
- ✅ Image optimization
- ✅ Smooth animations
- ✅ Contact form integration (Formspree)

## 🐛 Troubleshooting

### Changes not showing up?
- Check if the JSON syntax is valid
- Verify the file was saved in the correct location
- Allow 1-2 minutes for deployment
- Check Cloudflare Pages build logs

### PagesCMS not loading?
- Ensure `.pages.yml` is in the root directory
- Check that the file is valid YAML
- Verify repository permissions

### Build errors?
- Run `npm run build` locally to see errors
- Check that all content JSON files have valid syntax
- Ensure all referenced images exist

## 📄 License

Private - All rights reserved.

---

Built with ❤️ for Vanity Hair & Esthetics
