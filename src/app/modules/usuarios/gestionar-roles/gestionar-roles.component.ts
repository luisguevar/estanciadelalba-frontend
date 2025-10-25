import { ChangeDetectorRef, Component } from '@angular/core';
import { RolEntity, UserEntity } from 'src/app/models/UsuarioEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUsuarioComponent } from '../add-edit-usuario/add-edit-usuario.component';
import { AddEditRolComponent } from '../add-edit-rol/add-edit-rol.component';
import { AuthService } from '../../auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestionar-roles',
  templateUrl: './gestionar-roles.component.html',
  styleUrls: ['./gestionar-roles.component.scss']
})
export class GestionarRolesComponent {
  isLoading$: any;
  lstRoles: RolEntity[] = [];
  rolesPagina: any[] = [];

  // Parámetros de paginación
  paginaActual: number = 1;
  totalPaginas: number = 0;
  registrosPorPagina: number = 5;
  opcionesPorPagina: number[] = [5, 10, 20, 50];
  paginas: number[] = [];
  bPermisoEdicion: boolean = false;
  bPermisoEliminacion: boolean = false;
  constructor(
    public _service: SvGeneralService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {

    this.LoadPersona();
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.BotonListarRoles();
  }

  LoadPersona() {
    const usuario = new UserEntity();
    usuario.id = this.authService.user?.id;
    usuario.link = "/usuarios/listar-roles";
    this._service.PostPermisosPorUsuarioModulo(usuario).subscribe((resp: any) => {


      if (resp.success) {
        this.bPermisoEdicion = resp.bPermisoEdicion;
        this.bPermisoEliminacion = resp.bPermisoEliminacion;
      } else {
        this.router.navigate(['/menu-inicio/lista-opciones']);
      }
    });
  }

  searchText: string = '';
  lstRolesFiltrados: UserEntity[] = [];

  BotonListarRoles() {
    this._service.GetRoles().subscribe((resp: any) => {
      this.lstRoles = resp.roles || [];
      this.lstRolesFiltrados = [...this.lstRoles]; // Copia inicial
      this.calcularPaginacion();
    });
  }

  filtrarRoles() {
    const texto = this.searchText.toLowerCase().trim();

    this.lstRolesFiltrados = this.lstRoles.filter(rol =>
      rol.cNombreRol?.toLowerCase().includes(texto)
    );

    this.paginaActual = 1; // reset a la primera página
    this.calcularPaginacion();
  }


  calcularPaginacion() {
    this.totalPaginas = Math.ceil(this.lstRolesFiltrados.length / this.registrosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.mostrarPagina(this.paginaActual);
  }


  mostrarPagina(pagina: number) {
    const inicio = (pagina - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.rolesPagina = this.lstRolesFiltrados.slice(inicio, fin);
  }


  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.mostrarPagina(this.paginaActual);
    }
  }

  cambiarRegistrosPorPagina(nuevoTamano: number) {
    this.registrosPorPagina = nuevoTamano;
    this.paginaActual = 1;
    this.calcularPaginacion();
  }


  BotonEditarRol(rol: RolEntity) {
    const dialogRef = this._dialog.open(
      AddEditRolComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          rol: rol,
          bEdit: true
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.BotonListarRoles();
        this.cdr.detectChanges();
      }


    });

  }

  BotonAgregarRol() {
    const dialogRef = this._dialog.open(
      AddEditRolComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          /* usuario: usuario, */
          bEdit: false
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.BotonListarRoles();
        this.cdr.detectChanges();
      }


    });

  }

  fechaInicio: string = '';
  fechaFin: string = '';

  aplicarFiltro() {
    this._service.GetRoles(this.fechaInicio, this.fechaFin).subscribe((resp: any) => {
      this.lstRoles = resp.roles || [];
      this.lstRolesFiltrados = [...this.lstRoles];
      this.filtrarRoles();
      this.paginaActual = 1; // reset
      this.calcularPaginacion();
    });
  }

  resetFiltro() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.searchText = ''; // limpiar búsqueda también
    this.BotonListarRoles(); // vuelve a cargar desde el backend
  }
}
