import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-check-out',
  templateUrl: './card-check-out.component.html',
  styleUrls: ['./card-check-out.component.scss']
})
export class CardCheckOutComponent {
  @Input() nTotalEstanciasConCheckOut: number = 0;
  @Input() nTotalEstanciasPorCheckOut: number = 0;
  @Input() cPorcentajeCheckOutPendiente: string = '';


  @Input() cssClass: string = '';
  @Input() description: string = '';
  @Input() color: string = '';
  @Input() img: string = '';



  constructor() { }

  ngOnInit(): void { }
}
