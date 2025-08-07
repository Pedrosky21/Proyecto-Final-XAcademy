import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditTableComponent } from "./edit-table/edit-table.component";
import { TurnTableComponent } from "./turn-table/turn-table.component";

@NgModule({
  declarations: [
    EditTableComponent,
    TurnTableComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    EditTableComponent,
    TurnTableComponent
  ]
})
export class ComponentsModule { }