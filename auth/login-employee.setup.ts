import { test as setup } from '@playwright/test';
import { Meridian } from '../shared/meridian/rt.mjs';
import { loginEmployee } from '../flows/login-employee';

// Signs in once for the whole run; the specs reuse the session it saves (rt.mjs signIn).
setup('sign in: login_employee', async ({ browser }, info) => {
  const m = new Meridian({ browser, info, slug: 'setup-login-employee' });
  await m.phase(0, 'login_employee', () => loginEmployee(m, 'login_employee', 'employee'), { pass: true });
  await m.saveSession('employee', 'login_employee');
  await m.end();
});
