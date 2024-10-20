const PORT = 8080;
const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

//parses Contact form data
app.use(bodyParser.urlencoded({ extended: true}));

// display the home page
app.use(express.static(__dirname + '/'));

app.post('/ContactUs', function(req, res) {
    const {fname, lname, email, message } = req.body;

    res.send(`
        <h1>Thank you for contacting us, ${fname} ${lname}!</h1>
        <p>We will reach out to you at <strong>${email}</strong>.</p>
        <p>Your message: ${message}</p>
    `);
});



app.listen(PORT, () => {
    console.log('server is running.')
});
