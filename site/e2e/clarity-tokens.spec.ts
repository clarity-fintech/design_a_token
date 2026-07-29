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
      /clarity-fintech\.com\/.*network=clrty-1.*chainId=1202/,
    );
    // NEVER any other chain on settlement-stamped connect links
    const hrefs = await page.locator('#connect a[href*="chainId="]').evaluateAll((els) =>
      els.map((a) => (a as HTMLAnchorElement).href),
    );
    for (const href of hrefs) {
      expect(href, href).toMatch(/chainId=1202/);
      expect(href, href).not.toMatch(/chainId=(?!1202)\d+/);
      expect(href, href).toMatch(/network=clrty-1/);
    }
    await expect(page.getByText(/192 programs|Pack backlinks|All backlinks connected/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Full pack/i })).toBeVisible();
    await expect(page.locator('#connectMesh')).toBeVisible();
  });

  test('CLRTY-1 only — live RPC 0x4b2 and no foreign chain stamps', async ({ page, request }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#clrty1-routing').scrollIntoViewIfNeeded();
    await expect(page.getByText(/1202|0x4b2|clrty-1/i).first()).toBeVisible();
    await expect(page.getByText(/Never any other chain/i).first()).toBeVisible();

    const stamped = await page.locator('a[href*="chainId="]').evaluateAll((els) =>
      els.map((a) => (a as HTMLAnchorElement).href),
    );
    expect(stamped.length).toBeGreaterThan(0);
    for (const href of stamped) {
      expect(href).toMatch(/chainId=1202/);
      expect(href).not.toMatch(/chainId=(1|5|56|137|8453|42161)(?:&|$)/);
      if (href.includes('network=')) expect(href).toMatch(/network=clrty-1/);
    }

    const rpc = await request.post('https://rpc.clarity-fintech.com', {
      data: { jsonrpc: '2.0', id: 1, method: 'eth_chainId', params: [] },
      headers: { 'content-type': 'application/json' },
    });
    expect(rpc.ok()).toBeTruthy();
    const body = await rpc.json();
    expect(body.result).toBe('0x4b2');
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
