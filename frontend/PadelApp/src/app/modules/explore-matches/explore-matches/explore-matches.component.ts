import { Component } from '@angular/core';
import {
  MatchModalProps,
  ModalIconEnum,
} from '../../../core/layouts/match-modal/models/ModalProps';
import { MatchModalService } from '../../../core/layouts/match-modal/service/matchModalService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore-matches',
  standalone: true,
  imports: [],
  templateUrl: './explore-matches.component.html',
  styleUrl: './explore-matches.component.scss',
})
export class ExploreMatchesComponent {
  constructor(private matchModalService: MatchModalService) {}
  openCreateMatchModal() {
    this.matchModalService.openModal({
      title: 'Crear Partido',
      message: 'Complete la información para publicar un nuevo partido.',
      icon: ModalIconEnum.ok,
      teams: ['Los Imbatibles', 'Los Guardianes'],
      accept: {
        title: 'Confirmar',
      },

      onCancel: () => {
        console.log('Modal cancelado');
      },
    });
  }
}
