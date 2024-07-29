
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { prepareEmail } = require('./mailSenderController');
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


// // upload image signature -- old
app.use('/images', express.static(path.join(__dirname, 'images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    const basename = path.basename(file.originalname, extension)
    cb(null, basename + '-' + uniqueSuffix + extension)
  },
})

const upload = multer({ storage: storage }) 

app.post('/image', upload.single('file'), function (req, res) {
  if (req.file) {
    const filePath = path.join('/images', req.file.filename)
    res.json({

      filePath:filePath,
      imageURL: `${req.protocol}://${req.get('host')}${filePath}`
      
       })

  } else {
    res.status(400).json({ error: 'No file uploaded' })
  }
})

 


 

// Use body-parser to parse JSON bodies
app.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as needed

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
  const filePath = path.join(__dirname, 'images', filename);

  // Write the file to the images directory
  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save the image' });
    }

    const imageURL = `${req.protocol}://${req.get('host')}/images/${filename}`;
    res.json({ filePath: `/images/${filename}`, imageURL });
  });
});





app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.post('/record', async(req, res) => {

  // console.log(req.file)
  console.log(req.body);
  const data = req.body
  console.log("sign  : "  )
  console.log(  data['sign'])
  await prepareEmail(data)


  
  res.json({data  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});