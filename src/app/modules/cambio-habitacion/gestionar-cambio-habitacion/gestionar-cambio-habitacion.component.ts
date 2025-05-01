import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { AlertService } from '../../service/alert.service';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { EstanciaHabitacionEntity } from 'src/app/models/EstanciaEntity';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { EstanciasRoutingModule } from '../../estancias/estancias-routing.module';
import { CambioHabitacionEntity } from 'src/app/models/CambioHabitacionEntity';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-gestionar-cambio-habitacion',
  templateUrl: './gestionar-cambio-habitacion.component.html',
  styleUrls: ['./gestionar-cambio-habitacion.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbDatepickerModule,
    MatCardModule,
    MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatButtonModule, MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule, MatDividerModule,
    MatTooltipModule
  ]
})
export class GestionarCambioHabitacionComponent {
  HabitacionEstancia: any;
  lstNivelesDisponibles: NivelHabitacionEntity[] = [];
  lstHabitacionEstancia: EstanciaHabitacionEntity[] = [];
  habitacionesOcupadas: Set<number>;

  dpCheckIn: string = '';
  dpCheckOut: string = '';
  cHabitacionActual: string = '';

  lstNiveles: any;
  lstHabitaciones: any;
  selectedNivel: number = 0;
  selectedHabitacion: number = 0;
  bCambioPrecio: boolean = false;
  nEstanciaId: number = 0;
  cboEstado: FormControl = new FormControl('2');

  lstEstado: any[] = [
    { id: 1, cNombreEstado: 'Disponible' },
    { id: 2, cNombreEstado: 'Sucia' },
    { id: 0, cNombreEstado: 'Bloqueada' }
  ]

  cMotivoBloqueo: string = '';
  cMotivoCambio: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GestionarCambioHabitacionComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    public _auth: AuthService
  ) {
    if (this.data) {

      this.HabitacionEstancia = this.data.HabitacionEstancia;
      this.nEstanciaId = this.data.nEstanciaId;
      this.cHabitacionActual = this.HabitacionEstancia?.cNombreTipoHabitacion + ' NRO: ' + this.HabitacionEstancia?.nNroHabitacion + ' - PRECIO: S/' + this.HabitacionEstancia?.
        nPrecioEstanciaHabitacion
        ;

      console.log('HabitacionEstancia: ', this.HabitacionEstancia);

      this.lstNivelesDisponibles = this.data.lstNivelesDisponibles.map((nivel: NivelHabitacionEntity, index: number) => ({
        ...nivel,
        id: nivel.id || `nivel-${index}`, // Asigna un id si no existe
      }));

      this.habitacionesOcupadas = this.data.habitacionesOcupadas;
      console.log(' this.habitacionesOcupadas: ',  this.habitacionesOcupadas);

      this.lstNivelesDisponibles.forEach(nivel => {
        if (nivel.lstHabitaciones && nivel.lstHabitaciones.length > 0) {
          for (let i = nivel.lstHabitaciones.length - 1; i >= 0; i--) {
            const habitacion = nivel.lstHabitaciones[i];
            if (this.habitacionesOcupadas.has(habitacion.id || 0)) {
              nivel.lstHabitaciones.splice(i, 1); // Eliminar habitación ocupada
            }
          }
        }
      });


      // Inicializar paginación para cada nivel
      // this.lstNivelesDisponibles.forEach((nivel) => {
      //   this.paginacionPorNivel[nivel.id || 0] = {
      //     desde: 0,
      //     hasta: 5,
      //     pageSize: 5,
      //   };
      // });

      this.dpCheckIn = this.data.dpCheckIn;
      this.dpCheckOut = this.data.dpCheckOut;

    }



  }

  onCambioPrecioSeleccionado(value: boolean) {
    this.bCambioPrecio = value;
    console.log("Nuevo valor de bCambioPrecio:", this.bCambioPrecio);
  }


  formatDateTimeLocal(dateString: string): string {
    if (!dateString) return ''; // Evitar errores si el valor es null o undefined

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Verificar si la fecha es válida

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  onNivelChange() {

    this.lstHabitaciones = this.lstNivelesDisponibles.find(x => Number(x.id) === Number(this.selectedNivel))?.lstHabitaciones || [];

  }


  BotonGuardarCambio() {

    if (this.selectedHabitacion <= 0 || this.selectedNivel <= 0) {
      this.toaster.warning('Cambio Habitación', 'Seleccione una habitación para continuar.');
      return;
    }

    if (this.cMotivoBloqueo.length < 3 && (this.cboEstado.value === 0 || this.cboEstado.value === '0')) {
      this.toaster.warning('Cambio Habitación', 'Ingrese un motivo antes de bloquear una habitación.');
      return;
    }


    if (this.cMotivoCambio.length < 2) {
      this.toaster.warning('Cambio Habitación', 'Ingrese un motivo de cambio para continuar.');
      return;
    }


    const nNroHabitacionDestino = Number(this.lstHabitaciones.find((x: any) => Number(x.id) === Number(this.selectedHabitacion))?.nNroHabitacion) || 0;
    const nPrecioHabitacionNueva = Number(this.lstHabitaciones.find((x: any) => Number(x.id) === Number(this.selectedHabitacion))?.nPrecioTotal) || 0;
    const nPrecioHabitacionAntigua = this.HabitacionEstancia.nPrecioEstanciaHabitacion;

    const habitacion_id = Number(this.lstHabitaciones.find((x: any) => Number(x.id) === Number(this.selectedHabitacion))?.id) || 0;

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Esta operación no se puede revertir.",
      "Si, cambiar habitación",
      "warning"
    ).then((isConfirmed) => {
      if (isConfirmed) {

        const cambio = new CambioHabitacionEntity();

        cambio.estanciaHabitacionOrigen_id = this.HabitacionEstancia?.estanciaHabitacion_id;
        cambio.nNroHabitacionOrigen = this.HabitacionEstancia?.nNroHabitacion;
        cambio.nNroHabitacionDestino = nNroHabitacionDestino;

        if (!this.bCambioPrecio) {
          cambio.nPrecioEstanciaHabitacion = nPrecioHabitacionAntigua;
        } else {
          cambio.nPrecioEstanciaHabitacion = nPrecioHabitacionNueva;
        }
        cambio.cObservaciones = this.cMotivoCambio || '';
        cambio.bCambioPrecio = this.bCambioPrecio;
        cambio.estancia_id = this.nEstanciaId;
        cambio.habitacion_id = habitacion_id;
        cambio.nEstadoHabitacion = this.cboEstado.value;
        cambio.cMotivoBloqueo = this.cMotivoBloqueo || '';
        cambio.usuarioResponsable_id = this._auth.user.id || 0;

        console.log('cambio: ', cambio);

        this._service.PutCambioHabitacion(cambio).subscribe(
          (resp: any) => {
            if (resp.success) {
              this.toaster.success('Cambio Habitación', 'Se guardaron los cambios.');
              this.dialogRef.close(true);
            } else {
              this.toaster.error('Cambio Habitación', 'Error al guardar los cambios.');
            }
          },
          (error: any) => {
            if (error.status === 400) {
              this.toaster.error('Cambio Habitación', error.error.message);
            } else {
              this.toaster.error('Cambio Habitación', 'Error al guardar los cambios.');
            }
          }
        );
      }
    });




  }
}
