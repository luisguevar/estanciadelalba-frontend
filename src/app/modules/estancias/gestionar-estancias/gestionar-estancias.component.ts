import { ChangeDetectorRef, Component } from '@angular/core';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { InfoEstanciaComponent } from '../info-estancia/info-estancia.component';

@Component({
  selector: 'app-gestionar-estancias',
  templateUrl: './gestionar-estancias.component.html',
  styleUrls: ['./gestionar-estancias.component.scss']
})
export class GestionarEstanciasComponent {
  isLoading$: any;

  lstEstancias: EstanciaEntity[] = [];
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  filterNombres: string = '';
  filterNroHabitacion: string = '';
  filterCheckIn: string = ''; // Para almacenar la fecha de check-in
  filterCheckOut: string = ''; // Para almacenar la fecha de check-out

  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {


  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.LoadData();

  }
  BotonListarHuespedes() {
    this.LoadData(this.filterNombres, this.filterNroHabitacion, this.filterCheckIn, this.filterCheckOut);
  }


  LoadData(cNombres?: string, cNroHabitacion?: string, checkIn?: string, checkOut?: string) {
    const params = {
      cNombres: cNombres || '',
      cNroHabitacion: cNroHabitacion || '',
      checkIn: checkIn || '',
      checkOut: checkOut || ''
    };

    console.log('dpCheckInFilter: ', this.filterCheckIn);
    console.log('dpCheckOutFilter: ', this.filterCheckOut);
    this._service.GetEstancias(params).subscribe((resp: any) => {

      if (resp.success) {
        this.lstEstancias = resp.data;
        /*  this.desde = 0;
         this.hasta = 10; */
      } else {
        this.toaster.error('Estancia', 'Error al cargar los datos de las estancias');
      }
    }, (error: any) => {
      this.toaster.error('Estancia', 'Error al cargar los datos de las estancias');
    });
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
          bDisabled: true

        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.LoadData();
      this.cdr.detectChanges();

    });

  }

  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }


}
