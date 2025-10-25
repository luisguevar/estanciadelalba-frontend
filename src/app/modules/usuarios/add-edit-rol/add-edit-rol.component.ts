import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { AlertService } from '../../service/alert.service';
import { RolEntity } from 'src/app/models/UsuarioEntity';

@Component({
  selector: 'app-add-edit-rol',
  templateUrl: './add-edit-rol.component.html',
  styleUrls: ['./add-edit-rol.component.scss']
})
export class AddEditRolComponent {

  rol: RolEntity;
  bEdit: boolean = false;
  isLoading$: any;

  cNombreRol: string = '';
  nEstado: number = -1;

  lstEstados: any[] = [
    { id: 1, cNombre: "Activo" },
    { id: 0, cNombre: "Inactivo" }
  ];



  lstMenu: any;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditRolComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService
  ) {

    this.bEdit = data.bEdit;
    if (this.bEdit) {
      this.rol = data.rol;
      this.cNombreRol = this.rol.cNombreRol || '';
      this.nEstado = this.rol.nEstado || -1;
      console.log('rol: ', this.rol);

    }


  }
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading$ = this._service.isLoading$;
      this.ObtenerRolPorId(this.rol.id || 0);
    }, 10);
  }

  BotonGuardar() {
    if (!this.cNombreRol || this.nEstado === null || this.nEstado === undefined) {
      this.toaster.error('Debe completar todos los campos requeridos', 'Error');
      return;
    }

    const rol = new RolEntity();
    rol.cNombreRol = this.cNombreRol;
    rol.nEstado = this.nEstado;

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Registrar Rol",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        this._service.PostRol(rol).subscribe({
          next: (resp) => {
            if (resp.success) {
              this.toaster.success('Rol registrado correctamente', 'Éxito');
              this.dialogRef.close(true);
            } else {
              this.toaster.error('No se pudo registrar el rol', 'Error');
            }
          },
          error: (err) => {
            console.error(err);
            this.toaster.error('Error en el servidor', 'Error');
          }
        });
      }
    });



  }




  BotonActualizar() {
    /* console.log(' this.lstMenu: ', this.lstMenu); */
    const rol = new RolEntity();
    rol.id = this.rol.id;
    rol.cNombreRol = this.cNombreRol;
    rol.nEstado = this.nEstado;
    rol.lstMenu = this.lstMenu;

    this._service.UpdateRol(rol).subscribe((resp: any) => {

      console.log('Resp: ', resp);

      if (resp.success) {
        this.toaster.success('Rol', 'Se guardaron los cambios.');
        if (this.rol.id) {
          this.ObtenerRolPorId(this.rol.id);
        }

      } else {
        this.toaster.error('Rol', 'Error al guardar los cambios.');
      }
    },
      (error: any) => {
        if (error.status === 400) {
          this.toaster.error('Rol', error.error.message);
        } else {
          this.toaster.error('Rol', 'Error al guardar los cambios.');
        }
      });


  }

  ObtenerRolPorId(id: number) {

    this._service.GetRolById(id).subscribe((resp: any) => {

      console.log('Resp: ', resp);
      this.lstMenu = resp.lstMenu;

    });
  }

}
