import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstanciaEntity, EstanciaHabitacionEntity, EstanciaHabitacionHuespedEntity, PagoEntity } from 'src/app/models/EstanciaEntity';
import { InfoEstanciaComponent } from '../../estancias/info-estancia/info-estancia.component';
import { AlertService } from '../../service/alert.service';
import { SvGeneralService } from '../../service/sv-general.service';
import { FormControl } from '@angular/forms';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { AddHabitacionComponent } from '../../recepcion/add-habitacion/add-habitacion.component';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { DetallePagoComponent } from '../../estancias/detalle-pago/detalle-pago.component';
import { AddPagoRecepcionComponent } from '../../recepcion/add-pago-recepcion/add-pago-recepcion.component';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-info-reserva-web',
  templateUrl: './info-reserva-web.component.html',
  styleUrls: ['./info-reserva-web.component.scss']
})
export class InfoReservaWebComponent implements OnInit {
  isLoading$: any;
  estancia: EstanciaEntity = new EstanciaEntity();

  dpCheckIn: string = '';
  dpCheckOut: string = '';

  lstHabitaciones: any[] = [];
  lstHabitacionesRESERVA: any[] = [];
  lstNiveles: NivelHabitacionEntity[] = [];
  lstNivelesDisponibles: NivelHabitacionEntity[] = [];
  lstHabitacionEstancia: EstanciaHabitacionEntity[] = [];
  nTotalConfirmado: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InfoReservaWebComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private _dialog: MatDialog,
    private alertService: AlertService,
    public _auth: AuthService
  ) {
    this.estancia = data.estancia;
    this.dpCheckIn = this.convertToDatetimeLocal(this.estancia.cFechaCheckIn ?? '');
    this.dpCheckOut = this.convertToDatetimeLocal(this.estancia.cFechaCheckOut ?? '');


  }
  convertToDatetimeLocal(dateString: string): string {
    if (!dateString) return '';

    // Extraer la fecha y hora separadamente
    const [datePart, timePart] = dateString.split(' '); // "21/02/2025 16:00"
    const [day, month, year] = datePart.split('/'); // ["21", "02", "2025"]

    // Formatear a "YYYY-MM-DDTHH:mm"
    return `${year}-${month}-${day}T${timePart}`;
  }


  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    setTimeout(() => {
      if (this.estancia.id !== undefined) {

        this.ObtenerHabitacionesPorIdReservaWeb(this.estancia.id);
        this.sListarNivelesDisponibles();
      }
    }, 10);

  }
  public ObtenerHabitacionesPorIdReservaWeb(idReservaWeb: number) {
    this._service.GetHabitacionesPorReserva(idReservaWeb).subscribe((data: any) => {
      this.lstHabitaciones = data.lstHabitaciones;
      this.lstHabitacionesRESERVA = JSON.parse(JSON.stringify(data.lstHabitaciones));

      // Limpiamos la lista de habitaciones de estancia antes de llenarla
      this.lstHabitacionEstancia = [];

      // Iteramos sobre las habitaciones obtenidas
      this.lstHabitaciones.forEach((result: any) => {
        const habitacion = new EstanciaHabitacionEntity();

        // Asignamos los valores a la nueva entidad
        habitacion.cNombreTipoHabitacion = result.cTipoHabitacion || ''; // Usamos el operador de coalescencia para valores nulos o indefinidos.
        habitacion.nNroHabitacion = result.nNroHabitacion || 0; // Aseguramos que no sea undefined.
        habitacion.nPrecioTotal = 0; // Aseguramos que no sea undefined.
        habitacion.nTotalNoches = this.estancia.nTotalNochesReserva;
        habitacion.habitacion_id = result.id;

        // Añadimos la entidad creada a la lista
        this.lstHabitacionEstancia.push(habitacion);
      });



      console.log('this.estancia', this.estancia);


      this.lstPagos = data.lstPagos;
    });
  }


  lstPagos: any[] = [];
  BotonRemoverPago(pago: PagoEntity) {
    this.lstPagos = this.lstPagos.filter(x => x != pago);



  }

  BotonAgregarPago() {
    const dialogRef = this._dialog.open(
      AddPagoRecepcionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia_id: 0,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.lstPagos.push({ ...result });
        /* this.ObtenerEstanciaPorId(this.estancia_id); */
      }

    });
  }

  BotonVerDetallePago(pago: PagoEntity) {
    const dialogRef = this._dialog.open(
      DetallePagoComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia_id: 0,
          pago: pago,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      /*  if (result) {
         this.ObtenerEstanciaPorId(this.estancia_id);
       } */

    });
  }


  BotonConfirmar(nEstadoReserva: number) {


    const existeDisponibilidadPendiente = this.lstHabitaciones.some(x => x.cEstado == 'Pendiente');
    if (existeDisponibilidadPendiente && nEstadoReserva == 1) {
      this.toaster.warning('Reserva Web', 'Verifique la disponibilidad de todas las habitaciones.');
      return;
    }


    const habitacionesDisponibles = this.lstHabitaciones.filter(x => x.cEstado == 'Disponible').length;
    const habitacionesReservadasDisponibles = this.lstHabitacionesRESERVA.length;

    if (nEstadoReserva == 5) {
      // Crear la entidad Estancia
      const estancia = new EstanciaEntity();
      //estancia.dFechaCheckIn = this.dpCheckIn;
      estancia.reservaWeb_id = this.estancia.reservaWeb_id;
      estancia.nTotalHabitaciones = habitacionesDisponibles;
      estancia.nEstado = nEstadoReserva;
      estancia.dFechaReservaCheckIn = this.dpCheckIn;
      estancia.dFechaReservaCheckOut = this.dpCheckOut;
      estancia.cCodigoPagoReferencia = this.estancia.cCodigoPagoReferencia || '';
      estancia.usuarioResponsable_id = this._auth.user.id || 0;
      estancia.lstPagos = this.lstPagos || [];
      // Inicializar listas para habitaciones y huéspedes
      const lstEstanciaHabitacion: EstanciaHabitacionEntity[] = [];

      this.lstHabitaciones.forEach((habitacion) => {
        const nuevaHabitacion = new EstanciaHabitacionEntity();
        nuevaHabitacion.habitacion_id = habitacion.habitacion_id;
        nuevaHabitacion.nTotalHuespedesHabitacion = 0;
        nuevaHabitacion.nPrecioEstanciaHabitacion = habitacion.nPrecioTotal || 0;


        lstEstanciaHabitacion.push(nuevaHabitacion);
      });

      estancia.lstEstanciaHabitacion = lstEstanciaHabitacion;

      // Agregar titular a la estancia
      estancia.huespedTitular = {
        cNombres: this.estancia.cNombres,
        cApellidos: this.estancia.cApellidos,
        cCorreo: this.estancia.cCorreo,
        nTipoDocumento: 1,
        cNroDocumento: this.estancia.cNroDocumenoTitular,
        cNroCelular: this.estancia.cNroCelular,
        pais_id: 0,
      };


      this.alertService.showConfirmationAlert(
        "¿Está seguro?",
        "Rechazar Reserva",
        "Confirmar",
        "question"
      ).then((isConfirmed) => {
        if (isConfirmed) {
          this._service.PostConfirmarReserva(estancia).subscribe(
            (response) => {
              // Si el registro fue exitoso
              if (response.success) {
                this.toaster.success('Reservas', 'Reserva rechazada exitosamente.');
                this.dialogRef.close(true);
              } else {
                this.toaster.error('Reservas', 'Error al rechazar la reserva.');
              }
            },
            (error) => {
              this.toaster.error('Reservas', 'Ocurrió un error al rechazar la reserva.');

            }
          );
        }
      });
    }
    if (nEstadoReserva == 1) {
      if ((habitacionesDisponibles != habitacionesReservadasDisponibles)) {
        this.alertService.showConfirmationAlert(
          "¿Está seguro?",
          "El número de habitaciones de la reserva es diferente a las registradas.",
          "Si, confirmar reserva",
          "warning"
        ).then((isConfirmed) => {
          if (isConfirmed) {
            // Crear la entidad Estancia
            const estancia = new EstanciaEntity();
            //estancia.dFechaCheckIn = this.dpCheckIn;
            estancia.reservaWeb_id = this.estancia.reservaWeb_id;
            estancia.nTotalHabitaciones = habitacionesDisponibles;
            estancia.nEstado = nEstadoReserva;
            estancia.dFechaReservaCheckIn = this.dpCheckIn;
            estancia.dFechaReservaCheckOut = this.dpCheckOut;
            estancia.cCodigoPagoReferencia = this.estancia.cCodigoPagoReferencia || '';
            estancia.lstPagos = this.lstPagos || [];
            // Inicializar listas para habitaciones y huéspedes
            const lstEstanciaHabitacion: EstanciaHabitacionEntity[] = [];

            this.lstHabitaciones.forEach((habitacion) => {
              const nuevaHabitacion = new EstanciaHabitacionEntity();
              nuevaHabitacion.habitacion_id = habitacion.habitacion_id;
              nuevaHabitacion.nTotalHuespedesHabitacion = 0;
              nuevaHabitacion.nPrecioEstanciaHabitacion = habitacion.nPrecioTotal || 0;


              lstEstanciaHabitacion.push(nuevaHabitacion);
            });

            estancia.lstEstanciaHabitacion = lstEstanciaHabitacion;

            // Agregar titular a la estancia
            estancia.huespedTitular = {
              cNombres: this.estancia.cNombres,
              cApellidos: this.estancia.cApellidos,
              cCorreo: this.estancia.cCorreo,
              nTipoDocumento: 1,
              cNroDocumento: this.estancia.cNroDocumenoTitular,
              cNroCelular: this.estancia.cNroCelular,
              pais_id: 0,
            };


            this.alertService.showConfirmationAlert(
              "¿Está seguro?",
              "Reservar Habitacion(es)",
              "Confirmar",
              "question"
            ).then((isConfirmed) => {
              if (isConfirmed) {
                this._service.PostConfirmarReserva(estancia).subscribe(
                  (response) => {
                    // Si el registro fue exitoso
                    if (response.success) {
                      this.toaster.success('Recepción', 'Reserva registrada exitosamente.');
                      this.dialogRef.close(true);
                    } else {
                      this.toaster.error('Recepción', 'Error al registrar la reserva.');
                    }
                  },
                  (error) => {
                    this.toaster.error('Recepción', 'Ocurrió un error al registrar la reserva.');

                  }
                );
              }
            });

          }
        });


      } else {

        // Crear la entidad Estancia
        const estancia = new EstanciaEntity();
        //estancia.dFechaCheckIn = this.dpCheckIn;
        estancia.reservaWeb_id = this.estancia.reservaWeb_id;
        estancia.nTotalHabitaciones = habitacionesDisponibles;
        estancia.nEstado = 1;
        estancia.dFechaReservaCheckIn = this.dpCheckIn;
        estancia.dFechaReservaCheckOut = this.dpCheckOut;
        estancia.cCodigoPagoReferencia = this.estancia.cCodigoPagoReferencia || '';
        estancia.lstPagos = this.lstPagos || [];
        // Inicializar listas para habitaciones y huéspedes
        const lstEstanciaHabitacion: EstanciaHabitacionEntity[] = [];

        this.lstHabitaciones.forEach((habitacion) => {
          const nuevaHabitacion = new EstanciaHabitacionEntity();
          nuevaHabitacion.habitacion_id = habitacion.habitacion_id;
          nuevaHabitacion.nTotalHuespedesHabitacion = 0;
          nuevaHabitacion.nPrecioEstanciaHabitacion = habitacion.nPrecioTotal || 0;


          lstEstanciaHabitacion.push(nuevaHabitacion);
        });

        estancia.lstEstanciaHabitacion = lstEstanciaHabitacion;

        // Agregar titular a la estancia
        estancia.huespedTitular = {
          cNombres: this.estancia.cNombres,
          cApellidos: this.estancia.cApellidos,
          cCorreo: this.estancia.cCorreo,
          nTipoDocumento: 1,
          cNroDocumento: this.estancia.cNroDocumenoTitular,
          cNroCelular: this.estancia.cNroCelular,
          pais_id: 0,
        };


        this.alertService.showConfirmationAlert(
          "¿Está seguro?",
          "Reservar Habitacion(es)",
          "Confirmar",
          "question"
        ).then((isConfirmed) => {
          if (isConfirmed) {
            this._service.PostConfirmarReserva(estancia).subscribe(
              (response) => {
                // Si el registro fue exitoso
                if (response.success) {
                  this.toaster.success('Recepción', 'Reserva registrada exitosamente.');
                  this.dialogRef.close(true);
                } else {
                  this.toaster.error('Recepción', 'Error al registrar la reserva.');
                }
              },
              (error) => {
                this.toaster.error('Recepción', 'Ocurrió un error al registrar la reserva.');

              }
            );
          }
        });

      }
    }




  }

  BotonVerificarDisponibilidad(habitacion: any) {
    console.log('habitacion. ', habitacion)
    const habitacion_id = habitacion.habitacion_id;
    const dFechaCheckIn = this.dpCheckIn;
    const dFechaCheckOut = this.dpCheckOut;

    // Validar los datos antes de proceder
    if (habitacion_id > 0 && dFechaCheckIn && dFechaCheckOut) {
      // Llamar al servicio para verificar disponibilidad
      this._service.GetVerificarDisponibilidad(habitacion_id, dFechaCheckIn, dFechaCheckOut).subscribe({
        next: (data: any) => {
          if (data.bDisponibilidad) {
            this.toaster.success('Reserva Web', 'Disponibilidad confirmada.');
            habitacion.cEstado = 'Disponible';
            this.lstHabitacionesRESERVA.find(x => x.habitacion_id == habitacion_id).cEstado = 'Disponible';
            this.nTotalConfirmado = 0;
            this.nTotalConfirmado = this.lstHabitacionesRESERVA
              .filter(x => x.cEstado == 'Disponible')
              .reduce((sum, habitacion) => sum + (habitacion.nPrecioTotal || 0), 0);
          } else {
            this.toaster.error('Reserva Web', 'No hay disponibilidad para las fechas seleccionadas.');
            habitacion.cEstado = 'No Disponible';
            this.lstHabitacionesRESERVA.find(x => x.habitacion_id == habitacion_id).cEstado = 'No Disponible';
            this.nTotalConfirmado = 0;
            this.nTotalConfirmado = this.lstHabitacionesRESERVA
              .filter(x => x.cEstado == 'Disponible')
              .reduce((sum, habitacion) => sum + (habitacion.nPrecioTotal || 0), 0);
          }
        },
        error: (err) => {
          this.toaster.error('Reserva Web', 'Error al verificar disponibilidad. Intente nuevamente.');
          console.error(err);
        }
      });
    } else {
      this.toaster.warning('Reserva Web', 'Complete todos los campos para verificar disponibilidad.');
    }
  }



  sListarNivelesDisponibles() {
    this._service.GetRecepcion(this.dpCheckIn, this.dpCheckOut).subscribe((resp: any) => {
      if (resp.success) {
        this.lstNiveles = resp.lstNiveles;


        // Crear una lista filtrada de niveles y habitaciones disponibles
        const lstFilteredNiveles: NivelHabitacionEntity[] = this.lstNiveles
          .map((nivel: NivelHabitacionEntity) => {
            const habitacionesDisponibles = nivel.lstHabitaciones?.filter(
              habitacion => habitacion.nEstadoEstancia === 3 || habitacion.nEstadoEstancia === 4 || habitacion.nEstadoEstancia === 5 || habitacion.nEstadoEstancia === 0
            );

            // Si hay habitaciones disponibles, devolver el nivel con estas habitaciones
            if (habitacionesDisponibles && habitacionesDisponibles.length > 0) {
              return {
                ...nivel,
                lstHabitaciones: habitacionesDisponibles
              } as NivelHabitacionEntity;
            }
            return null; // Excluir niveles sin habitaciones disponibles
          })
          .filter((nivel): nivel is NivelHabitacionEntity => nivel !== null); // Filtrar nulls y reforzar el tipo


        this.lstNivelesDisponibles = lstFilteredNiveles;




        console.log('lstNivelesDisponibles', this.lstNivelesDisponibles);
      }
    });
  }


  BotonAgregarHabitacion(habitacion: any) {

    const habitacionesOcupadas = new Set(this.lstHabitacionEstancia.map(e => e.habitacion_id));


    const dialogRef = this._dialog.open(AddHabitacionComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        lstNivelesDisponibles: this.lstNivelesDisponibles,
        lstHabitacionEstancia: this.lstHabitacionEstancia,
        dpCheckIn: this.dpCheckIn,
        dpCheckOut: this.dpCheckOut,
        nTotalNochesReserva: this.estancia.nTotalNochesReserva,
        habitacionesOcupadas: habitacionesOcupadas,
      },
    });

    dialogRef.afterClosed().subscribe((result: HabitacionEntity) => {
      if (result) {
        console.log('result', result);
        habitacion.habitacion_id = result.id;
        habitacion.nNroHabitacion = result.nNroHabitacion;
        habitacion.cEstado = 'Pendiente';
        habitacion.cTipoHabitacion = result.cNombreTipoHabitacion;
        habitacion.nPrecioTotal = result.nPrecioTotal;
        this.lstHabitacionesRESERVA.push(habitacion);

        this.nTotalConfirmado = 0;
        this.nTotalConfirmado = this.lstHabitacionesRESERVA
          .filter(x => x.cEstado == 'Disponible')
          .reduce((sum, habitacion) => sum + (habitacion.nPrecioTotal || 0), 0);

      }
    });
  }

  BotonEliminar(habitacion: any) {

    const index = this.lstHabitaciones.findIndex(x => x.id === habitacion.id);
    if (index > -1) {
      this.lstHabitaciones.splice(index, 1);
    }
  }




}
