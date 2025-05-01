import { ChangeDetectorRef, Component } from '@angular/core';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { InfoHuespedComponent } from '../info-huesped/info-huesped.component';

@Component({
  selector: 'app-gestionar-huespedes',
  templateUrl: './gestionar-huespedes.component.html',
  styleUrls: ['./gestionar-huespedes.component.scss']
})
export class GestionarHuespedesComponent {

  isLoading$: any;

  lstHuespedes: HuespedEntity[] = [];
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  filterNombres: string = '';
  filterNroDocumento: string = '';

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

  LoadData(cNombres?: string, cNroDocumento?: string) {
    const params = {
      cNombres: cNombres || '',
      cNroDocumento: cNroDocumento || ''
    };

    this._service.GetHuespedes(params).subscribe((resp: any) => {
     
      if (resp.success) {
        this.lstHuespedes = resp.data;
        this.desde = 0;
        this.hasta = 10;
      } else {
        this.toaster.error('Huésped', 'Error al cargar los datos de los huéspedes');
      }
    }, (error: any) => {
      this.toaster.error('Huésped', 'Error al cargar los datos de los huéspedes');
    });
  }

  BotonListarHuespedes() {
    this.LoadData(this.filterNombres, this.filterNroDocumento);
  }

  BotonVerDetalleHuesped(huesped: any) {

    const dialogRef = this._dialog.open(
      InfoHuespedComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          huesped: huesped,
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
