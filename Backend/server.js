const express =require('express')
const dotenv =require('dotenv')
const colors= require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')

//dotenv configuration
dotenv.config()

//mongodb connection
connectDB()
//rest object 
//storing features of exrs in a variable to use 
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/test' , require('./routes/testRoutes'))
app.use('/api/v1/auth', require('./routes/authRoutes'))

app.use('/api/v1/inventory' , require('./routes/inventoryRoutes'))
//port
const PORT = process.env.PORT || 8080;

//LISTEN METHOD

app.listen(PORT, () =>{
    console.log(`Server running in ${process.env.DEV_MODE} mode on ${process.env.PORT} port`.bgBlue.white)
})
