import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ComprobanteDetalleEntity, ComprobanteEntity } from 'src/app/models/ComprobanteEntity';
import { Comprobante } from 'src/app/models/FacturacionEntity';
import { UserEntity } from 'src/app/models/UsuarioEntity';
import { AuthService } from 'src/app/modules/auth';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';

@Component({
  selector: 'app-emision-nota-credito',
  templateUrl: './emision-nota-credito.component.html',
  styleUrls: ['./emision-nota-credito.component.scss']
})
export class EmisionNotaCreditoComponent {
  isLoading$: any;


  nNumero: number = 0;
  registro: ComprobanteEntity;
  lstDetalles: ComprobanteDetalleEntity[];

  nTipoComprobanteOrigen: number = 0;
  nTipoComprobante: number = 0;
  cSerie: string = '';
  nTipoDocumento: number = 0;
  cClienteNroDocumento: string = '';
  cClienteNombre: string = '';
  cDireccion: string = '';
  cCorreo: string = '';
  cTotalGravada: string = '';
  cTotalIgv: string = '';
  cTotal: string = '';
  usuarioResponsable_id: number = 0;
  documento_que_se_modifica_tipo: number = 0;
  documento_que_se_modifica_serie: string = '';
  documento_que_se_modifica_numero: number = 0;
  tipo_de_nota_de_credito: number = 0;
  codigo_unico: string = '';

  totalOriginal: number = 0;

