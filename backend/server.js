import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRoutes from './routes/auth.js'

// App config
const app = express()
const port = process.env.PORT || 5000
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// API Endpoints
app.get('/', (req, res) => {
    res.send('Sun Valley Mega Health Center API is running...')
})

// Routes
app.use('/api/auth', authRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Listener
app.listen(port, () => console.log("Server running on port ", port))