const PORT = 8080;
const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { insertIntoDatabase } = require('./Database');

//parses Contact form data
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// display the home page
app.use(express.static(__dirname + '/'));

app.post('/ContactUs', async (req, res) => {
    console.log('Received a POST request at /ContactUs');  // Check if the route is hit
    console.log('Form Data:', req.body);  // Log the form data
    const {fname, lname, email, message } = req.body;

    if (!fname || !lname || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }


    try {
        console.log("Calling into database file...");
        await insertIntoDatabase(fname, lname, email, message);
        res.send(`
            <h1>Thank you for contacting us, ${fname} ${lname}!</h1>
            <p>We will reach out to you at <strong>${email}</strong>.</p>
            <p>Your message: ${message}</p>
        `);
    } catch (err) {
        res.status(500).json({ error: "Error saving your info." });
    }
});



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}.`);
});
