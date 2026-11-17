import { expect } from '../shared/meridian/rt.mjs';


// Shared flow "login_employee" (login)
export async function loginEmployee(m, at, b) {
  await m.step(at + '.f1', b, async page => {
    await page.goto(m.t('$DS_WEBSITE_URL'), { waitUntil: 'domcontentloaded' });
    await m.loaded(page);
  });
  await m.step(at + '.f2', b, async page => {
    await page.getByRole('textbox', { name: 'Company Code' }).fill(m.t('$DS_WEBSITE_COMPANY_CODE'));
    await page.getByRole('textbox', { name: 'Email Address' }).fill(m.t('$DS_PERSONA_WEBSITE_EMPLOYEE_USERNAME'));
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env['DS_PERSONA_WEBSITE_EMPLOYEE_PASSWORD']);
  });
  await m.step(at + '.f3', b, page => page.getByRole('button', { name: 'Sign In' }).click());
  await m.step(at + '.f4', b, page => expect(page).toHaveURL(/\/dashboard/));
}
