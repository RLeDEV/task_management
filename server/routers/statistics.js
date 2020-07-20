const express = require('express');
const connection = require('./connector');
const dotenv = require('dotenv');
const auth = require('../middleware/auth');

dotenv.config();

var router = express.Router();

router.get('/all', async (req, res) => {
    const email = req.query.email;
    pendingsQuery = `SELECT count(ht.taskId) AS pendings 
                    FROM havetask AS ht INNER JOIN users AS u ON u.id = ht.userId
                    INNER JOIN task AS t ON t.id = ht.id 
                    WHERE u.email = "${email}" AND t.status = "pending"; `;
    inprogressQuery = `SELECT count(ht.taskId) AS inprogress 
                    FROM havetask AS ht INNER JOIN users AS u ON u.id = ht.userId
                    INNER JOIN task AS t ON t.id = ht.id 
                    WHERE u.email = "${email}" AND t.status = "inprogress"; `;
    doneQuery =     `SELECT count(ht.taskId) AS done 
                    FROM havetask AS ht INNER JOIN users AS u ON u.id = ht.userId
                    INNER JOIN task AS t ON t.id = ht.id 
                    WHERE u.email = "${email}" AND t.status = "done"`
    var pendings;
    var inprogress;
    var done;
    try {
        await connection.query(`${pendingsQuery}${inprogressQuery}${doneQuery}`, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(401).send(JSON.stringify({ data: err }));
            }
            pendings = results[0][0]['pendings'];
            inprogress = results[1][0]['inprogress'];
            done = results [2][0]['done'];
            let finalRes = {
                pendings,
                inprogress,
                done
            }
            return res.send(JSON.stringify({finalRes}));
        })
    }
    catch(err) {
        return res.status(401).json({ msg: 'An error occured while tried to get user tasks status.' });
    }
})

module.exports = router;