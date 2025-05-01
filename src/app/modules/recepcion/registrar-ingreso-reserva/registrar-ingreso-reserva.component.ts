import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { HabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { EstanciaEntity, EstanciaHabitacionEntity, EstanciaHabitacionHuespedEntity, PagoEntity } from 'src/app/models/EstanciaEntity';
import { AddHuespedComponent } from '../add-huesped/add-huesped.component';
import { NivelHabitacionEntity } from 'src/app/models/RecepcionEntity';
import { AddHabitacionComponent } from '../../recepcion/add-habitacion/add-habitacion.component';
import { AddPagoComponent } from '../../estancias/add-pago/add-pago.component';
import { DetallePagoComponent } from '../../estancias/detalle-pago/detalle-pago.component';
import { AddPagoRecepcionComponent } from '../add-pago-recepcion/add-pago-recepcion.component';
import { AlertService } from '../../service/alert.service';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-registrar-ingreso-reserva',
  templateUrl: './registrar-ingreso-reserva.component.html',
  styleUrls: ['./registrar-ingreso-reserva.component.scss']
})
export class RegistrarIngresoReservaComponent {

  isLoading$: any;


  firstFormGroup: any;
  secondFormGroup: any;
  isLinear = false;

  cNombres: string = '';
  cApellidos: string = '';
  nTipoDocumento: number = 0;
  pais_id: number = 0;
  cNroDocumento: string = '';
  cCorreo: string = '';
  cCelular: string = '';
  lstTipoDocumentos: any[] = [{
    nId: 1,
    cNombre: 'DNI'
  }, {
    nId: 2,
    cNombre: 'C.E.'
  }]

  huesped: HuespedEntity = new HuespedEntity();
  huesped_id: number = 0;
  paises: any[] = [];

  lstHabitacionEstancia: EstanciaHabitacionEntity[] = [];
  estancia: EstanciaEntity;
  dpCheckIn: string = '';
  dpCheckOut: string = '';
  nTotalAPagar: number = 0;

  cFilterNroDocumento: string = '';

  habitacion: HabitacionEntity;
  nTotalNochesReserva: number = 0;

  nTipoRegistro: FormControl = new FormControl('1');
  lstTipoRegistro: any[] = [
    { nId: 2, cNombre: 'Reserva' },
    { nId: 1, cNombre: 'Ingreso' }
  ];


  lstNivelesDisponibles: NivelHabitacionEntity[] = [];
  lstPagos: PagoEntity[] = [];
  lstHuespedesTodos: HuespedEntity[] = [];

