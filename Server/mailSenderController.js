const { json } = require("body-parser");
const expressAsyncHandler = require("express-async-handler")

const nodemailer = require("nodemailer")

const prepareEmail = expressAsyncHandler(async (data) => {

    const dataJson = JSON.stringify(data)

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
            margin-bottom: 5px;  direction: rtl ;
            
        }
        .field p {
            margin: 0;
            padding: 10px;
            background: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;  direction: rtl ;
            
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
            .rtl, td{
              direction: rtl ;
              text-align:right;
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


        <table class="min-w-full bg-transparent text-white">
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



<br> 
        <h4 class="rtl">

        רשימת חייבים לבדיקה


      </h4>



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
             
           
            <!-- Repeat above block for additional form fields -->
        </table>



             <div class="field ">
            <label for="name">${data['f31'].title}</label>
            <p id="name">${data['f31'].value}</p>
        </div>


             <div class="field">
            <label for="name">${data['f32'].title}</label>
            <p id="name">${data['f32'].value}</p>
        </div>


             <div class="field">
            <label for="name">${data['yesNoOption'].title}</label>
            <p  >${data['yesNoOption'].value}</p>
        </div>



        <div class="field">
        <label for="name">${data['yesNoOption2'].title}</label>
        <p  >${data['yesNoOption2'].value}</p>
    </div>



    <div class="field">
    <label for="name">${data['yesNoOption3'].title}</label>
    <p  >${data['yesNoOption3'].value}</p>
</div>



             <div class="field">
            <label for="name">${data['f33'].title}</label>
            <p id="name">${data['f33'].value}</p>
        </div>


             <div class="field">
            <label for="name">${data['f34'].title}</label>
            <p id="name">${data['f34'].value}</p>
        </div>


    <br> 
     <br>


    <div class="field">
    <label for="name">${data['date'].title}</label>
    <p id="name">${data['date'].value}</p>
</div>


 



           






 

       
    </div>
</body>
</html>



    `;



    

    try {
        await sentEMail({
            "body": emailBodyHtml,
            "to":  "ruhul.ok8@gmail.com",
            "subject": "Verification Email",
       

        })
    }
    catch (err) {
        console.log(err)
    }


})

const sentEMail = expressAsyncHandler(async (data) => {
    console.log("data :  ", data)

    const tranporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,

        auth: {
            user:  "ruhul.ok8@gmail.com",
            pass: 'hzqe uxvw dewu vffc',
        }
    })
    // console.log(tranporter)


    const mailOptions = {
        from: process.env.SMTP_USER,
        to: data.to,
        subject: data.subject,
        html: data.body
    }
    tranporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("email has been send", info.response)
        }
    })

})


module.exports = { sentEMail, prepareEmail }