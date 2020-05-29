const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.port || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    } 
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        users = await User.find()
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        tasks = await Task.find()
        res.send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid Updates!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    } 
    
})

app.patch('/tasks/:id', async (req, res) => {

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

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}!`)
})