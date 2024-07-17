
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { prepareEmail } = require('./mailSenderController');
 

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

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.post('/record', (req, res) => {
  console.log(req.body);
  const data = req.body
  prepareEmail(data)


  
  res.json({data  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});