import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HuespedEntity } from 'src/app/models/HuespedEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-huesped',
  templateUrl: './add-huesped.component.html',
  styleUrls: ['./add-huesped.component.scss']
})
export class AddHuespedComponent {

  form: FormGroup;
  lstTipoDocumentos: any[] = [{
    nId: 1,
    cNombre: 'DNI'
  }, {
    nId: 2,
    cNombre: 'C.E.'
  }];
  cFilterNroDocumento: string = '';
  huesped: HuespedEntity = new HuespedEntity();
  paises: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddHuespedComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private _formBuilder: FormBuilder,
  ) {
    this.form = this._formBuilder.group({
      cNombres:       ['', [Validators.required, Validators.minLength(2)]],
      cApellidos:     ['', [Validators.required, Validators.minLength(2)]],
      nTipoDocumento: [0],
      cNroDocumento:  ['', Validators.required],
      cCorreo:        ['', Validators.email],
      pais_id:        [0],
      cCelular:       [''],
    });
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
      if (resp.success) {
        if (resp.huesped && resp.huesped.cNroDocumento && resp.huesped.cNroDocumento.length > 1) {
          this.huesped = resp.huesped;
          this.form.patchValue({
            cNombres:       this.huesped.cNombres       || '',
            cApellidos:     this.huesped.cApellidos     || '',
            nTipoDocumento: this.huesped.nTipoDocumento || 0,
            cNroDocumento:  this.huesped.cNroDocumento  || '',
            cCorreo:        this.huesped.cCorreo        || '',
            pais_id:        this.huesped.pais_id        || 0,
            cCelular:       this.huesped.cNroCelular    || '',
          });
          this.toaster.success('Recepción', 'Huesped encontrado.');
        } else {
          this.toaster.warning('Recepción', 'No se encontró un huesped con ese Nro Documento.');
        }
      }
    });
  }

  BotonAgregar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toaster.warning('Recepción', 'Complete los campos obligatorios para continuar.');
      return;
    }

    const v = this.form.value;

    /* Devolver primero el huesped_id */

    const huesped = new HuespedEntity();
    huesped.id = 0;
    huesped.cNombres = v.cNombres;
    huesped.cApellidos = v.cApellidos;
    huesped.cCorreo = v.cCorreo;
    huesped.nTipoDocumento = v.nTipoDocumento;
    huesped.cNroDocumento = v.cNroDocumento;
    huesped.cNroCelular = v.cCelular;
    huesped.pais_id = v.pais_id;

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
