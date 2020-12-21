const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config()

const app = express()


app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully")
})

const userRouter = require('./backend/routes/api/users')
const postRouter = require('./backend/routes/api/posts')

app.use('/api/account', userRouter)
app.use('/api/posts', postRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})