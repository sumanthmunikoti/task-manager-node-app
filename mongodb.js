const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to db')
    } 

    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        age: 27
    }).then((res) => {
        console.log(res.result)
    }).catch((rej) => {
        console.log(rej)
    })
})