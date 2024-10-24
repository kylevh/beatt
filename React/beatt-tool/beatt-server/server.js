// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // You can change the port if needed

// Serve static files from the 'public' directory outside of the server folder
app.use(express.static(path.join(__dirname, '../dist'))); // Adjust the path as needed

// Serve index.html for root requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html')); // Adjust the path as needed
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});