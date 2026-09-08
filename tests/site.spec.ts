import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`page, links, images and navigation at ${width}px`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const info = await page.locator('#info').boundingBox();
    expect(info!.height).toBeLessThanOrEqual(width < 768 ? 175 : 110);
    const anchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!));
    for (const anchor of new Set(anchors)) await expect(page.locator(anchor)).toHaveCount(1);
    if (width < 1024) {
      const toggle = page.getByRole('button', { name: 'Open navigation menu' });
      await toggle.click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(toggle).toBeFocused();
      await toggle.click();
      await page.locator('#mobile-menu').getByRole('link', { name: 'Book Now', exact: true }).click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    }
    await page.locator('#book').scrollIntoViewIfNeeded();
    const contact = page.locator('#book');
    await expect(contact.getByRole('link', { name: 'Call Now', exact: true })).toHaveAttribute('href', 'tel:2049981115');
    await expect(contact.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:nardosfiker@yahoo.com');
    const sources = await page.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')!));
    for (const src of new Set(sources)) {
      const response = await request.get(src);
      expect(response.ok(), src).toBe(true);
      expect(response.headers()['content-type'], src).toMatch(/^image\//);
    }
    expect(errors).toEqual([]);
  });
}

test('gallery navigation, backdrop close, focus return and local video', async ({ page }) => {
  await page.goto('/');
  const firstPhoto = page.getByRole('button', { name: 'View Fresh haircut style 1', exact: true });
  await firstPhoto.click();
  const dialog = page.getByRole('dialog', { name: 'Gallery viewer' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('#gallery-lightbox-media img')).toHaveJSProperty('complete', true);
  await page.getByRole('button', { name: 'Next gallery item' }).click();
  await expect(page.locator('#gallery-lightbox-caption')).toHaveText('Fresh haircut style 2');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(firstPhoto).toBeFocused();
  await firstPhoto.click();
  await page.locator('[data-gallery-backdrop]').click({ position: { x: 5, y: 5 } });
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'Play Curly haircut transformation' }).click();
  const video = page.locator('#gallery-lightbox-media video');
  await expect(video).toBeVisible();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState)).toBeGreaterThanOrEqual(2);
  await page.getByRole('button', { name: 'Close gallery viewer' }).click();
  await expect(video).toHaveCount(0);
  await page.getByRole('button', { name: 'Play Fresh cut video 1 on TikTok', exact: true }).click();
  await expect(page.locator('#gallery-lightbox-media iframe')).toHaveAttribute('src', /tiktok.com\/player\/v1\/7670224662470642951/);
  await page.getByRole('button', { name: 'Close gallery viewer' }).click();
  await expect(page.locator('#gallery-lightbox-media iframe')).toHaveCount(0);
});

