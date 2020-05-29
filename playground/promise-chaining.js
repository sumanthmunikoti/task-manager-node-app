require('../src/db/mongoose')
const User =  require('../src/models/user')

// User.findByIdAndUpdate('5ecd1c0dca1258ac54e65ed3', { age: 22 })
// .then((user) => { 
//     console.log(user)
//     return User.countDocuments({ age : 22}) 
// })
// .then((result) => { console.log(result) })
// .catch((e) =>  { console.log(e) })

const updateAgentAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgentAndCount('5ecd1c0dca1258ac54e65ed3', 77).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})