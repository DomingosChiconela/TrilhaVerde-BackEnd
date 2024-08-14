import { Request,Response } from "express";
import {  z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"



const requestSchema  =  z.object({

    postId:z.string(),
    userId:z.string(),
    status: z.enum(['Pendente', 'Recusado', 'Aceite'])
   })



   export  const createRequest = async (req:Request,res:Response)=>{
    const userid =  req.userId
    const validation = requestSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    try{

      const  requestResidue =  await db.requestResidue.create({

            data:{ 
                postId:validation.data.postId,
                userId:validation.data.userId
            },
        })
        

        res.status(201).json({message:"Request  created",requestResidue})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });

    }


}



export  const responseResquestResidue = async (req:Request,res:Response)=>{
    const userid =  req.userId
    const requestResidueID  =  req.params.id 
    const validation = requestSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    try{

      const  requestResidue =  await db.requestResidue.update({

          where:{
            id: requestResidueID,

          },
          data:{
            status:validation.data.status,
          }
        })
        

        res.status(201).json({message:"Request  created",requestResidue})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });

    }


}



