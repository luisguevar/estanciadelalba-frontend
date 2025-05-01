import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { PagoEntity } from 'src/app/models/EstanciaEntity';

@Component({
  selector: 'app-add-pago-recepcion',
  templateUrl: './add-pago-recepcion.component.html',
  styleUrls: ['./add-pago-recepcion.component.scss']
})
export class AddPagoRecepcionComponent {
  estancia_id: number = 0;

  cNombreTitular: string = '';
  cNroDocumentoTitular: string = '';
  cCorreoTitular: string = '';

  dFechaPago: string = '';
  nTipoPago: string = '0';
  nMetodoPago: string = '0';
  nMontoPagado: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddPagoRecepcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _service: SvGeneralService,
    public toaster: ToastrService,
  ) {

    this.estancia_id = this.data.estancia_id;

  }
  ngOnInit(): void {
    this.setFechaHoraActualPeru();
  }

  BotonGuardar() {


    if (this.dFechaPago === '' || this.dFechaPago === null) {
      this.toaster.warning('Pagos', 'Debe seleccionar la fecha del pago.');
      return;
    }

    if (this.nTipoPago === '0') {
      this.toaster.warning('Pagos', 'Debe seleccionar el tipo de pago.');
      return;
    }

    if (this.nMetodoPago === '0') {
      this.toaster.warning('Pagos', 'Debe seleccionar el método de pago.');
      return;
    }

    if (this.nMontoPagado <= 0) {
      this.toaster.warning('Pagos', 'El monto pagado debe ser mayor a cero.');
      return;
    }

    if (this.cNroDocumentoTitular === '' || this.cNroDocumentoTitular === null) {
      this.toaster.warning('Pagos', 'Debe ingresar el número de documento del titular.');
      return;
    }

    if (this.cNombreTitular === '' || this.cNombreTitular === null) {
      this.toaster.warning('Pagos', 'Debe ingresar el nombre del titular.');
      return;
    }

    if (this.cCorreoTitular === '' || this.cCorreoTitular === null) {
      this.toaster.warning('Pagos', 'Debe ingresar el correo del titular.');
      return;
    }


    const pago = new PagoEntity();

    pago.estancia_id = this.estancia_id;
    pago.dFechaPago = this.dFechaPago;
    pago.nTipoPago = parseInt(this.nTipoPago);
    pago.nMetodoPago = parseInt(this.nMetodoPago);
    pago.nMontoPagado = this.nMontoPagado;
    pago.nEstado = 1;
    pago.cNroDocumentoTitular = this.cNroDocumentoTitular;
    pago.cNombreTitular = this.cNombreTitular;
    pago.cCorreoTitular = this.cCorreoTitular;
    pago.cNombreTitular = this.cNombreTitular;

    this.dialogRef.close(pago);

    /* this._service.GuardarPago(pago).subscribe(
      (resp: any) => {
        if (resp.success) {
          this.toaster.success('Pagos', 'Se guardaron los cambios.');
          this.dialogRef.close(true);
        } else {
          this.toaster.error('Pagos', 'Error al guardar los cambios.');
        }
      },
      (error: any) => {
        if (error.status === 400) {
          this.toaster.error('Pagos', error.error.message);
        } else {
          this.toaster.error('Pagos', 'Error al guardar los cambios.');
        }
      }
    ); */

  }

  setFechaHoraActualPeru(): void {
    // Obtener la fecha y hora actual en UTC
    const now = new Date();

    // Convertir a la zona horaria de Lima, Perú (UTC-5)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const peruTimeString = now.toLocaleString('en-GB', options); // 'en-GB' para formato 24 horas
    // Ejemplo de peruTimeString: "28/04/2024, 14:30:15"

    // Separar la fecha y la hora
    const [datePart, timePart] = peruTimeString.split(', ');

    // Reemplazar '/' por '-' en la fecha
    const formattedDate = datePart.split('/').reverse().join('-'); // "2024-04-28"

    // Tomar solo horas y minutos para 'datetime-local'
    const formattedTime = timePart.substring(0, 5); // "14:30"

    // Combinar para el valor de 'datetime-local'
    this.dFechaPago = `${formattedDate}T${formattedTime}`;
  }
}
