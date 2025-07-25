export interface ModalProps{
    icon?: ModalIconEnum
    title: string
    message:string
    accept:{
        title:string
        action:()=>any
    }
    reject?:{
        title:string,
        action:()=>any
    }
}

export enum ModalIconEnum{
    ok='ok',
    error='error',
    warning='warning'
}