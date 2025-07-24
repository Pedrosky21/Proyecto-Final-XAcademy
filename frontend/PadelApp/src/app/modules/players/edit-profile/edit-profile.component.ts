import { Component } from '@angular/core';
import { EditInputs } from '../../../model/edit-inputs';
import { CommonModule, NgFor } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, ReactiveFormsModule],
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
    { name: 'Imagen de Perfil ', type: 'file' },

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

  constructor(private fb: FormBuilder) {
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
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeErrorModal() {
    this.isErrorModalOpen = false;
  }

  closeSuccessModal() {
    this.isSuccessModalOpen = false;
  }

  confirmChanges() {
    if (this.form.invalid) {
      this.isModalOpen = false;
      this.errorMessage = 'Revise los cambios ingresados antes de continuar.';
      this.isErrorModalOpen = true;
      this.form.markAllAsTouched();
      return;
    }

    this.isModalOpen = false;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.isSuccessModalOpen = true;
    }, 2000);
  }
}
