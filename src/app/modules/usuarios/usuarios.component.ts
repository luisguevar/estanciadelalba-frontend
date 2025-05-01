import { Component } from '@angular/core';
import { SvGeneralService } from '../service/sv-general.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  isLoading$: any;
  lstUsuarios: any = [];

  totalPages: number = 0;
  currentPage: number = 0;

  constructor(
    public _service: SvGeneralService
  ) {


  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.BotonListarUsuarios();

  }


  BotonListarUsuarios() {

    this._service.GetUsuarios().subscribe((resp: any) => {
      console.log(resp);
      this.lstUsuarios = resp.usuarios;

    });
  }

}
