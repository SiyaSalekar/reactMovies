// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})
const createError = require('http-errors');

// Express
const express = require(`express`)
const app = express()

//mongoDB
require(`./config/db`)

app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))

// Routers
app.use(require('./routes/movies'));



// Port
app.listen(process.env.SERVER_PORT, () =>
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})


// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error(err.message)
    if (!err.statusCode)
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})








