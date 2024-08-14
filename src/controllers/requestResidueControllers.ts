import { Request,Response } from "express";
import {  z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"



const requestSchema  =  z.object({


   
   })



   export  const createRequest = async (req:Request,res:Response)=>{
    const userid =  req.userId
    const validation = requestSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    try{
        

        res.status(201).json({message:"Post created",data:newPost})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });

    }


}

