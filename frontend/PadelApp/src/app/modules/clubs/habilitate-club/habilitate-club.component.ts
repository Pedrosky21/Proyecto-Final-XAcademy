import { Component, OnInit } from '@angular/core';
import { FloorMaterial } from '../../../model/FloorMaterial';
import { WallMaterial } from '../../../model/WallMaterial';
import { ClubService } from '../../../core/services/ClubService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadingScreenService } from '../../../core/layouts/loading-screen/service/loadingService';
import { ConfirmationModalService } from '../../../core/layouts/confirmation-modal/service/confirmationModalService';
import { ModalIconEnum } from '../../../core/layouts/confirmation-modal/models/ModalProps';
import { EditTableColumn } from '../../../components/edit-table/models/ColumntSetting';
import { Court } from '../../../model/Court';
import { table } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habilitate-club',
  templateUrl: './habilitate-club.component.html',
  styleUrl: './habilitate-club.component.scss',
})
export class HabilitateClubComponent implements OnInit {
  form: FormGroup;
  constructor(
    private readonly clubService: ClubService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly loadingScreenService: loadingScreenService,
    private readonly confirmationModalService: ConfirmationModalService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cellNumber: ['', [Validators.required]],
      responsableFirstName: ['', [Validators.required]],
      responsableLastName: ['', [Validators.required]],
      userId: [5],
      turnPrice: ['', [Validators.required]],
      openingTime: ['', [Validators.required]],
      closingTime: ['', [Validators.required]],
      admisionRules: ['', [Validators.required]],
      cancelationRules: ['', [Validators.required]],
    });
  }

  selectableFloorMaterial: FloorMaterial[] = [];
  selectableWallMaterial: WallMaterial[] = [];
  newCourts: Court[] = [];

  getFieldError(field: string) {
    //si el campo tiene errores y fue clickeado
    const fieldErrors = this.form.get(field)?.errors;
    if (this.form.get(field)?.touched && fieldErrors) {
      if (fieldErrors['required']) return 'Este campo es requerido';
      if (fieldErrors['min'])
        return `Este campo no puede ser menor a ${fieldErrors['min'].min}`;
      if (fieldErrors['max'])
        return `Este campo no puede ser mayor a ${fieldErrors['max'].max}`;
    }
    return '';
  }

  columnsSettings: EditTableColumn<Court>[] = [];
  addCourt() {
    this.newCourts.push(
      new Court({
        wallMaterialId: '',
        floorMaterialId: '',
        roofted: false
      },
       this.newCourts.length !==0? this.newCourts[this.newCourts.length - 1].index + 1 : 1
    )
      
    );
  }

  handleRowChange(event: { index: number; key: keyof Court; value: any }) {
    (this.newCourts[event.index] as any)[event.key] = event.value;

  }

  deleteRow(event: { index: number }) {
    const middleCourts: Court[] = this.newCourts.slice(event.index);
    this.newCourts = middleCourts.map((row, i) => {
      return {
        ...row,
        index: i + 1,
      };
    });
  }

  validateTable(): string {
    const hasIncompleteCourt = this.newCourts.some((court) =>
      Object.entries(court).some(
        ([key, value]) =>
          key !== 'id' &&
          (value === null || value === undefined || value === '')
      )
    );
    return hasIncompleteCourt
      ? 'Todas las chanchas deben tener todos los datos'
      : '';
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const tableMessage = this.validateTable();
    if (this.form.invalid || tableMessage) {
      const message: string = this.form.invalid
        ? 'Revise los valores ingresados antes de continuar'
        : tableMessage;
      this.form.markAllAsTouched();
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title: 'Error en el formulario',
        message,
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
      });
    } else {
      this.confirmationModalService.openModal({
        title: 'Confirmar edición',
        message: `¿Desea guardar la configuración ingresada?`,
        reject: {
          title: 'Cancelar',
          action: () => {
            this.confirmationModalService.closeModal();
          },
        },
        accept: {
          title: 'Aceptar',
          action: () => {
            this.confirmationModalService.closeModal();
            this.loadingScreenService.showLoadingScreen('Guardando cambios...');
            const formValue = {
              ...this.form.value,
              courts: this.newCourts,
            };
            this.clubService.habilitateClub(formValue).subscribe({
              next: (response) => {
                setTimeout(() => {
                  this.loadingScreenService.showLoadingScreen(null);
                  this.confirmationModalService.openModal({
                    icon: ModalIconEnum.ok,
                    title: 'Club configurado con éxito',
                    message: 'Se ha guardado la nueva información con éxito',
                    accept: {
                      title: 'Aceptar',
                      action: () => {
                        
                        this.confirmationModalService.closeModal();
                        this.router.navigate(["/clubs/view-courts"])
                      },
                    },
                  });
                }, 1500);
              },
              error: (error) => {
                this.loadingScreenService.showLoadingScreen(null);
                this.confirmationModalService.openModal({
                  icon: ModalIconEnum.error,
                  title: 'Error',
                  message:
                    'No se pudo confirmar la actualización. Intente de nuevo más tarde',
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

  loadWallMaterial() {
    this.clubService.getWallMaterial().subscribe({
      next: (wallMaterial: any[]) => {
        this.selectableWallMaterial = wallMaterial.map(
          (element) => new WallMaterial(element)
        );
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      },
    });
  }

  loadFloorMaterial() {
    this.clubService.getFloorMaterials().subscribe({
      next: (floorMaterial: any[]) => {
        this.selectableFloorMaterial = floorMaterial.map(
          (element) => new FloorMaterial(element)
        );
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      },
    });
  }

  setColumns() {
    this.columnsSettings = [
      {
        key: 'index',
        title: 'N°',
        editable: false,
      },
      {
        key: 'wallMaterialId',
        title: 'Material Pared',
        editable: true,
        type: 'select',
        options: this.selectableWallMaterial as { id: number; name: string }[],
      },
      {
        key: 'floorMaterialId',
        title: 'Material Piso',
        editable: true,
        type: 'select',
        options: this.selectableFloorMaterial as { id: number; name: string }[],
      },
      {
        key: 'roofted',
        title: 'Techada',
        editable: true,
        type: 'select',
        options: [
          {
            name: 'SI',
            id: true,
          },
          {
            name: 'NO',
            id: false,
          },
        ],
      },
    ];
  }
  ngOnInit(): void {
    this.loadFloorMaterial();
    this.loadWallMaterial();
    this.setColumns();
    
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // adjust to content
  }
}
