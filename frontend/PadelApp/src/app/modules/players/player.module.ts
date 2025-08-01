import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreMatchesComponent } from './explore-matches/explore-matches.component';
import { ModalCreateTeamComponent } from './explore-matches/modal-create-team/modal-create-team.component';
import { ModalCreateMatchComponent } from './explore-matches/modal-create-match/modal-create-match.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    ExploreMatchesComponent,
    ModalCreateTeamComponent,
    ModalCreateMatchComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class PlayersModule {}
