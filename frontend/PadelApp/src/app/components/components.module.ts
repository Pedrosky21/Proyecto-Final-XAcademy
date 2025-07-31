import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditTableComponent } from "./edit-table/edit-table.component";

@NgModule({
  declarations: [
    EditTableComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    EditTableComponent
  ]
})
export class ComponentsModule { }