import { test } from '@playwright/test';
import { Meridian, expect } from '../shared/meridian/rt.mjs';
import { loginEmployee } from '../flows/login-employee';
import testData from '../data/employee-submits-leave-manager-approves-employee-verifies-sa.json';

test('Employee submits leave, Manager approves, Employee verifies saved status', { annotation: { type: 'leaves_data', description: 'The UI cancellation leaves a Cancelled request and leave_approval_log history; the leave row is FK-referenced and cannot be deleted from dbo.leaves. Each run uses a unique QA Leave approval {{uid}} reason and cancellation removes it from active Upcoming Leaves, so cancelled history does not block a rerun.' } }, async ({ browser }, info) => {
  const m = new Meridian({ browser, info, slug: 'employee-submits-leave-manager-approves-employee-verifies-sa', steps: {"0":[null,"Phase: Employee submits and sees a pending leave request"],"1":[null,"Phase: Manager approves the marked request"],"2":[null,"Phase: Employee reopens Leave Management and verifies approval"],"3":[null,"Phase: Always-run cleanup: Employee cancels the unique leave"],"0/s41":["employee","Shared flow login_employee (sign-in) as Employee"],"0/s41.f1":["employee","Go to the Website site"],"0/s41.f2":["employee","Type ‹Website Company Code› into Company Code; Type the Website Employee user name into Email Address; Type the Website Employee password (saved, never shown) into Password"],"0/s41.f3":["employee","Click the Sign In button"],"0/s41.f4":["employee","✔ Check that the page address contains /dashboard"],"0/s5":["employee","Go to the Website site, page /leaves"],"0/s42":["employee","Note the text of Paid leave balance before submitting the request as paid_balance_before"],"0/s6":["employee","Click the Apply for Leave button"],"0/s7":["employee","Click the Leave Type dropdown"],"0/s8":["employee","Click the dropdown option whose name starts with Paid Leave"],"0/s9":["employee","✔ Check that the Leave Type dropdown has the value containing Paid Leave"],"0/s10":["employee","Type ‹leave_date of current data› into Start Date; Type ‹leave_date of current data› into End Date; Type QA Leave approval ‹a value unique to this run› into Reason"],"0/s11":["employee","Click the Submit for Approval button"],"0/s12":["employee","✔ Check that the alert has the text Leave application submitted for approval!"],"0/s13":["employee","Click the Pending button"],"0/s14":["employee","✔ Check that the table row with ‹leave_date_shown of current data› → ‹leave_date_shown of current data› shows up exactly 1 time; ✔ Check that the paid table cell in the table row with ‹leave_date_shown of current data› → ‹leave_date_shown of current data› is visible; ✔ Check that the ‹leave_date_sho"],"0/s43":["employee","✔ Check that the paragraph in the element .. in the text paid has the text ‹saved paid_balance_before›"],"1/s15":["manager","Go to the Website site"],"1/s16":["manager","Type ‹Website Company Code› into Company Code; Type the Website Manager user name into Email Address; Type the Website Manager password (saved, never shown) into Password"],"1/s17":["manager","Click the Sign In button"],"1/s18":["manager","✔ Check that the page address contains /dashboard"],"1/s19":["manager","Go to the Website site, page /leaves"],"1/s20":["manager","Click the My Approvals tab"],"1/s21":["manager","Click the Pending button"],"1/s22":["manager","Type QA Leave approval ‹a value unique to this run› into the Search… search field"],"1/s23":["manager","✔ Check that the table row with QA Leave approval ‹a value unique to this run› shows up exactly 1 time; ✔ Check that the Pending table cell in the table row with QA Leave approval ‹a value unique to this run› is visible; ✔ Check that the Approve button in the table row with QA Leave approval ‹a valu"],"1/s24":["manager","Click the Approve button in the table row with QA Leave approval ‹a value unique to this run›"],"1/s38":["manager","✔ Check that the Approve this leave request? dialog is visible; ✔ Check that the Approve this leave request? dialog contains the text testuser4; ✔ Check that the Approve this leave request? dialog contains the text ‹leave_date_shown of current data› → ‹leave_date_shown of current data›; ✔ Check that"],"1/s39":["manager","Click the Approve button in the dialog"],"2/s25":["employee","Go to the Website site, page /leaves"],"2/s26":["employee","Click the Approved button"],"2/s27":["employee","✔ Check that the table row with ‹leave_date_shown of current data› → ‹leave_date_shown of current data› shows up exactly 1 time; ✔ Check that the paid table cell in the table row with ‹leave_date_shown of current data› → ‹leave_date_shown of current data› is visible; ✔ Check that the ‹leave_date_sho"],"3/s28":["employee","Go to the Website site, page /cancellation"],"3/s40":["employee","✔ Check that the Leave Cancellation heading is visible"],"3/s29":["employee","Click the dropdown"],"3/s30":["employee","If the dropdown option named like ^PAID \\(18 Nov 2027 to 18 Nov 2027\\) — (Pending|Approved)$ is visible for Employee"],"3/s31":["employee","Click the dropdown option named like ^PAID \\(18 Nov 2027 to 18 Nov 2027\\) — (Pending|Approved)$"],"3/s32":["employee","Type Cleanup QA Leave approval ‹a value unique to this run› into Reason for Cancellation"],"3/s33":["employee","Click the Cancel Leave button"],"3/s34":["employee","Click the Cancel Leave button in the dialog"],"3/s36":["employee","Click the dropdown"],"3/s37":["employee","✔ Check that there is no dropdown option named like ^PAID \\(18 Nov 2027 to 18 Nov 2027\\) — (Pending|Approved)$"]} });
  m.useData({ data: testData });
  await m.phase(0, 'Employee submits and sees a pending leave request', async () => {
    // meridian-note: long_test: this intentionally covers the required four-stage cross-persona UI journey (Employee submits, Manager confirms approval, Employee reopens and checks persisted status, then always-run Employee cleanup).
    await m.block('0/s41', () => m.signIn('employee', 'login_employee', () => loginEmployee(m, '0/s41', 'employee'), page => expect(page).toHaveURL(/\/dashboard/)));
    await m.step('0/s5', 'employee', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/leaves'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: brittle_selector: the paid-balance card has no accessible group name; use its uniquely matching paid label to scope the sibling balance paragraph.
    await m.step('0/s42', 'employee', async page => {
      m.v["paid_balance_before"] = await m.read(page.getByText(/^paid$/).locator('..').getByRole('paragraph'));
    });
    await m.step('0/s6', 'employee', page => page.getByRole('button', { name: 'Apply for Leave' }).click());
    await m.step('0/s7', 'employee', page => page.getByRole('combobox', { name: 'Leave Type' }).click());
    await m.step('0/s8', 'employee', page => page.getByRole('option', { name: /^Paid Leave/ }).click());
    await m.step('0/s9', 'employee', page => expect(page.getByRole('combobox', { name: 'Leave Type' })).toHaveValue(/Paid Leave/));
    await m.step('0/s10', 'employee', async page => {
      await page.getByRole('textbox', { name: 'Start Date' }).fill(m.t('{{data.leave_date}}'));
      await page.getByRole('textbox', { name: 'End Date' }).fill(m.t('{{data.leave_date}}'));
      await page.getByRole('textbox', { name: 'Reason' }).fill(m.t('QA Leave approval {{uid}}'));
    });
    await m.step('0/s11', 'employee', page => page.getByRole('button', { name: 'Submit for Approval' }).click());
    await m.step('0/s12', 'employee', page => expect(page.getByRole('alert')).toHaveText('Leave application submitted for approval!'));
    await m.step('0/s13', 'employee', page => page.getByRole('button', { name: /Pending/ }).click());
    await m.step('0/s14', 'employee', async page => {
      const row = page.getByRole('row').filter({ hasText: m.t('{{data.leave_date_shown}} → {{data.leave_date_shown}}') });
      await expect(row).toHaveCount(1);
      await expect(row.getByRole('gridcell', { name: 'paid', exact: true })).toBeVisible();
      await expect(row.getByRole('gridcell', { name: m.t('{{data.leave_date_shown}} → {{data.leave_date_shown}}'), exact: true })).toBeVisible();
      await expect(row.getByRole('gridcell', { name: '1', exact: true })).toBeVisible();
      await expect(row.getByRole('gridcell', { name: 'Pending', exact: true })).toBeVisible();
    });
    // meridian-note: brittle_selector: the paid-balance card has no accessible group name; use its uniquely matching paid label to scope the sibling balance paragraph.
    await m.step('0/s43', 'employee', page => expect(page.getByText(/^paid$/).locator('..').getByRole('paragraph')).toHaveText(m.t('{{paid_balance_before}}')));
  });
  await m.phase(1, 'Manager approves the marked request', async () => {
    await m.step('1/s15', 'manager', async page => {
      await page.goto(m.t('$DS_WEBSITE_URL'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('1/s16', 'manager', async page => {
      await page.getByRole('textbox', { name: 'Company Code' }).fill(m.t('$DS_WEBSITE_COMPANY_CODE'));
      await page.getByRole('textbox', { name: 'Email Address' }).fill(m.t('$DS_PERSONA_WEBSITE_MANAGER_USERNAME'));
      await page.getByRole('textbox', { name: 'Password' }).fill(process.env['DS_PERSONA_WEBSITE_MANAGER_PASSWORD']);
    });
    await m.step('1/s17', 'manager', page => page.getByRole('button', { name: 'Sign In' }).click());
    await m.step('1/s18', 'manager', page => expect(page).toHaveURL(/\/dashboard/));
    await m.step('1/s19', 'manager', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/leaves'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('1/s20', 'manager', page => page.getByRole('tab', { name: /My Approvals/ }).click());
    await m.step('1/s21', 'manager', page => page.getByRole('button', { name: /Pending/ }).click());
    await m.step('1/s22', 'manager', page => page.getByRole('searchbox', { name: 'Search…' }).fill(m.t('QA Leave approval {{uid}}')));
    await m.step('1/s23', 'manager', async page => {
      const row = page.getByRole('row').filter({ hasText: m.t('QA Leave approval {{uid}}') });
      await expect(row).toHaveCount(1);
      await expect(row.getByRole('gridcell', { name: 'Pending', exact: true })).toBeVisible();
      await expect(row.getByRole('button', { name: 'Approve', exact: true })).toBeVisible();
    });
    await m.step('1/s24', 'manager', page => page.getByRole('row').filter({ hasText: m.t('QA Leave approval {{uid}}') }).getByRole('button', { name: 'Approve', exact: true }).click());
    await m.step('1/s38', 'manager', async page => {
      const dialog = page.getByRole('dialog', { name: 'Approve this leave request?' });
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText('testuser4');
      await expect(dialog).toContainText(m.t('{{data.leave_date_shown}} → {{data.leave_date_shown}}'));
      await expect(dialog).toContainText(m.t('QA Leave approval {{uid}}'));
    });
    await m.step('1/s39', 'manager', page => page.getByRole('dialog').getByRole('button', { name: 'Approve', exact: true }).click());
  });
  await m.phase(2, 'Employee reopens Leave Management and verifies approval', async () => {
    await m.step('2/s25', 'employee', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/leaves'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('2/s26', 'employee', page => page.getByRole('button', { name: /Approved/ }).click());
    await m.step('2/s27', 'employee', async page => {
      const row = page.getByRole('row').filter({ hasText: m.t('{{data.leave_date_shown}} → {{data.leave_date_shown}}') });
      await expect(row).toHaveCount(1);
      await expect(row.getByRole('gridcell', { name: 'paid', exact: true })).toBeVisible();
      await expect(row.getByRole('gridcell', { name: m.t('{{data.leave_date_shown}} → {{data.leave_date_shown}}'), exact: true })).toBeVisible();
      await expect(row.getByRole('gridcell', { name: '1', exact: true })).toBeVisible();
      await expect(row.getByRole('gridcell', { name: 'Approved', exact: true })).toBeVisible();
    });
  }, { pass: true });
  await m.phase(3, 'Always-run cleanup: Employee cancels the unique leave', async () => {
    await m.step('3/s28', 'employee', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/cancellation'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('3/s40', 'employee', page => expect(page.getByRole('heading', { name: 'Leave Cancellation' })).toBeVisible());
    await m.step('3/s29', 'employee', page => page.getByRole('combobox').click());
    if (await m.block('3/s30', async () => { const page = await m.open('employee', null); return await m.isVisible(page.getByRole('option', { name: /^PAID \(18 Nov 2027 to 18 Nov 2027\) — (Pending|Approved)$/ })); })) {
      await m.step('3/s31', 'employee', page => page.getByRole('option', { name: /^PAID \(18 Nov 2027 to 18 Nov 2027\) — (Pending|Approved)$/ }).click());
      await m.step('3/s32', 'employee', page => page.getByRole('textbox', { name: 'Reason for Cancellation' }).fill(m.t('Cleanup QA Leave approval {{uid}}')));
      await m.step('3/s33', 'employee', page => page.getByRole('button', { name: 'Cancel Leave' }).click());
      await m.step('3/s34', 'employee', page => page.getByRole('dialog').getByRole('button', { name: 'Cancel Leave' }).click());
      await m.step('3/s36', 'employee', page => page.getByRole('combobox').click());
    }
    await m.step('3/s37', 'employee', page => expect(page.getByRole('option', { name: /^PAID \(18 Nov 2027 to 18 Nov 2027\) — (Pending|Approved)$/ })).toHaveCount(0));
  }, { always: true });
  await m.end();
});
