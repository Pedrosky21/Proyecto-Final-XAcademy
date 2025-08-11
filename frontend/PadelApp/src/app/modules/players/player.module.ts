import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreMatchesComponent } from './explore-matches/explore-matches.component';
import { ModalCreateTeamComponent } from './explore-matches/modal-create-team/modal-create-team.component';
import { ModalCreateMatchComponent } from './explore-matches/modal-create-match/modal-create-match.component';
import { ComponentsModule } from '../../components/components.module';
import { BrowseMatchesComponent } from './browse-matches/browse-matches.component';
import { ModalAcceptMatchComponent } from './browse-matches/modal-accept-match/modal-accept-match/modal-accept-match.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    ExploreMatchesComponent,
    ModalCreateTeamComponent,
    ModalCreateMatchComponent,
    BrowseMatchesComponent,
    ModalAcceptMatchComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule],
})
export class PlayersModule {}
