const axios = require('axios');
const expressAsyncHandler = require("express-async-handler"); 
const path = require('path');  
const fs = require('fs'); 
const generatePDF = async (data) => {

  try {
    const htmlContent = data;

    const response = await axios.post('https://apihtmltopdf.ruhul.info/index.php', htmlContent, {
        headers: {
            'Content-Type': 'text/html'
        },
        responseType: 'arraybuffer' // Ensure response is in binary format
    });
    const pdfBuffer = response.data;
    const filePath = path.join(__dirname, 'document.pdf');

    // Save the PDF to a file
    fs.writeFile(filePath, pdfBuffer, (err) => {
        if (err) {
            console.error('Error saving PDF:', err);
            return res.status(500).send('Error saving PDF');
        }})
   return response.data;

} catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
}

};

module.exports = generatePDF;