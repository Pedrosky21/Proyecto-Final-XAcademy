import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  getPlayers(): Observable<any> {
    return this.http.get(this.apiUrl + '/players');
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/players/${id}`);
  }

  createPlayer(player: any): Observable<any> {
    return this.http.post(this.apiUrl + '/players', player);
  }
  getPositions(): Observable<any> {
    return this.http.get(this.apiUrl + '/positions');
  }
  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + '/categories');
  }
}
