import { test as setup } from '@playwright/test';
import { Meridian } from '../shared/meridian/rt.mjs';
import { loginHr } from '../flows/login-hr';

// Signs in once for the whole run; the specs reuse the session it saves (rt.mjs signIn).
setup('sign in: login_hr', async ({ browser }, info) => {
  const m = new Meridian({ browser, info, slug: 'setup-login-hr' });
  await m.phase(0, 'login_hr', () => loginHr(m, 'login_hr', 'hr'), { pass: true });
  await m.saveSession('hr', 'login_hr');
  await m.end();
});
