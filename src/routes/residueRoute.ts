
import  express from "express"
import { createResidue, deleteResidue, getAllResidue, getResidue, updateReside } from "../controllers/residueController"





export const  residueRoute =  express.Router()

residueRoute.get("/",getAllResidue)
residueRoute.get("/:id",getResidue)
residueRoute.post("/",createResidue)
residueRoute.put("/:id",updateReside)
residueRoute.delete("/:id",deleteResidue)

