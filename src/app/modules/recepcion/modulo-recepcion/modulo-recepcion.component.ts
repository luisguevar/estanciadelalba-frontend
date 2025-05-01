import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { InfoReservasComponent } from '../../reservas/info-reservas/info-reservas.component';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';
import { InfoEstanciaComponent } from '../../estancias/info-estancia/info-estancia.component';
import { RegistrarIngresoReservaComponent } from '../registrar-ingreso-reserva/registrar-ingreso-reserva.component';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-modulo-recepcion',
  templateUrl: './modulo-recepcion.component.html',
  styleUrls: ['./modulo-recepcion.component.scss']
})
export class ModuloRecepcionComponent {
  isLoading$: any;
  lstNiveles: NivelHabitacionEntity[] = [];
  cFechaActual: string = '';

  dpFechaCheckIn: string = '';
  dpFechaCheckOut: string = '';


  lstNivelesDisponibles: NivelHabitacionEntity[] = [];

  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    const ahoraPeru = moment().tz('America/Lima');

    // Formatea para datetime-local (sin zona horaria)
    this.dpFechaCheckIn = ahoraPeru.format('YYYY-MM-DDTHH:mm');

    const mananaPeru = ahoraPeru.clone().add(24, 'hours');
    this.dpFechaCheckOut = mananaPeru.format('YYYY-MM-DDTHH:mm');

    this.LoadData();
  }


  LoadData() {
    if (!this.dpFechaCheckIn) {
      this.toaster.warning(
        'Recepción',
        `Ingrese una fecha de check-in válida para continuar.`
      );
      return;
    }

    if (!this.dpFechaCheckOut) {
      this.toaster.warning(
        'Recepción',
        `Ingrese una fecha de check-out válida para continuar.`
      );
      return;
    }


    // Asegúrate de usar las fechas correctas
    const dpFechaCheckIn = this.dpFechaCheckIn; // yyyy-MM-dd
    const dpFechaCheckOut = this.dpFechaCheckOut; // yyyy-MM-dd

    this._service.GetRecepcion(dpFechaCheckIn, dpFechaCheckOut).subscribe((resp: any) => {
      if (resp.success) {
        this.lstNiveles = resp.lstNiveles;



        const lstFilteredNiveles: NivelHabitacionEntity[] = this.lstNiveles
          .map((nivel: NivelHabitacionEntity) => {
            const habitacionesDisponibles = nivel.lstHabitaciones?.filter(
              habitacion => habitacion.nEstadoEstancia === 3 || habitacion.nEstadoEstancia === 4 || habitacion.nEstadoEstancia === 5 || habitacion.nEstadoEstancia === 0
            );


            if (habitacionesDisponibles && habitacionesDisponibles.length > 0) {
              return {
                ...nivel,
                lstHabitaciones: habitacionesDisponibles
              } as NivelHabitacionEntity;
            }
            return null;
          })
          .filter((nivel): nivel is NivelHabitacionEntity => nivel !== null);


        this.lstNivelesDisponibles = lstFilteredNiveles;
      }
    });


  }



  BotonVerDetalle(habitacion: HabitacionEntity) {

    if (habitacion.nEstadoEstancia == 1) {
      const estancia = new EstanciaEntity();
      estancia.id = habitacion.estancia_id;
      this.BotonVerDetalleReserva(estancia);
    } else if (habitacion.nEstadoEstancia == 2) {
      const estancia = new EstanciaEntity();
      estancia.id = habitacion.estancia_id;
      this.BotonVerDetalleEstancia(estancia);
    } else {
      this.BotonRegistrarIngresoReserva(habitacion);
    }
  }


  BotonVerDetalleEstancia(estancia: any) {

    const dialogRef = this._dialog.open(
      InfoEstanciaComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia: estancia,
          dpCheckInFilter: this.dpFechaCheckIn,
          dpCheckOutFilter: this.dpFechaCheckOut,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      // if (result) {
      //   this.LoadData();
      //   this.cdr.detectChanges();
      // }

      this.LoadData();
      this.cdr.detectChanges();


    });

  }

  BotonVerDetalleReserva(estancia: any) {

    const dialogRef = this._dialog.open(
      InfoReservasComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia: estancia,

          dpCheckInFilter: this.dpFechaCheckIn,
          dpCheckOutFilter: this.dpFechaCheckOut,
        },
      }
    );


    dialogRef.afterClosed().subscribe((result) => {
      /* if (result) {
        this.LoadData();
        this.cdr.detectChanges();
      } */

      this.LoadData();
      this.cdr.detectChanges();

    });

  }

  BotonRegistrarIngresoReserva(habitacion: HabitacionEntity) {

    const dialogRef = this._dialog.open(
      RegistrarIngresoReservaComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          habitacion: habitacion,
          dpFechaCheckInEnv: this.dpFechaCheckIn,
          dpFechaCheckOutEnv: this.dpFechaCheckOut,
          lstNivelesDisponibles: this.lstNivelesDisponibles,
        },
      }
    );


    dialogRef.afterClosed().subscribe((result) => {
      /*  if (result) {
         this.LoadData();
         this.cdr.detectChanges();
       } */

      this.LoadData();
      this.cdr.detectChanges();

    });


  }
  getColorHabitacionStyle(habitacion: any): any {
    switch (habitacion.nColorHabitacion) {
      case 1: return { 'background-color': 'rgb(179 179 179 / 33%)', 'color': '#000000' }; // Blanca - Vacía
      case 2: return { 'background-color': '#FFD700', 'color': '#000000' }; // Amarilla - Sucia
      case 3: return { 'background-color': '#28A745', 'color': '#FFFFFF' }; // Verde - Reservada
      case 4: return { 'background-color': '#DC3545', 'color': '#FFFFFF' }; // Roja - En Estancia
      case 5: return { 'background-color': '#007BFF', 'color': '#FFFFFF' }; // Azul - Bloqueada
      case 6: return { 'background-color': '#FFD700', 'color': '#000000' }; // Amarilla - Sucia
      case 7: return { 'background-color': '#007BFF', 'color': '#FFFFFF' }; // Azul - Bloqueada
      default: return { 'background-color': '#6C757D', 'color': '#FFFFFF' }; // Gris por defecto
    }
  }



}
