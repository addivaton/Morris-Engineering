const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('Morris-Engineering'));

app.listen(PORT, () => {
    console.log('server is running.')
});
