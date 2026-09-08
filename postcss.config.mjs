import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Tailwind 3's PostCSS plugin keeps the existing design without the retired Astro integration.
export default { plugins: [tailwind(), autoprefixer()] };
