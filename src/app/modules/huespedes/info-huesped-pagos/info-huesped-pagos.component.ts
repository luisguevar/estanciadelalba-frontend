import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PagoEntity } from 'src/app/models/EstanciaEntity';
import { DetallePagoComponent } from '../../estancias/detalle-pago/detalle-pago.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-huesped-pagos',
  templateUrl: './info-huesped-pagos.component.html',
  styleUrls: ['./info-huesped-pagos.component.scss']
})
export class InfoHuespedPagosComponent {


  @Input() lstPagos: PagoEntity[] = [];

  DataPagos: any[] = [];
  pageSize = 3;
  desde: number = 0;
  hasta: number = 3;

  constructor(
    private _dialog: MatDialog,
  ) {
    setTimeout(() => {
      this.DataPagos = this.lstPagos;
    }, 10);
  }

  cambiarPagina(e: PageEvent) {
   
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
  BotonVerDetallePago(pago: PagoEntity) {
    const dialogRef = this._dialog.open(
      DetallePagoComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          /* estancia_id: this.estancia_id, */
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
}
