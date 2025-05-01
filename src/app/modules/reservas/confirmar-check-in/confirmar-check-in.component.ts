import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-confirmar-check-in',
  templateUrl: './confirmar-check-in.component.html',
  styleUrls: ['./confirmar-check-in.component.scss']
})
export class ConfirmarCheckInComponent {
  isLoading$: any;
  dpCheckIn: string = '';
  dpCheckOut: string = '';
  estancia_id: number = 0;
  estancia: EstanciaEntity = new EstanciaEntity();
  FechaCheckInProgramado: string = '';

  lstHuespedes: HuespedEntity[] = [];
  huesped_id: number = 0;

  nTotalAPagar: number = 0;
  nTotalPagado: number = 0;
  cNrosHabitaciones: string = '';
  constructor(
    public dialogRef: MatDialogRef<ConfirmarCheckInComponent>,
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
    const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    this.dpCheckIn = localNow.toISOString().slice(0, 16).replace('T', ' '); //Fecha Actual
    /* this.dpCheckIn = this.estancia.dFechaCheckInProgramado || ''; */ // Formato compatible con datetime-local
    this.dpCheckOut = this.estancia.dFechaCheckOutProgramado || '';
    // Puedes ajustarlo si es necesario

    const checkInProgramado = this.estancia.dFechaCheckInProgramado;
    // Validar que el día del check-in coincida con el programado

    const fechaProgramada = new Date(checkInProgramado || '');

    const fechaProgramadaFormateada = fechaProgramada.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.FechaCheckInProgramado = fechaProgramadaFormateada;

  }


  BotonGuardar() {

    const checkInProgramado = this.estancia.dFechaCheckInProgramado;

    // Validar que el día del check-in coincida con el programado o sea posterior
    const fechaSeleccionada = new Date(this.dpCheckIn);
    const fechaProgramada = new Date(checkInProgramado || '');


    // Validación adicional para que la fecha seleccionada no sea anterior a la fecha programada
    if (fechaSeleccionada < fechaProgramada) {
      const fechaProgramadaFormateada = fechaProgramada.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      this.toaster.warning(
        'Check-in',
        `El check-in no puede realizarse antes de la fecha programada: ${fechaProgramadaFormateada}.`
      );
      return;
    }


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
    estancia.nEstado = 2;
    estancia.dFechaCheckIn = this.dpCheckIn;
    estancia.dFechaCheckOutProgramado = this.dpCheckOut;
    estancia.huespedResponsable_id = this.huesped_id;
    estancia.usuarioResponsable_id = this._auth.user.id || 0;
    estancia.nNroHuespedes = this.lstHuespedes.length || 0;
    estancia.nMontoPagar = this.nTotalAPagar || 0;
    estancia.nMontoPagado = this.nTotalPagado || 0;
    estancia.cNroHabitacion = this.cNrosHabitaciones || '';



    this._service.UpdateEstancia(this.estancia_id, estancia).subscribe(
      (resp: any) => {
        if (resp.success) {
          this.toaster.success('Check-in', 'Se guardaron los cambios.');
          this.dialogRef.close(true);
        } else {
          this.toaster.error('Check-in', 'Error al guardar los cambios.');
        }
      },
      (error: any) => {
        if (error.status === 400) {
          this.toaster.error('Check-in', error.error.message);
        } else {
          this.toaster.error('Check-in', 'Error al guardar los cambios.');
        }
      }
    );
  }
}
