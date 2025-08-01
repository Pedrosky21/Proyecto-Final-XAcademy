export class NewTeamRequest {
  name: string;
  description: string;

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
  }

  public validate(): string | null {
    if (!this.name || typeof this.name !== "string") {
      return "El name es un campo obligatorio y debe ser un string";
    }
    if (!this.description || typeof this.description !== "string") {
      return "Description es un campo obligatorio y debe ser un string";
    }
    return null;
  }
}
