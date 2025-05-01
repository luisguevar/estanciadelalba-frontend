import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { AlertService } from 'src/app/modules/service/alert.service';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.scss']
})
export class BuscarClienteComponent {
  isLoading$: any;
  cTipoDocumento: string = '0';
  cNroDocumento: string = '';
  cCliente: string = '';
  cDireccion: string = '';
  bReadOnly: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BuscarClienteComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private _dialog: MatDialog,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    public _auth: AuthService
  ) {


  }


  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;


  }

  BotonAgregar() {

    let cNombreTipoDocumento = '';
    if (this.cTipoDocumento == '1') {
      cNombreTipoDocumento = 'DNI';
    } else if (this.cTipoDocumento == '6') {
      cNombreTipoDocumento = 'RUC';
    } else if (this.cTipoDocumento == '6') {
      cNombreTipoDocumento = 'PASAPORTE';
    } else if (this.cTipoDocumento == '-') {
      cNombreTipoDocumento = 'VARIOS';
    } else {

      this.toaster.warning('Buscar Cliente', 'Seleccione un tipo de documento.');
      return;
    }


    if (this.cNroDocumento == '') {
      this.toaster.warning('Buscar Cliente', 'Ingrese un número de documento para continuar.');
      return;
    }
    if (this.cCliente == '') {
      this.toaster.warning('Buscar Cliente', 'Registre o Busque un cliente para continuar.');
      return;
    }

    const cliente = {
      cNombre: this.cCliente,
      cNroDocumento: this.cNroDocumento,
      cTipoDocumento: this.cTipoDocumento,
      cNombreTipoDocumento: cNombreTipoDocumento,
      cDireccion: this.cDireccion || ''
    }

    this.dialogRef.close(cliente);
  }

  BotonLimpiar() {
    this.cTipoDocumento = '0',
      this.cNroDocumento = '';
    this.cCliente = '';
    this.bReadOnly = false;
  }

  BotonBuscar() {
    if (this.cTipoDocumento == '0') {
      this.toaster.warning('Buscar Cliente', 'Seleccione un tipo de documento.');
      return;
    }

    if (this.cNroDocumento == '') {
      this.toaster.warning('Buscar Cliente', 'Ingrese un número de documento para continuar.');
      return;
    }

    if (this.cTipoDocumento === '1') {
      this._service.GetDNI(this.cNroDocumento).pipe(
        catchError(error => {
          this.toaster.warning('Buscar Cliente', 'Hubo un problema al buscar el cliente con el DNI. Registre manualmente.');
          console.error('Error al obtener DNI:', error);
          return of(null); // Regresa un observable vacío o puede ser un valor por defecto
        })
      ).subscribe((resp: any) => {
        if (resp && resp.success) {
          this.bReadOnly = true;
          this.cCliente = resp.apellidoPaterno + ' ' + resp.apellidoMaterno + ' ' + resp.nombres;
        } else {
          this.toaster.warning('Buscar Cliente', 'Cliente no encontrado, registre manualmente.');
          return;
        }
      });
    } else if (this.cTipoDocumento === '6') {
      this._service.GetRUC(this.cNroDocumento).pipe(
        catchError(error => {
          this.toaster.warning('Buscar Cliente', 'Hubo un problema al buscar el cliente con el RUC. Registre manualmente.');
          console.error('Error al obtener RUC:', error);
          return of(null); // Regresa un observable vacío o puede ser un valor por defecto
        })
      ).subscribe((resp: any) => {
        if (resp && resp.estado === 'ACTIVO') {
          this.bReadOnly = true;
          this.cCliente = resp.razonSocial;
          this.cDireccion = resp.direccion || '';
        } else {
          this.toaster.warning('Buscar Cliente', 'Cliente no encontrado, registre manualmente.');
          return;
        }
      });
    } else {
      this.toaster.warning('Buscar Cliente', 'Cliente no encontrado, registre manualmente.');
      return;
    }
  }
}
