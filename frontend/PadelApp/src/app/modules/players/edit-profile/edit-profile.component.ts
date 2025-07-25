import { Component } from '@angular/core';
import { EditInputs } from '../../../model/edit-inputs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';
import {
  PlayerService,
  CategoryService,
  PositionService,
} from '../../../core/services/PlayerServices';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  isModalOpen = false;
  isLoading = false;
  isSuccessModalOpen = false;
  isErrorModalOpen = false;
  errorMessage = '';
  form: FormGroup;

  EditItems: EditInputs[] = [
    { name: 'Nombre', type: 'text' },
    { name: 'Apellido', type: 'text' },
    { name: 'Fecha de Nacimiento', type: 'date' },
    { name: 'Telefono', type: 'tel' },
    { name: 'Imagen de Perfil ', type: 'text' },

    {
      name: 'Posicion',
      type: 'select',
      options: ['Delantero', 'Mediocampista', 'Defensor', 'Arquero'],
      // Estos options deberian venir de la BBDD
    },
    {
      name: 'Categoria',
      type: 'select',
      options: ['Sub-15', 'Sub-18', 'Sub-21', 'Libre'],
      // Estos options deberian venir de la BBDD
    },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService,
    private readonly playerService: PlayerService,
    private readonly categoryService: CategoryService,
    private readonly positionService: PositionService
  ) {
    this.form = this.fb.group({});

    this.EditItems.forEach((item) => {
      const controlName = this.getControlName(item.name);
      this.form.addControl(
        controlName,
        this.fb.control('', Validators.required)
      );
    });
  }

  getControlName(label: string): string {
    return label.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  }
  openModal() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error en el formulario',
        message: 'Revise los campos e intente nuevamente.',
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
      });
    } else {
      this.confirmationModalService.openModal({
        title: 'Confirmar configuración',
        message:
          '¿Desea guardar la configuracion ingresada? Podra modificarla en cualquier momento.',
        reject: {
          title: 'Seguir editando',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
        accept: {
          title: 'Confirmar',
          action: () => {
            this.confirmationModalService.closeModal();
            this.loadingScreenService.showLoadingScreen('Guardando cambios...');

            // pasar form a data para el backend
            const dataToSend = {
              firstName: this.form.value.Nombre,
              lastName: this.form.value.Apellido,
              birthDate: this.form.value.FechadeNacimiento,
              cellNumber: Number(this.form.value.Telefono),
              pictureUrl: this.form.value.ImagendePerfil,
              userId: 1,
              categoryId: 1,
              positionId: 1,
            };

            // llamada a servicio
            this.playerService.createPlayer(dataToSend).subscribe({
              next: () => {
                console.log(dataToSend);
                this.loadingScreenService.showLoadingScreen(null);
                this.confirmationModalService.openModal({
                  icon: ModalIconEnum.ok,
                  title: 'Cambios guardados',
                  message: 'Se ha guardado la configuración correctamente',
                  accept: {
                    title: 'Aceptar',
                    action: () => {
                      this.confirmationModalService.closeModal();
                    },
                  },
                });
              },
              error: () => {
                console.log(dataToSend);
                this.loadingScreenService.showLoadingScreen(null);
                this.confirmationModalService.openModal({
                  icon: ModalIconEnum.error,
                  title: 'Error al guardar',
                  message:
                    'Ha ocurrido un error al guardar la configuración, intente de nuevo más tarde.',
                  accept: {
                    title: 'Aceptar',
                    action: () => {
                      this.confirmationModalService.closeModal();
                    },
                  },
                });
              },
            });
            
          },
        },
      });
    }
  }
}
