import { NextFunction, Request, Response } from "express";

export function ErrorHandler(
    error:Error & {statusCode?:number},
    request:Request,
    response:Response,
    next:NextFunction):void{
    const statusCode =error.statusCode??500
    console.log(error)
    response.status(statusCode).json({
        statusCode:statusCode,
        message:error.message
    })
}