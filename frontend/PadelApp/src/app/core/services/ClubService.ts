import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';
import { DiagramatingTurnsCourt } from '../../model/DiagramatedTurn';
import { WeekDayEnum } from '../../components/turn-table/enums/WeekDayEnum';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  getWallMaterial(): Observable<any> {
    return this.http.get(this.apiUrl + '/wall-materials');
  }

  getFloorMaterials(): Observable<any> {
    return this.http.get(this.apiUrl + '/floor-materials');
  }

  habilitateClub(info: any): Observable<any> {
    const token = this.authService.getToken();

    return this.http.post(this.apiUrl + '/clubs',
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  }

  getClubByUserId(): Observable<any> {
    const token = this.authService.getToken();
    return this.http.get(this.apiUrl + '/clubs',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } );
  }

  diagramTurns(turns:DiagramatingTurnsCourt[],selectedMonth:string): Observable<any>{
    const body={
      "year":selectedMonth.split("-")[0],
      "month":selectedMonth.split("-")[1],
      "courts":turns.map((turn)=>{
        return{
          courtId:turn.courtId,
          days:turn.days.map((day)=>{
            return{
              weekDay: WeekDayEnum[day.label as keyof typeof WeekDayEnum],
              turns:day.startHours.map((turn)=>turn.hour)

            }
          })
        }
      })
    }
    
    const token = this.authService.getToken();
    return this.http.post(this.apiUrl + '/clubs/diagram-turns',
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  }

  getCourtTurnsByWeek(courtId:number,day:string): Observable<any>{
    const params:any ={
      "courtId":courtId,
      "startDate":day
    }
    return this.http.get(this.apiUrl+"/clubs/court-turns",{params})
  }

  markTurnAsReserved(turnId:number,fullName:string): Observable<any>{
    const body:any ={
      "turnId":turnId,
      "playerName":fullName
    }
    
    return this.http.post(this.apiUrl+"/clubs/reserve-turn",body)
  }
}
