import { Request,Response } from "express";
import {  z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"




const postSchema  =  z.object({
 //   z.preprocess((val) => parseFloat(parseFloat(val as string).toFixed(2)), z.number().positive())
    image:z.string().optional(),
    price:z.number(),
    quantity:z.number().positive() ,
    latitude: z.string(),
    logitude:z.string(),
    description:z.string().optional(),
    residueId:z.string()

})

const updatePostSchema = postSchema.partial();





export  const createPost = async (req:Request,res:Response)=>{
    const userid =  req.userId
    const validation = postSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    try{
        const newPost = await db.post.create({
            data:{
                quantity:validation.data.quantity,
                price:validation.data.price,
                latitude:validation.data.latitude,
                logitude:validation.data.logitude,
                residueId: validation.data.residueId,
                description:validation.data.description,
                image:validation.data.image,
                userId:userid

                


            },
        })

        res.status(201).json({message:"Post created",data:newPost})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });

    }


}



export const  getAllPost = async(req:Request , res:Response)=>{

   

    try{

        const allPost = await db.post.findMany()

        res.status(200).json({message:"All posts",data:allPost})


    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }



}



export const getPost = async(req:Request , res:Response)=>{

    const {id} =  req.params

    try{

        const post =  await  db.post.findUnique({
            where:{
                id
            },
            include:{
                user:{
                    select:{
                        profile:{
                            select:{
                                name:true
                            }
                        }
                    }
                },
                residue:{
                    select:{
                        name:true
                    }
                }
            }
        })

        if(!post){
             return  res.status(400).json({message:"Post not found"})
        }

        res.status(200).json({message:"Post found",data:post})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validation = updatePostSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ message: fromZodError(validation.error).details });
    }

    try {
        const existingPost = await db.post.findUnique({
            where: { id }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (req.userId !== existingPost.userId && req.role !== "ADMIN") {
            return res.status(403).json({ message: "Access denied" });
        }

        const dataToUpdate = Object.fromEntries(
            Object.entries(validation.data).filter(([_, value]) => value !== undefined && value !== null)
        );

        const updatedPost = await db.post.update({
            where: { id },
            data: dataToUpdate,
        });

        res.status(200).json({ message: "Post updated", data: updatedPost });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deletePost = async(req:Request , res:Response)=>{

    const { id}  =  req.params


    try{

        const existingPost = await db.post.findUnique({
            where: {id}
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        
        if(req.userId !== existingPost.userId || req.role!== "ADMIN"){

            return res.status(403).json({ message: "Access denied" });
        }

        const Post  =  await  db.post.delete({
            where:{id}
        })

        if(!Post){
             return  res.status(400).json({message:"Post not found"})
        }

        res.status(200).json({message:"Post eliminated"})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}


export const UploudImgPost = async(req:Request,res:Response)=>{
    const userId =  req.userId
    const {id} =  req.params 
    console.log(id)

    


    try{
        const {location}= req.file as unknown as Express.MulterFile
       
         const existingPost = await db.post.findUnique({
             where:{
                 userId
             }
         });

         if (!existingPost) {
             return res.status(404).json({ message: "Post not found" });
         }

         if(req.userId !== existingPost.userId && req.role!== "ADMIN"){

             return res.status(403).json({ message: "Access denied" });
         }
         const postUpdated = await db.post.update({

             where:{
                 id ,
             },
             data:{
                image:location
             }
         })

        return res.status(200).json({message:"Image Post updated",postUpdated})

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }

}








