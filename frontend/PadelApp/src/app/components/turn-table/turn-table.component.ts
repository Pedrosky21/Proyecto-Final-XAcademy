import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeekDayEnum } from './enums/WeekDayEnum';
import { TableTurn } from './types/TableTurn';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-turn-table',
  templateUrl: './turn-table.component.html',
  styleUrl: './turn-table.component.scss',
})
export class TurnTableComponent {
  @Input() columns: string[] = [];
  @Input() rows?: TableTurn[];
  @Input() type: 'diagramTurns' | 'viewClub' | 'viewPlayer' = 'diagramTurns';
  @Output() rowClick = new EventEmitter<{ weekDay: number; column: string }>();

  weekDayEnum = WeekDayEnum;

  hoveredRow: number | null = null;
  hoveredHour: number | null = null;

  setHoverIndex(weekDay?: number, hour?: number) {
    this.hoveredRow = weekDay ?? null;
    this.hoveredHour = hour ?? null;
  }

  onCellClick(weekDay: number, index: number) {
    this.rowClick.emit({ weekDay: weekDay, column: this.columns[index] });
  }

  getCellClass(weekDay: number, colIndex: number) {
    return this.rows![weekDay].startHours.find(
      (element) => element.hour === this.columns[colIndex]
    )
      ? 'bg-appPrimary'
      : '';
  }
  getHoverStatusClass(weekDay: number, colIndex: number) {
    if (colIndex === -1) return null;

    const isStart =
      this.hoveredRow === weekDay && this.hoveredHour === colIndex;
    const isMiddle =
      this.hoveredRow === weekDay &&
      (this.hoveredHour === colIndex - 1 || this.hoveredHour === colIndex - 2);
    const isEnd =
      this.hoveredRow === weekDay && this.hoveredHour === colIndex - 3;

    if (isStart && isEnd) return 'start-end';
    if (isStart) return 'start';
    if (isEnd) return 'end';
    if (isMiddle) return 'middle';
    return null;
  }

  getCellStatus(
    weekDay: number,
    colIndex: number
  ): 'start' | 'middle' | 'end' | 'start-end' | null {
    if (colIndex === -1) return null;
    const hoursSet = new Set(this.rows![weekDay].startHours.map((e) => e.hour));

    const colHour = this.columns[colIndex];
    const prevHour1 = this.columns[colIndex - 1];
    const prevHour2 = this.columns[colIndex - 2];
    const prevHour3 = this.columns[colIndex - 3];

    const isStart = hoursSet.has(colHour);
    const isMiddle =
      (colIndex === 1 && hoursSet.has(prevHour1)) ||
      (colIndex >= 2 && (hoursSet.has(prevHour1) || hoursSet.has(prevHour2)));
    const isEnd = colIndex >= 3 && hoursSet.has(prevHour3);

    if (isStart && isEnd) return 'start-end';
    if (isStart) return 'start';
    if (isEnd) return 'end';
    if (isMiddle) return 'middle';
    return null;
  }
  getCellTurnStatus(weekDay: number, colIndex: number) {
    const startHours = this.rows![weekDay].startHours;

    const colHour = this.columns[colIndex];
    const prevHour1 = this.columns[colIndex - 1];
    const prevHour2 = this.columns[colIndex - 2];
    const prevHour3 = this.columns[colIndex - 3];

    const checkState = (stateId: number) =>
      startHours.some(
        (e) =>
          e.idState === stateId &&
          [colHour, prevHour1, prevHour2, prevHour3].includes(e.hour)
      );

    const isCreated = checkState(1);
    const isReserved = checkState(2);
    const isPaid = checkState(3);

    if (isCreated && isReserved) return 'created-reserved';
    if (isCreated && isPaid) return 'created-paid';
    if (isPaid && isReserved) return 'paid-reserved';
    if (isCreated) return 'created';
    if (isReserved) return 'reserved';
    if (isPaid) return 'paid';
    return null;
  }

  getMiddleIndex(weekDay: number, colIndex: number){
    const startHours = this.rows![weekDay].startHours;

    const isIndexOne= startHours.find((element)=>element.hour===this.columns[colIndex - 1])
    
    return isIndexOne?1:2

  }
}
