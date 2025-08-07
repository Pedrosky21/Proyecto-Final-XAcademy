import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match, NewMatchRequest } from '../../model/Match-model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly apiUrl = 'http://localhost:3000/api/players';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get matches with optional filters
   */
  getMatches(
    limit: number,
    page: number,
    roofed?: number | null,
    wallMaterial?: number | null,
    floorMaterial?: number | null
  ): Observable<{ matches: Match[]; total: number }> {
    let params = new HttpParams().set('limit', limit).set('page', page);

    if (roofed !== null && roofed !== undefined) {
      params = params.set('roofed', roofed);
    }
    if (wallMaterial !== null && wallMaterial !== undefined) {
      params = params.set('wallMaterial', wallMaterial);
    }
    if (floorMaterial !== null && floorMaterial !== undefined) {
      params = params.set('floorMaterial', floorMaterial);
    }

    return this.http.get<{ matches: Match[]; total: number }>(
      `${this.apiUrl}/matches`,
      { params }
    );
  }

  /**
   * Create a new match
   */
  createMatch(match: NewMatchRequest): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/match`, match);
  }
}
