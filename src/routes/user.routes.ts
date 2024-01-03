import jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from "express";
import { userLoginCredentials, userRegisterCredentials } from "../validations/user.validation";
import { LoginCredentialType, RegisterCredentialType } from "../types";
import bcrypt from 'bcrypt';
import prisma from "../configs/prismaInstance";
import authorization from '../middlewares/authorization.middleware';

const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginCredentialType = req.body;
    const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
    try {
        const check = userLoginCredentials.safeParse({ email, password });
        if (!check.success) return next({ status: 422, message: 'Invalid Credentials' });
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (!userExists) return next({ status: 404, message: 'User not found' });
        const match = await bcrypt.compare(password, userExists.password);
        if(!match) return next({status: 401, message: 'Incorrect Password'});
        if(JWT_SECRET_KEY){
            const token = jwt.sign({userId: userExists.id}, JWT_SECRET_KEY);
            return res.status(200).send({token});
        }
        next({status: 500, message: 'Internal Server Error'});
    } catch (err) {
        next(err)
    }
})

router.post('/register', async (req: Request, res: Response, next: NextFunction)=>{
    const {name, email, password}: RegisterCredentialType = req.body;
    const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS)
    try{
        const check = userRegisterCredentials.safeParse({name, email, password});
        if(!check.success) return next({status: 422, message: 'Invalid Credentials'});
        const userExists = await prisma.user.findUnique({where: {email}});
        if(userExists) return next({status: 401, message: 'User Already Exists'});
        if(SALT_ROUNDS){
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
            const user = await prisma.user.create({
                data: {
                    name, email, password: hashedPassword, role: 'customer'
                }
            })
            console.log(user);
            return res.status(201).send({message: 'User Added'});
        }
        next({status: 500, message: 'Internal Server Error'});
    }catch(err){
        next(err);
    }
})

router.post('/add-manager', authorization(['admin']), async (req: Request, res: Response, next: NextFunction)=>{
    res.status(200).send({msg: 'This is a private Route'});
})

router.post('/add-staff', authorization(['admin', 'manager']), async (req: Request, res: Response, next: NextFunction)=>{
    res.status(200).send({msg: 'This is a private Route'});
})

export default router;