import { test, expect } from '@playwright/test';

test.describe('CLRTY Token Extensions landing', () => {
  test('hero brand, slideshow, and SEO title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/CLRTY Token Extensions/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/CLARITY/i);
    await expect(page.locator('#hero p.section-kicker, #hero .section-kicker').first()).toBeVisible();
    await expect(page.getByText(/Create Any Digital Asset/i).first()).toBeVisible();
    await expect(page.getByText(/Everywhere on CLRTY-1/i).first()).toBeVisible();
    await expect(page.locator('#hero-slideshow')).toBeVisible();
    await expect(page.getByRole('link', { name: /Explore extensions/i })).toBeVisible();
  });

  test('live stats showcase and asset marquee', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#stats').scrollIntoViewIfNeeded();
    await expect(page.getByText(/All the asset infrastructure you need/i)).toBeVisible();
    await expect(page.getByText(/Nano Tasks/i).first()).toBeVisible();
    await page.locator('#asset-marquee').scrollIntoViewIfNeeded();
    await expect(page.locator('#asset-marquee')).toContainText(/stablecoins|RWA|currencies/i);
  });

  test('extension framework and interactive SDK', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#extensions').scrollIntoViewIfNeeded();
    await expect(page.getByText(/Confidential Transfers/i).first()).toBeVisible();
    await page.locator('#sdk').scrollIntoViewIfNeeded();
    await expect(page.locator('#sdk-sandbox-panel')).toBeVisible();
    await page.locator('#sdk-sandbox-panel').getByRole('button', { name: '.mis', exact: true }).click();
    await expect(page.locator('#sdk-mis')).toBeVisible();
  });

  test('mis playground language modes and categories', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#mis-framework').scrollIntoViewIfNeeded();
    await expect(page.locator('#mis-playground-editor')).toBeVisible();
    await page.getByRole('button', { name: /Python \(tagged\)/i }).click();
    await expect(page.locator('#mis-playground-editor')).toContainText(/@CLRTY\.TokenExtensions/);
    await page.locator('#categories').scrollIntoViewIfNeeded();
    await expect(page.getByText(/HELIX Integration/i)).toBeVisible();
  });

  test('nanotasks CTE100 and connect mesh to CLRTY-1', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#nanotasks').scrollIntoViewIfNeeded();
    await expect(page.getByText(/CTE001/i).first()).toBeVisible();
    await expect(page.getByText(/CTE091/i).first()).toBeVisible();
    await page.locator('#connect').scrollIntoViewIfNeeded();
    await expect(page.getByRole('link', { name: 'CLRTY-1 RPC' }).first()).toHaveAttribute(
      'href',
      /rpc\.clarity-fintech\.com.*network=clrty-1.*chainId=1202/,
    );
    await expect(page.getByRole('link', { name: 'Clarity Home' }).first()).toHaveAttribute(
      'href',
      /clarity-fintech\.com\/.*network=clrty-1/,
    );
    await expect(page.getByText(/192 programs|Pack backlinks|All backlinks connected/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Full pack/i })).toBeVisible();
    await expect(page.locator('#connectMesh')).toBeVisible();
  });

  test('coding walkthroughs and database E mesh', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#walkthroughs').scrollIntoViewIfNeeded();
    await expect(page.getByText(/From/i).first()).toBeVisible();
    await expect(page.locator('#walkthrough-wt-create')).toBeVisible();
    await page.getByRole('button', { name: /Index · Notion · search engines/i }).click();
    await expect(page.locator('#walkthrough-wt-index')).toBeVisible();
    await expect(page.getByText(/Hash & @ tracing/i)).toBeVisible();
  });

  test('latency watchdog and launch CTA', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#hero-latency-watchdog')).toBeVisible();
    await page.locator('#launch').scrollIntoViewIfNeeded();
    await expect(page.locator('#launch').getByRole('link', { name: 'Build with CLRTY', exact: true })).toBeVisible();
  });

  test('developer docs protocol walkthrough', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const docs = page.locator('#developer-docs');
    await docs.scrollIntoViewIfNeeded();
    await expect(docs.getByRole('heading', { name: /Developer Documentation/i })).toBeVisible();
    await expect(docs.getByText(/Related stack/i).first()).toBeVisible();
    await docs.getByRole('button', { name: /04\s+Confidential Transfer/i }).click();
    await expect(page.locator('#doc-confidential')).toBeVisible();
    await page.locator('#doc-confidential').getByRole('button', { name: 'SDK', exact: true }).click();
    await expect(page.locator('#doc-confidential')).toContainText(/CLRTY|@clrty|confidential/i);
    await expect(docs.getByRole('link', { name: /MIRRA/i }).first()).toBeVisible();
  });
});
