import { ChangeDetectorRef, Component } from '@angular/core';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../auth';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/models/UsuarioEntity';
import { PageEvent } from '@angular/material/paginator';
import { AddHabitacionComponent } from '../add-habitacion/add-habitacion.component';
import { DiaEntity, HabitacionEntity, ServicioEntity } from 'src/app/models/TarifaHoteleraEntity';
import { EditHabitacionComponent } from '../../tarifa-hotelera/edit-habitacion/edit-habitacion.component';
import { GestionarTiposHabitacionComponent } from '../../tarifa-hotelera/gestionar-tipos-habitacion/gestionar-tipos-habitacion.component';
import { AsignarPrecioTemporadaComponent } from '../../tarifa-hotelera/asignar-precio-temporada/asignar-precio-temporada.component';
import { BloqueoReservaTemporadaComponent } from '../../tarifa-hotelera/bloqueo-reserva-temporada/bloqueo-reserva-temporada.component';

@Component({
  selector: 'app-gestion-habitacion',
  templateUrl: './gestion-habitacion.component.html',
  styleUrls: ['./gestion-habitacion.component.scss']
})
export class GestionHabitacionComponent {

  isLoading$: any;
  lstHabitaciones: HabitacionEntity[] = [];
  serviciosDisponibles: ServicioEntity[] = [];
  diasDisponibles: DiaEntity[] = [];



  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  lstTiposHabitaciones: any = [];
  cFechaInicioSemana: string;

  fechaInicio: string = '';
  fechaFin: string = '';


  bReadOnly: boolean = false;

