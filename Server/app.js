
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

app.post('/record', (req, res) => {
  const formData = req.body;
  console.log('Form Data Received:', formData);

  // Here you can add code to save the data to a database or process it as needed

  res.status(200).json({ message: 'Form data received successfully', data: formData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});