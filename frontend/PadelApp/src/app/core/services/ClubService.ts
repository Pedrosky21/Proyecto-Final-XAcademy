import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClubService {
    private readonly apiUrl = 'http://localhost:3000/api';

    constructor (private readonly http: HttpClient) {}

    getWallMaterial(): Observable<any> {
        return this.http.get(this.apiUrl+"/wall-materials");
    }

    getFloorMaterials():Observable<any>{
      return this.http.get(this.apiUrl+"/floor-materials")
    }

    habilitateClub(info:any):Observable<any>{
      console.log("NO EJETUCA")
      return this.http.post(this.apiUrl+"/clubs",info)
    }

    getClubByUserId():Observable<any>{
    
      const params={
        "userId":2
      }
      return this.http.get(this.apiUrl+"/clubs",{params})
    }

}


