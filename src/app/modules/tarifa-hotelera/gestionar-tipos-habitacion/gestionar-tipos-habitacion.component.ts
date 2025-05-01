import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { TipoHabitacionCamaEntity, TipoHabitacionEntity } from 'src/app/models/TarifaHoteleraEntity';
import { SvGeneralService } from '../../service/sv-general.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-gestionar-tipos-habitacion',
  templateUrl: './gestionar-tipos-habitacion.component.html',
  styleUrls: ['./gestionar-tipos-habitacion.component.scss']
})
export class GestionarTiposHabitacionComponent {
  isLoading$: any;
  bEdit: boolean = false;
  tipoHabitacion: TipoHabitacionEntity;
  pageSize = 5;
  desde: number = 0;
  hasta: number = 5;
  cNombreTipo: string = '';
  cNuevoNombreTipo: string = '';

  lstTiposHabitaciones: TipoHabitacionEntity[] = [];
  tipoHabitacion_id: number = 0;
  lstCamas: TipoHabitacionCamaEntity[] = [];

  nAforo: number = 0;

  bReadOnly:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GestionarTiposHabitacionComponent>,
    public toaster: ToastrService,
    public _service: SvGeneralService,
  ) {
    /*  this.lstTiposHabitaciones = this.data.lstTiposHabitaciones; */
    /*  this.LoadData(); */

    this.bReadOnly = this.data.bReadOnly;
  }

  ngOnInit(): void {
    this.isLoading$ = this._service.isLoading$;
    setTimeout(() => {
      this.LoadData();
    }, 10);


  }

  cambiarPagina(e: PageEvent) {

    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  LoadData() {

    this._service.GetTiposHabitacion().subscribe((resp: any) => {

      if (resp.success) {

        this.lstTiposHabitaciones = resp.data;
        this.desde = 0;
        this.hasta = 5;
        this.cNuevoNombreTipo = '';

      }
      /*      this.lstUsuarios = resp.usuarios; */

    });
  }

  BotonInfo(tipo: TipoHabitacionEntity) {

    this.bEdit = true;
    /*  this.toaster.info("Puede editar el tipo de habitación"); */
    this.tipoHabitacion = tipo;
    this.tipoHabitacion_id = tipo.id || 0;
    this.cNombreTipo = tipo.cNombreTipo || '';
    this.lstCamas = tipo.lstTipoCamas || [];
    this.nAforo = tipo.nTotalPersonas ?? 0;

  }

  BotonActualizar() {

    if (this.nAforo <= 0) {
      this.toaster.warning('Tipo Habitación', 'Complete el aforo para continuar.');
      return;
    }

    const tipo = new TipoHabitacionEntity();
    tipo.id = this.tipoHabitacion.id ?? 0;
    tipo.cNombreTipo = this.cNombreTipo;
    tipo.lstTipoCamas = this.lstCamas;
    tipo.nAforo = this.nAforo;


    // Validar que si bActivo es true, nNroPersonas sea mayor a cero
    for (const cama of tipo.lstTipoCamas) {
      /*   if (cama.bActivo && (cama.nNroPersonas ?? 0) <= 0) {
          this.toaster.warning('Tipo Habitación', 'Si una cama está activa, el número de personas debe ser mayor a cero.');
          return;
        } */

      if (cama.bActivo && (cama.nCantidad ?? 0) <= 0) {
        this.toaster.warning('Tipo Habitación', 'Si una cama está activa, la cantidad de camas debe ser mayor a cero.');
        return;
      }
    }

    this._service.PostTipoHabitacion(tipo).subscribe((resp: any) => {

      if (resp.success) {
        this.toaster.success('Tipo Habitación', 'Se guardaron los cambios.');
        /* this.LoadData(); */
      }
    },
      (error: any) => {
        this.toaster.error('Tipo Habitación', 'Error al guardar los cambios.');
        /* this.LoadData(); */
      });
  }

  BotonNuevoTipo() {
    if (this.cNuevoNombreTipo == '') {
      this.toaster.error('Tipo Habitación', 'Debe ingresar un nombre para el tipo de habitación.')
      return;
    }


    const tipo = new TipoHabitacionEntity();
    tipo.id = 0;
    tipo.cNombreTipo = this.cNuevoNombreTipo;

    this._service.PostTipoHabitacion(tipo).subscribe((resp: any) => {

      if (resp.success) {
        this.toaster.success('Tipo Habitación', 'Se guardaron los cambios.')
        this.LoadData();
      }
    },
      (error: any) => {
        this.toaster.error('Tipo Habitación', 'Error al guardar los cambios.')
        this.LoadData();
      }
    )
  }

  BotonVolver() {
    this.bEdit = false;
    this.LoadData();
  }
}


