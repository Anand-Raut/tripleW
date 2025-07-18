import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'

const app = express()
await connectDB()
// Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get("/", (req, res) => {res.send("API working")})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`)
})
