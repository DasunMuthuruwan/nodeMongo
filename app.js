const dotenv = require('dotenv')
const express = require('express')
const { connectTodb, getDb } = require('./db')

// init app & middleware
const app = express()

// config dotenv
dotenv.config()

const port = process.env.PORT
let db

connectTodb((err) => {
    if(!err) {
        app.listen(port, () => {
            console.log(`app listening port ${port}`);
        })
    }
    db = getDb()
})

app.get('/', (req, res) => {
    res.json({msg: "welcome to the api"})
})