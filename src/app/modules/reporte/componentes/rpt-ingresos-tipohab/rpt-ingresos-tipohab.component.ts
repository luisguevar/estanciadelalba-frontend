import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { IngresoSalidaEntity, RptHuespedResponsable, RptIngresoTipoHabitacion } from 'src/app/models/ReporteEntity';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-rpt-ingresos-tipohab',
  templateUrl: './rpt-ingresos-tipohab.component.html',
  styleUrls: ['./rpt-ingresos-tipohab.component.scss']
})
export class RptIngresosTipohabComponent {

  isLoading$: any;
  filterNivel: number = 0;
  filterDesde: string;
  filterHasta: string;

  lstRegistros: RptIngresoTipoHabitacion[] = [];
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;
  lstHabitaciones: any;
  bLoading: boolean = false;

  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public _auth: AuthService
  ) {


  }

  habitaciones: string[] = ['1', '2', '3', '4', '5'];
  selectedHabitaciones: string = '';

  updateFilter(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedHabitaciones += this.selectedHabitaciones ? `, ${value}` : value;
    } else {
      this.selectedHabitaciones = this.selectedHabitaciones
        .split(', ')
        .filter(hab => hab !== value)
        .join(', ');
    }
  }
  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.LoadHabitaciones();
    this.LoadData();


  }




  LoadData() {
    this._service
      .GetRptIngresosTipoHabitacion(this.filterNivel, this.filterDesde, this.filterHasta)
      .subscribe({
        next: (resp: any) => {
          if (resp.success) {
            this.lstRegistros = resp.data;
          } else {
            this.toaster.error('Reportes', 'Error al cargar los datos.');
          }
        },
        error: () => {
          this.toaster.error('Reportes', 'Error al cargar los datos.');
        }
      });
  }



  LoadHabitaciones() {
    this._service.GetAllHabitaciones().subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.lstHabitaciones = resp.data;

        }
      },
      error: () => {
        this.toaster.error('Reportes', 'Error al cargar los datos.');
      }
    });
  }

  BotonDescargarPDF() {

    const TipoReporte = 4;
    let usuario = '-'
    let cNivel = '-'

    if (parseInt(this.filterNivel.toString()) === 1) {
      cNivel = 'Tercer Nivel'
    }

    if (parseInt(this.filterNivel.toString()) === 2) {
      cNivel = 'Cuarto Nivel'
    }

    if (parseInt(this.filterNivel.toString()) === 3) {
      cNivel = 'Quinto Nivel'
    }
    const parametros = {
      cNivel: cNivel,
      cDesde: this.filterDesde ? moment(this.filterDesde).format('DD/MM/YYYY') : '-',
      cHasta: this.filterHasta ? moment(this.filterHasta).format('DD/MM/YYYY') : '-',
      cUsuarioResponsable: usuario
    };

    const item = {
      registros: this.lstRegistros,
      parametros: parametros,
      usuarioResponsable_id: this._auth.user.id || 0,
      tipoReporte: TipoReporte
    };

    // Hacer la petición al backend para obtener el PDF
    this._service.PostDescargarPdf(item).subscribe({
      next: (response: Blob) => {
        // Verificar que recibimos un Blob válido
        if (response) {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reporte.pdf'; // Nombre del archivo
          a.click();
          window.URL.revokeObjectURL(url);
        }
      },
      error: (error) => {
        console.error('Error al descargar el PDF:', error);
      }
    });
  }

  BotonExportarExcel() {

    this.bLoading = true;
    const listaExportada = this.lstRegistros.map((registro, index) => ({
      'N°': index + 1,
      'TIPO HABITACÓN': registro.cTipoHabitacion,
      'NIVEL': registro.cNiveles,
      'ESTANCIAS / RESERVAS': registro.nTotalEstancias,
      'INGRESOS': registro.nIngresosTotales,

    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaExportada);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    FileSaver.saveAs(blob, `rpt_ingresos_tipohab_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    this.bLoading = false;
  }
  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}
