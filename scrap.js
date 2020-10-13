const puppeteer = require('puppeteer')

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

const getData = async () => {

    const width = 1280
    const height = 720

    // 1 - Créer une instance de navigateur
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--window-size=${ width },${ height }`
        ],
        defaultViewport: {
            width,
            height
        }
    })
    const page = await browser.newPage()

    // 2 - Naviguer jusqu'à l'URL cible
    await page.goto('http://books.toscrape.com/')

    // await page.waitFor(1500) // fait une pause d'une seconde

    await page.click(
    '#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img',
    {delay: 2500}
    )
    // await page.waitFor(1500) // fait une pause d'une seconde
    await delay(4000);
    
    // 3 - Récupérer les données
    const result = await page.evaluate(() => {
    let title = document.querySelector('h1').innerText
    let price = document.querySelector('.price_color').innerText
    return { title, price }
    })

    // 4 - Retourner les données (et fermer le navigateur)
    browser.close()
    return result
}

// Appelle la fonction getData() et affichage les données retournées
getData().then(value => {
    console.log(value)
})
