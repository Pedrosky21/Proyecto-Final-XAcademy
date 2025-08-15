import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/AuthService';
import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService,
    private loadingScreenService: loadingScreenService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  handleRegister() {
    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Contraseñas no coinciden',
        message: 'Asegúrate de que ambas contraseñas coincidan.',
        accept: {
          title: 'Aceptar',
          action: () => this.confirmationModalService.closeModal(),
        },
      });
      return;
    }

    this.loadingScreenService.showLoadingScreen('Registrando usuario...');

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loadingScreenService.showLoadingScreen(null);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.loadingScreenService.showLoadingScreen(null);
        this.confirmationModalService.openModal({
          icon: ModalIconEnum.error,
          title: 'Error al registrar',
          message: 'No se pudo crear el usuario. Intenta nuevamente.',
          accept: {
            title: 'Aceptar',
            action: () => this.confirmationModalService.closeModal(),
          },
        });
      },
    });
  }
}
