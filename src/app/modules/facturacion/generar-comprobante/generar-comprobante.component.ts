import { ChangeDetectorRef, Component } from '@angular/core';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { BuscarClienteComponent } from '../componentes/buscar-cliente/buscar-cliente.component';
import { AgregarEstanciaComponent } from '../componentes/agregar-estancia/agregar-estancia.component';
import { AuthService } from '../../auth';
import { AlertService } from '../../service/alert.service';
import { AgregarProductoComponent } from '../componentes/agregar-producto/agregar-producto.component';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/models/UsuarioEntity';

@Component({
  selector: 'app-generar-comprobante',
  templateUrl: './generar-comprobante.component.html',
  styleUrls: ['./generar-comprobante.component.scss']
})
export class GenerarComprobanteComponent {
  isLoading$: any;


  nTipoComprobante: any = '0';
  cSerie: string = '';
  cCliente: string = '';
  nTipoDocumento: string = '';
  cClienteNroDocumento: string = '';
  cClienteNombre: string = '';
  cDireccion: string = '';
  cCorreo: string = '';
  lstHabitaciones: any = [];
  cTotalGravada: string = '';
  cTotalIgv: string = '';
  cTotal: string = '';

  bCargando: boolean = false;

  bPermisoEdicion: boolean = false;
  bPermisoEliminacion: boolean = false;


  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public _auth: AuthService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {

    this.LoadPersona();

  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;


  }

  LoadPersona() {
    const usuario = new UserEntity();
    usuario.id = this.authService.user?.id;
    usuario.link = "/facturacion/generar-comprobantes";
    this._service.PostPermisosPorUsuarioModulo(usuario).subscribe((resp: any) => {


      if (resp.success) {
        this.bPermisoEdicion = resp.bPermisoEdicion;
        this.bPermisoEliminacion = resp.bPermisoEliminacion;
      } else {
        this.router.navigate(['/menu-inicio/lista-opciones']);
      }
    });
  }

  onTipoComprobanteChange() {
    if (this.nTipoComprobante === '2') {
      this.cSerie = 'B001'; // Boleta
    } else if (this.nTipoComprobante === '1') {
      this.cSerie = 'F001'; // Factura
    } else {
      this.cSerie = ''; // Si no se selecciona ningún tipo, resetea la serie
    }
  }

  BotonContinuar() {



    if (this.nTipoComprobante === '0') {
      this.toaster.warning('Comprobantes', 'Debe Seleccionar un Tipo Comprobante para continuar.');
      return;
    }

    if (!this.cCliente) {
      this.toaster.warning('Comprobantes', 'Debe Seleccionar un Cliente para continuar.');
      return;
    }

    if (!this.cDireccion) {
      this.toaster.warning('Comprobantes', 'Debe Ingresar una dirección para continuar.');
      return;
    }

    if (!this.cCorreo) {
      this.toaster.warning('Comprobantes', 'Debe Ingresar una correo para continuar.');
      return;
    }

    if (this.lstHabitaciones.length == 0) {
      this.toaster.warning('Comprobantes', 'Debe agregar una estancia para continuar.');
      return;
    }

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Generar Comprobante",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this.bCargando = true;

        const body = {
          nTipoComprobante: this.nTipoComprobante,
          cSerie: this.cSerie,
          nNumero: 5,
          nTipoDocumento: this.nTipoDocumento,
          cClienteNroDocumento: this.cClienteNroDocumento,
          cClienteNombre: this.cClienteNombre,
          cDireccion: this.cDireccion,
          cCorreo: this.cCorreo,
          cTotalGravada: this.cTotalGravada,
          cTotalIgv: this.cTotalIgv,
          cTotal: this.cTotal,
          usuarioResponsable_id: this._auth.user.id || 0,
          lstHabitacion: this.lstHabitaciones
        }


        this._service.PostGenerarComprobante(body).subscribe(
          (resp: any) => {
            console.log(resp);
            if (resp) {
              this.toaster.success('Comprobantes', 'Comprobante Generado con éxito.');

              return;
            }
          },
          (error: any) => {
            console.error(error);
            console.error('Error al generar comprobante', error.error);

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
    });



  }

  BotonBuscarCliente() {
    const dialogRef = this._dialog.open(
      BuscarClienteComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {

        },
      }
    );


