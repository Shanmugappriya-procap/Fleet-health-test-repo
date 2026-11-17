import { test } from '@playwright/test';
import { Meridian, expect } from '../shared/meridian/rt.mjs';
import { loginEmployee } from '../flows/login-employee';

test('Employee cannot access another employee\'s reports', async ({ browser }, info) => {
  const m = new Meridian({ browser, info, slug: 'employee-cannot-access-another-employee-s-reports', steps: {"0":[null,"Phase: Verify employee report is scoped to current employee"],"0/s11":["employee","Shared flow login_employee (sign-in) as Employee"],"0/s11.f1":["employee","Go to the Website site"],"0/s11.f2":["employee","Type ‹Website Company Code› into Company Code; Type the Website Employee user name into Email Address; Type the Website Employee password (saved, never shown) into Password"],"0/s11.f3":["employee","Click the Sign In button"],"0/s11.f4":["employee","✔ Check that the page address contains /dashboard"],"0/s12":["employee","✔ Check that the page address contains dashboard"],"0/s4":["employee","Go to the Website site, page /reports"],"0/s5":["employee","✔ Check that the Executive Dashboard heading is visible"],"0/s7":["employee","Click the Employees link in the main content area"],"0/s10":["employee","Click the Employee Master button"],"0/s8":["employee","✔ Check that the page address contains /reports/employees?report=employee-master; ✔ Check that the Employee Analytics heading is visible; ✔ Check that the table row with AT004 with ‹Persona Website Employee Username› is visible; ✔ Check that there is no table row with AT005; ✔ Check that the table r"]} });
  await m.phase(0, 'Verify employee report is scoped to current employee', async () => {
    await m.block('0/s11', () => m.signIn('employee', 'login_employee', () => loginEmployee(m, '0/s11', 'employee'), page => expect(page).toHaveURL(/\/dashboard/)));
    await m.step('0/s12', 'employee', page => expect(page).toHaveURL(/dashboard/));
    await m.step('0/s4', 'employee', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/reports'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('0/s5', 'employee', page => expect(page.getByRole('heading', { name: 'Executive Dashboard' })).toBeVisible());
    await m.step('0/s7', 'employee', page => page.getByRole('main').getByRole('link', { name: 'Employees', exact: true }).click());
    await m.step('0/s10', 'employee', page => page.getByRole('button', { name: 'Employee Master' }).click());
    await m.step('0/s8', 'employee', async page => {
      await expect(page).toHaveURL(/\/reports\/employees\?report=employee-master/);
      await expect(page.getByRole('heading', { name: 'Employee Analytics' })).toBeVisible();
      await expect(page.getByRole('row').filter({ hasText: 'AT004' }).filter({ hasText: m.t('$DS_PERSONA_WEBSITE_EMPLOYEE_USERNAME') })).toBeVisible();
      await expect(page.getByRole('row').filter({ hasText: 'AT005' })).toHaveCount(0);
      await expect(page.getByRole('grid').getByRole('row')).toHaveCount(2);
      await expect(page.getByText('1–1 of 1')).toBeVisible();
    });
  }, { pass: true });
  await m.end();
});
