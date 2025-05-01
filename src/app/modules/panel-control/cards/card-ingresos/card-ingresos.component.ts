import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-ingresos',
  templateUrl: './card-ingresos.component.html',
  styleUrls: ['./card-ingresos.component.scss']
})
export class CardIngresosComponent implements OnInit {
  @Input() porcentaje: string = '';
  @Input() nTotalPagosCompletos: string = '';
  @Input() nEstanciasPendientesPago: number = 0;
  
  @Input() cssClass: string = '';
  @Input() description: string = '';
  @Input() color: string = '';
  @Input() img: string = '';



  constructor() { }

  ngOnInit(): void {
    console.log('Porcentaje:', this.porcentaje)
  }
}
