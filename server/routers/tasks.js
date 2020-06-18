const express = require('express');
const connection = require('./connector');
const auth = require('../middleware/auth');
var router = express.Router();

// Get a task from DB by ID
router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id;
    query = `SELECT * FROM task WHERE id = ${_id}`;
    try {
        await connection.query(query, (err , results) => {
            if(err) {
                console.log(err);
                return res.send(JSON.stringify({data: err}));
            }
            return res.send(JSON.stringify({data: results}));
        })
    } catch (err) {
        return res.status(401).json({ msg: 'An error occured while tried to fetch task by task id' });
    }
})

// Get all tasks by user id
router.get('/user/:uid', auth, async (req, res) => {
    const _uid = req.params.uid;
    query = `SELECT taskId as id, title, description, status, added_date
             FROM users as u INNER JOIN havetask as ht on u.id = ht.userId 
             INNER JOIN task as t on t.id = ht.taskId 
             WHERE u.id = ${_uid}`;
    try {
        await connection.query(query, (err , results) => {
            if(err) {
                console.log(err);
                return res.send(JSON.stringify({data: err}));
            }
            return res.send(JSON.stringify({data: results}));
        })
    }
    catch(err) {
        return res.status(401).json({ msg: 'An error occured while tried to fetch task by user id' });
    }
})

router.post('/update', auth, async (req, res) => {
    const taskId = req.params.taskId;
    const status = req.params.status.toLowerCase();
    query = `UPDATE task SET status = ${status} WHERE id = ${taskId}`;
    try {
        await connection.query(query, (err, results) => {
            if(err) {
                console.log(err);
                return res.send(JSON.stringify({data: err}));
            }
            return res.send(JSON.stringify({data: results}))
        })
    }
    catch(err) {
        return res.status(401).json({ msg: 'An error occured while tried to update task status'});
    }
})

module.exports = router;