for (const width of [375, 1440]) {
  test(`navbar hides during scrolling and returns when scrolling stops at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.goto('/');
    const navbar = page.locator('#navbar');
    const duringScroll = await page.evaluate(async () => {
      const timer = setInterval(() => window.scrollBy({ top: 35, behavior: 'instant' }), 40);
      await new Promise(resolve => setTimeout(resolve, 600));
      const bottom = document.querySelector('#navbar')!.getBoundingClientRect().bottom;
      clearInterval(timer);
      return bottom;
    });
    expect(duringScroll).toBeLessThanOrEqual(0);
    await expect(navbar).not.toHaveAttribute('data-scrolling');
    await expect.poll(() => navbar.evaluate(element => element.getBoundingClientRect().top)).toBe(0);

    if (width < 1024) {
      await page.getByRole('button', { name: 'Open navigation menu' }).click();
      await page.mouse.wheel(0, 200);
      await expect(page.locator('#mobile-menu')).toBeVisible();
      await expect(navbar).not.toHaveAttribute('data-scrolling');
      await page.keyboard.press('Escape');
    }
    await navbar.locator('a').first().focus();
    await page.mouse.wheel(0, 200);
    await expect(navbar).not.toHaveAttribute('data-scrolling');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => navbar.evaluate(element => element.getBoundingClientRect().top)).toBe(0);
  });
}

test('motion is optional and content remains visible without JavaScript', async ({ page, browser }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#services').scrollIntoViewIfNeeded();
  const heading = page.locator('#services h2');
  await expect(heading).toBeVisible();
  expect(await heading.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  expect(await page.locator('#navbar').evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJsPage = await context.newPage();
  await noJsPage.goto('http://127.0.0.1:4341/');
  await expect(noJsPage.locator('#services h2')).toBeVisible();
  expect(await noJsPage.locator('#services h2').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
  await context.close();
});

test('secondary routes and search metadata are consistent', async ({ page, request }) => {
  await page.goto('/success/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Confirm your visit with us');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.getByRole('link', { name: 'Contact the Salon' })).toHaveAttribute('href', '/#book');
  await page.goto('/edit/');
  await expect(page.locator('h1')).toBeVisible();
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  expect(sitemap).toContain('https://vanityhairwpg.ca/');
  expect(sitemap).not.toMatch(/\/(edit|success)\//);
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('https://vanityhairwpg.ca/sitemap-index.xml');
  await page.goto('/');
  const resources = await page.locator('script[src], link[rel="stylesheet"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('src') || node.getAttribute('href')));
  expect(resources.join(' ')).not.toMatch(/unpkg|fonts.googleapis/);
});

test('all migrated services, reviews and gallery entries render', async ({ page }) => {
  await page.goto('/');
  const services = readdirSync('src/content/services').filter(file => file.endsWith('.json'));
  for (const file of services) {
    const service = JSON.parse(readFileSync(`src/content/services/${file}`, 'utf8'));
    await expect(page.locator('#services').getByRole('heading', { name: service.title, exact: true })).toHaveCount(1);
  }
  const testimonials = readdirSync('src/content/testimonials').filter(file => file.endsWith('.json'));
  for (const file of testimonials) {
    const review = JSON.parse(readFileSync(`src/content/testimonials/${file}`, 'utf8'));
    await expect(page.locator('#testimonials').getByText(review.author, { exact: true })).toHaveCount(1);
  }
  const gallery = JSON.parse(readFileSync('src/content/gallery/settings.json', 'utf8'));
  await expect(page.locator('[data-gallery-type="image"]')).toHaveCount(gallery.images.length);
  await expect(page.locator('[data-gallery-item]')).toHaveCount(gallery.images.length + gallery.videos.length + gallery.instagramVideos.length);
  await expect(page.locator('#navbar img')).toHaveAttribute('alt', /flowing hair/);
});

test('legacy admin reaches the current editor on mobile without old login scripts', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/admin/');
  await expect(page).toHaveURL(/\/edit\//);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('script[src*="netlify"], script[src*="decap"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Open PagesCMS Editor' })).toHaveAttribute('href', 'https://app.pagescms.org/savvops/vanity-hair-main');
});

test('CMS fields match existing JSON data and upload directories', () => {
  const cms = YAML.parse(readFileSync('.pages.yml', 'utf8'));
  expect(cms.media.map((media: { input: string }) => media.input)).toEqual(['public/images', 'public/videos']);
  const validate = (fields: any[], data: Record<string, unknown>) => {
    for (const field of fields) {
      expect(field.type).not.toBe('list');
      if (field.list && data[field.name] !== undefined) {
        expect(Array.isArray(data[field.name]), field.name).toBe(true);
        for (const item of data[field.name] as Record<string, unknown>[]) validate(field.fields || [], item);
      }
    }
  };
  for (const entry of cms.content) {
    const files = entry.type === 'file' ? [entry.path] : readdirSync(entry.path).filter(file => file.endsWith('.json')).map(file => `${entry.path}/${file}`);
    expect(files.length, entry.name).toBeGreaterThan(0);
    for (const file of files) validate(entry.fields, JSON.parse(readFileSync(file, 'utf8')));
  }
});
