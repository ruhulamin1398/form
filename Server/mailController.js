const { json } = require("body-parser");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const os = require('os');

const prepareEmail = expressAsyncHandler(async (data) => {
    const emailBodyHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Response</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4; 
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            .field {
                margin-bottom: 15px;
            }
            .field label {
                font-weight: bold;
                display: block;
                margin-bottom: 5px;
                direction: rtl;
            }
            .field p {
                margin: 0;
                padding: 10px;
                background: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 4px;
                direction: rtl;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            table, th, td {
                border: 1px solid #ddd;
            }
            th, td {
                padding: 10px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
            .rtl, td {
                direction: rtl;
                text-align: right;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Form Response</h2>
            <!-- Example fields, replace with actual form field names and values -->
            <div class="field">
                <label for="name">${data['f1'].title}</label>
                <p id="name">${data['f1'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f2'].title}</label>
                <p id="name">${data['f2'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f3'].title}</label>
                <p id="name">${data['f3'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f4'].title}</label>
                <p id="name">${data['f4'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f5'].title}</label>
                <p id="name">${data['f5'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f6'].title}</label>
                <p id="name">${data['f6'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f7'].title}</label>
                <p id="name">${data['f7'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f8'].title}</label>
                <p id="name">${data['f8'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f9'].title}</label>
                <p id="name">${data['f9'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f10'].title}</label>
                <p id="name">${data['f10'].value}</p>
            </div>
            <br>
            <h4 class="rtl">פירוט מכירות (באלפי ₪ )</h4>
            <div style="overflow-x: auto; width: 100%;">
                <table class="min-w-full bg-transparent text-white" style="min-width: 1200px;">
                    <thead>
                        <tr>
                            <th class="px-4 py-2">צפי מכירות לשנת 2024</th>
                            <th class="px-4 py-2">2023</th>
                            <th class="px-4 py-2">2022</th>
                            <th class="px-4 py-2">2021</th>
                            <th class="px-4 py-2">שנה</th>
                        </tr>
                    </thead>
                    <tbody class="table-border-gray">
                        <tr>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f11'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f12'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f13'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f14'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">סה"כ מחזור מכירות בהתאם למאזנים</td>
                        </tr>
                        <tr>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f15'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f16'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f17'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f18'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">חובות אבודים ו/או חובות בטיפול משפטי <strong>(שנוצרו בשנים אלו בלבד)</strong></td>
                        </tr>
                        <tr>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f19'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f20'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray" colspan="2">${data['f21'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">תיאור מקרי החובות האבודים הגדולים ב-3 שנים האחרונות</td>
                        </tr>
                        <tr>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f22'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray">${data['f23'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray" colspan="2">${data['f24'].value}</td>
                            <td class="border px-4 py-2 text-right table-border-gray rtl-text">חובות לקוחות אשר בפיגור של יותר מ- 90 יום מעבר לזמן פירעונם )נכון ליום מילוי ההצהרה)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <h4 class="rtl">רשימת חייבים לבדיקה</h4>
            <table>
                <tr>
                    <td>${data['f25'].value}</td>
                    <td>${data['f25'].title}</td>
                </tr>
                <tr>
                    <td>${data['f26'].value}</td>
                    <td>${data['f26'].title}</td>
                </tr>
                <tr>
                    <td>${data['f27'].value}</td>
                    <td>${data['f27'].title}</td>
                </tr>
                <tr>
                    <td>${data['f28'].value}</td>
                    <td>${data['f28'].title}</td>
                </tr>
                <tr>
                    <td>${data['f29'].value}</td>
                    <td>${data['f29'].title}</td>
                </tr>
                <tr>
                    <td>${data['f30'].value}</td>
                    <td>${data['f30'].title}</td>
                </tr>
            </table>
            <div class="field">
                <label for="name">${data['f31'].title}</label>
                <p id="name">${data['f31'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f32'].title}</label>
                <p id="name">${data['f32'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['yesNoOption'].title}</label>
                <p>${data['yesNoOption'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['yesNoOption2'].title}</label>
                <p>${data['yesNoOption2'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['yesNoOption3'].title}</label>
                <p>${data['yesNoOption3'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f33'].title}</label>
                <p id="name">${data['f33'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['f34'].title}</label>
                <p id="name">${data['f34'].value}</p>
            </div>
            <br><br>
            <div class="field">
                <label for="name">${data['date'].title}</label>
                <p id="name">${data['date'].value}</p>
            </div>
            <div class="field">
                <label for="name">${data['sign'].title}</label>
                <p id="name">
                    <img className="text-left" src="cid:unique@nodemailer.com" alt="sign" height="50px" />
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
    return emailBodyHtml;
});

const createPDF = (data) => {
    const doc = new PDFDocument();

    // Set output path for the PDF
    const outputPath = path.join(os.tmpdir(), 'form_response.pdf');
    doc.pipe(fs.createWriteStream(outputPath));

    // Add title
    doc.fontSize(20).text('Form Response', { align: 'center' }).moveDown(2);

    // Add form fields
    const addField = (title, value) => {
        doc.fontSize(12).font('Helvetica-Bold').text(title);
        doc.fontSize(12).font('Helvetica').text(value, { underline: true }).moveDown();
    };

    addField(data['f1'].title, data['f1'].value);
    addField(data['f2'].title, data['f2'].value);
    addField(data['f3'].title, data['f3'].value);
    addField(data['f4'].title, data['f4'].value);
    addField(data['f5'].title, data['f5'].value);
    addField(data['f6'].title, data['f6'].value);
    addField(data['f7'].title, data['f7'].value);
    addField(data['f8'].title, data['f8'].value);
    addField(data['f9'].title, data['f9'].value);
    addField(data['f10'].title, data['f10'].value);

    // Add sales details table
    doc.fontSize(14).text('פירוט מכירות (באלפי ₪)', { align: 'center' }).moveDown();

    const tableData = [
        { year: 'סה"כ מחזור מכירות בהתאם למאזנים', data: [data['f11'].value, data['f12'].value, data['f13'].value, data['f14'].value] },
        { year: 'חובות אבודים ו/או חובות בטיפול משפטי', data: [data['f15'].value, data['f16'].value, data['f17'].value, data['f18'].value] },
        { year: 'תיאור מקרי החובות האבודים הגדולים ב-3 שנים האחרונות', data: [data['f19'].value, data['f20'].value, data['f21'].value] },
        { year: 'חובות לקוחות אשר בפיגור של יותר מ- 90 יום מעבר לזמן פירעונם', data: [data['f22'].value, data['f23'].value, data['f24'].value] },
    ];

    const table = {
        headers: ['צפי מכירות לשנת 2024', '2023', '2022', '2021', 'שנה'],
        rows: tableData.map(item => [item.data[0], item.data[1], item.data[2], item.data[3], item.year])
    };

    // Draw the table
    const tableOptions = {
        columnsSize: [100, 100, 100, 100, 200],
        cellPadding: 5,
        headerBackgroundColor: '#f2f2f2',
        headerBorderColor: '#ddd',
        borderColor: '#ddd'
    };

    doc.table(table, tableOptions);

    doc.addPage();

    // Add debtor list
    doc.fontSize(14).text('רשימת חייבים לבדיקה', { align: 'center' }).moveDown();

    const addDebtorRow = (title, value) => {
        doc.fontSize(12).font('Helvetica-Bold').text(title);
        doc.fontSize(12).font('Helvetica').text(value).moveDown();
    };

    addDebtorRow(data['f25'].title, data['f25'].value);
    addDebtorRow(data['f26'].title, data['f26'].value);
    addDebtorRow(data['f27'].title, data['f27'].value);
    addDebtorRow(data['f28'].title, data['f28'].value);
    addDebtorRow(data['f29'].title, data['f29'].value);
    addDebtorRow(data['f30'].title, data['f30'].value);

    addField(data['f31'].title, data['f31'].value);
    addField(data['f32'].title, data['f32'].value);
    addField(data['yesNoOption'].title, data['yesNoOption'].value);
    addField(data['yesNoOption2'].title, data['yesNoOption2'].value);
    addField(data['yesNoOption3'].title, data['yesNoOption3'].value);
    addField(data['f33'].title, data['f33'].value);
    addField(data['f34'].title, data['f34'].value);

    // Add signature and date
    addField(data['date'].title, data['date'].value);
    doc.fontSize(12).font('Helvetica-Bold').text(data['sign'].title);
    doc.image('path/to/signature/image.png', { width: 50, align: 'left' }).moveDown();

    doc.end();

    return outputPath;
};

// Use the functions
const data = {
    'f1': { title: 'Field 1', value: 'Value 1' },
    'f2': { title: 'Field 2', value: 'Value 2' },
    'f3': { title: 'Field 3', value: 'Value 3' },
    'f4': { title: 'Field 4', value: 'Value 4' },
    'f5': { title: 'Field 5', value: 'Value 5' },
    'f6': { title: 'Field 6', value: 'Value 6' },
    'f7': { title: 'Field 7', value: 'Value 7' },
    'f8': { title: 'Field 8', value: 'Value 8' },
    'f9': { title: 'Field 9', value: 'Value 9' },
    'f10': { title: 'Field 10', value: 'Value 10' },
    'f11': { title: 'Field 11', value: 'Value 11' },
    'f12': { title: 'Field 12', value: 'Value 12' },
    'f13': { title: 'Field 13', value: 'Value 13' },
    'f14': { title: 'Field 14', value: 'Value 14' },
    'f15': { title: 'Field 15', value: 'Value 15' },
    'f16': { title: 'Field 16', value: 'Value 16' },
    'f17': { title: 'Field 17', value: 'Value 17' },
    'f18': { title: 'Field 18', value: 'Value 18' },
    'f19': { title: 'Field 19', value: 'Value 19' },
    'f20': { title: 'Field 20', value: 'Value 20' },
    'f21': { title: 'Field 21', value: 'Value 21' },
    'f22': { title: 'Field 22', value: 'Value 22' },
    'f23': { title: 'Field 23', value: 'Value 23' },
    'f24': { title: 'Field 24', value: 'Value 24' },
    'f25': { title: 'Field 25', value: 'Value 25' },
    'f26': { title: 'Field 26', value: 'Value 26' },
    'f27': { title: 'Field 27', value: 'Value 27' },
    'f28': { title: 'Field 28', value: 'Value 28' },
    'f29': { title: 'Field 29', value: 'Value 29' },
    'f30': { title: 'Field 30', value: 'Value 30' },
    'f31': { title: 'Field 31', value: 'Value 31' },
    'f32': { title: 'Field 32', value: 'Value 32' },
    'yesNoOption': { title: 'Yes/No Option 1', value: 'Yes' },
    'yesNoOption2': { title: 'Yes/No Option 2', value: 'No' },
    'yesNoOption3': { title: 'Yes/No Option 3', value: 'Yes' },
    'f33': { title: 'Field 33', value: 'Value 33' },
    'f34': { title: 'Field 34', value: 'Value 34' },
    'date': { title: 'Date', value: '2023-07-30' },
    'sign': { title: 'Signature', value: 'path/to/signature/image.png' }
};

const emailBodyHtml = createEmailBody(data);
const pdfPath = createPDF(data);

console.log('Email Body HTML:', emailBodyHtml);
console.log('PDF Path:', pdfPath);
