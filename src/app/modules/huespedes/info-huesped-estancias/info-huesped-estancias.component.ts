import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';

@Component({
  selector: 'app-info-huesped-estancias',
  templateUrl: './info-huesped-estancias.component.html',
  styleUrls: ['./info-huesped-estancias.component.scss']
})
export class InfoHuespedEstanciasComponent {
  @Input() lstEstancias: EstanciaEntity[] = [];

  DataEstancias: any[] = [];
  pageSize = 3;
  desde: number = 0;
  hasta: number = 3;

  constructor() {
    setTimeout(() => {
      this.DataEstancias = this.lstEstancias;
    }, 10);
  }

  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }


}
