import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstanciaEntity, EstanciaHabitacionEntity, EstanciaHabitacionHuespedEntity, PagoEntity } from 'src/app/models/EstanciaEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { InfoEstanciaComponent } from '../../estancias/info-estancia/info-estancia.component';
import { ConfirmarCheckInComponent } from '../confirmar-check-in/confirmar-check-in.component';
import { AddPagoComponent } from '../../estancias/add-pago/add-pago.component';
import { DetallePagoComponent } from '../../estancias/detalle-pago/detalle-pago.component';
import { AlertService } from '../../service/alert.service';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { AddHuespedComponent } from '../../recepcion/add-huesped/add-huesped.component';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { AddHabitacionComponent } from '../../recepcion/add-habitacion/add-habitacion.component';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { GestionarCambioHabitacionComponent } from '../../cambio-habitacion/gestionar-cambio-habitacion/gestionar-cambio-habitacion.component';
import { AuthService } from '../../auth';
@Component({
  selector: 'app-info-reservas',
  templateUrl: './info-reservas.component.html',
  styleUrls: ['./info-reservas.component.scss']
})
export class InfoReservasComponent {
  isLoading$: any;
  estancia: EstanciaEntity = new EstanciaEntity();
  lstHabitacionEstancia: EstanciaHabitacionEntity[] = [];

  dpCheckIn: string = '';
  dpCheckOut: string = '';
  nTotalAPagar: number = 0;

  cObservaciones: string = '';
  estancia_id: number = 0;
  lstPagos: PagoEntity[] = [];
  firstActiveIndex: number;
  lstHuespedesTodos: HuespedEntity[] = [];

  lstNiveles: NivelHabitacionEntity[] = [];
  lstNivelesDisponibles: NivelHabitacionEntity[] = [];
  //----------------------------------------
  // para obtencion de niveles disponibles

  dpCheckInFilter: string = '';
  dpCheckOutFilter: string = '';

  //--------------------------------------

  bDisabled: boolean = false;

