import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { DiaEntity, HabitacionEntity, ServicioEntity } from 'src/app/models/TarifaHoteleraEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-add-habitacion',
  templateUrl: './add-habitacion.component.html',
  styleUrls: ['./add-habitacion.component.scss']
})
export class AddHabitacionComponent {

  nNroHabitacion: number = 0;
  tipoHabitacion_id: number = 0;
  lstTiposHabitaciones: any = [];
  lstHabitaciones: HabitacionEntity[] = [];
  lstServicios: ServicioEntity[] = [];
  lstPrecios: DiaEntity[] = [];
  nivel_id: number = 0;
  lstNiveles: NivelHabitacionEntity[] = [
    { id: 1, cNombreNivel: 'Tercer Nivel' },
    { id: 2, cNombreNivel: 'Cuarto Nivel' },
    { id: 3, cNombreNivel: 'Quinto Nivel' },
  ]
  estado_id: number = 0;
  lstEstado: any[] = [

    { id: 0, cNombreEstado: 'Inactivo' }
  ]
  bPermisoEdicion: boolean = false;
  bPermisoEliminacion: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddHabitacionComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService
  ) {
    this.lstTiposHabitaciones = data.lstTiposHabitaciones;
    this.lstHabitaciones = data.lstHabitaciones;
    this.bPermisoEdicion = data.bPermisoEdicion;
    this.bPermisoEliminacion = data.bPermisoEliminacion;
    if (data.lstServicios) {
      this.lstServicios = data.lstServicios.map((s: ServicioEntity) => {
        return { ...s, bActivo: false };
      });
    }

    if (data.lstPrecios) {
      this.lstPrecios = data.lstPrecios.map((s: DiaEntity) => {
        return { ...s, nPrecio: 0 };
      });
    }


  }

  BotonGuardar() {
    if (this.nNroHabitacion === 0) {
      this.toaster.warning('Agregar Habitación', 'El campo Nro Habitación es requerido.');
      return;
    }

    // Asegurarse de que tipoHabitacion_id sea un número entero

    if (this.tipoHabitacion_id === 0) {
      this.toaster.warning('Agregar Habitación', 'El campo Tipo Habitación es requerido ');
      return;
    }

    if (this.nivel_id === 0) {
      this.toaster.warning('Agregar Habitación', 'El campo Nivel es requerido ');
      return;
    }



    const nNroHabitacion = parseInt(this.nNroHabitacion as unknown as string, 10);

    const habitacionExistente = this.lstHabitaciones.find(h => h.nNroHabitacion === nNroHabitacion);
    if (habitacionExistente) {
      this.toaster.warning('Agregar Habitación', 'El número de habitación ya existe.');
      return;
    }
    const tipoHabitacionId = parseInt(this.tipoHabitacion_id as unknown as string, 10);

    let cNombreTipo: string = '';
    const tipoHabitacion = this.lstTiposHabitaciones.find((t: any) => t.id === tipoHabitacionId);
    if (tipoHabitacion?.cNombreTipo) {
      cNombreTipo = tipoHabitacion.cNombreTipo;
    }

    //limpiar el bactivo de los servicios

    const habitacion = new HabitacionEntity();
    habitacion.id = 0;
    habitacion.nNroHabitacion = this.nNroHabitacion;
    habitacion.tipoHabitacion_id = this.tipoHabitacion_id;
    habitacion.nivelHabitacion_id = this.nivel_id ?? 0;
    habitacion.cNombreTipo = cNombreTipo;
    habitacion.lstServicios = this.lstServicios;
    habitacion.lstPrecios = this.lstPrecios;
    habitacion.nEstado = this.estado_id;

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Registrar Habitación",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.PostHabitacion(habitacion).subscribe(
          (response) => {
            // Si el registro fue exitoso
            if (response.success) {
              this.toaster.success('Agregar Habitacion', 'Habitación registrada exitosamente.');
              this.dialogRef.close();
            } else {
              this.toaster.error('Agregar Habitacion', 'Error al registrar la Habitación.');
            }
          },
          (error) => {
            this.toaster.error('Agregar Habitacion', 'Ocurrió un error al registrar la Habitación.');

          }
        );
      }
    });



  }
}
