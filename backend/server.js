import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

// App config
const app = express()
const port = process.env.PORT || 5000
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// API Endpoints
app.get('/', (req, res) => {
    res.send('API is running...')
})

// Listener
app.listen(port, () => console.log("Server running on port ", port))