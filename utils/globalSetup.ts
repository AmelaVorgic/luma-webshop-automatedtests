import { chromium, FullConfig } from '@playwright/test';
import { registerNewTestUser } from './auth_user_methods';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const skipSetup = process.env.SKIP_GLOBAL_SETUP === 'true';

  if (skipSetup) {
    return;
  }

  await page.context().storageState({
    path: path.resolve(__dirname, 'auth', 'user.json'),
  });

  await browser.close();
}

export default globalSetup;
