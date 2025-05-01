import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { IngresoSalidaEntity, RptHuespedResponsable } from 'src/app/models/ReporteEntity';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';
declare var $: any; // Para usar jQuery en Angular

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-rpt-huesped-responsable',
  templateUrl: './rpt-huesped-responsable.component.html',
  styleUrls: ['./rpt-huesped-responsable.component.scss']

})
export class RptHuespedResponsableComponent {


  isLoading$: any;
  filterEstado: number = 0;
  filterDocumento: string;
  filterHabitacion: number = 0;
  filterDesde: string;
  filterHasta: string;

  lstRegistros: RptHuespedResponsable[] = [];
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
      .GetRptHuespedesResponsable(this.filterHabitacion, this.filterEstado, this.filterDocumento, this.filterDesde, this.filterHasta)
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

    const TipoReporte = 3;
    let usuario = '-'
    let cEstado = '-'
    let cNroHabitacion = '-'


    if (parseInt(this.filterEstado.toString()) === 1) {
      cEstado = 'En Reserva'
    }

    if (parseInt(this.filterEstado.toString()) === 2) {
      cEstado = 'En Estancia'
    }

    if (parseInt(this.filterEstado.toString()) === 3) {
      cEstado = 'Culminada'
    }

    if (parseInt(this.filterEstado.toString()) === 4) {
      cEstado = 'Interrumpida'
    }

    if (parseInt(this.filterEstado.toString()) === 5) {
      cEstado = 'Reserva Cancelada'
    }
    console.log('Habitacion: ', this.filterHabitacion.toString())
    if (parseInt(this.filterHabitacion.toString()) !== 0) {
     
      let habi = this.lstHabitaciones.find((x: any) => x.nNroHabitacion === parseInt(this.filterHabitacion.toString()));
      if (habi) {
        cNroHabitacion = habi.nNroHabitacion;
      }
    }




    const parametros = {
      cEstadoReserva: cEstado,
      cNroHabitacion: cNroHabitacion,
      cDocumentoHuesped: this.filterDocumento || '-',
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
      'HABITACIÓN': registro.nNroHabitacion,
      'HUÉSPED RESPONSABLE': registro.cHuespedResponsable,
      'DOCUMENTO': registro.cTipoDocumentoResponsable + ' ' + registro.cNroDocumentoResponsable,
      'CELULAR': registro.cNroCelular,
      'CORREO': registro.cCorreo,
      'FECHA INGRESO': moment(registro.dFechaIngreso).format('DD/MM/YYYY HH:mm:ss'),
      'FECHA SALIDA': moment(registro.dFechaSalida).format('DD/MM/YYYY HH:mm:ss'),
      'ESTADO': registro.cEstadoEstancia
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

    FileSaver.saveAs(blob, `rpt_huesped_responsable_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    this.bLoading = false;
  }



  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}
