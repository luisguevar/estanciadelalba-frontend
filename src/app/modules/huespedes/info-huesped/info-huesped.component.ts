import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddHabitacionComponent } from '../../tarifa-hotelera/add-habitacion/add-habitacion.component';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { EstanciaEntity, PagoEntity } from 'src/app/models/EstanciaEntity';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-info-huesped',
  templateUrl: './info-huesped.component.html',
  styleUrls: ['./info-huesped.component.scss']
})
export class InfoHuespedComponent {

  isLoading$: any;

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
  lstEstancias: EstanciaEntity[] = [];
  lstReservas: EstanciaEntity[] = [];
  lstPagos: PagoEntity[] = [];
  huesped_id: number = 0;
  paises: any[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InfoHuespedComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService
  ) {
    this.huesped = data.huesped;
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    setTimeout(() => {
      if (this.huesped.id !== undefined) {
        this.ListarPaises();
        this.ObtenerHuespedPorId(this.huesped.id);
      }
    }, 10);

  }

  BotonGuardar() {



    // Validar que todos los campos estén llenos a excepción de pais_id
    if (!this.cNombres || !this.cApellidos || !this.cNroDocumento || !this.cCorreo || !this.cCelular) {
      this.toaster.warning('Huésped', 'Faltan campos por completar.');
      return;
    }
    this.huesped_id = this.huesped.id ?? 0;

    const huesped = new HuespedEntity();
    huesped.id = this.huesped.id;
    huesped.cNombres = this.cNombres;
    huesped.cApellidos = this.cApellidos;
    huesped.nTipoDocumento = this.nTipoDocumento;
    huesped.pais_id = this.pais_id;
    huesped.cNroDocumento = this.cNroDocumento;
    huesped.cCorreo = this.cCorreo;
    huesped.cNroCelular = this.cCelular;


    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Actualizar Huésped",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.UpdateHuesped(this.huesped_id, huesped).subscribe(
          (resp: any) => {
            if (resp.success) {
              this.toaster.success('Huésped', 'Se guardaron los cambios.');
              this.ObtenerHuespedPorId(resp.data.id);
            } else {
              this.toaster.error('Huésped', 'Error al guardar los cambios.');
            }
          },
          (error: any) => {
            if (error.status === 400) {
              this.toaster.error('Huésped', error.error.message);
            } else {
              this.toaster.error('Huésped', 'Error al guardar los cambios.');
            }
          }
        );
      }
    });

  }

  ObtenerHuespedPorId(id: number) {

    this._service.GetHuespedById(id).subscribe((resp: any) => {

      if (resp.success) {
        this.huesped = resp.data;
        this.lstEstancias = resp.lstEstancias || [];  // Asegúrate de que lstEstancias sea un arreglo, incluso si es vacío.
        this.lstReservas = resp.lstReservas || [];
        this.lstPagos = resp.lstPagos || [];

        this.cNombres = this.huesped.cNombres || '';
        this.cApellidos = this.huesped.cApellidos || '';
        this.nTipoDocumento = this.huesped.nTipoDocumento || 0;
        this.cNroDocumento = this.huesped.cNroDocumento || '';
        this.cCorreo = this.huesped.cCorreo || '';
        this.cCelular = this.huesped.cNroCelular || '';
        setTimeout(() => {
          this.pais_id = this.huesped.pais_id || 0;
        }, 10);

      }
    });
  }

  ListarPaises() {
    this._service.GetPaises().subscribe((resp: any) => {

      if (resp.success) {
        this.paises = resp.data;

      }
    });
  }

}
