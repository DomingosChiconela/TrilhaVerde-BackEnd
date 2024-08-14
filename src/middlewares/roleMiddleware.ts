import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";


const secret  =  process.env.SECRET as string

 
type TokenPayload = {

    role: string

}





export const RoleMiddleware = (roleRequired: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
  
      if (!authorization) {
        return res.status(401).json({ message: "Token not provided" });
      }
  
      const [, token] = authorization.split(" ");
  
      try {
        const decode = verify(token, secret) as TokenPayload;
        const { role } = decode;
   
        if (roleRequired !== role) {
          return res.status(403).json({ message: "Access denied. You do not have permission to access this resource." });
        }
  
        next();
      } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  };