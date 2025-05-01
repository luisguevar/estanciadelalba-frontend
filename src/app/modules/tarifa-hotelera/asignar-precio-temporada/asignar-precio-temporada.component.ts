import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { HabitacionEntity, TemporadaEntity } from 'src/app/models/TarifaHoteleraEntity';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-asignar-precio-temporada',
  templateUrl: './asignar-precio-temporada.component.html',
  styleUrls: ['./asignar-precio-temporada.component.scss']
})
export class AsignarPrecioTemporadaComponent {
  isLoading$: any;
  nTipoAsignacion: number = 0;

  lstTiposAsignacion: any = [
    { id: 1, cNombre: 'Por Habitación' },
    { id: 2, cNombre: 'Por Tipo Habitación' },
    { id: 3, cNombre: 'Por Nivel' },
    { id: 4, cNombre: 'Todas las Habitaciones' }

  ];

  lstNiveles: any = [{ id: 1, cNombreNivel: 'Tercer Nivel' }, { id: 2, cNombreNivel: 'Cuarto Nivel' }, { id: 3, cNombreNivel: 'Quinto Nivel' }];
  lstHabitaciones: HabitacionEntity[] = [];
  lstTiposHabitaciones: any = [];
  pageSize = 5;
  desde: number = 0;
  hasta: number = 5

  cFechaInicio: string;
  cFechaFin: string;
  cNombreTemporada: string;
  nPrecio: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AsignarPrecioTemporadaComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService
  ) {
    this.lstTiposHabitaciones = data.lstTiposHabitaciones;
    this.lstHabitaciones = data.lstHabitaciones;
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.desde = 0;
    this.hasta = 5;


  }


  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  BotonGuardar() {
    // Validar que todos los campos estén completos
    if (!this.cNombreTemporada || !this.cFechaInicio || !this.cFechaFin || !this.nPrecio) {
      this.toaster.warning('Temporada', 'Complete todos los campos para agregar.');
      return;
    }

    // Extraer los valores de la fecha correctamente
    const fechaInicioParts = this.cFechaInicio.split('-').map(Number);
    const fechaFinParts = this.cFechaFin.split('-').map(Number);

    // Crear las fechas sin que sean convertidas a UTC
    const fechaInicio = new Date(fechaInicioParts[0], fechaInicioParts[1] - 1, fechaInicioParts[2]);
    const fechaFin = new Date(fechaFinParts[0], fechaFinParts[1] - 1, fechaFinParts[2]);

    // Obtener la fecha de ayer correctamente
    const fechaAyer = new Date();
    fechaAyer.setDate(fechaAyer.getDate() - 1);
    fechaAyer.setHours(0, 0, 0, 0);

    // Validar que la fecha de inicio sea mayor a la fecha de ayer
    if (fechaInicio <= fechaAyer) {
      this.toaster.warning('Temporada', 'La fecha de inicio debe ser mayor a la fecha de hoy.');
      return;
    }

    // Validar que la fecha de fin sea igual o mayor a la fecha de inicio
    if (fechaFin < fechaInicio) {
      this.toaster.warning('Temporada', 'Las fechas no son válidas.');
      return;
    }

    const temporada = new TemporadaEntity();
    temporada.id = 0;
    temporada.cNombreTemporada = this.cNombreTemporada;
    temporada.dFechaInicio = fechaInicio;
    temporada.dFechaFin = fechaFin;
    temporada.nEstado = 1;
    temporada.nPrecio = this.nPrecio;
    temporada.lstHabitaciones = this.lstHabitaciones.filter((t: any) => t.bActivo);;
    temporada.lstTiposHabitaciones = this.lstTiposHabitaciones.filter((t: any) => t.bActivo);
    temporada.lstNiveles = this.lstNiveles.filter((t: any) => t.bActivo);;
    temporada.nTipoAsignacion = this.nTipoAsignacion;

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Asignar Temporada",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.PostTemporada(temporada).subscribe(
          (response) => {
            // Si el registro fue exitoso
            if (response.success) {
              this.toaster.success('Asignar Temporada', 'Temporada asignada exitosamente.');
              this.dialogRef.close();
            } else {
              this.toaster.error('Agregar Temporada', 'Error al asignar la Temporada.');
            }
          },
          (error) => {
            this.toaster.error('Agregar Temporada', 'Ocurrió un error al asignar la Temporada.');

          }
        );
      }
    });

  }
}