    dialogRef.afterClosed().subscribe((result) => {

      if (result) {


        this.cClienteNombre = result.cNombre;
        this.cClienteNroDocumento = result.cNroDocumento;
        this.nTipoDocumento = result.cTipoDocumento;
        const cNombreTipoDocumento = result.cNombreTipoDocumento;
        this.cDireccion = result.cDireccion || '';

        this.cCliente = cNombreTipoDocumento + ': ' + this.cClienteNroDocumento + ' - ' + this.cClienteNombre;
        this.cdr.detectChanges();
      }



    });
  }


  BotonBuscarProdcuto() {

    const nCod = (this.lstHabitaciones?.filter((x: any) => x.cUnidadMedida === 'NIU').length || 0) + 1;


    const dialogRef = this._dialog.open(
      AgregarProductoComponent,
      {
        width: 'auto',
        height: 'auto',
        disableClose: true,
        data: {
          nCod: nCod
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result: ', result);


        // Si result es una lista de habitaciones, agregamos los elementos de la lista a lstHabitaciones
        if (Array.isArray(result)) {
          this.lstHabitaciones.push(...result);
        } else {
          // Si result es un solo elemento, lo agregamos directamente
          this.lstHabitaciones.push(result);
        }

        console.log('lstHabitaciones: ', this.lstHabitaciones);

        const nSumaSubTotal = this.lstHabitaciones.reduce((total: number, habitacion: { cSubTotal: string }) => {
          const cSubTotal = parseFloat(habitacion.cSubTotal) || 0;
          return total + cSubTotal;
        }, 0);

        const nGravada = nSumaSubTotal / 1.18;
        const nIgv = nSumaSubTotal - nGravada;

        this.cTotalGravada = nGravada.toFixed(2);
        this.cTotalIgv = nIgv.toFixed(2);
        this.cTotal = nSumaSubTotal.toFixed(2);




        this.cdr.detectChanges();
      }
    });
  }
  BotonBuscarEstancia() {
    const dialogRef = this._dialog.open(
      AgregarEstanciaComponent,
      {
        width: 'auto',
        height: 'auto',
        disableClose: true,
        data: {},
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result: ', result);

        // Si result es una lista de habitaciones, agregamos los elementos de la lista a lstHabitaciones
        if (Array.isArray(result)) {
          this.lstHabitaciones.push(...result);
        } else {
          // Si result es un solo elemento, lo agregamos directamente
          this.lstHabitaciones.push(result);
        }

        console.log('lstHabitaciones: ', this.lstHabitaciones);

        const nSumaSubTotal = this.lstHabitaciones.reduce((total: number, habitacion: { cSubTotal: string }) => {
          const cSubTotal = parseFloat(habitacion.cSubTotal) || 0;
          return total + cSubTotal;
        }, 0);

        const nGravada = nSumaSubTotal / 1.18;
        const nIgv = nSumaSubTotal - nGravada;

        this.cTotalGravada = nGravada.toFixed(2);
        this.cTotalIgv = nIgv.toFixed(2);
        this.cTotal = nSumaSubTotal.toFixed(2);




        this.cdr.detectChanges();
      }
    });
  }

  recalcularTotales(): void {
    const nSumaSubTotal = this.lstHabitaciones.reduce((total: number, habitacion: { cSubTotal: string }) => {
      const cSubTotal = parseFloat(habitacion.cSubTotal) || 0;
      return total + cSubTotal;
    }, 0);

    const nGravada = nSumaSubTotal / 1.18;
    const nIgv = nSumaSubTotal - nGravada;

    this.cTotalGravada = nGravada.toFixed(2);
    this.cTotalIgv = nIgv.toFixed(2);
    this.cTotal = nSumaSubTotal.toFixed(2);
  }


  BotonRemoverProducto(producto: any) {

  }

  BotonRemoverHabitacion(habitacion: any) {
    // Eliminar la habitación seleccionada
    this.lstHabitaciones = this.lstHabitaciones.filter((x: any) => x !== habitacion);

    // Si la habitación eliminada es de tipo 'NIU', reajustar los códigos
    if (habitacion.cUnidadMedida === 'NIU') {
      const habitacionesNIU = this.lstHabitaciones.filter((x: any) => x.cUnidadMedida === 'NIU');
      habitacionesNIU.forEach((x: any, index: number) => {
        x.cNroHabitacion = `P${(index + 1).toString().padStart(3, '0')}`;
      });
    }

    // Calcular subtotal, gravada e IGV
    const nSumaSubTotal = this.lstHabitaciones.reduce((total: number, h: { cSubTotal: string }) => {
      const cSubTotal = parseFloat(h.cSubTotal) || 0;
      return total + cSubTotal;
    }, 0);

    const nGravada = nSumaSubTotal / 1.18;
    const nIgv = nSumaSubTotal - nGravada;

    this.cTotalGravada = nGravada.toFixed(2);
    this.cTotalIgv = nIgv.toFixed(2);
    this.cTotal = nSumaSubTotal.toFixed(2);
  }

}
