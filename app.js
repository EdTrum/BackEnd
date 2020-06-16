const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
//Cors
if (process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}
//Routes
app.use('/api', require('./routes/userRoutes'))
//Start the server
const port = process.env.PORT || 8000
app.listen(port)
console.log(`Server listening on port ${port}`)
