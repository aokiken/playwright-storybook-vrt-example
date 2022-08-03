import { test, expect } from '@playwright/test'
// @ts-ignore
import stories from '../../taskbox/storybook-static/stories.json'
import {resolve} from 'path'
for (const story of Object.keys(stories.stories)) {
    test(story, async ({ page }) => {
        await page.goto(`file://${resolve(__dirname, `../../taskbox/storybook-static/iframe.html?args=&id=${story}`)}`)
        await expect(page).toHaveScreenshot({fullPage: true, scale: 'device', animations: 'disabled'})
    })
}

