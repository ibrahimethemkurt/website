const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convert() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const svgPath = path.resolve('src/assets/ibrahimethemkurtpp.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body, html { margin: 0; padding: 0; background: transparent; }
        svg { display: block; width: 800px; height: auto; }
      </style>
    </head>
    <body>
      ${svgContent}
    </body>
    </html>
  `, { waitUntil: 'networkidle0' });
  
  const svgElement = await page.$('svg');
  
  await svgElement.screenshot({
    path: 'src/assets/profilePic.webp',
    type: 'webp',
    omitBackground: true,
    quality: 80
  });
  
  await browser.close();
  console.log('Successfully captured transparent WebP via Puppeteer!');
}

convert();
