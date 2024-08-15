import { Request,Response } from "express";
import { fromZodError } from "zod-validation-error"
import { date, z } from "zod";
import { encryptPassword } from "../utils/cryptPassword";
import { db } from "../utils/db.server";



const userSchema = z.object({


    name:z.string(),
    email:z.string().email("O email e obrgatorio").toLowerCase(),
    password:z.string(),
    confirmPassword:z.string().min(8,"A senha nao deve ter menos de 8 caracteres "),
    role: z.enum(['USER', 'ADMIN']),
   
})



export const createUser = async (req: Request, res: Response) => {

    try {
        
        const validation = userSchema.safeParse(req.body);
        if(!validation.success){
            return  res.status(400).json({message:fromZodError(validation.error).details})
        }

        if(validation.data.password !== validation.data.confirmPassword){
           return res.status(400).json({message:"The passwords do not match"})
        }
        const passwordHash  =  await encryptPassword(validation.data.password)

       const  newUser =  await db.user.create({
        data:{
            email:validation.data.email,
            password: passwordHash,
            role:validation.data.role,

            profile:{
                create:{
                    name:validation.data.name
                }
            }
        },
        select:{
            id:true,
            email:true,
            profile:true
        }
        

       }
          
        )

        res.status(201).json({message:"user created ",data:newUser})
       


    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const InsightAdmin  =  async  (req: Request, res: Response) => {



try{
    const   totalUsers = await db.user.count()
    const   totalPosts = await db.post.count()

    const postsByMonth = await db.post.groupBy({
        by: ['createdAt'],
        _count: {
        id: true,
        },
        orderBy: {
        createdAt: 'asc',
        },
    });
 const labelMonth = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

    const quantityByMonth = postsByMonth.map(post => {
        const month = post.createdAt.getMonth(); 
        const year = post.createdAt.getFullYear().toString();
        return {
        month:`${labelMonth[month]} ${year}`,
        count: post._count.id,
        };
    });

    res.status(200).json({message:"insight ",data:{totalUsers,totalPosts,quantityByMonth}})
} catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
}

} 



