const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');
const { insertIntoDatabase } = require('./Database'); // Assuming insert logic is in Database.js

const app = express();
const PORT = 8080;

// MongoDB connection settings
const mongoURI = 'mongodb://127.0.0.1:27017'; // Local MongoDB instance
const dbName = 'Morris'; // Database name

// Middleware to serve static files and parse request bodies
app.use(express.static(__dirname + '/')); // Serve HTML, CSS, and JS files from root
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to fetch jobs from MongoDB
app.get('/api/jobs', async (req, res) => {
    let client;

    try {
        client = new MongoClient(mongoURI);
        await client.connect();
        console.log('Connected to MongoDB!');

        const db = client.db(dbName);
        const jobs = await db.collection('jobs').find({}).toArray(); // Fetch jobs

        res.status(200).json(jobs); // Send jobs as JSON
    } catch (err) {
        console.error('Failed to fetch jobs:', err.message);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    } finally {
        if (client) client.close();
    }
});

// POST route to handle ContactUs form submission
app.post('/ContactUs', async (req, res) => {
    console.log('Received a POST request at /ContactUs');  // Check if the route is hit
    console.log('Form Data:', req.body);  // Log the form data
    const { fname, lname, email, message } = req.body;

    if (!fname || !lname || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        console.log("Calling into database file...");
        await insertIntoDatabase(fname, lname, email, message); // Insert data into the database
        res.send(`
            <h1>Thank you for contacting us, ${fname} ${lname}!</h1>
            <p>We will reach out to you at <strong>${email}</strong>.</p>
            <p>Your message: ${message}</p>
        `);
    } catch (err) {
        res.status(500).json({ error: "Error saving your info." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});