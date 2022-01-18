const PORT = 3090
const express = require("express")
const puppeteer = require('puppeteer')
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/result', (req, res) => {
    async function scrapeTemperature(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
    
        const tmp = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('#c_grafico_temp_agua_txt_grados_agua_actual strong')).map(x => x.textContent)
            
        });
    
        res.json(tmp[0])
        browser.close()
    }
    
    
    scrapeTemperature('https://tides4fishing.com/au/new-south-wales/merimbula#_water_temp')
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))