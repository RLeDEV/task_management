const express = require('express');
const connection = require('./connector');
var router = express.Router();

// Get a task from DB by ID
router.get('/task/:id', async (req, res) => {
    const _id = req.params.id;
    query = `SELECT * FROM task WHERE id = ${_id}`;
    await connection.query(query, (err , results) => {
        if(err) {
            console.log(err);
            return res.send(JSON.stringify({data: err}));
        }
        return res.send(JSON.stringify({data: results}));
    })
})

// Get all tasks by user id
router.get('/user/:uid', async (req, res) => {
    const _uid = req.params.uid;
    query = `SELECT taskId as id, title, description, status, added_date
             FROM users as u INNER JOIN havetask as ht on u.id = ht.userId 
             INNER JOIN task as t on t.id = ht.taskId 
             WHERE u.id = ${_uid}`;
    await connection.query(query, (err , results) => {
        if(err) {
            console.log(err);
            return res.send(JSON.stringify({data: err}));
        }
        return res.send(JSON.stringify({data: results}));
    })
})

module.exports = router;