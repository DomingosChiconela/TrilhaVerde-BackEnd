
import  express from "express"
import { deleteUser, getAllUser, userUpdate } from "../controllers/userController"
import { AuthMiddleware } from "../middlewares/authMiddleware"
import { RoleMiddleware } from "../middlewares/roleMiddleware"
import { createUser, InsightAdmin } from "../controllers/adminController"


export const  adminRoute =  express.Router()

adminRoute.get('/',AuthMiddleware,RoleMiddleware("ADMIN"),InsightAdmin)
adminRoute.post('/user/',AuthMiddleware,RoleMiddleware("ADMIN"),createUser)
adminRoute.get('/user',AuthMiddleware,RoleMiddleware("ADMIN"),getAllUser)
adminRoute.put('/user/:id',AuthMiddleware,RoleMiddleware("ADMIN"),userUpdate)
adminRoute.delete('/user/:id',AuthMiddleware,RoleMiddleware("ADMIN"),deleteUser)





