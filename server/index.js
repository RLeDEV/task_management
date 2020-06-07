const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/check', function (req, res) {
    return res.send('success');
})

app.listen(`${process.env.BACKEND_PORT}`, () => {
    console.log(`Backend server is running on port ${process.env.BACKEND_PORT}`);
})