  bPermisoEdicion: boolean = false;
  bPermisoEliminacion: boolean = false;

  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private authService: AuthService,
    private router: Router
  ) {

    this.LoadPersona();


  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.cFechaInicioSemana = this.datePipe.transform(new Date(), 'yyyy-MM-dd', 'UTC-5') || ''; // Ajusta 'UTC-5' a tu zona horaria
    this.LoadData(this.cFechaInicioSemana);
  }

  LoadPersona() {
    const usuario = new UserEntity();
    usuario.id = this.authService.user?.id;
    usuario.link = "/recepcion/gestion-habitacion";
    this._service.PostPermisosPorUsuarioModulo(usuario).subscribe((resp: any) => {


      if (resp.success) {
        this.bPermisoEdicion = resp.bPermisoEdicion;
        this.bPermisoEliminacion = resp.bPermisoEliminacion;
      } else {
        this.router.navigate(['/menu-inicio/lista-opciones']);
      }
    });
  }

  LoadData(dFechaInicioSemana: string) {

    this._service.GetTarifaHotelera(dFechaInicioSemana).subscribe((resp: any) => {

      if (resp.success) {

        this.lstHabitaciones = resp.data;
        this.serviciosDisponibles = resp.servicios;
        this.diasDisponibles = resp.dias;
        this.lstTiposHabitaciones = resp.tipoHabitaciones;
        this.desde = 0;
        this.hasta = 10;

      }
      /*      this.lstUsuarios = resp.usuarios; */

    });
  }

  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }


  BotonGuardar() {


    const data = {
      "lstHabitaciones": this.lstHabitaciones
    }


    this._service.PostTarifaHotelera(data).subscribe((resp: any) => {

      if (resp.success) {
        this.toaster.success('Tarifa Hotelera', 'Se guardaron los cambios.')
        this.LoadData(this.cFechaInicioSemana);
      }
    },
      (error: any) => {
        this.toaster.error('Tarifa Hotelera', 'Error al guardar los cambios.')
        this.LoadData(this.cFechaInicioSemana);
      }
    )
  }


  BotonNuevaHabitacion() {
    if (this.lstHabitaciones.length === 0) {
      this.toaster.warning('Tarifa Hotelera', 'Opción no disponible por el momento.')
      return;

    }



    const dialogRef = this._dialog.open(
      AddHabitacionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          lstTiposHabitaciones: this.lstTiposHabitaciones,
          lstHabitaciones: this.lstHabitaciones,
          lstServicios: this.lstHabitaciones[0].lstServicios ?? [],
          lstPrecios: this.lstHabitaciones[0].lstPrecios ?? [],
          bPermisoEdicion: this.bPermisoEdicion,
          bPermisoEliminacion: this.bPermisoEliminacion
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.LoadData(this.cFechaInicioSemana);
      /*  if (result) {
 
         this.lstHabitaciones.push(result);
         this.lstHabitaciones = this.lstHabitaciones.sort((a, b) => {
           const nNroA = a.nNroHabitacion ?? 0; // Asigna 0 si es undefined
           const nNroB = b.nNroHabitacion ?? 0; // Asigna 0 si es undefined
           return nNroA - nNroB;
         });
 
         this.cdr.detectChanges();
 
 
       } */
    });
  }

  BotonEditarHabitacion(element: HabitacionEntity) {

    const envio: HabitacionEntity = {
      id: element.id,
      nNroHabitacion: element.nNroHabitacion,
      tipoHabitacion_id: element.tipoHabitacion_id,
      nivelHabitacion_id: element.nivelHabitacion_id
    };

    const dialogRef = this._dialog.open(
      EditHabitacionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          lstTiposHabitaciones: this.lstTiposHabitaciones,
          lstHabitaciones: this.lstHabitaciones,
          element: envio,
          bReadOnly: this.bReadOnly,
          bPermisoEdicion: this.bPermisoEdicion,
          bPermisoEliminacion: this.bPermisoEliminacion,
          bRecepcion: true
        },
      }
    );
    dialogRef.afterClosed().subscribe((result: HabitacionEntity) => {

      if (result) {

        this.LoadData(this.cFechaInicioSemana);
        /*  const tipoHabitacionId = parseInt(result.tipoHabitacion_id as unknown as string, 10);
         const resp: HabitacionEntity = {
           id: result.id,
           tipoHabitacion_id: tipoHabitacionId,
           cNombreTipo: result.cNombreTipo,
           nNroHabitacion: result.nNroHabitacion,
           nivelHabitacion_id: result.nivelHabitacion_id
         };
 
 
         element.cNombreTipo = resp.cNombreTipo;
         element.tipoHabitacion_id = resp.tipoHabitacion_id;
         element.nNroHabitacion = resp.nNroHabitacion;
         element.nivelHabitacion_id = resp.nivelHabitacion_id;
         this.cdr.detectChanges();
         // ...resto del código... */
      }
    });



  }

  BotonGestionarTipos() {
    const dialogRef = this._dialog.open(
      GestionarTiposHabitacionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          lstTiposHabitaciones: this.lstTiposHabitaciones,
          bReadOnly: this.bReadOnly
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {


        this.cdr.detectChanges();


      }
    });
  }

  onFechaInicioChange() {

    this.LoadData(this.cFechaInicioSemana);
  }

  BotonTemporada() {



    const dialogRef = this._dialog.open(
      AsignarPrecioTemporadaComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          lstTiposHabitaciones: this.lstTiposHabitaciones,
          lstHabitaciones: this.lstHabitaciones,
        },
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      this.LoadData(this.cFechaInicioSemana);
      if (result) {



      }
    });



  }


  BotonBloqueoReserva() {



    const dialogRef = this._dialog.open(
      BloqueoReservaTemporadaComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          lstTiposHabitaciones: this.lstTiposHabitaciones,
          lstHabitaciones: this.lstHabitaciones,
        },
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      this.LoadData(this.cFechaInicioSemana);
      if (result) {



      }
    });



  }


  aplicarFiltro() {

  }

  BotonAgregarUsuario() {

  }

  resetFiltro() {
    this.cFechaInicioSemana = this.datePipe.transform(new Date(), 'yyyy-MM-dd', 'UTC-5') || ''; // Ajusta 'UTC-5' a tu zona horaria
    this.LoadData(this.cFechaInicioSemana);
  }
}
