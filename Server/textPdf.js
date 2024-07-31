const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// Load a font
const fontPath = path.join(__dirname, 'fonts/NotoSansHebrew-Regular.ttf');
const fontData = fs.readFileSync(fontPath, 'base64');

// Initialize jsPDF
const doc = new jsPDF();

// Add custom font
doc.addFileToVFS('NotoSansHebrew-Regular.ttf', fontData);
doc.addFont('NotoSansHebrew-Regular.ttf', 'NotoSansHebrew', 'normal');

// Set the font
doc.setFont('NotoSansHebrew');
doc.setFontSize(12);
 
// Add some Hebrew text
doc.text("שם החברה", 10, 10, { align: 'center' });

// Save the PDF
doc.save('SampleHebrewPDF.pdf');
console.log("helloo")