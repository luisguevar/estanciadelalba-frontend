import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EstanciaEntity } from 'src/app/models/EstanciaEntity';

@Component({
  selector: 'app-info-huesped-reservas',
  templateUrl: './info-huesped-reservas.component.html',
  styleUrls: ['./info-huesped-reservas.component.scss']
})
export class InfoHuespedReservasComponent {
  @Input() lstReservas: EstanciaEntity[] = [];

  DataReservas: EstanciaEntity[] = [];
  pageSize = 3;
  desde: number = 0;
  hasta: number = 3;

  constructor() {
    setTimeout(() => {
      this.DataReservas = this.lstReservas;
    }, 10);
  }

  cambiarPagina(e: PageEvent) {
    
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}
