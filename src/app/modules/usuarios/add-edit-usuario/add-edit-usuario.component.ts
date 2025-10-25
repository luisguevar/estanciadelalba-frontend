import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { AlertService } from '../../service/alert.service';
import { RolEntity, UserEntity } from 'src/app/models/UsuarioEntity';

@Component({
  selector: 'app-add-edit-usuario',
  templateUrl: './add-edit-usuario.component.html',
  styleUrls: ['./add-edit-usuario.component.scss']
})
export class AddEditUsuarioComponent implements OnInit {

  usuario: UserEntity;
  bEdit: boolean = false;
  isLoading$: any;

  cNombres: string = '';
  cCorreo: string = '';
  cNroDocumento: string = '';
  rol_id: number = 0;
  estado: number = -1;

  lstRoles: RolEntity[] = [
  ]


  lstEstados: any[] = [
    { id: 1, cNombre: "Activo" },
    { id: 0, cNombre: "Inactivo" }
  ];

  bPermisoEdicion: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditUsuarioComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
    private alertService: AlertService
  ) {

    this.bEdit = data.bEdit;
    if (this.bEdit) {
      this.usuario = data.usuario;
      this.cNombres = this.usuario.name || '';
      this.cCorreo = this.usuario.email || '';
      this.cNroDocumento = this.usuario.dni || '';
      this.rol_id = this.usuario.rol_id || 0;
      this.estado = this.usuario.estado || -1;
      /*   console.log('usuario: ', this.usuario); */

    }

    this.bPermisoEdicion = data.bPermisoEdicion;


  }
  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.BotonListarRoles();
  }

  BotonGuardar() {
    if (!this.cNombres || !this.cCorreo || !this.cNroDocumento || !this.rol_id || this.estado === -1) {
      this.toaster.error('Debe completar todos los campos requeridos', 'Error');
      return;
    }

    let usuario_id: number = 0;


    if (this.usuario && this.usuario.id) {
      usuario_id = this.usuario.id;
    }

    const nuevoUsuario: UserEntity = {
      id: usuario_id,
      name: this.cNombres,
      email: this.cCorreo,
      dni: this.cNroDocumento,
      rol_id: this.rol_id,
      estado: this.estado,
      password: this.cNroDocumento
    };

    this.alertService.showConfirmationAlert(
      "¿Está seguro?",
      "Registrar Usuario",
      "Confirmar",
      "question"
    ).then((isConfirmed) => {
      if (isConfirmed) {
        const peticion = this.bEdit
          ? this._service.PostUsuarioUpdate(nuevoUsuario)
          : this._service.PostUsuarioRegister(nuevoUsuario);

        peticion.subscribe({
          next: (resp) => {
            if (resp.success) {
              this.toaster.success(
                this.bEdit
                  ? 'Usuario actualizado correctamente'
                  : 'Usuario registrado correctamente',
                'Éxito'
              );
              this.dialogRef.close(true);
            } else {
              this.toaster.error('Ocurrió un error en la operación', 'Error');
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



  BotonListarRoles() {
    this._service.GetRoles().subscribe((resp: any) => {
      this.lstRoles = resp.roles || [];

    });
  }

}
