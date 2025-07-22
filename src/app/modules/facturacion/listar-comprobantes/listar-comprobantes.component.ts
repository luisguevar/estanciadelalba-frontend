import { ChangeDetectorRef, Component } from '@angular/core';
import { SvGeneralService } from '../../service/sv-general.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth';
import { ComprobanteEntity } from 'src/app/models/ComprobanteEntity';
import { PageEvent } from '@angular/material/paginator';
import { GenerarAnulacionComponent } from '../componentes/generar-anulacion/generar-anulacion.component';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import moment from 'moment';

@Component({
  selector: 'app-listar-comprobantes',
  templateUrl: './listar-comprobantes.component.html',
  styleUrls: ['./listar-comprobantes.component.scss']
})
export class ListarComprobantesComponent {
  isLoading$: any;

  filterUsuarioResponsable: number = 0;
  filterTipoMotivimiento: number = 3;
  filterDocumento: string;
  filterDesde: string;
  filterHasta: string;

  pageSize = 10;
  desde: number = 0;
  hasta: number = 10;
  lstUsuarios: any;
  lstRegistros: ComprobanteEntity[] = [];
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
    this.LoadData();

  }

  LoadData() {
    this._service
      .GetComprobantes(this.filterUsuarioResponsable, this.filterTipoMotivimiento, this.filterDocumento, this.filterDesde, this.filterHasta)
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

  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  BotonActualizarEstadoSunat(registro: ComprobanteEntity) {

    const body = {
      id: registro.id,
      tipo_de_comprobante: registro.nTipoComprobante,
      serie: registro.cSerie,
      numero: registro.nNumero
    }
    console.log('Body: ', body);

    this._service.PostObtenerComprobante(body).subscribe(
      (resp: any) => {
        console.log(resp);

        if (resp && resp.bAceptadaPorSunat !== undefined) {
          // Puedes actualizar el valor en tu modelo si lo estás mostrando en pantalla
          registro.bAceptadaPorSunat = resp.bAceptadaPorSunat;

          this.toaster.success('Comprobantes', 'Estado SUNAT actualizado correctamente.');
          this.LoadData();
          return;
        }

        this.toaster.warning('Comprobantes', 'No se recibió información del estado SUNAT.');
      },
      (error: any) => {
        console.error('Error al obtener comprobante', error.error);
        this.toaster.error('Error', 'Error al Obtener comprobante.');
      }
    );

  }

  BotonAnularSunat(registro: ComprobanteEntity) {

    const dialogRef = this._dialog.open(
      GenerarAnulacionComponent,
      {
        width: 'auto ',
        height: 'auto',
        disableClose: true,
        data: {
          cClienteNombre: registro.cClienteNombre,
          nTipoComprobante: registro.nTipoComprobante,
          cSerie: registro.cSerie,
          nNumero: registro.nNumero,
          registro: registro
        },
      }
    );


    dialogRef.afterClosed().subscribe((result) => {
      this.LoadData();


    });

  }

  BotonExportarExcel() {
    this.bLoading = true;
    const listaExportada = this.lstRegistros.map((registro, index) => ({
      'N°': index + 1,
      'TIPO': registro.nTipoComprobante === 1 ? 'FACTURA' :
        registro.nTipoComprobante === 2 ? 'BOLETA' : 'OTRO',
      'SERIE': registro.cSerie,
      'NÚMERO': registro.nNumero,
      'CLIENTE': registro.cClienteNombre,
      'NÚMERO DE DOCUMENTO': registro.cClienteNroDocumento,
      'SUBTOTAL': registro.cTotalGravada,
      'IGV': registro.cTotalIgv,
      'TOTAL': registro.cTotal,
      'ACEPTADA POR SUNAT': registro.bAceptadaPorSunat ? 'SI' : 'NO',
      'ANULADA': registro.bAnulado ? 'SI' : 'NO',
      'FECHA CREACIÓN': registro.cFechaCreacion,
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

    FileSaver.saveAs(blob, `rpt_comprobantes_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    this.bLoading = false;
  }

  BotonDescargarPDF() {

  }

}
