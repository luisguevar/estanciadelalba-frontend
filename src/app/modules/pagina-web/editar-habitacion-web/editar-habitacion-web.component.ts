import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { AlertService } from '../../service/alert.service';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';

@Component({
  selector: 'app-editar-habitacion-web',
  templateUrl: './editar-habitacion-web.component.html',
  styleUrls: ['./editar-habitacion-web.component.scss']
})
export class EditarHabitacionWebComponent {
  habitacion: HabitacionEntity = new HabitacionEntity();
  lstEstados: any[] = [
    { id: 1, descripcion: 'Activo' },
    { id: 0, descripcion: 'Inactivo' }
  ]
  nEstado: number = 1;
  nNroHabitacion: number = 0;
  imagen_file: any = null;
  imagen_previzualiza: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarHabitacionWebComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService
  ) {
    if (this.data.element) {

      this.habitacion = this.data.element;
      this.nEstado = this.habitacion.nEstado || 1;
      this.nNroHabitacion = this.habitacion.nNroHabitacion || 0;
      this.imagen_previzualiza = this.habitacion.cImagen;

    }



  }

  BotonGuardar() {
    let formData = new FormData();
    formData.append("id", this.habitacion.id ? this.habitacion.id.toString() : '');
    formData.append("imagen_file", this.imagen_file);
    formData.append("nEstado", this.nEstado.toString());

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Actualizar Habitación",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.PostHabitacionWeb(formData).subscribe(
          (response) => {
            // Si el registro fue exitoso
            if (response.success) {
              this.toaster.success('Actualizar Habitacion', 'Habitación actualizada exitosamente.');
              this.dialogRef.close();
            } else {
              this.toaster.error('Actualizar Habitacion', 'Error al actualizar la Habitación.');
            }
          },
          (error) => {
            this.toaster.error('Actualizar Habitacion', 'Ocurrió un error al actualizar la Habitación.');

          }
        );
      }
    });
  }


  processFile($event: any) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      /*   this.toaster.open(NoticyAlertComponent, { text: `danger-'El Archivo cargado no es una imagen'` });
        return; */
    }
    this.imagen_file = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.imagen_file);
    reader.onloadend = () => this.imagen_previzualiza = reader.result;


  }
}
