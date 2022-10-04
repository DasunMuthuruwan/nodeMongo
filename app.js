const dotenv = require('dotenv')
const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// init app & middleware
const app = express()

// config dotenv
dotenv.config()

const port = process.env.PORT
let db

connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`app listening port ${port}`);
        })
    }
    db = getDb()
})

app.get('/', (req, res) => {
    let customers = []
    db.collection('customers')
        .find()
        .sort({ name: 1 })
        .forEach((customer) => customers.push(customer))
        .then(() => {
            res.status(200).json(customers)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})

app.get('/customer/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('customers')
            .findOne({ _id: ObjectId(req.params.id) })
            .then((doc) => {
                res.status(200).json(doc)
            })
            .catch((err) => {
                res.status(500).json({ error: 'Could not fetch document' })
            })
    } else {
        res.status(500).json({ error: 'Not a valid doc id' })
    }

})