import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FloorMaterial {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FloorMaterialService {
  private apiUrl = 'http://localhost:3000/api/floor-materials';

  constructor(private http: HttpClient) {}

  getFloorMaterials(): Observable<FloorMaterial[]> {
    return this.http.get<FloorMaterial[]>(this.apiUrl);
  }
}
