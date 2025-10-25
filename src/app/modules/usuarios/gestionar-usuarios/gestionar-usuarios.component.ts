import { ChangeDetectorRef, Component } from '@angular/core';
import { UserEntity } from 'src/app/models/UsuarioEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUsuarioComponent } from '../add-edit-usuario/add-edit-usuario.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss']
})
export class GestionarUsuariosComponent {

  isLoading$: any;
  lstUsuarios: UserEntity[] = [];
  usuariosPagina: any[] = [];

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
    public toaster: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.LoadPersona();
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.BotonListarUsuarios();
  }

  searchText: string = '';
  lstUsuariosFiltrados: UserEntity[] = [];

  LoadPersona() {
    const usuario = new UserEntity();
    usuario.id = this.authService.user?.id;
    usuario.link = "/usuarios/listar-usuarios";
    this._service.PostPermisosPorUsuarioModulo(usuario).subscribe((resp: any) => {


      if (resp.success) {
        this.bPermisoEdicion = resp.bPermisoEdicion;
        this.bPermisoEliminacion = resp.bPermisoEliminacion;
      } else {
        this.router.navigate(['/menu-inicio/lista-opciones']);
      }
    });
  }

  BotonListarUsuarios() {
    this._service.GetUsuarios().subscribe((resp: any) => {
      this.lstUsuarios = resp.usuarios || [];
      this.lstUsuariosFiltrados = [...this.lstUsuarios]; // Copia inicial
      this.calcularPaginacion();
    });
  }

  filtrarUsuarios() {
    const texto = this.searchText.toLowerCase().trim();

    this.lstUsuariosFiltrados = this.lstUsuarios.filter(usuario =>
      usuario.name?.toLowerCase().includes(texto) ||
      usuario.email?.toLowerCase().includes(texto) ||
      usuario.dni?.toLowerCase().includes(texto)
    );

    this.paginaActual = 1; // reset a la primera página
    this.calcularPaginacion();
  }


  calcularPaginacion() {
    this.totalPaginas = Math.ceil(this.lstUsuariosFiltrados.length / this.registrosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.mostrarPagina(this.paginaActual);
  }


  mostrarPagina(pagina: number) {
    const inicio = (pagina - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.usuariosPagina = this.lstUsuariosFiltrados.slice(inicio, fin);
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


  BotonEditarUsuario(usuario: UserEntity) {
    const dialogRef = this._dialog.open(
      AddEditUsuarioComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          usuario: usuario,
          bEdit: true,
          bPermisoEdicion: this.bPermisoEdicion,
          bPermisoEliminacion: this.bPermisoEliminacion
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.BotonListarUsuarios();
        this.cdr.detectChanges();
      }


    });

  }

  BotonAgregarUsuario() {
    const dialogRef = this._dialog.open(
      AddEditUsuarioComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          /* usuario: usuario, */
          bEdit: false,
          bPermisoEdicion: this.bPermisoEdicion
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.BotonListarUsuarios();
        this.cdr.detectChanges();
      }


    });

  }

  fechaInicio: string = '';
  fechaFin: string = '';

  aplicarFiltro() {
    this._service.GetUsuarios(this.fechaInicio, this.fechaFin).subscribe((resp: any) => {
      this.lstUsuarios = resp.usuarios || [];
      this.lstUsuariosFiltrados = [...this.lstUsuarios];
      this.filtrarUsuarios();
      this.paginaActual = 1; // reset
      this.calcularPaginacion();
    });
  }

  resetFiltro() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.searchText = ''; // limpiar búsqueda también
    this.BotonListarUsuarios(); // vuelve a cargar desde el backend
  }

}
