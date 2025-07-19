import express from 'express'
import { give_points, create_user, get_users } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.get("/get", get_users)
userRouter.post("/claim-points", give_points)
userRouter.post("/create", create_user)

export default userRouter