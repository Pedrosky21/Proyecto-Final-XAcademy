import AppError from "./AppError";


export class UnauhtorizedError extends AppError{
    constructor(message:string){
        super(message,401)
    }
}