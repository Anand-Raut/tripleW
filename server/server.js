import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

const app = express()
await connectDB()

// Middlewares

app.use(cors( {origin: "*"}))
app.use(express.json())

//Routes
app.get("/", (req, res) => {res.send("API working")})
app.use("/user", userRouter)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`)
})
//