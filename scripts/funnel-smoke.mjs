import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:3000/vi/reading';

const errors = [];
const consoleEntries = [];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
page.on('pageerror', (err) => {
  errors.push(`pageerror: ${err.message}\n${err.stack ?? ''}`);
});
page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleEntries.push(`[${msg.type()}] ${msg.text()}`);
  }
});
page.on('requestfailed', (req) => {
  errors.push(`requestfailed: ${req.url()} → ${req.failure()?.errorText}`);
});

const log = (label) => console.log(`\n===== ${label} =====`);

log('LOAD /vi/reading');
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });

// Step 0 — TopicSelect: click first topic option
log('STEP 0 → 1 (pick topic)');
await page.waitForSelector('[role="radio"], button[type="button"]', { timeout: 5000 });
// Click the first topic radio
const topicBtn = await page.$$('button[type="button"]');
console.log(`  buttons found at step 0: ${topicBtn.length}`);
// Pick first card option
await page.evaluate(() => {
  const buttons = Array.from(document.querySelectorAll('button[type="button"]'));
  const opt = buttons.find((b) => b.textContent && b.textContent.trim().length > 5);
  opt?.click();
});
await new Promise((r) => setTimeout(r, 600));
// Click the "next" CTA (CTA is the last button)
await page.evaluate(() => {
  const ctas = Array.from(document.querySelectorAll('button[type="button"]'));
  ctas[ctas.length - 1]?.click();
});
await new Promise((r) => setTimeout(r, 1500));

log('STEP 1 → 2 (pick 3 cards)');
// Click 3 card buttons. Cards are likely <button> with hidden state; click 3 first ones.
for (let i = 0; i < 3; i++) {
  await page.evaluate((idx) => {
    const cards = Array.from(document.querySelectorAll('[aria-label]')).filter((el) =>
      el.tagName === 'BUTTON',
    );
    cards[idx]?.click();
  }, i);
  await new Promise((r) => setTimeout(r, 400));
}
await new Promise((r) => setTimeout(r, 800));
// Click "See your reading" CTA
await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('button'));
  const cta = all[all.length - 1];
  cta?.click();
});
await new Promise((r) => setTimeout(r, 2500));

log('STEP 2 → 3 (soft CTA)');
await page.evaluate(() => {
  // Click the soft CTA button (last button at this step)
  const all = Array.from(document.querySelectorAll('button[type="button"]'));
  all[all.length - 1]?.click();
});
await new Promise((r) => setTimeout(r, 800));

log('STEP 3 (input flow — 4 sub-steps)');
for (let s = 0; s < 4; s++) {
  await page.evaluate(() => {
    // Pick first option
    const radios = Array.from(document.querySelectorAll('button[type="button"]'));
    const opt = radios.find((b) => b.textContent && !/Next|Tiếp|다음|Result|확인|Xem/i.test(b.textContent));
    opt?.click();
  });
  await new Promise((r) => setTimeout(r, 300));
  // For sub-step 3, the salary is a <select>
  await page.evaluate(() => {
    const sel = document.querySelector('select');
    if (sel) {
      const opts = sel.querySelectorAll('option');
      if (opts.length > 1) {
        sel.value = opts[1].value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
  await new Promise((r) => setTimeout(r, 300));
  // Click next CTA
  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('button[type="button"]'));
    all[all.length - 1]?.click();
  });
  await new Promise((r) => setTimeout(r, 600));
}
await new Promise((r) => setTimeout(r, 3000));

log('STEP 4 (TeaserResult — paywall)');
const step4Html = await page.evaluate(() => document.body.innerText.slice(0, 800));
console.log(step4Html);
// Click pay CTA (last button)
await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('button[type="button"]'));
  all[all.length - 1]?.click();
});
await new Promise((r) => setTimeout(r, 2500));

log('STEP 5 (PaidResult)');
const step5Html = await page.evaluate(() => document.body.innerText.slice(0, 1500));
console.log(step5Html);

log('ERRORS / CONSOLE');
if (errors.length === 0 && consoleEntries.length === 0) {
  console.log('NO ERRORS');
} else {
  for (const e of errors) console.log(e);
  for (const c of consoleEntries) console.log(c);
}

await browser.close();
