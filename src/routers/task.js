const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        tasks = await Task.find()
        res.send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    } 
})

router.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.send({error : 'Invalid key requested to be updated'})
    }
     
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if (!task) {
            return res.status(404).send({error : 'Task not found'})
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/tasks/:id', async (req, res)  => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send({ error : 'Task Not Found'})
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send({ error : 'Something went wrong'})
    }
})

module.exports = router