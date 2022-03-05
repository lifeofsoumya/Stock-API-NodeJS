const puppeteer = require('puppeteer');
const express = require('express');
// const { title } = require('process');

const app = express()

async function scrapeChannel(url) { // init function with to be scraped url argument

    const browser = await puppeteer.launch();      // launch puppeteer
    const page = await browser.newPage();       // generate a headless browser
    await page.goto(url);      // open argument passed url

    // 1. saving simple heading and img src using xpath

    const [el] = await page.$x('/html/body/div/div/div[2]/div[2]/div/div/div[1]/div/div/table/tbody/tr[1]/td[1]/a');        // select specific element on the url fetched page with 'xpath' & assign it to el
    const text = await el.getProperty('textContent');       // choose type of data needed
    const name = await text.jsonValue();    // extract the data type

    const [el2] = await page.$x('/html/body/div/div/div[2]/div[2]/div/div/div[1]/div/div/table/tbody/tr[1]/td[3]');
    const priceSrc = await el2.getProperty('textContent');
    const priceVal = await text.jsonValue();

    const [el3] = await page.$x('/html/body/div/div/div[2]/div[2]/div/div/div[1]/div/div/table/tbody/tr[1]/td[5]');
    const highSrc = await el2.getProperty('textContent');
    const highVal = await text.jsonValue();

    const [el4] = await page.$x('/html/body/div/div/div[2]/div[2]/div/div/div[1]/div/div/table/tbody/tr[1]/td[4]');
    const lowSrc = await el2.getProperty('textContent');
    const lowVal = await text.jsonValue();


    let title = []

    page.evaluate(() => {
        let allTitles = document.querySelectorAll('.mtp438CompanyName');
        allTitles.forEach(
            title.push(allTitles)
        )
    })

    let currentPrice = []

    page.evaluate(() => {
        let allPrices = document.querySelectorAll('.fw500');
        allPrices.forEach(
            currentPrice.push(allPrices)
        )
    })

    browser.close();    // close the temporary headless browser    
}

scrapeChannel('https://groww.in/markets/top-losers?index=GIDXNIFTY100'); // passing argument and calling function 


app.get('/', (req, res)=>{
        for (var i=0;i<title.length; i++){
            for( var j=0; j<currentPrice.length; j++){
                res.send(
                    `<h3>${title[i]}</h3><br>
                <h4>${currentPrice[j]}</h4>
                `
                )
            }
        }
})

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`server started at port ${port}`)
    })