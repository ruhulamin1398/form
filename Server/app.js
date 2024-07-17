
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { prepareEmail } = require('./mailSenderController');
const path = require('path');

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


// Serve static files from the 'images' directory
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

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.post('/record', async(req, res) => {

  // console.log(req.file)
  console.log(req.body);
  const data = req.body
  console.log(data['f1'].title)
  await prepareEmail(data)


  
  res.json({data  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});