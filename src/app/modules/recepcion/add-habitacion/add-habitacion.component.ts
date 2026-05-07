import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { PageEvent } from '@angular/material/paginator';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { EstanciaHabitacionEntity } from 'src/app/models/EstanciaEntity';
interface NivelPaginacion {
  desde: number;
  hasta: number;
  pageSize: number;
}

@Component({
  selector: 'app-add-habitacion',
  templateUrl: './add-habitacion.component.html',
  styleUrls: ['./add-habitacion.component.scss']
})
export class AddHabitacionComponent {
  isLoading$: any;
  lstNivelesDisponibles: NivelHabitacionEntity[] = [];
  lstHabitacionEstancia: EstanciaHabitacionEntity[] = [];
  paginacionPorNivel: { [nivelId: string]: NivelPaginacion } = {};

  dpCheckIn: string = '';
  dpCheckOut: string = '';

  nTotalNochesReserva: number = 0;
  habitacionesOcupadas: Set<number>;
  /*  pageSize = 5;
   desde: number = 0;
   hasta: number = 5; */
  lstNiveles: NivelHabitacionEntity[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddHabitacionComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
  ) {
    /* this.lstNivelesDisponibles = this.data.lstNivelesDisponibles.map((nivel: NivelHabitacionEntity, index: number) => ({
      ...nivel,
      id: nivel.id || `nivel-${index}`, // Asigna un id si no existe
    }));

    this.habitacionesOcupadas = this.data.habitacionesOcupadas;

    this.lstNivelesDisponibles.forEach(nivel => {
      if (nivel.lstHabitaciones && nivel.lstHabitaciones.length > 0) {
        for (let i = nivel.lstHabitaciones.length - 1; i >= 0; i--) {
          const habitacion = nivel.lstHabitaciones[i];
          const esOcupada = this.habitacionesOcupadas.has(habitacion.id || 0);
          const noEstaDisponible = habitacion.nEstadoHabitacion !== 1;

          if (esOcupada || noEstaDisponible) {
            nivel.lstHabitaciones.splice(i, 1); // Eliminar habitación ocupada o no disponible
          }
        }
      }
    }); */



    // Inicializar paginación para cada nivel
    /*  this.lstNivelesDisponibles.forEach((nivel) => {
       this.paginacionPorNivel[nivel.id || 0] = {
         desde: 0,
         hasta: 5,
         pageSize: 5,
       };
     });
  */
    this.dpCheckIn = this.data.dpCheckIn;
    this.dpCheckOut = this.data.dpCheckOut;
    this.nTotalNochesReserva = this.data.nTotalNochesReserva;
    this.habitacionesOcupadas = this.data.habitacionesOcupadas || new Set<number>();

  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.BuscarHabitaciones();

  }

  cambiarPagina(e: PageEvent, nivelId: number = 0) {
    if (this.paginacionPorNivel[nivelId]) {
      const paginacion = this.paginacionPorNivel[nivelId];
      paginacion.desde = e.pageIndex * e.pageSize;
      paginacion.hasta = paginacion.desde + e.pageSize;
      paginacion.pageSize = e.pageSize;
    }
  }

  BotonSeleccionarHabitacion(habitacion: HabitacionEntity) {

    this.dialogRef.close(habitacion);
  }

  BuscarHabitaciones() {
    this._service.GetRecepcion(this.dpCheckIn, this.dpCheckOut).subscribe((resp: any) => {
      if (resp.success) {
        this.lstNiveles = resp.lstNiveles;
        this.lstNivelesDisponibles = [];

        const lstFilteredNiveles: NivelHabitacionEntity[] = this.lstNiveles
          .map((nivel: NivelHabitacionEntity) => {
            const habitacionesDisponibles = nivel.lstHabitaciones?.filter(
              (habitacion => (habitacion.nEstadoEstancia === 3 || habitacion.nEstadoEstancia === 4 || habitacion.nEstadoEstancia === 5 || habitacion.nEstadoEstancia === 0) && habitacion.nColorHabitacion === 1 && !this.habitacionesOcupadas.has(habitacion.id || 0))
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

        this.lstNivelesDisponibles.forEach((nivel) => {
          this.paginacionPorNivel[nivel.id || 0] = {
            desde: 0,
            hasta: 5,
            pageSize: 5,
          };
        });
      }
    });
  }




}
