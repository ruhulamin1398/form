const PDFDocument = require('pdfkit');
const fs = require('fs');

const path = require('path');

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
doc.pipe(fs.createWriteStream('output.pdf'));

// Example Hebrew text
const hebrewText = "שלום עולם";

// Wrap the text with RLE and PDF characters
const rtlText = `\u202B${hebrewText}\u202C`;

// Set the font (make sure the font supports Hebrew characters)


const fontPath = path.join(__dirname, "./fonts/NotoSansHebrew-Regular.ttf");
doc.font(fontPath);

// Draw text right-aligned
doc.text(rtlText, {
  align: 'right'
});

// Finalize PDF file
doc.end();
