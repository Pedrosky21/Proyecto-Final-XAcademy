import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WallMaterial {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class WallMaterialService {
  private apiUrl = 'http://localhost:3000/api/wall-materials'; // adjust to your backend route

  constructor(private http: HttpClient) {}

  getWallMaterials(): Observable<WallMaterial[]> {
    return this.http.get<WallMaterial[]>(this.apiUrl);
  }
}
