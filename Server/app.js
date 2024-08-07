
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { prepareEmail, SubmitEmail } = require('./mailSenderController')
const path = require('path');

const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});







// Serve static files from the /images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use body-parser to parse JSON bodies
app.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as needed

// Multer storage configuration for the first location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, '../apihtmltopdf.ruhul.info/images/');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    cb(null, basename + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

app.post('/image', upload.single('file'), (req, res) => {
  if (req.file) {
    // First location
    const firstLocationPath = path.resolve(__dirname, '../apihtmltopdf.ruhul.info/images/', req.file.filename);
    
    // Second location
    const secondLocationPath = path.resolve(__dirname, 'images', req.file.filename);

    // Copy file to the second location
    fs.copyFile(firstLocationPath, secondLocationPath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error copying file to the second location' });
      }

      const filePath = path.join('/images', req.file.filename);
      res.json({
        filePath: filePath,
        imageURL: `https://apihtmltopdf.ruhul.info${filePath}`
      });
    });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.post('/signature', (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // Remove the data:image/png;base64, part from the string
  const base64Data = image.replace(/^data:image\/png;base64,/, "");

  // Create a unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `signature-${uniqueSuffix}.png`;

  // First location
  const firstLocationPath = path.join(__dirname, '../apihtmltopdf.ruhul.info/images', filename);

  // Write the file to the first location
  fs.writeFile(firstLocationPath, base64Data, 'base64', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save the image' });
    }

    // Second location
    const secondLocationPath = path.join(__dirname, 'images', filename);

    // Copy file to the second location
    fs.copyFile(firstLocationPath, secondLocationPath, (copyErr) => {
      if (copyErr) {
        return res.status(500).json({ error: 'Error copying file to the second location' });
      }

      const imageURL = `https://apihtmltopdf.ruhul.info/images/${filename}`;
      res.json({ filePath: `/images/${filename}`, imageURL });
    });
  });
});





app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.post('/record', async(req, res) => {

  const host = req.hostname;
  console.log(host)
  
  console.log(req.body);
  let data = req.body;

  data['sign'].value2 = `https://apihtmltopdf.ruhul.info${data['sign'].value}`
  console.log("sign  : "  )
  console.log(  data['sign'])
  const responsePDF = await prepareEmail(data)


  const pdfname = Date.now() + '-' + Math.round(Math.random() * 1E9)+'.pdf';
  const pdfPath = path.resolve(__dirname, '../apihtmltopdf.ruhul.info/pdf', pdfname);

  fs.writeFile(pdfPath, responsePDF, (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('File content successfully saved to', pdfPath);
    }
});



console.log(pdfname)
  const pdfLink = "https://apihtmltopdf.ruhul.info/pdf/"+pdfname ;
  res.json({pdfLink, pdfLink });
});














app.post('/submit', async(req, res) => {

  const host = req.hostname;
  console.log(host)
  
  console.log(req.body);
  let data = req.body;

  data['sign'].value2 = `https://apihtmltopdf.ruhul.info${data['sign'].value}`
  console.log("sign  : "  )
  console.log(  data['sign'])
  await SubmitEmail(data)


  
  res.json({data  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});