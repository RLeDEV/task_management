const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('./middleware/auth');
const cors = require('cors');

// Routers
const tasks = require('./routers/tasks');
const signin = require('./routers/signin');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// // Router usage
app.use('/api/tasks', tasks);
app.use('/api/users', signin);

// app.get('/check', function (req, res) {
//     return res.send('success');
// })

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend server is running on port ${process.env.BACKEND_PORT}`);
})