import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';
import { PlayerService } from '../../../core/services/PlayerServices';
import { AuthService } from '../../../core/services/AuthService';
import { UserService } from '../../../core/services/UserService';
import { CategoryService } from '../../../core/services/CategoryService';
import { PositionService } from '../../../core/services/PositionService';

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

  categorias: { label: string; value: number }[] = [];
  posiciones: { label: string; value: number }[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly loadingScreenService: loadingScreenService,
    private readonly playerService: PlayerService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly categoryService: CategoryService,
    private readonly positionService: PositionService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', Validators.required, Validators.minLength(2)],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      imagenPerfil: ['', [Validators.pattern('https?://.+')]],
      posicion: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchSelectOptions();
  }

  fetchSelectOptions(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: any[]) => {
        this.categorias = categories.map((cat) => ({
          label: cat.name,
          value: Number(cat.id),
        }));
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      },
    });

    this.positionService.getAllPositions().subscribe({
      next: (positions: any[]) => {
        this.posiciones = positions.map((pos) => ({
          label: pos.name,
          value: Number(pos.id),
        }));
      },
      error: (err) => {
        console.error('Error al cargar posiciones', err);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error en el formulario',
        message: 'Revise los campos e intente nuevamente.',
        accept: {
          title: 'Aceptar',
          action: () => this.confirmationModalService.closeModal(),
        },
      });
      return;
    }

    this.confirmationModalService.openModal({
      title: 'Confirmar configuración',
      message:
        '¿Desea guardar la configuración ingresada? Podrá modificarla en cualquier momento.',
      reject: {
        title: 'Seguir editando',
        action: () => this.confirmationModalService.closeModal(),
      },
      accept: {
        title: 'Confirmar',
        action: () => {
          this.confirmationModalService.closeModal();
          this.loadingScreenService.showLoadingScreen('Guardando cambios...');

          const userId = this.authService.getLoggedInUser()?.id;

          const dataToSend = {
            firstName: this.form.value.nombre,
            lastName: this.form.value.apellido,
            birthDate: this.form.value.fechaNacimiento,
            cellNumber: Number(this.form.value.telefono),
            pictureUrl: this.form.value.imagenPerfil,
            userId: Number(userId),
            categoryId: Number(this.form.value.categoria),
            positionId: Number(this.form.value.posicion),
          };

          this.playerService.createPlayer(dataToSend).subscribe({
            next: () => {
              setTimeout(() => {
                this.loadingScreenService.showLoadingScreen(null);
                this.confirmationModalService.openModal({
                  icon: ModalIconEnum.ok,
                  title: 'Cambios guardados',
                  message: 'Se ha guardado la configuración correctamente',
                  accept: {
                    title: 'Aceptar',
                    action: () => this.confirmationModalService.closeModal(),
                  },
                });
              }, 1500);
            },
            error: () => {
              this.loadingScreenService.showLoadingScreen(null);
              console.error('Error creating player:', this.errorMessage);
              this.confirmationModalService.openModal({
                icon: ModalIconEnum.error,
                title: 'Error al guardar',
                message:
                  'Ha ocurrido un error al guardar la configuración, intente de nuevo más tarde.',
                accept: {
                  title: 'Aceptar',
                  action: () => this.confirmationModalService.closeModal(),
                },
              });
            },
          });
        },
      },
    });
  }

  closeErrorModal(): void {
    this.isErrorModalOpen = false;
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen = false;
  }
}
