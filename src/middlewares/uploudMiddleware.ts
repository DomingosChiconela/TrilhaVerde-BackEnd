
import multerS3 from "multer-s3"
import  multer from "multer"
import { S3Client } from "@aws-sdk/client-s3"
import * as dotenv  from "dotenv"
dotenv.config()



 const REGION  = process.env.REGION as string 
 const  ACCESSKEYID=  process.env.ACCESSKEYID as string 
const SECRETACCESSKEY = process.env.SECRETACCESSKEY as string

 const s3Config  = new  S3Client({
  region: REGION ,
  credentials: {
    accessKeyId: ACCESSKEYID,
    secretAccessKey:SECRETACCESSKEY
  }
})



export const  uploadS3  = (buckerName:string) => { 
  return    multer ( { 
    storage : multerS3 ( { 
      s3 : s3Config , 
      bucket : buckerName, 
      acl : 'public-read' , 
      metadata : function  ( req ,  file ,  cb )  { 
        cb ( null ,  { fieldName : file . fieldname } ) ; 
      } , 
      key : function  ( req ,  file ,  cb )  { 
        const time = new Date().getTime().toString()
        console.log(file.originalname)
        cb ( null , time+"-"+file.originalname) 
 
      } 
    } ) 
  } ) }