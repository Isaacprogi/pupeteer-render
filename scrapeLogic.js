const puppeteer = require('puppeteer')
require("dotenv").config()
const path = require('path')

const scrapeLogic = async (res) => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        args:[
         "--disable-setuid-sandbox",
         "--no-sandbox",
         "--single-process",
         "--no-zygote",
        ],
        headless: 'new',
        executablePath:puppeteer.executablePath()
    });

   
    



    try {
      
        const page = await browser.newPage();

        // Define your HTML content as a string
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Sample PDF</title>
          </head>
          <body>
              <h1>Hello, PDF Generation with Puppeteer</h1>
              <p>This is a sample PDF generated from HTML content.</p>
          </body>
          </html>
        `;
      
        // Set the HTML content of the page
        await page.setContent(htmlContent);
      
        // Generate a PDF
        await page.pdf({ path: 'output.pdf', format: 'A4' });
        res.sendFile(path.join(__dirname,'output.pdf'))
        

    } catch (error) {
        console.log(error)
        res.send('somethingwent wrong  while running pupeteer')
    } finally {
        await browser.close();
    }

}

module.exports = scrapeLogic
