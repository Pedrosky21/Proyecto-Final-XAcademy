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
import { ModalPendingMatchComponent } from './explore-matches/modal-pending-match/modal-pending-match.component';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@NgModule({
  declarations: [
    EditProfileComponent,
    ExploreMatchesComponent,
    ModalCreateTeamComponent,
    ModalCreateMatchComponent,
    BrowseMatchesComponent,
    ModalAcceptMatchComponent,
    ModalPendingMatchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
  ],
})
export class PlayersModule {}
