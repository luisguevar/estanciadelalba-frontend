import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth';
import { SvGeneralService } from '../../service/sv-general.service';
import { PageEvent } from '@angular/material/paginator';
import { ReclamacionEntity } from 'src/app/models/ReclamacionEntity';
import { EditReclamacionComponent } from '../edit-reclamacion/edit-reclamacion.component';

@Component({
  selector: 'app-gestionar-reclamaciones',
  templateUrl: './gestionar-reclamaciones.component.html',
  styleUrls: ['./gestionar-reclamaciones.component.scss']
})
export class GestionarReclamacionesComponent {
  isLoading$: any;
  lstRegistros: ReclamacionEntity[] = [];
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  filterTipoMotivimiento: number = -1;
  filterDocumento: string;
  filterDesde: string;
  filterHasta: string;

  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public _auth: AuthService
  ) {


  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.LoadData();

  }

  LoadData() {
    this._service
      .GetReclamos(this.filterTipoMotivimiento, this.filterDocumento, this.filterDesde, this.filterHasta)
      .subscribe({
        next: (resp: any) => {
          if (resp.success) {
            this.lstRegistros = resp.data;
          } else {
            this.toaster.error('Reclamaciones', 'Error al cargar los datos.');
          }
        },
        error: () => {
          this.toaster.error('Reclamaciones', 'Error al cargar los datos.');
        }
      });
  }

  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  BotonVerDetalleReclamacion(reclamacion: ReclamacionEntity) {
    const dialogRef = this._dialog.open(
      EditReclamacionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          nIdReclamacion: reclamacion.id,
          cCorrelativo: reclamacion.cNroHoja
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.LoadData();
      this.cdr.detectChanges();

    });
  }

  BotonDescargarPDF(reclamacion: ReclamacionEntity) {
    this._service.GetReclamacionPDF(reclamacion.id || 0).subscribe((resp: Blob) => {
      const blob = new Blob([resp], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = reclamacion.cNroHoja || 'reclamacion' + '.pdf'; // Puedes ajustar el nombre
      a.click();
      window.URL.revokeObjectURL(url);

      this.toaster.success('Reclamaciones', 'Descarga Reclamacion completada.');
    });
  }

}
