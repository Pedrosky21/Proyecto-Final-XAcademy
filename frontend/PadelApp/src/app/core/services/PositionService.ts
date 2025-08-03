import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private readonly apiUrl = 'http://localhost:3000/api/positions';

  constructor(private readonly http: HttpClient) {}

  getAllPositions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPositionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
