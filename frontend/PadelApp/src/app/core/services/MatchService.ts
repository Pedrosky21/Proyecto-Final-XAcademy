import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match, NewMatchRequest } from '../../model/Match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly apiUrl = 'http://localhost:3000/api/players';

  constructor(private readonly http: HttpClient) {}

  getMatches(
    limit: number,
    page: number,
    roofed?: number | null,
    wallMaterial?: number | null,
    floorMaterial?: number | null
  ): Observable<Match[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    if (roofed !== null && roofed !== undefined) {
      params = params.set('roofed', roofed.toString());
    }
    if (wallMaterial !== null && wallMaterial !== undefined) {
      params = params.set('wallMaterial', wallMaterial.toString());
    }
    if (floorMaterial !== null && floorMaterial !== undefined) {
      params = params.set('floorMaterial', floorMaterial.toString());
    }

    return this.http.get<Match[]>(`${this.apiUrl}/matches`, { params });
  }

  createMatch(newMatch: NewMatchRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/match`, newMatch);
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/match/${id}`);
  }

  getClubsForMatch(matchId:number):Observable<any>{
    return this.http.get(this.apiUrl+`/clubs/${matchId}`)
  }
  getCourtsForMatch(matchId:number,clubId:number):Observable<any>{
    const params={
      "clubId":clubId,
      "matchId":matchId
    }
    return this.http.get(this.apiUrl+`/courts`, {params})
  }
  
  getTurnsForMatch(matchId:number, courtId:number,day:string){
    const params={
      "courtId":courtId,
      "matchId":matchId,
      "startDate":day
    }
    return this.http.get(this.apiUrl+`/turns`, {params})

  }

  reserveTurn(matchId:number,turnId:number){
    const body={
      "matchId":matchId,
      "turnId":turnId
    }
    return this.http.post(`${this.apiUrl}/reserve-turn`, body);
  }
}