  bReadOnly: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistrarIngresoReservaComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    public _auth: AuthService,

  ) {
    if (_auth.user?.rol_id != 1) {
      this.bReadOnly = true;
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.habitacion = this.data.habitacion;
    /*     this.lstHabitacionEstancia.push(this.habitacion); */

    this.dpCheckIn = this.data.dpFechaCheckInEnv;
    this.dpCheckOut = this.data.dpFechaCheckOutEnv;
    this.lstNivelesDisponibles = this.data.lstNivelesDisponibles;




  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    setTimeout(() => {
      this.ListarPaises();
      this.BuscarHabitacion(this.habitacion.id || 0, this.dpCheckIn, this.dpCheckOut);
    }, 10);

  }

  ListarPaises() {
    this._service.GetPaises().subscribe((resp: any) => {

      if (resp.success) {
        this.paises = resp.data;

      }
    });
  }



  BuscarHuesped() {
    this._service.GetBuscadorHuesped(this.cFilterNroDocumento).subscribe((resp: any) => {

      if (resp.success) {



        if (resp.huesped && resp.huesped.cNroDocumento && resp.huesped.cNroDocumento.length > 1) {

          this.huesped = resp.huesped;
          this.cNombres = this.huesped.cNombres || '';
          this.cApellidos = this.huesped.cApellidos || '';
          this.nTipoDocumento = this.huesped.nTipoDocumento || 0;
          this.cNroDocumento = this.huesped.cNroDocumento || '';
          this.cCorreo = this.huesped.cCorreo || '';
          this.pais_id = this.huesped.pais_id || 0;
          this.cCelular = this.huesped.cNroCelular || '';
          this.toaster.success('Recepción', 'Huesped encontrado.')

        } else {

          this.toaster.warning('Recepción', 'No se encontró un huesped con ese Nro Documento.')
        }
      }
    });
  }


  BuscarHabitacion(id: number, dpFechaCheckIn: string, dpFechaCheckOut: string) {
    this._service.GetBuscadorHabitacion(id, dpFechaCheckIn, dpFechaCheckOut).subscribe((resp: any) => {

      if (resp.success) {
        const result: HabitacionEntity = resp.habitacion || {}; // Aseguramos que resp.huesped exista, si no, asignamos un objeto vacío.

        const habitacion = new EstanciaHabitacionEntity();
        habitacion.cNombreTipoHabitacion = result.cNombreTipoHabitacion || ''; // Usamos el operador de coalescencia para valores nulos o indefinidos.
        habitacion.nNroHabitacion = result.nNroHabitacion || 0; // Aseguramos que no sea undefined.
        habitacion.nPrecioEstanciaHabitacion = result.nPrecioEstanciaHabitacion || 0; // Aseguramos que no sea undefined.
        habitacion.nTotalNoches = result.nTotalNoches;
        habitacion.habitacion_id = result.habitacion_id;
        this.lstHabitacionEstancia.push(habitacion);

        this.lstHabitacionEstancia.forEach(element => {
          this.nTotalAPagar += element.nPrecioEstanciaHabitacion || 0;
        });

        this.nTotalNochesReserva = this.lstHabitacionEstancia[0].nTotalNoches || 0;


      }
    }, (error) => {
      this.toaster.error('Recepción', 'No se cargó la información correctamente.')
    });
  }

  calcularTotal() {
    this.nTotalAPagar = 0; // Reinicia el total antes de hacer el cálculo.
    this.lstHabitacionEstancia.forEach(element => {
      this.nTotalAPagar += element.nPrecioEstanciaHabitacion || 0;
    });
  }

  BotonReservar() {
    // Validar que todos los campos del titular estén completos
    if (
      !this.cNombres?.trim() ||
      !this.cApellidos?.trim() ||
      !this.cNroDocumento?.trim() ||
      !this.cCorreo?.trim() ||
      !this.cCelular?.trim()
    ) {
      this.toaster.warning('Recepción', 'Complete todos los campos del titular.');
      return;
    }

    // Verificar que todas las habitaciones tengan al menos un huésped
    const habitacionesSinHuespedes = this.lstHabitacionEstancia.some(
      (habitacion: any) =>
        !habitacion.lstHuespedes || habitacion.lstHuespedes.length === 0
    );

    if (habitacionesSinHuespedes) {
      this.toaster.warning('Recepción', 'Cada habitación debe tener al menos un huésped.');
      return;
    }




    // Crear la entidad Estancia
    const estancia = new EstanciaEntity();
    //estancia.dFechaCheckIn = this.dpCheckIn;
    estancia.nTotalHabitaciones = this.lstHabitacionEstancia.length || 0;
    estancia.nEstado = 1;
    estancia.dFechaReservaCheckIn = this.dpCheckIn;
    estancia.dFechaReservaCheckOut = this.dpCheckOut;
    estancia.lstPagos = this.lstPagos || [];
    // Inicializar listas para habitaciones y huéspedes
    const lstEstanciaHabitacion: EstanciaHabitacionEntity[] = [];

    this.lstHabitacionEstancia.forEach((habitacion) => {
      const nuevaHabitacion = new EstanciaHabitacionEntity();
      nuevaHabitacion.habitacion_id = habitacion.habitacion_id;
      nuevaHabitacion.nTotalHuespedesHabitacion =
        habitacion.lstHuespedes?.length || 0;
      nuevaHabitacion.nPrecioEstanciaHabitacion =
        habitacion.nPrecioEstanciaHabitacion;

      // Crear lista de huéspedes para cada habitación
      const lstEstanciaHabitacionHuesped: EstanciaHabitacionHuespedEntity[] = [];
      habitacion.lstHuespedes?.forEach((huesped) => {
        const nuevoHuesped = new EstanciaHabitacionHuespedEntity();
        nuevoHuesped.huesped_id = huesped.huesped_id;
        lstEstanciaHabitacionHuesped.push(nuevoHuesped);
      });

      nuevaHabitacion.lstEstanciaHabitacionHuesped = lstEstanciaHabitacionHuesped;
      lstEstanciaHabitacion.push(nuevaHabitacion);
    });

    estancia.lstEstanciaHabitacion = lstEstanciaHabitacion;

    // Agregar titular a la estancia
    estancia.huespedTitular = {
      cNombres: this.cNombres,
      cApellidos: this.cApellidos,
      cCorreo: this.cCorreo,
      nTipoDocumento: this.nTipoDocumento,
      cNroDocumento: this.cNroDocumento,
      cNroCelular: this.cCelular,
      pais_id: this.pais_id,
    };


    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Reservar Habitacion(es)",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.PostRegistrarIngreso(estancia).subscribe(
          (response) => {
            // Si el registro fue exitoso
            if (response.success) {
              this.toaster.success('Recepción', 'Reserva registrada exitosamente.');
              this.dialogRef.close(true);
            } else {
              this.toaster.error('Recepción', 'Error al registrar la reserva.');
            }
          },
          (error) => {
            this.toaster.error('Recepción', 'Ocurrió un error al registrar la reserva.');

          }
        );
      }
    });


  }

  BotonRegistrarIngreso() {
    // Validar que todos los campos del titular estén completos
    if (
      !this.cNombres?.trim() ||
      !this.cApellidos?.trim() ||
      !this.cNroDocumento?.trim() ||
      !this.cCorreo?.trim() ||
      !this.cCelular?.trim()
    ) {
      this.toaster.warning('Recepción', 'Complete todos los campos del titular.');
      return;
    }

    // Verificar que todas las habitaciones tengan al menos un huésped
    const habitacionesSinHuespedes = this.lstHabitacionEstancia.some(
      (habitacion: any) =>
        !habitacion.lstHuespedes || habitacion.lstHuespedes.length === 0
    );

    if (habitacionesSinHuespedes) {
      this.toaster.warning('Recepción', 'Cada habitación debe tener al menos un huésped.');
      return;
    }

    // Crear la entidad Estancia
    const estancia = new EstanciaEntity();
    estancia.dFechaCheckIn = this.dpCheckIn;
    estancia.nTotalHabitaciones = this.lstHabitacionEstancia.length || 0;
    estancia.nEstado = 2;
    estancia.dFechaReservaCheckOut = this.dpCheckOut;
    estancia.lstPagos = this.lstPagos || [];

    // Inicializar listas para habitaciones y huéspedes
    const lstEstanciaHabitacion: EstanciaHabitacionEntity[] = [];

    this.lstHabitacionEstancia.forEach((habitacion) => {
      const nuevaHabitacion = new EstanciaHabitacionEntity();
      nuevaHabitacion.habitacion_id = habitacion.habitacion_id;
      nuevaHabitacion.nTotalHuespedesHabitacion =
        habitacion.lstHuespedes?.length || 0;
      nuevaHabitacion.nPrecioEstanciaHabitacion =
        habitacion.nPrecioEstanciaHabitacion;

      nuevaHabitacion.nNroHabitacion = habitacion.nNroHabitacion;
      // Crear lista de huéspedes para cada habitación
      const lstEstanciaHabitacionHuesped: EstanciaHabitacionHuespedEntity[] = [];
      habitacion.lstHuespedes?.forEach((huesped) => {
        const nuevoHuesped = new EstanciaHabitacionHuespedEntity();
        nuevoHuesped.huesped_id = huesped.huesped_id;
        lstEstanciaHabitacionHuesped.push(nuevoHuesped);
      });

      nuevaHabitacion.lstEstanciaHabitacionHuesped = lstEstanciaHabitacionHuesped;
      lstEstanciaHabitacion.push(nuevaHabitacion);
    });

    estancia.lstEstanciaHabitacion = lstEstanciaHabitacion;

    // Agregar titular a la estancia
    estancia.huespedTitular = {
      cNombres: this.cNombres,
      cApellidos: this.cApellidos,
      cCorreo: this.cCorreo,
      nTipoDocumento: this.nTipoDocumento,
      cNroDocumento: this.cNroDocumento,
      cNroCelular: this.cCelular,
      pais_id: this.pais_id,
    };

    let lstHuespedes: HuespedEntity[] = [];

    lstEstanciaHabitacion.forEach(element => {
      if (element.lstEstanciaHabitacionHuesped) {
        const huespedesActivos = element.lstEstanciaHabitacionHuesped.map(huesped => ({
          id: huesped.id
        }));
        lstHuespedes.push(...huespedesActivos);
      }
    });

    this.lstHuespedesTodos = lstHuespedes;

    const cNrosHabitaciones = lstEstanciaHabitacion

      .map(element => element.nNroHabitacion)
      .join(', ');

    const nTotalPagado = this.lstPagos.reduce(
      (total, pago) => total + (parseFloat(pago.nMontoPagado?.toString() || "0") || 0),
      0
    );
    estancia.cNroHabitacion = cNrosHabitaciones || '';
    estancia.nNroHuespedes = this.lstHuespedesTodos.length || 0;
    estancia.nMontoPagar = this.nTotalAPagar || 0;
    estancia.nMontoPagado = nTotalPagado || 0;
    estancia.usuarioResponsable_id = this._auth.user.id || 0;


    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Registrar Ingreso",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.PostRegistrarIngreso(estancia).subscribe(
          (response) => {
            // Si el registro fue exitoso
            if (response.success) {
              this.toaster.success('Recepción', 'Ingreso registrado exitosamente.');
              this.dialogRef.close(true);
            } else {
              this.toaster.error('Recepción', 'Error al registrar el ingreso.');
            }
          },
          (error) => {
            this.toaster.error('Recepción', 'Ocurrió un error al registrar el ingreso.');

          }
        );
      }
    });

  }


  BotonAgregarHuesped(HabitacionEstancia: EstanciaHabitacionEntity) {


    const dialogRef = this._dialog.open(AddHuespedComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        HabitacionEstancia: HabitacionEstancia,
      },
    });

    dialogRef.afterClosed().subscribe((result: HuespedEntity) => {
      if (result) {


        // Validar si el huésped ya está registrado en la misma habitación
        const isHuespedExist = HabitacionEstancia.lstHuespedes?.some(
          (huesped) => huesped.cNroDocumento === result.cNroDocumento
        );

        if (isHuespedExist) {
          this.toaster.warning(
            'Recepción',
            'El huésped ya fue registrado para esta habitación.'
          );
          return; // No agregar al listado
        }

        // Validar si el huésped está registrado en otra habitación
        const isHuespedInOtherRoom = this.verificarHuespedEnOtraHabitacion(
          result.cNroDocumento || ''
        );

        if (isHuespedInOtherRoom) {
          this.toaster.warning(
            'Recepción',
            'El huésped ya está registrado para otra habitación.'
          );
          return; // No agregar al listado
        }

        // Agregar huésped a la lista
        const estanciaHuesped = new EstanciaHabitacionHuespedEntity();
        estanciaHuesped.huesped_id = result.id;
        estanciaHuesped.cNombres = result.cNombres;
        estanciaHuesped.cApellidos = result.cApellidos;
        estanciaHuesped.cNroDocumento = result.cNroDocumento;
        estanciaHuesped.cNroCelular = result.cNroCelular;

        HabitacionEstancia.lstHuespedes = [
          ...(HabitacionEstancia.lstHuespedes || []),
          estanciaHuesped,
        ];


        this.cdr.detectChanges();

      }
    });
  }

  verificarHuespedEnOtraHabitacion(cNroDocumento: string): boolean {
    // Recorremos todas las habitaciones para buscar al huésped
    return this.lstHabitacionEstancia.some((habitacion) =>
      habitacion.lstHuespedes?.some(
        (huesped) => huesped.cNroDocumento === cNroDocumento
      )
    );
  }



  BotonAgregarHabitacion() {

    const habitacionesOcupadas = new Set(this.lstHabitacionEstancia.map(e => e.habitacion_id));


    const dialogRef = this._dialog.open(AddHabitacionComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        lstNivelesDisponibles: this.lstNivelesDisponibles,
        lstHabitacionEstancia: this.lstHabitacionEstancia,
        dpCheckIn: this.dpCheckIn,
        dpCheckOut: this.dpCheckOut,
        nTotalNochesReserva: this.nTotalNochesReserva,
        habitacionesOcupadas: habitacionesOcupadas,
      },
    });

    dialogRef.afterClosed().subscribe((result: HabitacionEntity) => {
      if (result) {
        this.BuscarHabitacion(result.id || 0, this.dpCheckIn, this.dpCheckOut);
      }
    });
  }

  BotonRemoverHabitacion(HabitacionEstancia: EstanciaHabitacionEntity) {

    if (this.lstHabitacionEstancia.length == 1) {
      this.toaster.warning('Recepción', 'No se puede eliminar la única habitación.');
      return;
    }

    const index = this.lstHabitacionEstancia.indexOf(HabitacionEstancia);
    if (index > -1) {
      this.lstHabitacionEstancia.splice(index, 1);
      this.calcularTotal();
    }
  }

  BotonRemoverHuesped(HuespedEstancia: EstanciaHabitacionHuespedEntity, HabitacionEstancia: EstanciaHabitacionEntity) {

    const index = HabitacionEstancia.lstHuespedes?.indexOf(HuespedEstancia);

    if (index !== undefined && index > -1) {
      HabitacionEstancia.lstHuespedes?.splice(index, 1);
    }


  }

  BotonRemoverPago(pago: PagoEntity) {
    this.lstPagos = this.lstPagos.filter(x => x != pago);



  }

  BotonAgregarPago() {
    const dialogRef = this._dialog.open(
      AddPagoRecepcionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia_id: 0,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.lstPagos.push({ ...result });
        /* this.ObtenerEstanciaPorId(this.estancia_id); */
      }

    });
  }

  BotonVerDetallePago(pago: PagoEntity) {
    const dialogRef = this._dialog.open(
      DetallePagoComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          estancia_id: 0,
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
