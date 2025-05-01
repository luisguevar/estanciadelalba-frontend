import { ChangeDetectorRef, Component } from '@angular/core';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { EditarHabitacionWebComponent } from '../editar-habitacion-web/editar-habitacion-web.component';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss']
})
export class HabitacionesComponent {

  isLoading$: any;
  lstHabitaciones: HabitacionEntity[] = [];
  cFechaInicioSemana: string;
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {


  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.cFechaInicioSemana = this.datePipe.transform(new Date(), 'yyyy-MM-dd', 'UTC-5') || ''; // Ajusta 'UTC-5' a tu zona horaria
    this.LoadData(this.cFechaInicioSemana);
  }

  LoadData(dFechaInicioSemana: string) {

    this._service.GetTarifaHotelera(dFechaInicioSemana).subscribe((resp: any) => {

      if (resp.success) {

        this.lstHabitaciones = resp.data;
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

  BotonVerDetalleHabitacion(habitacion: HabitacionEntity) {
    const dialogRef = this._dialog.open(
      EditarHabitacionWebComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          element: habitacion,
        },
      }
    );


    dialogRef.afterClosed().subscribe((result) => {
      this.LoadData(this.cFechaInicioSemana);
      this.cdr.detectChanges();

    });

  }

}
