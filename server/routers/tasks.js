const express = require('express');
const connection = require('./connector');
const auth = require('../middleware/auth');
const { query } = require('express');
var router = express.Router();

// Get a task from DB by ID
router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const query = `SELECT * FROM task WHERE id = ${_id}`;
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
    const query = `SELECT taskId as id, title, description, status, added_date, estimated_date
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

// Update task status
router.post('/update', auth, async (req, res) => {
    const taskId = req.body.id;
    const status = req.body.status.toLowerCase();
    const query = `UPDATE task SET status = '${status}' WHERE id = ${taskId}`;
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

// Delete task
router.post('/delete', auth, async (req, res) => {
    const taskId = req.body.id;
    const deleteTaskQuery = `DELETE FROM task WHERE id = ${taskId}`;
    const deleteUserTaskQuery = `DELETE FROM havetask WHERE taskId = ${taskId}`
    try {
        await connection.execute(deleteTaskQuery);
        await connection.execute(deleteUserTaskQuery);
        return res.status(200).send(JSON.stringify({ msg: 'Successfully deleted a new task.'}));
    }
    catch(err) {
        return res.status(401).json({ msg: 'An error occured while tried to delete task'});
    }
})

router.post('/new', auth, async (req, res) => {
    const uid = req.body.uid;
    const taskName = req.body.taskName;
    const description = req.body.description;
    const estimatedDate = req.body.estimatedDate;
    const status = req.body.status;
    let taskId = '';
    addTaskQuery = `INSERT INTO task (title,description,status,estimated_date) VALUES ('${taskName}','${description}','${status}','${estimatedDate}')`;
    findTaskIdQuery = `SELECT max(id) as id FROM task WHERE title = '${taskName}'`;
    try {
        // Injecting into task table
        await connection.execute(addTaskQuery)
        // Getting the new inserted task id
        const getTaskId = await connection.execute(findTaskIdQuery)
        taskId = JSON.stringify(getTaskId[0][0].id)
        await connection.execute(`INSERT INTO havetask (id,userId,taskId) VALUES (${taskId},${uid},${taskId})`);
        return res.status(200).send(JSON.stringify({ msg: 'Successfully added a new task.'}));
    }
    catch(err) {
        console.log(err);
        return res.status(401).json({ msg: 'An error occured while tried to add task'});
    }
})

module.exports = router;