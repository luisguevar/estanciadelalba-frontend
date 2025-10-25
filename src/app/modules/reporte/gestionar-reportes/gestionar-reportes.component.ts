import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { UserEntity } from 'src/app/models/UsuarioEntity';
import { AuthService } from '../../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-reportes',
  templateUrl: './gestionar-reportes.component.html',
  styleUrls: ['./gestionar-reportes.component.scss']
})
export class GestionarReportesComponent {
  isLoading$: any;

  lstEstancias: EstanciaEntity[] = [];
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;

  filterNombres: string = '';
  filterNroHabitacion: string = '';
  filterCheckIn: string = ''; // Para almacenar la fecha de check-in
  filterCheckOut: string = ''; // Para almacenar la fecha de check-out
  nTipoReporte: any = '0';


  bPermisoEdicion: boolean = false;
  bPermisoEliminacion: boolean = false;
  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,

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
    usuario.link = "/reportes/gestionar-reportes";
    this._service.PostPermisosPorUsuarioModulo(usuario).subscribe((resp: any) => {


      if (resp.success) {
        this.bPermisoEdicion = resp.bPermisoEdicion;
        this.bPermisoEliminacion = resp.bPermisoEliminacion;
      } else {
        this.router.navigate(['/menu-inicio/lista-opciones']);
      }
    });
  }
}
