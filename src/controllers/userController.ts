import { Request,Response } from "express";
import { date, z,  } from "zod";
import { db } from "../utils/db.server";
import { fromZodError } from "zod-validation-error"
import { v4 as uuidv4 } from 'uuid';

import { checkPassword, encryptPassword } from "../utils/cryptPassword";
import { sendEmail } from "../utils/email";
import { signupSchema } from "./authController";

const  UserSchema  = z.object({

    email:z.string().email("the email is not in the correct format").toLowerCase(),

})

const userSchema = z.object({


    name:z.string(),
    email:z.string().email("O email e obrgatorio").toLowerCase(),
   
})


const forgotSchema=  signupSchema.pick({
    email:true,
  })
  const resetSchema=  signupSchema.pick({
    password:true
    
  })



  export const getUser = async(req:Request , res:Response)=>{

    const  id  =  req.userId

    try{

        const user =  await  db.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
             return  res.status(400).json({message:"user not found"})
        }

        res.status(200).json({message:"user found",data:user})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}


export const  getAllUser = async(req:Request , res:Response)=>{

    try{

        const allUser = await db.user.findMany({
            select:{
               id:true,
               email:true,
               role:true,
               createdAt:true ,
               updatedAt:true,

               profile:{
                  select:{
                    name:true,
                    image:true,
                    createdAt:true,
                    updatedAt:true,
                    evaluation:true
                  }
               }

            }
        })

        res.status(200).json({message:"All User",data:allUser})


    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }



}




export const deleteUser = async(req:Request , res:Response)=>{

    const { id}  =  req.params


    try{

        const existingUser = await db.post.findUnique({
            where: {id}
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if(req.userId !== existingUser.userId && req.role!== "ADMIN"){

            return res.status(403).json({ message: "Access denied" });
        }

        const Post  =  await  db.user.delete({
            where:{id}
        })

        if(!Post){
             return  res.status(400).json({message:"User not found"})
        }

        res.status(200).json({message:"User eliminated"})
    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });


    }



}





export const  userUpdate =   async (req:Request,res:Response)=>{

    const id  =  req.params.id 


    try{
        const validation = UserSchema.safeParse(req.body);
        if(!validation.success){
            return  res.status(400).json({message:fromZodError(validation.error).details})
        }


        const userUpdate  = await db.user.update({
                    where:{id},
                    data:{email:validation.data.email }

                })


        res.status(200).json({message:"user updated",data:userUpdate})
        

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }

                

}
export const forgotPassword =  async  (req: Request, res: Response) => {

    const validation = forgotSchema.safeParse(req.body);

    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }


    try{

       const  existingUser =  await db.user.findUnique({
            where:{email:validation.data.email}
        })

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = uuidv4();
        const updatedUser  = await  db.user.update({
            where:{
                id:existingUser.id
            },
            data:{
                token 
            }

        })
        
        await sendEmail(existingUser.email,token)

        return res.status(200).json({ message: "email sent", data:updatedUser });

    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
        

}


export const  resetPassword =  async  (req: Request, res: Response) => {
     const {token} = req.params
     if(!token){
        return  res.status(400).json({message:"token is required"})
     }

    const validation = resetSchema.safeParse(req.body);

    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }

    const passwordHash  =  await encryptPassword (validation.data.password)

    try{

         
        const existingUser = await db.user.findUnique({
            where: {token}
        });

        if (!existingUser) {
            return res.status(404).json({ message: "The token is incorrect or has already been used, request a new one" });
        }

        const userUpdated =  await db.user.update({
            where:{token},
            data:{
                password:passwordHash,
                token: " "
            }
})


        return res.status(200).json({message:"Password reset",data:userUpdated})

     

    }catch(error){
        return res.status(500).json({ message: "Internal Server Error" });

    }

        

}


export const insightUser  =  async  (req: Request, res: Response) => {

        const id = req.userId


    try{
 
          const totalPosts = await db.post.count({where:{userId:id}})
          const postsByMonth = await db.post.groupBy({
            by: ['userId'],
            where: {
              userId: id, 
            },
            _count: {
              id: true,
            },
            _min: {
              createdAt: true,
            },
            orderBy: {
              _min: {
                createdAt: 'asc',
              },
            },
          });
          
          const labelMonth = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
          
          type QuantityByMonth = { [key: string]: number };
          
          const quantityByMonth = postsByMonth.reduce<QuantityByMonth>((acc, post) => {
            if (post._min.createdAt) {
              const date = new Date(post._min.createdAt);
              const month = date.getMonth();
              const year = date.getFullYear().toString();
              const monthYear = `${labelMonth[month]} ${year}`;
          
              if (!acc[monthYear]) {
                acc[monthYear] = 0;
              }
              acc[monthYear] += post._count.id;
            }
            
            return acc;
          }, {} as QuantityByMonth);

        const month= Object.keys(quantityByMonth);
        const quantity= Object.values(quantityByMonth);
           
                res.status(200).json({message:"insight ",data:{totalPosts,month,quantity}})
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error"});
    }
}
   
          
       
        
       
    
       
    
    
    
    
    
    
    






