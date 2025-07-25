import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
    private apiUrl = 'http://localhost:3000/api/players';

    constructor (private http: HttpClient) {}

    getPlayers(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getPlayerById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    createPlayer(player: any): Observable<any> {
        return this.http.post(this.apiUrl, player);
    }

}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:3000/api/categories';

    constructor (private http: HttpClient) {}

    getCategories(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}

@Injectable({
  providedIn: 'root'
})
export class PositionService {
    private apiUrl = 'http://localhost:3000/api/positions';

    constructor (private http: HttpClient) {}

    getPositions(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}

