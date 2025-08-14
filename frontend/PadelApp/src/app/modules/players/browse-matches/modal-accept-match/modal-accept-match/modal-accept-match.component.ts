import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../../../../../core/services/MatchService';
import { Match } from '../../../../../model/Match';

import { FloorMaterialService } from '../../../../../core/services/FloorMaterialService';
import { WallMaterialService } from '../../../../../core/services/WallMaterialService';
import { PlayerService } from '../../../../../core/services/PlayerServices';
import { ConfirmationModalService } from '../../../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../../../core/layouts/loading-screen/service/loadingService';
import { ModalIconEnum } from '../../../../../core/layouts/confirmation-modal/models/ModalProps';
import { title } from 'process';

@Component({
  selector: 'app-modal-accept-match',

  templateUrl: './modal-accept-match.component.html',
  styleUrl: './modal-accept-match.component.scss',
})
export class ModalAcceptMatchComponent {
  @Input() showAcceptMatchModal = false;
  @Input() match: Match | null = null;
  @Input() teams: any[] = [];
  acceptMatchForm: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  floorMaterialsMap: Map<number, string> = new Map();
  wallMaterialsMap: Map<number, string> = new Map();

  constructor(
    private readonly fb: FormBuilder,
    private readonly matchService: MatchService,
    private readonly playerService: PlayerService,
    private readonly floorMaterialService: FloorMaterialService,
    private readonly wallMaterialService: WallMaterialService,
    private readonly confirmationService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService
  ) {
    this.acceptMatchForm = this.fb.group({
      selectedTeam: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAcceptMatchModal'] && this.showAcceptMatchModal) {
      this.loadMaterials();
      this.loadUserTeams();
    }
  }

  loadMaterials() {
    this.floorMaterialService.getFloorMaterials().subscribe((materials) => {
      this.floorMaterialsMap.clear();
      for (const m of materials) {
        this.floorMaterialsMap.set(m.id, m.name);
      }
    });

    this.wallMaterialService.getWallMaterials().subscribe((materials) => {
      this.wallMaterialsMap.clear();
      for (const m of materials) {
        this.wallMaterialsMap.set(m.id, m.name);
      }
    });
  }

  loadUserTeams() {
    this.playerService.getTeamsByPlayerId().subscribe({
      next: (teams) => {
        this.teams = teams;
      },
      error: (err) => {
        console.error('Error loading user teams:', err);
      },
    });
  }

  getFloorMaterialName(id: number | undefined): string | undefined {
    if (!id) return undefined;
    return this.floorMaterialsMap.get(id);
  }

  getWallMaterialName(id: number | undefined): string | undefined {
    if (!id) return undefined;
    return this.wallMaterialsMap.get(id);
  }
  ngOnInit() {}

  onSubmit(): void {
    if (this.acceptMatchForm.invalid) {
      this.acceptMatchForm.markAllAsTouched();
      this.confirmationService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error en el formulario',
        message: 'Seleccione un equipo para continuar.',
        accept: {
          title: 'Aceptar',
          action: () => this.confirmationService.closeModal(),
        },
      });
      return;
    }

    const selectedTeamId = Number(this.acceptMatchForm.value.selectedTeam);
    const selectedTeamObj = this.teams.find((t) => t.id === selectedTeamId);
    const selectedTeamName = selectedTeamObj
      ? selectedTeamObj.name
      : 'Equipo desconocido';
    const rivalTeam = this.getRivalTeamName();

    this.confirmationService.openModal({
      title: '¿Confirmar Partido?',
      message: `¿Desea aceptar el partido vs ${rivalTeam} con tu equipo ${selectedTeamName}?`,
      reject: {
        title: 'Cancelar',
        action: () => this.confirmationService.closeModal(),
      },
      accept: {
        title: 'Confirmar',
        action: () => {
          this.confirmationService.closeModal();
          this.loadingScreenService.showLoadingScreen('Creando Partido...');
          console.log(this.match);
          this.matchService
            .acceptMatch(this.match!.id, selectedTeamId)
            .subscribe({
              next: () => {
                setTimeout(() => {
                  this.loadingScreenService.showLoadingScreen(null); // hide loader

                  this.confirmationService.openModal({
                    icon: ModalIconEnum.ok,
                    title: 'Partido creado con éxito',
                    message: 'Se ha creado el partido correctamente.',
                    accept: {
                      title: 'Aceptar',
                      action: () => {
                        this.confirmationService.closeModal();
                      },
                    },
                  });
                }, 2000);
              },
              error: (err) => {
                this.loadingScreenService.showLoadingScreen(null);
                console.error('Error accepting match', err);

                this.confirmationService.openModal({
                  icon: ModalIconEnum.error,
                  title: 'Error',
                  message:
                    (err?.error?.message || err?.message) ??
                    'Ocurrió un error al aceptar el partido.',
                  accept: {
                    title: 'Aceptar',
                    action: () => this.confirmationService.closeModal(),
                  },
                });
              },
            });
        },
      },
    });
  }

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  getRivalTeamName(): string {
    return this.match?.MatchesTeams?.[0]?.team?.name || 'Equipo Rival';
  }
}
