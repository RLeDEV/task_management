const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('./middleware/auth');
const cors = require('cors');

// Routers
const tasks = require('./routers/tasks');
const users = require('./routers/users');
const statistics = require('./routers/statistics');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Router usage
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.use('/api/statistics', statistics);

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend server is running on port ${process.env.BACKEND_PORT}`);
})