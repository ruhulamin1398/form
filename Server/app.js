
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