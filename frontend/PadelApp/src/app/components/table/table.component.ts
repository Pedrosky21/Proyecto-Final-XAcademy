import { Component, Input } from '@angular/core';
import { ViewColumnSettings } from './models/ViewColumnSettings';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent <T>{

  @Input() rows?:T[]=[]
  @Input() columns:ViewColumnSettings<T>[]=[]
}
