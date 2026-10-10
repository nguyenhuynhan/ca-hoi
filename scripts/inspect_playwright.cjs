const { chromium } = require('C:/Users/nha/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = 'C:/Users/nha/.gemini/antigravity-ide/brain/85eb627f-21df-487a-a782-de61ab6f0fe2/screenshots';
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser with Chrome channel...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  // 1. DESKTOP VIEWPORT
  console.log('Testing Desktop Viewport (1440x900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://127.0.0.1:3005', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_updated.png') });
  console.log('Saved desktop_updated.png');

  // Click whole fish (Nauy Nguyên Con)
  await desktopPage.locator('.left-rail .menu-item-pill', { hasText: 'Nauy Nguyên Con' }).click();
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_whole_fish.png') });
  console.log('Saved desktop_whole_fish.png');

  await desktopContext.close();

  // 2. MOBILE VIEWPORT (iPhone 14: 390x844)
  console.log('Testing Mobile Viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://127.0.0.1:3005', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  // Check left & right rails visibility on mobile
  const leftRailVisible = await mobilePage.locator('.left-rail-overlay').isVisible();
  const rightRailVisible = await mobilePage.locator('.right-rail-overlay').isVisible();
  console.log(`Mobile left rail visible: ${leftRailVisible}, right rail visible: ${rightRailVisible}`);

  const leftItemCount = await mobilePage.locator('.left-rail .menu-item-pill').count();
  const rightItemCount = await mobilePage.locator('.right-rail .menu-item-pill').count();
  console.log(`Mobile left items: ${leftItemCount}, right items: ${rightItemCount}`);

  // Check that "Cân kg" text is removed from left menu
  const canKgTextInMenu = await mobilePage.locator('.left-rail :text("Cân kg")').count();
  console.log(`'Cân kg' text count in left menu: ${canKgTextInMenu} (expected: 0)`);

  // Screenshot mobile initial with both symmetric vertical menus
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_symmetric_menus.png') });
  console.log('Saved mobile_symmetric_menus.png');

  // Click "Nauy Nguyên Con" on left rail
  console.log('Clicking Nauy Nguyên Con on mobile...');
  await mobilePage.locator('.left-rail .menu-item-pill', { hasText: 'Nauy Nguyên Con' }).click();
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_whole_fish_fullwidth.png') });
  console.log('Saved mobile_whole_fish_fullwidth.png');

  // Click recipe on right rail (e.g. "Sashimi Chuẩn Nhật" or "Áp Chảo Sốt Bơ Tỏi")
  console.log('Clicking recipe on right rail...');
  await mobilePage.locator('.right-rail .menu-item-pill').first().click();
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_recipe_modal.png') });
  console.log('Saved mobile_recipe_modal.png');

  await mobileContext.close();
  await browser.close();
  console.log('All inspections completed successfully!');
}

run().catch((err) => {
  console.error('Error running playwright inspection:', err);
  process.exit(1);
});
