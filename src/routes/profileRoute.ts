
import  express from "express"
import { AuthMiddleware } from "../middlewares/authMiddleware"
import { uploadS3 } from "../middlewares/uploudMiddleware"
import { deleteProfile, getAllProfile, getProfile, updateProfile, UploudImgProfile } from "../controllers/profileController"



export const profileRoute = express.Router()


profileRoute.get("/allprofile/",AuthMiddleware,getAllProfile)
profileRoute.get("/",AuthMiddleware,getProfile)
profileRoute.put("/:id",AuthMiddleware,updateProfile)
profileRoute.delete("/:id",AuthMiddleware,deleteProfile)
profileRoute.post("/image",AuthMiddleware,uploadS3("bacissa-profile").single('profile'),UploudImgProfile)
