import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';

@Component({
  selector: 'app-agregar-estancia',
  templateUrl: './agregar-estancia.component.html',
  styleUrls: ['./agregar-estancia.component.scss']
})
export class AgregarEstanciaComponent {

  isLoading$: any;

  lstEstancias: EstanciaEntity[] = [];
  pageSize = 5;
  desde: number = 0;
  hasta: number = 5;

  filterNombres: string = '';
  filterNroHabitacion: string = '';
  filterCheckIn: string = ''; // Para almacenar la fecha de check-in
  filterCheckOut: string = ''; // Para almacenar la fecha de check-out

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarEstanciaComponent>,
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {


  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading$ = this._service.isLoading$;
      this.LoadData();
    }, 10);

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

    this._service.GetBuscarEstancias(params).subscribe((resp: any) => {

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




  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  BotonSeleccionarEstancia(estancia: any) {
    console.log('estancia: ', estancia);
    console.log('estancia.lstHabitaciones: ', estancia.lstHabitaciones);
   /*  array.forEach(element => {
      
    }); */
    this.dialogRef.close(estancia.lstHabitaciones);

  }
}
