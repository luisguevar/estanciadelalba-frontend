import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReclamacionEntity } from 'src/app/models/ReclamacionEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { AlertService } from '../../service/alert.service';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-edit-reclamacion',
  templateUrl: './edit-reclamacion.component.html',
  styleUrls: ['./edit-reclamacion.component.scss']
})
export class EditReclamacionComponent {
  isLoading$: any;
  nIdReclamacion: number = 0;
  reclamacion: ReclamacionEntity;
  cCorrelativo: string = '';

  lstTipoDocumentos: any[] = [
    { nIdDocumento: 1, cNombreDocumento: 'DNI' },
    { nIdDocumento: 2, cNombreDocumento: 'CE' },
    { nIdDocumento: 3, cNombreDocumento: 'RUC' },
    { nIdDocumento: 4, cNombreDocumento: 'PAS' }
  ]

  lstTipoBien: any[] = [
    { nIdBien: 0, cNombreBien: 'Producto' },
    { nIdBien: 1, cNombreBien: 'Servicio' },
  ]

  lstTipoDisconformidad: any[] = [
    { nIdDisconformidad: 0, cNombreDisconformidad: 'Queja' },
    { nIdDisconformidad: 1, cNombreDisconformidad: 'Reclamo' },
  ]

  //form

  cNombreReclamante: string = '';
  cFechaReclamo: string = '';
  cDomicilioReclamante: string = '';
  nTipoDocumentoReclamante: number = 0;
  cNroDocumentoReclamante: string = '';
  cTelefonoReclamante: string = '';
  cEmailReclamante: string = '';
  nTipoBien: number = 0;
  nMontoReclamadoBien: number = 0;
  nTipoDisconformidad: number = 0;
  cDescripcionBien: string = '';
  cDetalleDisconformidad: string = '';
  cPedidoDisconformidad: string = '';
  nEstadoReclamacion: number = 0;
  cRespuestaProveedor: string = '';
  cActualizadoPor: string = '';
  cMontoReclamadoBien: string = '';





  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditReclamacionComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService,
    public _auth: AuthService
  ) {
    this.nIdReclamacion = data.nIdReclamacion;
    this.cCorrelativo = data.cCorrelativo;
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    setTimeout(() => {
      this.ObtenerReclamacionPorId(this.nIdReclamacion);
    }, 10);

  }


  ObtenerReclamacionPorId(id: number) {

    this._service.GetReclamacionById(id).subscribe((resp: any) => {

      if (resp.success) {
        this.reclamacion = resp.reclamo;

        this.cNombreReclamante = this.reclamacion.cNombreReclamante || '';
        this.cFechaReclamo = this.reclamacion.cFechaRegistro || '';
        this.cDomicilioReclamante = this.reclamacion.cDomicilioReclamante || '';
        this.cTelefonoReclamante = this.reclamacion.cTelefonoReclamante || '';
        this.nTipoDocumentoReclamante = this.reclamacion.nTipoDocumentoReclamante || 0;
        this.cNroDocumentoReclamante = this.reclamacion.cNroDocumentoReclamante || '';
        this.cEmailReclamante = this.reclamacion.cEmailReclamante || '';

        this.nTipoBien = this.reclamacion.nTipoBien || 0;
        this.cMontoReclamadoBien =
          (this.reclamacion.nMoneda === 1 ? '$' : 'S/') +
          ' ' +
          (this.reclamacion.nMontoReclamadoBien || 0);

        this.nTipoDisconformidad = this.reclamacion.nTipoDisconformidad || 0;
        this.cDescripcionBien = this.reclamacion.cDescripcionBien || '';
        this.cDetalleDisconformidad = this.reclamacion.cDetalleDisconformidad || '';
        this.cPedidoDisconformidad = this.reclamacion.cPedidoDisconformidad || '';
        this.cRespuestaProveedor = this.reclamacion.cRespuestaProveedor || '';
        this.cActualizadoPor = this.reclamacion.cActualizadoPor || '';
        this.nEstadoReclamacion = this.reclamacion.nEstadoReclamacion || 0;
      }
    });
  }


  ActualizarReclamacion() {


    const reclamacion = new ReclamacionEntity();
    reclamacion.nEstadoReclamacion = 1;
    reclamacion.cRespuestaProveedor = this.cRespuestaProveedor || '';
    reclamacion.usuarioResponsable_id = this._auth.user.id || 0;


    if (this.cRespuestaProveedor.length > 5) {
      this._service.UpdateReclamacion(this.nIdReclamacion, reclamacion).subscribe(
        (resp: any) => {
          if (resp.success) {
            this.toaster.success('Reclamación', 'Se guardaron los cambios.');
            this.ObtenerReclamacionPorId(this.nIdReclamacion);
            /*  this.dialogRef.close(true); */
          } else {
            this.toaster.error('Reclamación', 'Error al guardar los cambios.');
          }
        },
        (error: any) => {
          if (error.status === 400) {
            this.toaster.error('Reclamación', error.error.message);
          } else {
            this.toaster.error('Reclamación', 'Error al guardar los cambios.');
          }
        }
      );
    } else {
      this.toaster.warning('Reclamación', 'Ingrese una respuesta para continuar.');
      return;
    }





  }

  EnviarReclamacion() {

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Enviar Respuesta",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {

        const reclamacion = new ReclamacionEntity();
        reclamacion.id = this.nIdReclamacion;
        reclamacion.cRespuestaProveedor = this.cRespuestaProveedor || '';
        reclamacion.usuarioResponsable_id = this._auth.user.id || 0;
        reclamacion.nEstadoReclamacion = 2;

        if (this.cRespuestaProveedor.length > 5) {
          this._service.UpdateReclamacionEnvioCorreo(this.nIdReclamacion, reclamacion).subscribe(
            (resp: any) => {
              if (resp.success) {
                this.toaster.success('Reclamación', 'Se guardaron los cambios.');
                this.ObtenerReclamacionPorId(this.nIdReclamacion);
                /*  this.dialogRef.close(true); */
              } else {
                this.toaster.error('Reclamación', 'Error al guardar los cambios.');
              }
            },
            (error: any) => {
              if (error.status === 400) {
                this.toaster.error('Reclamación', error.error.message);
              } else {
                this.toaster.error('Reclamación', 'Error al guardar los cambios.');
              }
            }
          );
        } else {
          this.toaster.warning('Reclamación', 'Ingrese una respuesta para continuar.');
          return;
        }
      }
    });


  }
}
