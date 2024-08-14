import { Request,Response } from "express";
import {  date, z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"




const profileSchema  =  z.object({
    name :z.string(),
    image : z.string().optional(),
   
})




export  const createProfile = async (req:Request,res:Response)=>{

    const validation = profileSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    try{
        const newProfile = await db.profile.create({
            data:{
               name: validation.data.name,
               

            }
        })

        res.status(201).json({message:"created profile",data:newProfile})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });

    }


}




export const  getAllProfile = async(req:Request , res:Response)=>{

    try{

        const allProfile = await db.profile.findMany()

        res.status(200).json({message:"All profile",data:allProfile})


    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }



}


export const getProfile = async(req:Request , res:Response)=>{

    const  id  =  req.userId

    try{

        const profile =  await  db.profile.findUnique({
            where:{
                userId:id
            }
        })

        if(!profile){
             return  res.status(400).json({message:"profile not found"})
        }

        res.status(200).json({message:"profile found",data:profile})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}




export const updateProfile  = async(req:Request , res:Response)=>{
    
    const {id } =  req.params
    

    
    const validation = profileSchema.safeParse(req.body);

    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }
    try{

         
        const existingProfile = await db.profile.findUnique({
            where: {id}
        });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const profileUpdated = await db.profile.update({

            where:{id},
            data:{
                name:validation.data.name,
                
                
            }
        })


        return res.status(200).json({message:"Profile updated",data:profileUpdated})

     

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }





}



export const deleteProfile= async(req:Request , res:Response)=>{

    const { id}  =  req.params


    try{

        const existingProfile = await db.profile.findUnique({
            where: {id}
        });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }


        const Profile  =  await  db.profile.delete({
            where:{id}
        })

        if(!Profile){
             return  res.status(400).json({message:"Profile not found"})
        }

        res.status(200).json({message:"Residue eliminated"})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}



export const UploudImgProfile = async(req:Request,res:Response)=>{

    const id = req.userId
    console.log(id)
    console.log(id)
    const {location}= req.file as unknown as Express.MulterFile
    console.log(req.file)
    console.log(location)

    try{

        const existingProfile = await db.profile.findUnique({
            where:{
                userId:id
            }
        });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const profileUpdated = await db.profile.update({

            where:{
                id:existingProfile.id ,
            },
            data:{
               image:location
            }
        })

        return res.status(200).json({message:"Image Profie updated",data:profileUpdated})

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }

}



















