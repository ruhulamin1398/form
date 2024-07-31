const PDFDocument = require('pdfkit');
const path = require('path');
const expressAsyncHandler = require("express-async-handler");

 
const  generatePDF = async (data)=> {
  const doc = new PDFDocument({
    lang: 'he'
  });

  const fontPath = path.join(__dirname, "./fonts/NotoSansHebrew-Regular.ttf");
  doc.font(fontPath);

  // Set document title
  doc.fontSize(25).text('Form Response', { align: 'center' });
  doc.moveDown(2);

  // Sample data
  

  const fields = [
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10',  
  ];

  const fieldWidth = 400;
  const fieldHeight = 25;

  // Form layout
  fields.forEach(field => {
    if (data[field]) {
      // Draw field label
      doc.fontSize(12).fillColor('black').text(data[field].title+' : ', { align: 'right', continued: true }).fillColor('black').text(':', { continued: true }).text(' ');
      doc.moveDown(0.5);
      // Draw field value with background and border
      const fieldValue = data[field].value || ' ';
      const fieldX = doc.page.width - fieldWidth - doc.page.margins.left - doc.page.margins.right;
      const fieldY = doc.y;
      doc.rect(fieldX, fieldY, fieldWidth, fieldHeight).fillColor('black').fill('#f9f9f9').stroke('#000');
      doc.fillColor('black').text(fieldValue, fieldX+5 , fieldY + 5, { width: fieldWidth - 10, align: 'right', height: fieldHeight }).fillColor('black');

      doc.moveDown(1.5);
    }
  });
 
  doc.end();
  return doc;
}


 

module.exports = generatePDF;
