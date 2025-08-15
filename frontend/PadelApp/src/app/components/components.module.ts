import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditTableComponent } from "./edit-table/edit-table.component";
import { TurnTableComponent } from "./turn-table/turn-table.component";
import { TableComponent } from "./table/table.component";

@NgModule({
  declarations: [
    EditTableComponent,
    TurnTableComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    EditTableComponent,
    TurnTableComponent,
    TableComponent
  ]
})
export class ComponentsModule { }