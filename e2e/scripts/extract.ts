import { chromium } from 'playwright'
import { resolve } from 'path'
import { existsSync, writeFileSync } from 'fs'

async function main() {
    const storybookStaticPath = resolve(__dirname, `../../taskbox/storybook-static`)
    if (!existsSync(storybookStaticPath)) {
        console.log(`${storybookStaticPath} is not found.`)
        console.log('Run `$ yarn run taskbox:build-storybook`')
        process.exit(1)
    }
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(`file://${resolve(storybookStaticPath, `iframe.html`)}`)
    await page.waitForFunction(
        'window.__STORYBOOK_STORY_STORE__ && window.__STORYBOOK_STORY_STORE__.extract && window.__STORYBOOK_STORY_STORE__.extract()'
    )
    const data = JSON.parse(
        await page.evaluate(() => {
            // @ts-ignore
            return JSON.stringify(window.__STORYBOOK_STORY_STORE__.getStoriesJsonData(), null, 2)
        })
    )
    writeFileSync(resolve(storybookStaticPath, 'stories.json'), JSON.stringify(data, null, 2));
    await browser.close()
}

(async () => await main())()
