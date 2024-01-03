import prisma from "../configs/prismaInstance";
import { RoleType, RolesType } from "../types";
import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

const authorization = (roles: RolesType)=>{
    return async (req:Request, res: Response, next: NextFunction)=>{
        const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
        const token: string | undefined = req.headers?.authorization?.split(' ')[1] || req.headers.authorization;
        try{
            if(!token) return res.status(404).send({Error: 'Token not found'})
            if(!JWT_SECRET_KEY) return res.status(404).send({Error: 'Token not found'});
            const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
            const role = await prisma.user.findUnique({where: {id: decoded.userId}, select: {role: true}}).then(res => res?.role) as RoleType;
            if(!role) return res.status(500).send({Error: 'Something went wrong!'})
            if(!roles.includes(role)) return res.status(401).send({Error: 'You are not authorized'})
            console.log(role);
            next();
        }catch(err:any){
            res.status(500).send({Error: err.message});
        }
    }
}

export default authorization;
