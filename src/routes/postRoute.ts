
import  express from "express"
import type {Request,Response} from "express"
import { AuthMiddleware } from "../middlewares/authMiddleware"
import { uploadS3 } from "../middlewares/uploudMiddleware"
import { createPost, deletePost, getAllPost, getPost, updatePost, UploudImgPost } from "../controllers/postController"




export const  postRoute =  express.Router()

postRoute.get("/",getAllPost)
postRoute.get("/:id",AuthMiddleware,getPost)
postRoute.post("/",AuthMiddleware,createPost)
postRoute.put("/:id",AuthMiddleware,updatePost)
postRoute.delete("/:id",AuthMiddleware,deletePost)
postRoute.put("/image/:id",AuthMiddleware,uploadS3("bacissa-post").single('post'),UploudImgPost)



