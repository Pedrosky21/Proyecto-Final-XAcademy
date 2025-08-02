export class NewUserRequest {
    email: string
    password: string
    userType: 'Jugador' | 'Club' | 'Pendiente';

    constructor(data: any) {
        this.email = data.email
        this.password = data.password
        this.userType = 'Pendiente'
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