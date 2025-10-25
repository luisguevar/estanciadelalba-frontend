import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../../service/sv-general.service';
import { AuthService } from '../../auth';
interface SubMenu {
  title: string;
  link: string;
}

interface Menu {
  icon: string;
  title: string;
  link?: string; // link directo si aplica
  items?: SubMenu[]; // subsecciones
}

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})

export class OpcionesComponent {

  isLoading$: any;
  menuItems: Menu[] = [];
  usuario_id: number = 0;
  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {

    this.usuario_id = this.authService.user?.rol_id;
    this.GetMenusItems(this.usuario_id);
  }


  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

  }

  GetMenusItems(rol_id: number): void {
    this._service.GetMenuItemsIdRol(rol_id).subscribe({
      next: (resp: any) => {
        this.menuItems = resp?.menuItems ?? [];
      },
      error: (err) => {
        console.error("Error obteniendo menús", err);
        this.menuItems = []; // fallback vacío
      }
    });
  }


}
