import { expect, test } from '@playwright/test'

test('Car owners page is render as expected', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Car Owners/)
  await page.getByTestId('owner-card-Ofelia').isVisible()
  await expect(page.getByTestId(/^owner-card/)).toHaveCount(10)
})

test('click owner card should open a owner detail modal', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('owner-card-Ofelia').isVisible()
  await page.getByTestId('owner-card-Ofelia').click()

  await expect(page.getByTestId('owner-detail-modal')).toBeVisible()
})

test('car year should be highlighted when older than 2000', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('owner-card-Dannye').isVisible()
  await page.getByTestId('owner-card-Dannye').click()
  await page.getByTestId('owner-detail-modal').isVisible()

  await expect(page.getByTestId('car-year-field')).toHaveClass('flex items-center break-all text-error font-bold')
})

test('car year shou', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('owner-card-Dannye').isVisible()
  await page.getByTestId('owner-card-Dannye').click()
  await page.getByTestId('owner-detail-modal').isVisible()

  await page.getByTestId('car-year-input').fill('2001')
  await page.getByTestId('car-year-input').press('Enter')
  await expect(page.getByTestId('car-year-field')).toHaveClass('flex items-center break-all ')
})
