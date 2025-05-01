import { Component, Input, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  colors: string[];
};
@Component({
  selector: 'app-grafico-reservas',
  templateUrl: './grafico-reservas.component.html',
  styleUrls: ['./grafico-reservas.component.scss']
})
export class GraficoReservasComponent {
  @Input() chartData: { prices: number[]; dates: string[] };
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;


  ngOnInit() {

    this.chartOptions = {
      series: [
        {
          name: "N° Reservas",
          data: this.chartData?.prices?.map(price => price !== undefined ? price : 0) || []
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        },
        locales: [{
          name: 'es',
          options: {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            shortDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            toolbar: {
              exportToSVG: 'Exportar SVG',
              exportToPNG: 'Exportar PNG',
              exportToCSV: 'Exportar CSV',
              menu: 'Menú',
              selection: 'Seleccionar',
              selectionZoom: 'Seleccionar Zoom',
              zoomIn: 'Acercar',
              zoomOut: 'Alejar',
              pan: 'Mover',
              reset: 'Restablecer Zoom'
            }
          }
        }],
        defaultLocale: 'es'
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      colors: ['#ff993b'],
      title: {
        text: "Reservas",
        align: "left"
      },
      subtitle: {
        text: "Resumen de reservas en el sistema",
        align: "left"
      },
      labels: this.chartData?.dates?.filter(date => date !== undefined) || [],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }

    };
  }
}
