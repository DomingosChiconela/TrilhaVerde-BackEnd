
import  express from "express"
import { createRequest } from "../controllers/requestResidueControllers"

export const  requestResidue=  express.Router()


requestResidue.post('/',createRequest)