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

  hoveredRow:number|null=null
  hoveredHour:number|null=null

  setHoverIndex(weekDay?:number,hour?:number){
    this.hoveredRow=weekDay??null
    this.hoveredHour=hour?? null
  }

  onCellClick(weekDay:number, index:number){
    this.rowClick.emit({weekDay:weekDay,column:this.columns[index]})
  }

  getCellClass(weekDay:number, index:number){
    return this.rows?.days[weekDay].turns.includes(this.columns[index])?"bg-appPrimary":""
  }
  getHoverStatusClass(weekDay:number, colIndex:number){ 
    if (colIndex=== -1) return null;

    const isStart=this.hoveredRow===weekDay && this.hoveredHour===colIndex
    const isMiddle=this.hoveredRow===weekDay &&  (this.hoveredHour===colIndex-1||this.hoveredHour===colIndex-2)
    const isEnd= this.hoveredRow===weekDay &&  this.hoveredHour===colIndex-3
    
    if(isStart&&isEnd) return "start-end"
    if(isStart)return "start"
    if(isEnd)return "end"
    if(isMiddle) return "middle"
    return null
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
