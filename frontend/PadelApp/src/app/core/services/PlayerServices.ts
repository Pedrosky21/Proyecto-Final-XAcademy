import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = 'http://localhost:3000/api/players';

  constructor(private readonly http: HttpClient) {}

  getPlayers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPlayer(player: any): Observable<any> {
    return this.http.post(this.apiUrl, player);
  }
  getPositions(): Observable<any> {
    return this.http.get(this.apiUrl + '/positions');
  }
  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + '/categories');
  }
  searchPlayersByName(fullName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/by-name`, {
      params: { fullName },
    });
  }
}
