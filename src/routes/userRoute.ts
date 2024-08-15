import  express from "express"
import { forgotPassword, getAllUser, insightUser, resetPassword, userUpdate } from "../controllers/userController"



export const userRoute =  express.Router()

userRoute.get("/",getAllUser)
userRoute.put('/update',userUpdate)
userRoute.get('/insight',insightUser)
userRoute.post("/forgotPassword",forgotPassword)
userRoute.put("/resetPassword/:token",resetPassword)