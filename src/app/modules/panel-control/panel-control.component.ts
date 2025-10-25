import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';



import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SvGeneralService } from '../service/sv-general.service';
/* import { chartData } from './data'; */
import { EstanciaEntity, PagoEntity, resumenCheckInEntity, resumenCheckOutEntity } from 'src/app/models/EstanciaEntity';
import { sparklineData, chartData1, chartData2, chartData3, chartData4, chartData5, chartData6 } from './data';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexFill, ApexTooltip } from 'ng-apexcharts';
import * as moment from 'moment-timezone';
import { UserEntity } from 'src/app/models/UsuarioEntity';
import { AuthService } from '../auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss']
})
export class PanelControlComponent implements OnInit {

  isLoading$: any;
  /*   data: any = chartData; */

  /*   public chartOptions: ChartOptions; */
  /*   chartData = chartData; */
  chartPagos: any = null;
  chartReservas: any = null;

  lstPagos: PagoEntity[] = [];
  lstReservas: EstanciaEntity[] = [];
  resumenIngresos: PagoEntity;
  cPorcentajePendiente: string;
  nTotalPagosCompletos: string;
  nEstanciasPendientesPago: number;
  resumenCheckIn: resumenCheckInEntity;
  nTotalReservas: number;
  nTotalPendienteCheckIn: number;
  cPorcentajeCheckInPendiente: string;

  nTotalEstanciasConCheckOut: number;
  nTotalEstanciasPorCheckOut: number;
  cPorcentajeCheckOutPendiente: string;
  resumenCheckOut: resumenCheckOutEntity;

  dpFechaCheckIn: string = '';
  dpFechaCheckOut: string = '';



  dpFechaIni: string = '';
  dpFechaFin: string = '';
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

  LoadPersona() {
    const usuario = new UserEntity();
    usuario.id = this.authService.user?.id;
    usuario.link = "/panel-control";
    this._service.PostPermisosPorUsuarioModulo(usuario).subscribe((resp: any) => {


      if (resp.success) {
        this.bPermisoEdicion = resp.bPermisoEdicion;
        this.bPermisoEliminacion = resp.bPermisoEliminacion;
      } else {
        this.router.navigate(['/menu-inicio/lista-opciones']);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;

    const ahoraPeru = moment().tz('America/Lima');

    // Fecha de inicio: un mes antes
    this.dpFechaIni = ahoraPeru.clone().subtract(1, 'month').format('YYYY-MM-DDTHH:mm');

    // Fecha de fin: hoy
    this.dpFechaFin = ahoraPeru.format('YYYY-MM-DDTHH:mm');

    this.BotonListarPanel();
  }



  BotonListarPanel() {

    this.chartPagos = null;
    this.chartReservas = null;
    this._service.GetPanel(this.dpFechaIni, this.dpFechaFin).subscribe((resp: any) => {


      this.lstPagos = resp.data.pagos || [];
      this.lstReservas = resp.data.reservas || [];
      this.resumenIngresos = resp.data.resumenIngresos || [];
      this.resumenCheckIn = resp.data.resumenCheckIn || [];
      this.resumenCheckOut = resp.data.resumenCheckOut || [];


      if (Array.isArray(this.lstPagos)) {
        this.chartPagos = {
          prices: this.lstPagos.map(pago => pago.nMontoPagado).filter(pago => pago !== undefined) as number[],
          dates: this.lstPagos.map(pago => pago.dFechaPago).filter(fecha => fecha !== undefined) as string[],
        };
      }

      if (Array.isArray(this.lstReservas)) {
        this.chartReservas = {
          prices: this.lstReservas.map(reserva => reserva.nNumerReservas).filter(nNumerReservas => nNumerReservas !== undefined) as number[],
          dates: this.lstReservas.map(reserva => reserva.dFechaReserva).filter(dFechaReserva => dFechaReserva !== undefined) as string[],
        };
      }

      if (this.resumenIngresos) {
        this.cPorcentajePendiente = this.resumenIngresos.cPorcentajePendiente || '';
        this.nTotalPagosCompletos = this.resumenIngresos.nTotalPagosCompletos || '';
        this.nEstanciasPendientesPago = this.resumenIngresos.nEstanciasPendientesPago || 0;


      }

      if (this.resumenCheckIn) {
        this.nTotalReservas = this.resumenCheckIn.nTotalReservas || 0;
        this.nTotalPendienteCheckIn = this.resumenCheckIn.nTotalPendienteCheckIn || 0;
        this.cPorcentajeCheckInPendiente = this.resumenCheckIn.cPorcentajeCheckInPendiente || '';


      }


      if (this.resumenCheckOut) {
        this.nTotalEstanciasConCheckOut = this.resumenCheckOut.nTotalEstanciasConCheckOut || 0;
        this.nTotalEstanciasPorCheckOut = this.resumenCheckOut.nTotalEstanciasPorCheckOut || 0;
        this.cPorcentajeCheckOutPendiente = this.resumenCheckOut.cPorcentajeCheckOutPendiente || '';


      }

      this.cdr.markForCheck();


    });
  }


  LoadData() {

  }

  resetFiltro() {
    const ahoraPeru = moment().tz('America/Lima');

    // Fecha de inicio: un mes antes
    this.dpFechaIni = ahoraPeru.clone().subtract(1, 'month').format('YYYY-MM-DDTHH:mm');

    // Fecha de fin: hoy
    this.dpFechaFin = ahoraPeru.format('YYYY-MM-DDTHH:mm');

    this.BotonListarPanel();
  }

  aplicarFiltro() {

  }

}
