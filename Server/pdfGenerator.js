const puppeteer = require('puppeteer');
const path = require('path');
const expressAsyncHandler = require("express-async-handler");

 
const  generatePDF = async (data)=> {
  const browser = await puppeteer.launch(
{    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true ,}
  );
  const page = await browser.newPage();
  await page.setContent(data);
  await page.pdf({ path: 'example.pdf', format: 'A4' });

   // Generate PDF buffer
   const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true, 
  });

  await browser.close();
  
  return pdfBuffer;
}


 

module.exports = generatePDF;
