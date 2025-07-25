export class NewUserRequest {
    email: string
    password: string

    constructor(data: any) {
        this.email = data.email
        this.password = data.password
    }

    public validate():string|null{
        if (!this.email || typeof(this.email)!=="string") {
            return "El email es un campo obligatorio y debe ser un string"
        }
        if (!this.password || typeof(this.password)!=="string") {
            return "Password es un campo obligatorio y debe ser un string"
        }
        return null
    }
}