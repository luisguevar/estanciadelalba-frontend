import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-huesped',
  templateUrl: './add-huesped.component.html',
  styleUrls: ['./add-huesped.component.scss']
})
export class AddHuespedComponent {

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
  cFilterNroDocumento: string = '';
  huesped: HuespedEntity = new HuespedEntity();
  huesped_id: number = 0;
  paises: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddHuespedComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private _formBuilder: FormBuilder,
  ) {
    this.ListarPaises();
  }

  ListarPaises() {
    this._service.GetPaises().subscribe((resp: any) => {
      console.log(resp);
      if (resp.success) {
        this.paises = resp.data;

      }
    });
  }

  

  BuscarHuesped() {
    this._service.GetBuscadorHuesped(this.cFilterNroDocumento).subscribe((resp: any) => {
      console.log(resp);
      if (resp.success) {

        if (resp.huesped && resp.huesped.cNroDocumento  &&  resp.huesped.cNroDocumento.length > 1) {

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

  BotonAgregar() {

    if (
      !this.cNombres ||
      !this.cApellidos ||
      !this.cNroDocumento

    ) {
      this.toaster.warning('Recepción', 'Complete los campos obligatorios para continuar.')
      return;

    }

    /* Devolver primero el huesped_id */

    const huesped = new HuespedEntity();
    huesped.id = 0;
    huesped.cNombres = this.cNombres;
    huesped.cApellidos = this.cApellidos;
    huesped.cCorreo = this.cCorreo;
    huesped.nTipoDocumento = this.nTipoDocumento;
    huesped.cNroDocumento = this.cNroDocumento;
    huesped.cNroCelular = this.cCelular;
    huesped.pais_id = this.pais_id;

    this._service.PostValidarHuesped(huesped).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.success) {
          const huespedCompleto = resp.huesped;
          console.log('Datos del huésped:', huespedCompleto);

         /*  this.toaster.success('Agregar Huésped', `Huésped procesado exitosamente: ${huespedCompleto.cNombres} ${huespedCompleto.cApellidos}`); */
          this.dialogRef.close(huespedCompleto);

        }
      },
      (error: any) => {
        console.error(error);
        this.toaster.error('Agregar Huésped', 'Hubo un problema con el huésped.');
      }
    );

 

  }

}
