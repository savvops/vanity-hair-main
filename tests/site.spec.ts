import { test, expect } from '@playwright/test';

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`page, links, images and navigation at ${width}px`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
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
