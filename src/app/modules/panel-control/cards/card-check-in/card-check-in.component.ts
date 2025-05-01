import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-check-in',
  templateUrl: './card-check-in.component.html',
  styleUrls: ['./card-check-in.component.scss']
})
export class CardCheckInComponent implements OnInit {

  @Input() nTotalReservas: number = 0;
  @Input() nTotalPendienteCheckIn: number = 0;
  @Input() cPorcentajeCheckInPendiente: string = '';


  @Input() cssClass: string = '';
  @Input() description: string = '';
  @Input() color: string = '';
  @Input() img: string = '';



  constructor() { }

  ngOnInit(): void { }
}