  bPermisoEdicion: boolean = false;
  bPermisoEliminacion: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InfoEstanciaComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private _dialog: MatDialog,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    public _auth: AuthService
  ) {
    this.estancia = data.estancia;
    this.dpCheckInFilter = this.data.dpCheckInFilter;
    this.dpCheckOutFilter = this.data.dpCheckOutFilter;
    this.bDisabled = this.data.bDisabled;


    this.bPermisoEdicion = this.data.bPermisoEdicion;
    this.bPermisoEliminacion = this.data.bPermisoEliminacion;
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    setTimeout(() => {
      if (this.estancia.id !== undefined) {

        this.ObtenerEstanciaPorId(this.estancia.id);

      }
    }, 10);

  }

  ObtenerEstanciaPorId(id: number) {

    this._service.GetEstanciaById(id).subscribe((resp: any) => {

      if (resp.success) {
        this.estancia = resp.data;
        this.estancia_id = this.estancia.id ?? 0;
        this.lstPagos = resp.lstPagos || [];
        this.dpCheckIn = this.estancia.dFechaCheckInProgramado || '';
        this.dpCheckOut = this.estancia.dFechaCheckOutProgramado || '';
        this.lstHabitacionEstancia = resp.lstHabitacionEstancia || [];  // Asegúrate de que lstEstancias sea un arreglo, incluso si es vacío.
        this.firstActiveIndex = this.lstHabitacionEstancia.findIndex(item => item.nEstado === 1);
        this.cObservaciones = this.estancia.cObservaciones || '';
        this.nTotalAPagar = 0;
        this.lstHabitacionEstancia.forEach(element => {
          if (element.nEstado === 1) {
            this.nTotalAPagar += element.nPrecioEstanciaHabitacion || 0;
          }
        });

        let lstHuespedes: HuespedEntity[] = [];

        this.lstHabitacionEstancia.forEach(element => {
          if (element.nEstado === 1 && element.lstHuespedes) {
            const huespedesActivos = element.lstHuespedes.map(huesped => ({
              id: huesped.id,
              cNombres: huesped.cNombres,
              cApellidos: huesped.cApellidos,
              cNroDocumento: huesped.cNroDocumento
            }));
            lstHuespedes.push(...huespedesActivos);
          }
        });

        this.lstHuespedesTodos = lstHuespedes;

        setTimeout(() => {
          this.ObtenerNiveles();
        }, 100);


      }
    });
  }

  BotonCancelarReserva() {
    if (!this.cObservaciones) {
      this.toaster.warning('Reserva', 'Ingrese una observación antes de cancelar la reserva.')
      return;
    }
    this.estancia_id = this.estancia.id ?? 0;

    const estancia = new EstanciaEntity();
    estancia.id = this.estancia_id;
    estancia.nEstado = 5;
    estancia.cObservaciones = this.cObservaciones;
    estancia.usuarioResponsable_id = this._auth.user.id || 0;
    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Esta operacion no se puede revertir.",
      "Si, cancelar reserva",
      "warning"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.UpdateEstancia(this.estancia_id, estancia).subscribe(
          (resp: any) => {
            if (resp.success) {
              this.toaster.success('Reserva', 'Se guardaron los cambios.');
              this.dialogRef.close(true);
            } else {
              this.toaster.error('Reserva', 'Error al guardar los cambios.');
            }
          },
          (error: any) => {
            if (error.status === 400) {
              this.toaster.error('Reserva', error.error.message);
            } else {
              this.toaster.error('Reserva', 'Error al guardar los cambios.');
            }
          }
        );

      }
    });



  }

  BotonCheckIn() {

    const nTotalPagado = this.lstPagos.reduce(
      (total, pago) => total + (parseFloat(pago.nMontoPagado?.toString() || "0") || 0),
      0
    );
    // Obtener y concatenar los números de habitaciones activas
    const cNrosHabitaciones = this.lstHabitacionEstancia
      .filter(element => element.nEstado === 1)
      .map(element => element.nNroHabitacion)
      .join(', ');

    const dialogRef = this._dialog.open(
      ConfirmarCheckInComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia: this.estancia,
          lstHuespedes: this.lstHuespedesTodos,
          nTotalAPagar: this.nTotalAPagar || 0,
          nTotalPagado: nTotalPagado,
          cNrosHabitaciones: cNrosHabitaciones

        },
      }
    );


    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close(true);
      }

    });

  }

  BotonUpdatePago(pago: PagoEntity) {
    pago.nEstado = 0;

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Esta operacion no se puede revertir.",
      "Si, eliminar pago",
      "warning"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.UpdatePago(pago).subscribe(
          (resp: any) => {
            if (resp.success) {
              this.toaster.success('Estancia', 'Se guardaron los cambios.');
              this.ObtenerEstanciaPorId(this.estancia_id);
            } else {
              this.toaster.error('Estancia', 'Error al guardar los cambios.');
            }
          },
          (error: any) => {
            if (error.status === 400) {
              this.toaster.error('Estancia', error.error.message);
            } else {
              this.toaster.error('Estancia', 'Error al guardar los cambios.');
            }
          }
        );
      }
    });



  }

  BotonAgregarPago() {
    const dialogRef = this._dialog.open(
      AddPagoComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia_id: this.estancia_id,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ObtenerEstanciaPorId(this.estancia_id);
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
          estancia_id: this.estancia_id,
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


  BotonAgregarHuesped(HabitacionEstancia: EstanciaHabitacionEntity) {


    const dialogRef = this._dialog.open(AddHuespedComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {

      },
    });

    dialogRef.afterClosed().subscribe((result: HuespedEntity) => {
      if (result) {


        // Validar si el huésped ya está registrado en la misma habitación
        const isHuespedExist = HabitacionEstancia.lstHuespedes?.some(
          (huesped) => huesped.cNroDocumento === result.cNroDocumento
        );

        if (isHuespedExist) {
          this.toaster.warning(
            'Recepción',
            'El huésped ya fue registrado para esta habitación.'
          );
          return; // No agregar al listado
        }



        // Agregar huésped a la lista
        const estanciaHuesped = new EstanciaHabitacionHuespedEntity();
        estanciaHuesped.estanciaHabitacion_id = HabitacionEstancia.estanciaHabitacion_id;
        estanciaHuesped.huesped_id = result.id;
        estanciaHuesped.cNombres = result.cNombres;
        estanciaHuesped.cApellidos = result.cApellidos;
        estanciaHuesped.cNroDocumento = result.cNroDocumento;
        estanciaHuesped.cNroCelular = result.cNroCelular;



        this._service.PostRegistrarHuespedEstancia(estanciaHuesped).subscribe(
          (resp: any) => {
            if (resp.success) {
              this.toaster.success('Estancia', 'Se guardaron los cambios.');
              this.ObtenerEstanciaPorId(this.estancia_id);
            } else {
              this.toaster.error('Estancia', 'Error al guardar los cambios.');
            }
          },
          (error: any) => {
            if (error.status === 400) {
              this.toaster.error('Estancia', error.error.message);
            } else {
              this.toaster.error('Estancia', 'Error al guardar los cambios.');
            }
          }
        );

        this.cdr.detectChanges();

      }
    });
  }

  BotonRemoverHuesped(HuespedEstancia: any, HabitacionEstancia: any) {


    if (HabitacionEstancia.lstHuespedes.length === 1) {
      this.toaster.warning('Estancia', 'No se puede remover el único huésped de la habitación.');
      return;
    }

    const huesped_id = HuespedEstancia.id;
    const estanciaHabitacion_id = HabitacionEstancia.estanciaHabitacion_id;


    const estanciaHuesped = new EstanciaHabitacionHuespedEntity();
    estanciaHuesped.huesped_id = huesped_id;
    estanciaHuesped.estanciaHabitacion_id = estanciaHabitacion_id;

    this._service.PutActualizarHuespedEstancia(estanciaHuesped).subscribe(
      (resp: any) => {
        if (resp.success) {
          this.toaster.success('Estancia', 'Se guardaron los cambios.');
          this.ObtenerEstanciaPorId(this.estancia_id);
        } else {
          this.toaster.error('Estancia', 'Error al guardar los cambios.');
        }
      },
      (error: any) => {
        if (error.status === 400) {
          this.toaster.error('Estancia', error.error.message);
        } else {
          this.toaster.error('Estancia', 'Error al guardar los cambios.');
        }
      }
    );

    this.cdr.detectChanges();


  }


  ObtenerNiveles() {

    if (this.dpCheckInFilter && this.dpCheckOutFilter) {
      this._service.GetRecepcion(this.dpCheckInFilter, this.dpCheckOutFilter).subscribe((resp: any) => {
        if (resp.success) {
          this.lstNiveles = resp.lstNiveles;


          // Crear una lista filtrada de niveles y habitaciones disponibles
          const lstFilteredNiveles: NivelHabitacionEntity[] = this.lstNiveles
            .map((nivel: NivelHabitacionEntity) => {
              const habitacionesDisponibles = nivel.lstHabitaciones?.filter(
                habitacion =>
                  (habitacion.nEstadoEstancia === 3 ||
                    habitacion.nEstadoEstancia === 4 ||
                    habitacion.nEstadoEstancia === 5 ||
                    habitacion.nEstadoEstancia === 0) &&
                  habitacion.nEstadoHabitacion === 1 && habitacion.nColorHabitacion === 1
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







        }
      });
    }


  }

  BotonAgregarHabitacion() {

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

        const estanciaHabitacionNueva = new EstanciaHabitacionEntity();
        estanciaHabitacionNueva.estancia_id = this.estancia_id;
        estanciaHabitacionNueva.habitacion_id = result.id;
        estanciaHabitacionNueva.nPrecioEstanciaHabitacion = result.nPrecioTotal;


        this._service.postEstanciaHabitacion(estanciaHabitacionNueva).subscribe(
          (resp: any) => {
            if (resp.success) {
              this.toaster.success('Agregar Habitación', 'Se guardaron los cambios.');
              this.ObtenerEstanciaPorId(this.estancia_id);


            } else {
              this.toaster.error('Agregar Habitación', 'Error al guardar los cambios.');
              this.ObtenerEstanciaPorId(this.estancia_id);

            }
          },
          (error: any) => {
            if (error.status === 400) {
              this.toaster.error('Agregar Habitación', error.error.message);
              this.ObtenerEstanciaPorId(this.estancia_id);

            } else {
              this.toaster.error('Agregar Habitación', 'Error al guardar los cambios.');
              this.ObtenerEstanciaPorId(this.estancia_id);

            }
          }
        );

        // habitacion.habitacion_id = result.id;
        // habitacion.nNroHabitacion = result.nNroHabitacion;
        // habitacion.cEstado = 'Pendiente';
        // habitacion.cTipoHabitacion = result.cNombreTipoHabitacion;
        // habitacion.nPrecioTotal = result.nPrecioTotal;
        // this.lstHabitacionesRESERVA.push(habitacion);

        // this.nTotalConfirmado = 0;
        // this.nTotalConfirmado = this.lstHabitacionesRESERVA
        //   .filter(x => x.cEstado == 'Disponible')
        //   .reduce((sum, habitacion) => sum + (habitacion.nPrecioTotal || 0), 0);

      }
    });
  }

  BotonCambioHabitacion(HabitacionEstancia: any) {




    const habitacionesOcupadas = new Set(this.lstHabitacionEstancia.map(e => e.habitacion_id));

    const dialogRef = this._dialog.open(
      GestionarCambioHabitacionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          lstNivelesDisponibles: this.lstNivelesDisponibles,
          lstHabitacionEstancia: this.lstHabitacionEstancia,
          dpCheckIn: this.dpCheckIn,
          dpCheckOut: this.dpCheckOut,
          nTotalNochesReserva: this.estancia.nTotalNochesReserva,
          habitacionesOcupadas: habitacionesOcupadas,
          HabitacionEstancia: HabitacionEstancia,
          nEstanciaId: this.estancia_id
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ObtenerEstanciaPorId(this.estancia.id || 0);

      }

    });
  }
}
