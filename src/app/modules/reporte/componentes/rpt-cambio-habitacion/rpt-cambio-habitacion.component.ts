import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IngresoSalidaEntity, RptCambioHabitacionEntity } from 'src/app/models/ReporteEntity';
import { AuthService } from 'src/app/modules/auth';
import { SvGeneralService } from 'src/app/modules/service/sv-general.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-rpt-cambio-habitacion',
  templateUrl: './rpt-cambio-habitacion.component.html',
  styleUrls: ['./rpt-cambio-habitacion.component.scss']
})
export class RptCambioHabitacionComponent {
  isLoading$: any;
  filterUsuarioResponsable: number = 0;
  filterTipoMotivimiento: number = 3;
  filterDocumento: string;
  filterDesde: string;
  filterHasta: string;

  lstRegistros: RptCambioHabitacionEntity[] = [];
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;
  lstUsuarios: any;
  bLoading: boolean = false;
  constructor(
    public _service: SvGeneralService,
    public toaster: ToastrService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public _auth: AuthService
  ) {


  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    this.LoadUsuarios();
    this.LoadData();


  }

  LoadUsuarios() {
    this._service.GetAllUsers().subscribe({
      next: (resp: any) => {
        if (resp.success) {
          this.lstUsuarios = resp.data;

        }
      },
      error: () => {
        this.toaster.error('Reportes', 'Error al cargar los datos.');
      }
    });
  }

  LoadData() {
    this._service
      .GetRptCambiosHabitacion(this.filterUsuarioResponsable, this.filterTipoMotivimiento, this.filterDocumento, this.filterDesde, this.filterHasta)
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


  BotonDescargarPDF() {

    const TipoReporte = 2;
    let usuario = '-'
    let tipoMov = '-'
    if (parseInt(this.filterUsuarioResponsable.toString()) !== 0) {
      let user = this.lstUsuarios.find((x: any) => x.id === parseInt(this.filterUsuarioResponsable.toString()));
      if (user) {
        usuario = user.dni + user.name;
      }
    }

    if (parseInt(this.filterTipoMotivimiento.toString()) === 1) {
      tipoMov = 'Reserva'
    }

    if (parseInt(this.filterTipoMotivimiento.toString()) === 2) {
      tipoMov = 'Estancia'
    }

    const parametros = {
      cTipoMovimiento: tipoMov,
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
      'CAMBIO REALIZADO': registro.cEstadoEstancia,
      'FECHA': moment(registro.dFechaCambio).format('DD/MM/YYYY HH:mm:ss'),
      'HUÉSPED RESPONSABLE': registro.cHuespedResponsable,
      'HAB. ORIGEN': registro.nNroHabitacionOrigen,
      'HAB. DESTINO': registro.nNroHabitacionDestino,
      'OBSERVACIONES': registro.cObservaciones,
      'USUARIO RESPONSABLE': registro.cUsuarioResponsable
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

    FileSaver.saveAs(blob, `rpt_cambio_habitacion_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    this.bLoading = false;
  }


  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }


}
