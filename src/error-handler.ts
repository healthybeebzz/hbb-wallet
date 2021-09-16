/*
    Catches and logs all errors. Returns 500 and a general message to the user.
 */
import {NextFunction} from "express";
import {Request, Response} from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("err ", err);
    res.status(500).send('Oops, something went wrong!');
}

