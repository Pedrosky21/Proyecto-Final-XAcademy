import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { DiagramatingTurnsCourt } from '../../model/DiagramatedTurn';
import { WeekDayEnum } from './enums/WeekDayEnum';

@Component({
  selector: 'app-turn-table',
  templateUrl: './turn-table.component.html',
  styleUrl: './turn-table.component.scss'
})
export class TurnTableComponent{
  @Input() columns:string[]=[]
  @Input() rows?:DiagramatingTurnsCourt
  @Output() rowClick= new EventEmitter<{weekDay:number,column:string}>()
 

  weekDayEnum = WeekDayEnum;

  onCellClick(weekDay:number, index:number){
    console.log("-----")
    console.log(this.rows?.days[weekDay])
    this.rowClick.emit({weekDay:weekDay,column:this.columns[index]})
  }

  getCellClass(weekDay:number, index:number){
    return this.rows?.days[weekDay].turns.includes(this.columns[index])?"bg-appPrimary":""
  }
  getCellStatus(weekDay: number, colIndex: number): ('start' | 'middle' | 'end' | 'start-end' | null) {

  if (colIndex=== -1) return null;

  const isStart=this.rows?.days[weekDay].turns.includes(this.columns[colIndex])
  const isMiddle=colIndex===1 &&this.rows?.days[weekDay].turns.includes(this.columns[colIndex-1])||
  colIndex>=2 &&(this.rows?.days[weekDay].turns.includes(this.columns[colIndex-1])||this.rows?.days[weekDay].turns.includes(this.columns[colIndex-2]))
  const isEnd= colIndex>=3 &&this.rows?.days[weekDay].turns.includes(this.columns[colIndex-3])
  
  if(isStart&&isEnd) return "start-end"
  if(isStart)return "start"
  if(isEnd)return "end"
  if(isMiddle) return "middle"
  return null
}
}
