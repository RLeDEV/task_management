const express = require('express');
const connection = require('./connector');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

var router = express.Router();

// Sign-in
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const pwd = req.body.pwd;
    const hashedPwd = await bcrypt.hash(pwd, 8);
    const query = `SELECT * FROM users
                   WHERE email = ${email} AND password = ${pwd}`

    try {
        await connection.query(query, (err , results) => {
            if(err) {
                console.log(err);
                return res.status(401).send(JSON.stringify({ data: err }));
            }
            const token = jwt.sign({ uid: email}, process.env.JWT_TOKEN, {'expiresIn': '2 days'});
            localStorage.setItem('token', token);

            return res.status(200).send(results, token);
        })
    } catch (err) {
        return res.status(401).json({ msg: 'An error occured while tried to validate user in login process' });
    }
})