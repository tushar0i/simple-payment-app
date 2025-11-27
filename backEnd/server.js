const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const MONGO_URI = dotenv.parsed.MONGO_URI
const userRouter = require('./routes/user');
const accountRouter = require('./routes/account')

app.use(express.json())
app.use(cors())
app.use('/api/v1/user', userRouter)
app.use('api/v1/account',accountRouter)

app.use((err, req, res, next) => {
    console.error(err)
    res.json({
        message : 'something is up with the server please try again later'
    })
});

PORT = 3000

async function main() {
    await mongoose.connect(MONGO_URI)
    app.listen(PORT ,() => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
main()