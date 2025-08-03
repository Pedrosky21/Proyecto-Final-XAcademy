export class NewTeamRequest {
  name: string;
  description: string;

  constructor(data: any) {
    this.name = data.name ?? '';
    this.description = data.description ?? '';
  }
}
