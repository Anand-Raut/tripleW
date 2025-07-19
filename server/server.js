import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

const app = express()
await connectDB()

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Incoming origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json())

//Routes
app.get("/", (req, res) => {res.send("API working")})
app.use("/user", userRouter)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`)
})
//