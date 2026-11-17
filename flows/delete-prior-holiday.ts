import { expect } from '../shared/meridian/rt.mjs';


// Shared flow "delete_prior_holiday"
export async function deletePriorHoliday(m, at, b) {
  await m.step(at + '.f1', b, async page => {
    await page.goto(m.t('$DS_WEBSITE_ROOT/holidays'), { waitUntil: 'domcontentloaded' });
    await m.loaded(page);
  });
  await m.step(at + '.f2', b, page => page.getByRole('main').getByRole('combobox').click());
  await m.step(at + '.f3', b, page => page.getByRole('option', { name: 'All Locations' }).click());
  await m.step(at + '.f4', b, page => page.getByText(m.t('QA Holiday {{uid}}'), { exact: true }).locator('..').locator('..').getByRole('button').click());
  await m.step(at + '.f5', b, page => page.getByRole('dialog').getByRole('button', { name: 'Remove' }).click());
  await m.step(at + '.f6', b, page => expect(page.getByText(m.t('QA Holiday {{uid}}'), { exact: true })).toHaveCount(0));
}
