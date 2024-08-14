import { Request,Response } from "express";
import {  z } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"

const  residueSchema  = z.object({
    name:z.string()

})  




export  const createResidue = async (req:Request,res:Response)=>{

    const validation = residueSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    try{
        const newResidue = await db.residue.create({
            data:{
                name:validation.data.name
            }
        })

        res.status(201).json({message:"Residue created",data:newResidue})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });

    }


}



export const  getAllResidue = async(req:Request , res:Response)=>{

    try{

        const allResidue = await db.residue.findMany({
            select:{
                id:true,
                name:true
            }
        })

        res.status(200).json({message:"All Residue",data:allResidue})


    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }



}


export const getResidue = async(req:Request , res:Response)=>{

    const { id}  =  req.params

    try{

        const residue  =  await  db.residue.findUnique({
            where:{
                id
            }
        })

        if(!residue){
             return  res.status(400).json({message:"Residue not found"})
        }

        res.status(200).json({message:"Residue found",data:residue})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}


export const updateReside  = async(req:Request , res:Response)=>{
    const {id} = req.params
    const validation = residueSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }
    try{

        const existingResidue = await db.residue.findUnique({
            where: {id}
        });

        if (!existingResidue) {
            return res.status(404).json({ message: "Residue not found" });
        }

        const updateReside =  await db.residue.update({
            where:{
                id
            },
            data:{
                name:validation.data.name
            }
        })

        if(!updateReside){
            return  res.status(400).json({message:"Residue not found"})
        }
        res.status(200).json({message:"updated residue",data:updateReside})

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }





}




export const deleteResidue = async(req:Request , res:Response)=>{

    const { id}  =  req.params


    try{

        const existingResidue = await db.residue.findUnique({
            where: {id}
        });

        if (!existingResidue) {
            return res.status(404).json({ message: "Residue not found" });
        }


        const residue  =  await  db.residue.delete({
            where:{id}
        })

        if(!residue){
             return  res.status(400).json({message:"Residue not found"})
        }

        res.status(200).json({message:"Residue eliminated"})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}


