const chronium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async function(event, context) {

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: process .env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
        headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://tides4fishing.com/au/new-south-wales/merimbula#_water_temp');
    const tmp = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#c_grafico_temp_agua_txt_grados_agua_actual strong')).map(x => x.textContent)
    });

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: 'Ok',
            tempInfo: {
                tmp
            }
        })
    };
}