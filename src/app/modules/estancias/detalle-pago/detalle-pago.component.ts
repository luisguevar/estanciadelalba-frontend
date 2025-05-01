import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { PagoEntity } from 'src/app/models/EstanciaEntity';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.scss']
})
export class DetallePagoComponent implements OnInit {

  pago: PagoEntity = new PagoEntity();


  cNombreTitular: string = '';
  cNroDocumentoTitular: string = '';
  cCorreoTitular: string = '';

  dFechaPago: string = '';
  nTipoPago: string = '0';
  nMetodoPago: string = '0';
  nMontoPagado: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DetallePagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _service: SvGeneralService,
    public toaster: ToastrService,
  ) {

    this.pago = this.data.pago;

  }
  ngOnInit(): void {
 

    this.cNombreTitular = this.pago.cNombreTitular || '';
    this.cNroDocumentoTitular = this.pago.cNroDocumentoTitular || '';
    this.cCorreoTitular = this.pago.cCorreoTitular || '';

    this.dFechaPago = this.pago.dFechaPago || '';
    this.nTipoPago = this.pago.nTipoPago?.toString() || this.nTipoPago;
    this.nMetodoPago = this.pago.nMetodoPago?.toString() || this.nMetodoPago;
    this.nMontoPagado = this.pago.nMontoPagado || 0;
  }


}
