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
};

@Component({
  selector: 'app-grafico-ingresos',
  templateUrl: './grafico-ingresos.component.html',
  styleUrls: ['./grafico-ingresos.component.scss']
})
export class GraficoIngresosComponent {
  @Input() chartData: { prices: number[]; dates: string[] };
  @Input() chartData2: { prices: number[]; dates: string[] };
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: ChartOptions;


  ngOnInit() {

    this.chartOptions = {
      series: [
        {
          name: "Montos Pagados",
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
      title: {
        text: "Ingresos",
        align: "left"
      },
      subtitle: {
        text: "Resumen de Pagos en el sistema",
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
