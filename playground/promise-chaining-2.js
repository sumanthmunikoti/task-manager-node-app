const Task = require('../src/models/task')
require('../src/db/mongoose')

// Task.findByIdAndRemove('5ecd29a1946dac3ae859963b').then(() => {
//     return Task.find({
//         completed : false 
//     })
// }).then((tasks) => {
//     console.log(tasks)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndRemove(id)
    const count  = await Task.countDocuments({ completed : false})
    return count
}

deleteTaskAndCount('5ecd4d9caf1acf3fc8378fae').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
