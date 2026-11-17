import { test } from '@playwright/test';
import { Meridian, expect } from '../shared/meridian/rt.mjs';
import { loginHr } from '../flows/login-hr';
import { loginEmployee } from '../flows/login-employee';
import { deletePriorHoliday } from '../flows/delete-prior-holiday';

test('Holiday visibility is scoped by employee location', async ({ browser }, info) => {
  const m = new Meridian({ browser, info, slug: 'holiday-visibility-is-scoped-by-employee-location', steps: {"0":[null,"Phase: Kochi-only holiday visibility"],"1":[null,"Phase: HR-location-only holiday visibility"],"2":[null,"Phase: All-locations holiday visibility"],"3":[null,"Phase: Always remove the unique test holiday"],"0/s75":["hr","Shared flow login_hr (sign-in) as Hr"],"0/s75.f1":["hr","Go to the Website site"],"0/s75.f2":["hr","Type ‹Website Company Code› into Company Code; Type the Website Hr user name into Email Address; Type the Website Hr password (saved, never shown) into Password"],"0/s75.f3":["hr","Click the Sign In button"],"0/s75.f4":["hr","✔ Check that the page address contains dashboard"],"0/s62":["hr","Go to the Website site, page /my-profile"],"0/s63":["hr","✔ Check that the heading in the main content area is visible"],"0/s64":["hr","Note the text of HR's own employee profile name as hrDisplayName"],"0/s65":["hr","Go to the Website site, page /employees"],"0/s66":["hr","Type ‹saved hrDisplayName› into the Search by name… text field"],"0/s67":["hr","Click the Edit button in the list item with ‹saved hrDisplayName›"],"0/s68":["hr","Note the text of HR employee's Branch in Edit Employee Details as hrLocation"],"0/s70":["hr","✔ Check that the dropdown in the element .. in the text Branch in the dialog does not have the text Kochi"],"0/s69":["hr","Click the Cancel button in the dialog"],"0/s5":["hr","Go to the Website site, page /holidays"],"0/s7":["hr","Click the Add Holiday button"],"0/s8":["hr","Type QA Holiday ‹a value unique to this run› into Holiday Name; Type ‹today + 1 days› into Date; Untick Common (All Locations); Tick Kochi; Untick HR location"],"0/s9":["hr","Click the dropdown in the dialog"],"0/s10":["hr","Click the Company dropdown option"],"0/s11":["hr","Click the Add Holiday button in the dialog"],"0/s12":["hr","Go to the Website site, page /dashboard"],"0/s13":["hr","✔ Check that the Upcoming Holidays heading is visible; ✔ Check that there is no text QA Holiday ‹a value unique to this run› in the element .. in the Upcoming Holidays heading"],"0/s14":["hr","Go to the Website site, page /holidays"],"0/s15":["hr","Click the dropdown in the main content area"],"0/s16":["hr","Click the Kochi dropdown option"],"0/s17":["hr","✔ Check that the text QA Holiday ‹a value unique to this run› is visible"],"0/s18":["employee","Shared flow login_employee (sign-in) as Employee"],"0/s18.f1":["employee","Go to the Website site"],"0/s18.f2":["employee","Type ‹Website Company Code› into Company Code; Type the Website Employee user name into Email Address; Type the Website Employee password (saved, never shown) into Password"],"0/s18.f3":["employee","Click the Sign In button"],"0/s18.f4":["employee","✔ Check that the page address contains /dashboard"],"0/s19":["employee","Go to the Website site, page /dashboard"],"0/s20":["employee","✔ Check that the Upcoming Holidays heading is visible; ✔ Check that the text QA Holiday ‹a value unique to this run› in the element .. in the Upcoming Holidays heading is visible"],"1/s76":["hr","Shared flow delete_prior_holiday as Hr"],"1/s76.f1":["hr","Go to the Website site, page /holidays"],"1/s76.f2":["hr","Click the dropdown in the main content area"],"1/s76.f3":["hr","Click the All Locations dropdown option"],"1/s76.f4":["hr","Click the button in the element .. in the element .. in the text QA Holiday ‹a value unique to this run›"],"1/s76.f5":["hr","Click the Remove button in the dialog"],"1/s76.f6":["hr","✔ Check that there is no text QA Holiday ‹a value unique to this run›"],"1/s27":["hr","Click the Add Holiday button"],"1/s28":["hr","Type QA Holiday ‹a value unique to this run› into Holiday Name; Type ‹today + 1 days› into Date; Tick HR location; Untick Common (All Locations); Untick Kochi"],"1/s29":["hr","Click the dropdown in the dialog"],"1/s30":["hr","Click the Company dropdown option"],"1/s31":["hr","Click the Add Holiday button in the dialog"],"1/s32":["hr","Go to the Website site, page /dashboard"],"1/s33":["hr","✔ Check that the Upcoming Holidays heading is visible; ✔ Check that the text QA Holiday ‹a value unique to this run› in the element .. in the Upcoming Holidays heading is visible"],"1/s34":["employee","Go to the Website site, page /dashboard"],"1/s35":["employee","✔ Check that the Upcoming Holidays heading is visible; ✔ Check that there is no text QA Holiday ‹a value unique to this run› in the element .. in the Upcoming Holidays heading"],"2/s77":["hr","Shared flow delete_prior_holiday as Hr"],"2/s77.f1":["hr","Go to the Website site, page /holidays"],"2/s77.f2":["hr","Click the dropdown in the main content area"],"2/s77.f3":["hr","Click the All Locations dropdown option"],"2/s77.f4":["hr","Click the button in the element .. in the element .. in the text QA Holiday ‹a value unique to this run›"],"2/s77.f5":["hr","Click the Remove button in the dialog"],"2/s77.f6":["hr","✔ Check that there is no text QA Holiday ‹a value unique to this run›"],"2/s42":["hr","Click the Add Holiday button"],"2/s43":["hr","Type QA Holiday ‹a value unique to this run› into Holiday Name; Type ‹today + 1 days› into Date; Tick Common (All Locations); Untick Kochi; Untick HR location"],"2/s44":["hr","Click the dropdown in the dialog"],"2/s45":["hr","Click the Company dropdown option"],"2/s46":["hr","Click the Add Holiday button in the dialog"],"2/s47":["hr","Go to the Website site, page /dashboard"],"2/s48":["hr","✔ Check that the Upcoming Holidays heading is visible; ✔ Check that the text QA Holiday ‹a value unique to this run› in the element .. in the Upcoming Holidays heading is visible"],"2/s49":["employee","Go to the Website site, page /dashboard"],"2/s50":["employee","✔ Check that the Upcoming Holidays heading is visible; ✔ Check that the text QA Holiday ‹a value unique to this run› in the element .. in the Upcoming Holidays heading is visible"],"3/s51":["hr","Go to the Website site, page /holidays"],"3/s78":["hr","If the Company Code text field is visible for Hr"],"3/s79":["hr","Shared flow login_hr (sign-in) as Hr"],"3/s79.f1":["hr","Go to the Website site"],"3/s79.f2":["hr","Type ‹Website Company Code› into Company Code; Type the Website Hr user name into Email Address; Type the Website Hr password (saved, never shown) into Password"],"3/s79.f3":["hr","Click the Sign In button"],"3/s79.f4":["hr","✔ Check that the page address contains dashboard"],"3/s55":["hr","Go to the Website site, page /holidays"],"3/s71":["hr","✔ Check that the Holiday Calendar heading in the main content area is visible"],"3/s56":["hr","Click the dropdown in the main content area"],"3/s57":["hr","Click the All Locations dropdown option"],"3/s58":["hr","Repeat while the text QA Holiday ‹a value unique to this run› is visible for Hr (fails if still so after 10 rounds)"],"3/s60":["hr","Click the third button in the main content area"],"3/s61":["hr","Click the Remove button in the dialog"],"3/s59":["hr","✔ Check that there is no text QA Holiday ‹a value unique to this run›"]} });
  await m.phase(0, 'Kochi-only holiday visibility', async () => {
    await m.block('0/s75', () => m.signIn('hr', 'login_hr', () => loginHr(m, '0/s75', 'hr'), page => expect(page).toHaveURL(/dashboard/)));
    await m.step('0/s62', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/my-profile'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('0/s63', 'hr', page => expect(page.getByRole('main').getByRole('heading', { level: 5 })).toBeVisible());
    await m.step('0/s64', 'hr', async page => {
      m.v["hrDisplayName"] = ((await page.getByRole('main').getByRole('heading', { level: 5 }).innerText()) ?? '').trim();
    });
    await m.step('0/s65', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/employees'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('0/s66', 'hr', page => page.getByRole('textbox', { name: 'Search by name…' }).fill(m.t('{{hrDisplayName}}')));
    await m.step('0/s67', 'hr', page => page.getByRole('listitem').filter({ hasText: m.t('{{hrDisplayName}}') }).getByRole('button', { name: 'Edit' }).click());
    // meridian-note: brittle_selector: Branch is a visible field caption adjacent to its selected combobox, but the application does not expose the caption as that combobox's accessible name.
    await m.step('0/s68', 'hr', async page => {
      m.v["hrLocation"] = ((await page.getByRole('dialog').getByText('Branch', { exact: true }).locator('..').getByRole('combobox').innerText()) ?? '').trim();
    });
    // meridian-note: brittle_selector: Branch is a visible field caption adjacent to its selected combobox, but the application does not expose the caption as that combobox's accessible name.
    await m.step('0/s70', 'hr', page => expect(page.getByRole('dialog').getByText('Branch', { exact: true }).locator('..').getByRole('combobox')).not.toHaveText('Kochi'));
    await m.step('0/s69', 'hr', page => page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).click());
    await m.step('0/s5', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/holidays'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: repeated_steps: this is the intentionally separate Kochi-only scope for the same unique holiday; checkbox states differ from the all-locations creation, and each scope is verified before the next replacement.
    await m.step('0/s7', 'hr', page => page.getByRole('button', { name: 'Add Holiday' }).click());
    // meridian-note: repeated_steps: the add form is intentionally used for each distinct location scope; the checked location controls vary for each scenario.
    await m.step('0/s8', 'hr', async page => {
      await page.getByRole('textbox', { name: 'Holiday Name' }).fill(m.t('QA Holiday {{uid}}'));
      await page.getByRole('textbox', { name: 'Date' }).fill(m.t('{{today+1}}'));
      await page.getByRole('checkbox', { name: 'Common (All Locations)' }).uncheck();
      await page.getByRole('checkbox', { name: 'Kochi' }).check();
      await page.getByRole('checkbox', { name: m.t('{{hrLocation}}') }).uncheck();
    });
    await m.step('0/s9', 'hr', page => page.getByRole('dialog').getByRole('combobox').click());
    await m.step('0/s10', 'hr', page => page.getByRole('option', { name: 'Company' }).click());
    await m.step('0/s11', 'hr', page => page.getByRole('dialog').getByRole('button', { name: 'Add Holiday' }).click());
    await m.step('0/s12', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/dashboard'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: brittle_selector: scope the exact name to the parent card of Upcoming Holidays because the dashboard also repeats the next holiday in a separate summary card.
    await m.step('0/s13', 'hr', async page => {
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' }).locator('..').getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toHaveCount(0);
    });
    await m.step('0/s14', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/holidays'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('0/s15', 'hr', page => page.getByRole('main').getByRole('combobox').click());
    await m.step('0/s16', 'hr', page => page.getByRole('option', { name: 'Kochi' }).click());
    await m.step('0/s17', 'hr', page => expect(page.getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toBeVisible());
    await m.block('0/s18', () => m.signIn('employee', 'login_employee', () => loginEmployee(m, '0/s18', 'employee'), page => expect(page).toHaveURL(/\/dashboard/)));
    await m.step('0/s19', 'employee', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/dashboard'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: brittle_selector: scope the exact name to the parent card of Upcoming Holidays because the dashboard also repeats the next holiday in a separate summary card.
    await m.step('0/s20', 'employee', async page => {
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' }).locator('..').getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toBeVisible();
    });
  });
  await m.phase(1, 'HR-location-only holiday visibility', async () => {
    await m.block('1/s76', () => deletePriorHoliday(m, '1/s76', 'hr'));
    await m.step('1/s27', 'hr', page => page.getByRole('button', { name: 'Add Holiday' }).click());
    await m.step('1/s28', 'hr', async page => {
      await page.getByRole('textbox', { name: 'Holiday Name' }).fill(m.t('QA Holiday {{uid}}'));
      await page.getByRole('textbox', { name: 'Date' }).fill(m.t('{{today+1}}'));
      await page.getByRole('checkbox', { name: m.t('{{hrLocation}}') }).check();
      await page.getByRole('checkbox', { name: 'Common (All Locations)' }).uncheck();
      await page.getByRole('checkbox', { name: 'Kochi' }).uncheck();
    });
    await m.step('1/s29', 'hr', page => page.getByRole('dialog').getByRole('combobox').click());
    await m.step('1/s30', 'hr', page => page.getByRole('option', { name: 'Company' }).click());
    await m.step('1/s31', 'hr', page => page.getByRole('dialog').getByRole('button', { name: 'Add Holiday' }).click());
    await m.step('1/s32', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/dashboard'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: brittle_selector: scope the exact name to the parent card of Upcoming Holidays because the dashboard also repeats the next holiday in a separate summary card.
    await m.step('1/s33', 'hr', async page => {
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' }).locator('..').getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toBeVisible();
    });
    await m.step('1/s34', 'employee', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/dashboard'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: brittle_selector: scope the exact name to the parent card of Upcoming Holidays because the dashboard also repeats the next holiday in a separate summary card.
    await m.step('1/s35', 'employee', async page => {
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' }).locator('..').getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toHaveCount(0);
    });
  });
  await m.phase(2, 'All-locations holiday visibility', async () => {
    await m.block('2/s77', () => deletePriorHoliday(m, '2/s77', 'hr'));
    // meridian-note: repeated_steps: this is a deliberately separate all-locations scope for the same unique holiday; checkbox states differ from the earlier Kochi-only creation, and each scope is verified before the next replacement.
    await m.step('2/s42', 'hr', page => page.getByRole('button', { name: 'Add Holiday' }).click());
    await m.step('2/s43', 'hr', async page => {
      await page.getByRole('textbox', { name: 'Holiday Name' }).fill(m.t('QA Holiday {{uid}}'));
      await page.getByRole('textbox', { name: 'Date' }).fill(m.t('{{today+1}}'));
      await page.getByRole('checkbox', { name: 'Common (All Locations)' }).check();
      await page.getByRole('checkbox', { name: 'Kochi' }).uncheck();
      await page.getByRole('checkbox', { name: m.t('{{hrLocation}}') }).uncheck();
    });
    await m.step('2/s44', 'hr', page => page.getByRole('dialog').getByRole('combobox').click());
    await m.step('2/s45', 'hr', page => page.getByRole('option', { name: 'Company' }).click());
    await m.step('2/s46', 'hr', page => page.getByRole('dialog').getByRole('button', { name: 'Add Holiday' }).click());
    await m.step('2/s47', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/dashboard'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: brittle_selector: scope the exact name to the parent card of Upcoming Holidays because the dashboard also repeats the next holiday in a separate summary card.
    await m.step('2/s48', 'hr', async page => {
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' }).locator('..').getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toBeVisible();
    });
    await m.step('2/s49', 'employee', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/dashboard'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    // meridian-note: brittle_selector: scope the exact name to the parent card of Upcoming Holidays because the dashboard also repeats the next holiday in a separate summary card.
    await m.step('2/s50', 'employee', async page => {
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Upcoming Holidays' }).locator('..').getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toBeVisible();
    });
  }, { pass: true });
  await m.phase(3, 'Always remove the unique test holiday', async () => {
    await m.step('3/s51', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/holidays'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    if (await m.block('3/s78', async () => { const page = await m.open('hr', null); return await m.isVisible(page.getByRole('textbox', { name: 'Company Code' })); })) {
      await m.block('3/s79', () => loginHr(m, '3/s79', 'hr'));
    }
    await m.step('3/s55', 'hr', async page => {
      await page.goto(m.t('$DS_WEBSITE_ROOT/holidays'), { waitUntil: 'domcontentloaded' });
      await m.loaded(page);
    });
    await m.step('3/s71', 'hr', page => expect(page.getByRole('main').getByRole('heading', { name: 'Holiday Calendar' })).toBeVisible());
    await m.step('3/s56', 'hr', page => page.getByRole('main').getByRole('combobox').click());
    await m.step('3/s57', 'hr', page => page.getByRole('option', { name: 'All Locations' }).click());
    // meridian-note: brittle_selector: this while condition scopes an unlabeled icon button to the exact-name calendar card and stops when only the dashboard-style next-holiday text remains.
    for (let turn = 0; ; turn++) {
      const more = await m.block('3/s58', async () => {
        const holds = await (async () => { const page = await m.open('hr', null); return await m.isVisible(page.getByText(m.t('QA Holiday {{uid}}'), { exact: true })); })();
        if (holds && turn === 10) throw new Error('loop s58: its while condition still holds after 10 turns (max)');
        return holds;
      });
      if (!more) break;
      // meridian-note: brittle_selector: Holiday Calendar delete icons are unnamed and cards expose no row role, so the created holiday is removed with the third main button (the two earlier positions are the Add Holiday button and earlier pre-existing holiday card on the fixed test date).
      await m.step('3/s60', 'hr', page => page.getByRole('main').getByRole('button').nth(2).click());
      await m.step('3/s61', 'hr', page => page.getByRole('dialog').getByRole('button', { name: 'Remove' }).click());
    }
    await m.step('3/s59', 'hr', page => expect(page.getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toHaveCount(0));
  }, { always: true });
  await m.end();
});
