// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000; // You can change the port if needed

// Serve static files from the 'public' directory outside of the server folder
app.use(express.static(path.join(__dirname, '../dist'))); // Adjust the path as needed

// Serve index.html for root requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html')); // Adjust the path as needed
});

// New endpoint to get the list of files in a specific directory
app.get('/api/snapshots/:date/:project', (req, res) => {
    const { date, project } = req.params; // Extract date and project from request parameters
    const directoryPath = path.join(__dirname, `../src/groovy/snapshots/${date}/${project}`); // Use parameters in the path
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.json(files);
    });
});

app.get('/api/latest/', (req, res) => {
    const { project } = req.params;
    const latestSnapshot = path.join(__dirname, `../src/groovy/snapshots/1.json`);
    res.sendFile(latestSnapshot);
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});