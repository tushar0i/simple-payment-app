const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const dotenv = require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI
const PORT = Number(process.env.PORT)
const userRouter = require('./routes/user');
const accountRouter = require('./routes/account')
const testRouter = require('./routes/test')

app.set("trust proxy", 1);
app.use(express.json())
app.use(cors())
app.use('/api/v1/user', userRouter)
app.use('/api/v1/account',accountRouter)
app.use('api/v1/test',testRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

app.use((err, req, res, next) => {
    console.error(err)
    res.json({
        message : 'something is up with the server please try again later'
    })
});

async function main() {
    await mongoose.connect(MONGO_URI)
    app.listen(PORT ,() => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
main()

