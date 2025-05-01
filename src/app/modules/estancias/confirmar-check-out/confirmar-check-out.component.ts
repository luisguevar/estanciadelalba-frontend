import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';
import { ConfirmarCheckInComponent } from '../../reservas/confirmar-check-in/confirmar-check-in.component';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-confirmar-check-out',
  templateUrl: './confirmar-check-out.component.html',
  styleUrls: ['./confirmar-check-out.component.scss']
})
export class ConfirmarCheckOutComponent {
  isLoading$: any;
  dpCheckIn: string = '';
  dpCheckOut: string = '';
  estancia_id: number = 0;
  estancia: EstanciaEntity = new EstanciaEntity();
  FechaCheckOutProgramado: string = '';
  cboEstado: FormControl = new FormControl('2');
  cMotivoBloqueo: string = '';

  lstHuespedes: HuespedEntity[] = [];
  huesped_id: number = 0;

  nTotalAPagar: number = 0;
  nTotalPagado: number = 0;
  cNrosHabitaciones: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmarCheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _service: SvGeneralService,
    public toaster: ToastrService,
    public _auth: AuthService
  ) {
    this.estancia = data.estancia;

    this.lstHuespedes = data.lstHuespedes;
    this.nTotalAPagar = data.nTotalAPagar || 0;
    this.nTotalPagado = data.nTotalPagado || 0;
    this.cNrosHabitaciones = data.cNrosHabitaciones || '';

  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.setDefaultDateTime();


  }


  setDefaultDateTime() {
    const now = new Date();

    // Ajustar fecha y hora a la zona horaria local
    const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    this.dpCheckIn = this.estancia.dFechaCheckIn || '';
    /* this.dpCheckIn = this.estancia.dFechaCheckInProgramado || ''; */ // Formato compatible con datetime-local
    this.dpCheckOut = localNow.toISOString().slice(0, 16).replace('T', ' '); // Fecha ajustada a local

    const CheckOutProgramado = this.estancia.dFechaCheckOutProgramado;

    // Validar que el día del check-in coincida con el programado
    const fechaProgramada = new Date(CheckOutProgramado || '');

    const fechaProgramadaFormateada = fechaProgramada.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.FechaCheckOutProgramado = fechaProgramadaFormateada;
  }



  BotonGuardar() {


    if (this.huesped_id === 0) {
      this.toaster.warning(
        'Check-in',
        `El check-in no puede realizarse sin un huesped responsable.`
      );
      return;
    }



    this.estancia_id = this.estancia.id ?? 0;

    const estancia = new EstanciaEntity();
    estancia.id = this.estancia_id;
    estancia.nEstado = 3;
    estancia.dFechaCheckIn = this.dpCheckIn;
    estancia.dFechaCheckOut = this.dpCheckOut;
    estancia.nEstadoHabitacion = this.cboEstado.value;
    estancia.huespedResponsable_id = this.huesped_id;
    estancia.usuarioResponsable_id = this._auth.user.id || 0;
    estancia.nNroHuespedes = this.lstHuespedes.length || 0;
    estancia.nMontoPagar = this.nTotalAPagar || 0;
    estancia.nMontoPagado = this.nTotalPagado || 0;
    estancia.cNroHabitacion = this.cNrosHabitaciones || '';


    if (this.cMotivoBloqueo.length < 3 && (this.cboEstado.value === 0 || this.cboEstado.value === '0')) {
      this.toaster.warning('Check-out', 'Ingrese un motivo antes de bloquear una habitación.');
      return;
    }

    this._service.UpdateEstancia(this.estancia_id, estancia).subscribe(
      (resp: any) => {
        if (resp.success) {
          this.toaster.success('Check-out', 'Se guardaron los cambios.');
          this.dialogRef.close(true);
        } else {
          this.toaster.error('Check-out', 'Error al guardar los cambios.');
        }
      },
      (error: any) => {
        if (error.status === 400) {
          this.toaster.error('Check-out', error.error.message);
        } else {
          this.toaster.error('Check-out', 'Error al guardar los cambios.');
        }
      }
    );
  }
}
