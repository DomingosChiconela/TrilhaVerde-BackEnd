
import express,{ urlencoded }  from "express"
import * as dotenv  from "dotenv"
import cors from "cors"
import { authRoute } from "./routes/authRoute"




dotenv.config()
const app  =   express()

const port =  process.env.PORT

app.use(express.json())
app.use(cors())
app.use(urlencoded({extended:true}))



app.use('/api/auth',authRoute)




app.listen(port , ()=>{

    console.log(` servidor rodando em http://localhost:${port}`)
    
    
    })
    




