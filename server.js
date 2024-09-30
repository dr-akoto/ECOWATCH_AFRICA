const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public')); // Make sure your `weather.json` is in the `public` folder

// Endpoint to serve the JSON data
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'weather.json'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
