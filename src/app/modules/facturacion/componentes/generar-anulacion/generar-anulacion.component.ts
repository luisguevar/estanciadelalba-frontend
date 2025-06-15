import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ComprobanteEntity } from 'src/app/models/ComprobanteEntity';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';

@Component({
  selector: 'app-generar-anulacion',
  templateUrl: './generar-anulacion.component.html',
  styleUrls: ['./generar-anulacion.component.scss']
})
export class GenerarAnulacionComponent {
  isLoading$: any;
  cMotivo: string = '';
  cClienteNombre: string = '';
  nTipoComprobante: number = 0;
  cSerie: string = '';
  nNumero: number = 0;
  registro: ComprobanteEntity;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GenerarAnulacionComponent>,
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog
  ) {

    this.cClienteNombre = this.data.cClienteNombre;
    this.nTipoComprobante = this.data.nTipoComprobante;
    this.cSerie = this.data.cSerie;
    this.nNumero = this.data.nNumero;
    this.registro = this.data.registro;
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;


  }

  BotonGuardar() {
    if (this.cMotivo && this.cMotivo.length > 3) {

      const body = {
        id: this.registro.id,
        tipo_de_comprobante: this.registro.nTipoComprobante,
        serie: this.registro.cSerie,
        numero: this.registro.nNumero,
        motivo: this.cMotivo
      }

      console.log('Body: ', body);

      this._service.PostAnularComprobante(body).subscribe(
        (resp: any) => {
          console.log(resp);

          if (resp && resp.bAnulado !== undefined) {
            this.toaster.success('Comprobantes', 'Estado SUNAT actualizado correctamente.');
            this.dialogRef.close(true);
          } else {
            this.toaster.warning('Comprobantes', 'No se recibió información del estado SUNAT.');
          }


        },
        (error: any) => {
          console.error('Error al obtener comprobante', error.error);
          this.toaster.error('Error', 'Error al Obtener comprobante.');
        }
      );


    } else {

      this.toaster.warning('Comprobantes', 'Ingrese un mótivo para continuar.');
      return;

    }
  }
}
