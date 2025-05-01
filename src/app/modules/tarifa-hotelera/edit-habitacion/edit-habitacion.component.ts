import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { DiaEntity, HabitacionEntity, TemporadaEntity, TipoHabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from '../../service/alert.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-habitacion',
  templateUrl: './edit-habitacion.component.html',
  styleUrls: ['./edit-habitacion.component.scss']
})
export class EditHabitacionComponent {
  nNroHabitacion: any = 0;
  tipoHabitacion_id: number = 0;
  lstTiposHabitaciones: TipoHabitacionEntity[] = [];
  lstHabitaciones: HabitacionEntity[] = [];
  habitacion: HabitacionEntity;
  nivel_id: number = 0;
  lstNiveles: NivelHabitacionEntity[] = [
    { id: 1, cNombreNivel: 'Tercer Nivel' },
    { id: 2, cNombreNivel: 'Cuarto Nivel' },
    { id: 3, cNombreNivel: 'Quinto Nivel' }
  ]

  lstEstado: any[] = [
    { id: 1, cNombreEstado: 'Disponible' },
    { id: 2, cNombreEstado: 'Sucia' },
    { id: 0, cNombreEstado: 'Bloqueada' }
  ]

  lstPrecios: DiaEntity[] = [];
  lstPrecioLJ: DiaEntity[] = [];
  lstPrecioVD: DiaEntity[] = [];
  lstPreciosPorTemporada: TemporadaEntity[] = [];
  lstTemproadaEnv: TemporadaEntity[] = [];

  pageSize = 3;
  desde: number = 0;
  hasta: number = 3;

  cFechaInicio: string;
  cFechaFin: string;
  cNombreTemporada: string;
  nPrecio: number;
  cMotivoBloqueo: string = '';
  bReadOnly: boolean = false;
  cboEstado: FormControl = new FormControl('0');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditHabitacionComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService
  ) {
    if (this.data.element) {

      this.habitacion = this.data.element;
      if (this.habitacion.id) {
        this.ObtenerHabitacionPorId(this.habitacion.id)
      }


    }

    this.lstTiposHabitaciones = data.lstTiposHabitaciones;
    this.lstHabitaciones = data.lstHabitaciones;

    this.bReadOnly = data.bReadOnly;

  }

  mostrarMotivoBloqueo: boolean = false;

  ngOnInit() {
    this.cboEstado.valueChanges.subscribe(value => {
      this.mostrarMotivoBloqueo = value === 0; // Cambia 0 por el id correspondiente
      console.log('value: ', value);
    });
  }


  ObtenerHabitacionPorId(id: number) {
    this.lstTemproadaEnv = [];
    this._service.GetHabitacionById(id).subscribe((resp: any) => {

      if (resp.success) {
        this.habitacion = resp.data;
        this.nNroHabitacion = this.habitacion.nNroHabitacion;
        this.tipoHabitacion_id = this.habitacion.tipoHabitacion_id ?? 0;
        this.nivel_id = this.habitacion.nivelHabitacion_id ?? 0;
        this.lstPrecios = resp.lstPrecios;
        this.cboEstado.setValue(this.habitacion.nEstado ?? 0);
        this.cMotivoBloqueo = this.habitacion.cMotivoBloqueo || '';
        this.lstPrecioLJ = resp.lstPrecios.filter((x: DiaEntity) => x.id === 1 || x.id === 2 || x.id === 3 || x.id === 4);
        this.lstPrecioVD = resp.lstPrecios.filter((x: DiaEntity) => x.id === 5 || x.id === 6 || x.id === 7);
        this.lstPreciosPorTemporada = resp.lstPreciosPorTemporada;
        this.desde = 0;
        this.hasta = 3;
      }
    });
  }
  BotonGuardar() {




    if (this.cboEstado.value > 0) {

      if (this.lstPrecios.find(x => x.nPrecio?.toString() === "0.00")) {
        this.toaster.warning('Editar Habitación', 'Complete todos los precios por defecto antes de activar la habitación.');
        return;
      }

    } else {
      if (this.cMotivoBloqueo.length < 3) {
        this.toaster.warning('Editar Habitación', 'Ingrese un motivo antes de bloquear una habitación.');
        return;
      }
    }


    if (this.nNroHabitacion === 0) {
      this.toaster.warning('Editar Habitación', 'El campo Nro Habitación es requerido.')
      return;
    }

    if (this.tipoHabitacion_id === 0) {
      this.toaster.warning('Editar Habitación', 'El campo Tipo Habitación es requerido.')
      return;
    }


    if (this.nivel_id === 0) {
      this.toaster.warning('Editar Habitación', 'El campo Nivel es requerido ');
      return;
    }

    const nNroHabitacion = parseInt(this.nNroHabitacion as unknown as string, 10);
    const habitacionExistente = this.lstHabitaciones.find(h => h.nNroHabitacion === nNroHabitacion && h.id !== this.habitacion.id);
    if (habitacionExistente) {
      this.toaster.warning('Editar Habitación', 'El número de habitación ya existe.');
      return;
    }

    const tipoHabitacionId = parseInt(this.tipoHabitacion_id as unknown as string, 10);

    let cNombreTipo: string = '';
    const tipoHabitacion = this.lstTiposHabitaciones.find((t: any) => t.id === tipoHabitacionId);
    if (tipoHabitacion?.cNombreTipo) {
      cNombreTipo = tipoHabitacion.cNombreTipo;
    }

    const habitacion = new HabitacionEntity();
    habitacion.id = this.habitacion.id;
    habitacion.nNroHabitacion = this.nNroHabitacion;
    habitacion.cNombreTipo = cNombreTipo;
    habitacion.tipoHabitacion_id = tipoHabitacionId;
    habitacion.nivelHabitacion_id = this.nivel_id;
    habitacion.lstPrecios = this.lstPrecios;
    habitacion.lstPreciosPorTemporada = this.lstPreciosPorTemporada || [];
    habitacion.lstPreciosPorTemporadaDelete = this.lstTemproadaEnv || [];
    habitacion.nEstado = this.cboEstado.value;
    habitacion.cMotivoBloqueo = this.cMotivoBloqueo || '';

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Actualizar Habitación",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.PutHabitacion(habitacion).subscribe(
          (response) => {
            // Si el registro fue exitoso
            if (response.success) {
              this.toaster.success('Editar Habitacion', 'Habitación actualizada exitosamente.');
              if (this.habitacion.id) {
                this.ObtenerHabitacionPorId(this.habitacion.id)
              }
            } else {
              this.toaster.error('Editar Habitacion', 'Error al actualizar la Habitación.');
            }
          },
          (error) => {
            this.toaster.error('Editar Habitacion', 'Ocurrió un error al actualizar la Habitación.');

          }
        );
      }
    });


  }


  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  BotonAgregarTemporada() {
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
    temporada.cFechaInicio = this.formatDate(fechaInicio);
    temporada.cFechaFin = this.formatDate(fechaFin);
    temporada.nEstado = 1;
    temporada.nPrecio = this.nPrecio;

    this.lstPreciosPorTemporada.unshift(temporada);
    this.cNombreTemporada = '';
    this.cFechaInicio = '';
    this.cFechaFin = '';
    this.nPrecio = 0;
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  BotonEliminarTemporada(temporada: TemporadaEntity) {

    if ((temporada.id ?? 0) > 0) {
      temporada.nEstado = 0;
      this.lstTemproadaEnv.push(temporada);
    }
    const index = this.lstPreciosPorTemporada.findIndex(t => t === temporada);
    this.lstPreciosPorTemporada.splice(index, 1);

  }

}
