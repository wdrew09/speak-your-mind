// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const path = require('path')

// require('dotenv').config()

// const app = express()


// app.use(cors())
// app.use(express.json())

// const uri = process.env.ATLAS_URI
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

// const connection = mongoose.connection
// connection.once('open', () => {
//     console.log("MongoDB database connection established succesfully")
// })

// const userRouter = require('./routes/api/users')
// const postRouter = require('./routes/api/posts')

// app.use('/api/account', userRouter)
// app.use('/api/posts', postRouter)


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('../build'))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
// }


// //If port 5000 is busy, use whatever is available
// const port = process.env.PORT || 5000

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })