import express, { ErrorRequestHandler, Request, Response, NextFunction, Application } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.routes';

config();

const PORT: Number = Number(process.env.PORT) || 3000;

const app: Application = express();

app.use(cors())
app.use(express.json());

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ msg: 'Welcome to Restaurant/Cafe POS Backend assignment' });
})

app.use('/users', userRouter);

app.use('/*', (req: Request, res: Response, next: NextFunction) => {
    next({status: 404, message: 'Page not found'})
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        Error: err.message
    })
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is running on Port: ${PORT}`);
})