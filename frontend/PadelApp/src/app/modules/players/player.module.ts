import { CommonModule } from "@angular/common";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlayersModule { }