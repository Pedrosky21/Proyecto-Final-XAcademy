import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditTableColumn } from './models/ColumntSetting';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
})
export class EditTableComponent<T> {
  @Input() rows:T[]=[]
  @Input() columns:EditTableColumn<T>[]=[]
  @Output() addRow = new EventEmitter();
  @Output() changeRow=new EventEmitter<{index:number,key:keyof T, value:any}>()
  @Output() deleteRow= new EventEmitter<{index:number}>()
 
  emitAddRow() {
    this.addRow.emit(null);
  }

  emitRowChange(event: Event, index: number, key: keyof T) {
    const inputElement = event.target as HTMLInputElement;
    this.changeRow.emit({ index, key, value: inputElement.value });
  }

  emitDeleteRow(index:number){
    this.deleteRow.emit({index})
  }
}
