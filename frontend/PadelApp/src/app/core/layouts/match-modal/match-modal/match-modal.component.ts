import { Component, OnDestroy } from '@angular/core';
import {
  MatchModalProps,
  MatchFormData,
  TimeSlot,
  ModalIconEnum,
} from '../models/ModalProps';
import { Subscription } from 'rxjs';
import { MatchModalService } from '../service/matchModalService';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { ConfirmationModalService } from '../../confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../loading-screen/service/loadingService';

@Component({
  selector: 'app-match-modal',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './match-modal.component.html',
  styleUrl: './match-modal.component.scss',
})
export class MatchModalComponent implements OnDestroy {
  modalProps: MatchModalProps | null = null;
  subscription: Subscription;
  ModalIcon = ModalIconEnum;

  formData: MatchFormData = {
    selectedTeam: '',
    floorMaterial: 'Concreto',
    wallMaterial: 'Cualquiera',
    roofed: 'Cualquiera',
    timeSlots: [],
  };

  constructor(
    private service: MatchModalService,
    private confirmationService: ConfirmationModalService,
    private loadingScreenService: loadingScreenService
  ) {
    this.subscription = this.service.getModalState().subscribe((modalInfo) => {
      this.modalProps = modalInfo;
      if (modalInfo) {
        // Reset form
        this.formData = {
          selectedTeam: '',
          floorMaterial: 'Concreto',
          wallMaterial: 'Cualquiera',
          roofed: 'Cualquiera',
          timeSlots: [],
        };
      }
    });
  }

  handleConfirmClick = () => {
    this.service.closeModal();

    setTimeout(() => {
      this.confirmationService.openModal({
        title: '¿Confirmar partido?',
        message: '¿Desea crear el partido con el equipo Los Imbatibles?',
        icon: ModalIconEnum.ok,
        accept: {
          title: 'Sí, confirmar',
          action: () => {
            this.confirmationService.closeModal();
            this.loadingScreenService.showLoadingScreen('Creando Partido...');
            // data to send

            setTimeout(() => {
              this.loadingScreenService.showLoadingScreen(null);
            }, 2000);

            this.confirmationService.openModal({
              icon: ModalIconEnum.ok,
              title: 'Partido creado con exito',
              message: 'Tu solicitud de partido ha sido enviada correctamente.',
              accept: {
                title: 'Aceptar',
                action: () => {
                  this.confirmationService.closeModal();
                },
              },
            });
          },
        },
        reject: {
          title: 'Cancelar',
          action: () => {
            console.log('Usuario canceló la confirmación');
            this.confirmationService.closeModal();
          },
        },
      });
    }, 300);
  };

  handleRejectClick = () => {
    this.modalProps?.onCancel?.();
    this.service.closeModal();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