  bCargando: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmisionNotaCreditoComponent>,
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private authService: AuthService,

  ) {





    this.nNumero = this.data.nNumero;
    this.registro = this.data.registro;

    this.nTipoComprobanteOrigen = this.data.nTipoComprobante;
    this.nTipoComprobante = 3; //NOTA DE CREDITO
    this.cSerie = this.data.cSerie;
    this.nTipoDocumento = this.registro.nTipoDocumento || 0;
    this.cClienteNroDocumento = this.registro.cClienteNroDocumento || '';
    this.cClienteNombre = this.data.cClienteNombre;
    this.cDireccion = this.registro.cDireccion || '';
    this.cCorreo = this.registro.cCorreo || '';
    this.cTotalGravada = this.registro.cTotalGravada || '';
    this.cTotalIgv = this.registro.cTotalIgv || '';
    this.cTotal = this.registro.cTotal || '';
    this.usuarioResponsable_id = this.authService.user?.id || 0;
    this.documento_que_se_modifica_tipo = this.data.nTipoComprobante;
    this.documento_que_se_modifica_serie = this.data.cSerie;
    this.documento_que_se_modifica_numero = this.registro.nNumero || 0;
    this.tipo_de_nota_de_credito = 6; //DEVOLUCION TOTAL
    this.codigo_unico = '3' + this.cSerie + this.registro.nNumero?.toString();

    this.lstDetalles = this.registro.lstDetalles || [];

    this.lstDetalles = (this.registro.lstDetalles || []).map(d => ({
      ...d,
      cSubTotalOriginal: Number(d.cSubTotal).toFixed(2) // queda string
    }));


    console.log('registro: ', this.registro);
    this.totalOriginal = Number(this.registro.cTotal) || 0;

  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;


  }

  eliminarDetalle(i: number) {
    this.lstDetalles.splice(i, 1);
    this.recalcularTotales();
  }



  recalcularTotales() {
    const igvRate = 0.18;

    // 1) Validar cada ITEM
    for (let d of this.lstDetalles) {
      const actual = Number(d.cSubTotal);
      const originalItem = Number(d.cSubTotalOriginal);

      if (actual > originalItem) {
        this.toaster.warning('El subtotal del ítem no puede superar el valor original');
        d.cSubTotal = Number(originalItem);
      }
    }

    // 2) Validar TOTAL
    const totalNuevo = this.lstDetalles.reduce((acc, d) => acc + Number(d.cSubTotal), 0);
    if (totalNuevo > this.totalOriginal) {
      this.toaster.warning('La suma de los ítems no puede superar el total original del comprobante');
      return;
    }

    // 3) Recalcular montos finales (totalNuevo es BRUTO)
    const bruto = totalNuevo;
    const neto = bruto / (1 + igvRate);  // 1.18
    const igv = bruto - neto;

    this.cTotal = bruto.toFixed(2);
    this.cTotalGravada = neto.toFixed(2);
    this.cTotalIgv = igv.toFixed(2);
  }


  BotonGuardar() {

    if (!this.lstDetalles.length) {
      this.toaster.error('Debe haber al menos un ítem en el detalle');
      return;
    }

    // Validar total final antes de enviar
    if (parseFloat(this.cTotal) <= 0) {
      this.toaster.error('El total debe ser mayor a 0');
      return;
    }

    if (parseFloat(this.cTotal) > this.totalOriginal) {
      this.toaster.error('El total no puede superar el valor original del comprobante');
      return;
    }

    // Validar por ITEM nuevamente por seguridad
    for (let d of this.lstDetalles) {
      if (Number(d.cSubTotal) > Number(d.cSubTotalOriginal)) {
        this.toaster.error('Un ítem supera su valor original');
        return;
      }
    }


    const body = {
      nTipoComprobante: this.nTipoComprobante,
      cSerie: this.cSerie,
      nTipoDocumento: this.nTipoDocumento,
      cClienteNroDocumento: this.cClienteNroDocumento,
      cClienteNombre: this.cClienteNombre,
      cDireccion: this.cDireccion,
      cCorreo: this.cCorreo,
      cTotalGravada: this.cTotalGravada,
      cTotalIgv: this.cTotalIgv,
      cTotal: this.cTotal,
      usuarioResponsable_id: this.usuarioResponsable_id,
      documento_que_se_modifica_tipo: this.documento_que_se_modifica_tipo,
      documento_que_se_modifica_serie: this.documento_que_se_modifica_serie,
      documento_que_se_modifica_numero: this.documento_que_se_modifica_numero,
      tipo_de_nota_de_credito: this.tipo_de_nota_de_credito,
      codigo_unico: this.codigo_unico,
      lstHabitacion: this.lstDetalles
    }

    console.log('body: ', body);
    this.bCargando = true;
    this._service.PostGenerarComprobante(body).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp) {
          this.toaster.success('Comprobantes', 'Comprobante Generado con éxito.');
          this.dialogRef.close(this.registro);
          return;
        }
      },
      (error: any) => {
        console.error(error);
        console.error('Error al generar comprobante', error.error);
        this.dialogRef.close(this.registro);
        const codigo = Number(error?.error?.codigo);


        let mensaje = '';

        switch (codigo) {
          case 10:
            mensaje = 'No se pudo autenticar, token incorrecto o eliminado.';
            break;
          case 11:
            mensaje = 'La ruta o URL que estás usando no es correcta o no existe. Verifica en la opción Api-Integración.';
            break;
          case 12:
            mensaje = 'Solicitud incorrecta, la cabecera (Header) no contiene un Content-Type correcto.';
            break;
          case 20:
            mensaje = 'El archivo enviado no cumple con el formato establecido.';
            break;
          case 21:
            mensaje = error?.error?.mensaje;
            break;
          case 22:
            mensaje = 'Documento enviado fuera del plazo permitido.';
            break;
          case 23:
            mensaje = 'Este documento ya existe en el sistema.';
            break;
          case 24:
            mensaje = 'El documento indicado no existe o no fue enviado.';
            break;
          case 40:
            mensaje = 'Error interno desconocido.';
            break;
          case 50:
            mensaje = 'Su cuenta ha sido suspendida.';
            break;
          case 51:
            mensaje = 'Su cuenta ha sido suspendida por falta de pago.';
            break;
          default:
            mensaje = 'Ocurrió un error no identificado.';
        }

        this.toaster.error('Error', mensaje);
        this.bCargando = false;
        return;
      }
    );

  }


}
