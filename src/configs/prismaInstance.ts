import { PrismaClient } from '@prisma/client'

const prisma:PrismaClient = new PrismaClient()

prisma.$connect().then(()=>{
    console.log('Connection with the Database established');
}).catch((err)=>{
    console.log('Something went wrong with the Database connection');
    console.log(err);
})

export default prisma;