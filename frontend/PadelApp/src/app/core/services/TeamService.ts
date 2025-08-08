import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewTeamRequest } from '../../model/NewTeamRequest';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly apiUrl = 'http://localhost:3000/api/players/team';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  createTeam(
    creatorId: number,
    newTeam: NewTeamRequest,
    playerId: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      creatorId,
      name: newTeam.name,
      description: newTeam.description,
      playerId,
    });
  }
}
