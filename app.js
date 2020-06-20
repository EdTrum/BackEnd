const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

//Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('DB connected')
});
mongoose.connection.on('error', err => { console.log(`DB connection error: ${err.message}`) });

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
//Cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}
//Routes
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/profileRoutes'))
//Start the server
const port = process.env.PORT || 8000
app.listen(port)
console.log(`Server listening on port ${port}`)
